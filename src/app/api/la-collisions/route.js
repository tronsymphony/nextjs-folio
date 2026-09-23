import { NextResponse } from 'next/server';

// Server-side cache
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '300', 10);
    const mode = searchParams.get('mode') || 'all'; // 'all' | 'bicycle' | 'motorcycle'
    const minYear = searchParams.get('minYear') || '2023';

    // Check memory cache for standard queries
    const now = Date.now();
    const cacheKey = `${mode}-${limit}-${minYear}`;

    // Build SoQL where clause
    // 3027 = Bicycle involved, 3028 = Motorcycle involved
    let modeCondition = "(mocodes like '%3027%' or mocodes like '%3028%')";
    if (mode === 'bicycle') {
      modeCondition = "mocodes like '%3027%'";
    } else if (mode === 'motorcycle') {
      modeCondition = "mocodes like '%3028%'";
    }

    const whereClause = `${modeCondition} and date_occ >= '${minYear}-01-01T00:00:00.000' and location_1.latitude is not null`;
    const socrataUrl = `https://data.lacity.org/resource/d5tf-ez2w.json?$where=${encodeURIComponent(
      whereClause
    )}&$order=date_occ%20DESC&$limit=${limit}`;

    const res = await fetch(socrataUrl, {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 600 }, // Next.js cache 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Socrata API returned status ${res.status}`);
    }

    const rawRecords = await res.json();

    // Map raw police records to our app schema
    const formattedIncidents = rawRecords
      .filter((r) => r.location_1 && r.location_1.latitude && r.location_1.longitude)
      .map((record) => {
        const lat = parseFloat(record.location_1.latitude);
        const lng = parseFloat(record.location_1.longitude);

        // Discard invalid / 0,0 coordinates
        if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;

        const mocodes = record.mocodes || '';
        const isBicycle = mocodes.includes('3027');
        const isMotorcycle = mocodes.includes('3028');

        // LAPD MO code 3004 = Traffic Collision - Fatal; 3003 = Serious Injury
        const isFatal = mocodes.includes('3004');
        const isSevere = mocodes.includes('3003') || mocodes.includes('3006');
        const severity = isFatal ? 'fatal' : isSevere ? 'severe_injury' : 'moderate';

        const rawLoc = (record.location || '').trim().replace(/\s+/g, ' ');
        const rawCross = (record.cross_street || '').trim().replace(/\s+/g, ' ');
        const streetName = rawCross ? `${rawLoc} & ${rawCross}` : rawLoc;

        const dateStr = record.date_occ ? record.date_occ.split('T')[0] : 'Recent';
        const timeStr = record.time_occ
          ? `${record.time_occ.slice(0, 2)}:${record.time_occ.slice(2, 4)}`
          : 'Unknown';

        // Approximate time of day
        const hour = parseInt(record.time_occ ? record.time_occ.slice(0, 2) : '12', 10);
        let timeOfDay = 'day';
        if (hour >= 20 || hour <= 5) timeOfDay = 'night';
        else if (hour >= 6 && hour <= 9) timeOfDay = 'commute_morning';
        else if (hour >= 17 && hour <= 19) timeOfDay = 'commute_evening';

        // Collision type description based on police codes
        let collisionType = 'Motor Vehicle Traffic Collision';
        if (mocodes.includes('3001')) collisionType = 'Vehicle vs Bicycle / Cyclist';
        if (mocodes.includes('3002')) collisionType = 'Vehicle vs Motorcycle';
        if (mocodes.includes('3030')) collisionType = 'Broadside / T-Bone Impact';
        if (mocodes.includes('3034')) collisionType = 'Left-Turn Across Path';
        if (mocodes.includes('3036')) collisionType = 'Right-Hook Turn Conflict';
        if (mocodes.includes('3037')) collisionType = 'Rear-End Impact';

        return {
          id: `la-live-${record.dr_no}`,
          city: 'los-angeles',
          neighborhood: record.area_name || 'Los Angeles',
          coordinates: [lat, lng],
          street: streetName,
          mode: isBicycle ? 'bicycle' : isMotorcycle ? 'motorcycle' : 'ebike',
          severity: severity,
          year: parseInt(dateStr.slice(0, 4), 10) || 2024,
          date: dateStr,
          time: timeStr,
          timeOfDay: timeOfDay,
          collisionType: collisionType,
          vehicleInvolved: record.crm_cd_desc || 'Traffic Collision',
          factors: [
            `LAPD Report #${record.dr_no}`,
            `Division: ${record.area_name || 'Central'}`,
            record.vict_age ? `Victim Age: ${record.vict_age}` : 'Commuter Impact',
          ],
          speedLimit: 'City Arterial',
          lighting: timeOfDay === 'night' ? 'Night - Lighted' : 'Daylight',
          weather: 'Clear',
          description: `Official LAPD Traffic Collision record (Report #${record.dr_no}) filed in the ${
            record.area_name || 'Los Angeles'
          } division.`,
          safetyRecommendation: isFatal
            ? 'FATAL CRASH SITE: High caution advised when navigating this intersection. Look for parallel neighborhood greenways.'
            : 'Known multi-vehicle conflict spot. Scan intersecting vehicles before proceeding.',
          dangerRating: isFatal ? 5 : isSevere ? 4 : 3,
          highInjuryNetwork: true,
          isLiveGovernmentData: true,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      source: 'data.lacity.org (City of Los Angeles Open Data)',
      totalRecordsReturned: formattedIncidents.length,
      dataset: 'LAPD Traffic Collision Data from 2010 to Present (Resource d5tf-ez2w)',
      incidents: formattedIncidents,
    });
  } catch (error) {
    console.error('Error fetching live LA collisions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
