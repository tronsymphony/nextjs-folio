import { NextResponse } from 'next/server';

// California Highway Patrol (CHP) Statewide Integrated Traffic Records System (SWITRS)
// & California Crash Reporting System (CCRS) Open Data API Gateway (data.ca.gov)
// Covers reported vehicle, motorcycle, and bicycle collisions from 2016 to 2025.

const CCRS_YEAR_RESOURCE_MAP = {
  '2026': {
    crashes: 'b8ce0ca4-b4e9-490d-b4d1-1f4ec48cbefb',
    parties: '348a4266-bbb6-439f-b6c7-0018cc79f0fe',
  },
  '2025': {
    crashes: '9f4fc839-122d-4595-a146-43bc4ed16f46',
    parties: 'a2676918-a825-4b77-8e5c-6eadb38d6b1a',
  },
  '2024': {
    crashes: 'f775df59-b89b-4f82-bd3d-8807fa3a22a0',
    parties: '93892d36-017b-4a2a-bc0b-f1f385060b96',
  },
  '2023': {
    crashes: '436642c0-cd04-4a4c-b45e-564b66437476',
    parties: '84376be5-548b-44e3-8ebc-73e8a2ca9945',
  },
  '2022': {
    crashes: '7828780b-117b-455e-9275-986ad3ffde50',
    parties: '9ef51178-51cb-4939-9344-2d0907740580',
  },
  '2021': {
    crashes: 'd08692e2-6d36-487e-bca0-28cd127a626f',
    parties: '754fe00c-f3bf-4f2f-80d0-ed4aa7b89b77',
  },
  '2020': {
    crashes: 'a2e0605d-0695-4bce-806d-4d0dda7ace68',
    parties: 'ebfed5da-82d6-4af2-bf40-b9516d7935a9',
  },
  '2019': {
    crashes: '2b4c7d03-e684-435e-80da-17935de9499f',
    parties: '1a06775e-7d4a-4574-b3d4-f815d02d236a',
  },
  '2018': {
    crashes: 'a4b57216-5110-43d3-884c-d95366b19158',
    parties: '42f3f3d1-c130-4ebc-9536-98bf7880b0b9',
  },
  '2017': {
    crashes: '4784664d-b7cf-4427-af25-7c7307bad56c',
    parties: 'e8c625e8-674a-49f2-abe9-405267613045',
  },
  '2016': {
    crashes: '3d5f2586-cf68-4213-aa1c-60df37399d10',
    parties: '2e8e3d81-4615-4b8e-ab7f-408f10f64bba',
  },
};

function parsePcfViolation(raw) {
  if (!raw) return { code: 'Unknown', label: 'Collision Factor Pending' };
  const upper = raw.toUpperCase();
  if (upper.includes('21801')) {
    return { code: raw, label: '21801 CVC - Left Turn Failure to Yield (SMIDSY)' };
  }
  if (upper.includes('21658')) {
    return { code: raw, label: '21658 CVC - Unsafe Lane Change / Lane Split Delta' };
  }
  if (upper.includes('22350')) {
    return { code: raw, label: '22350 CVC - Unsafe Speed for Conditions' };
  }
  if (upper.includes('21804')) {
    return { code: raw, label: '21804 CVC - Cross-Traffic Right-of-Way Violation' };
  }
  if (upper.includes('22107')) {
    return { code: raw, label: '22107 CVC - Unsafe Turning Movement / Loss of Control' };
  }
  if (upper.includes('21453')) {
    return { code: raw, label: '21453 CVC - Red Light Signal Violation' };
  }
  if (upper.includes('22450')) {
    return { code: raw, label: '22450 CVC - Stop Sign Violation' };
  }
  if (upper.includes('21703')) {
    return { code: raw, label: '21703 CVC - Following Too Closely' };
  }
  if (upper.includes('23152')) {
    return { code: raw, label: '23152 CVC - DUI / Impaired Driving' };
  }
  return { code: raw, label: `${raw} (California Vehicle Code)` };
}

function getRiderSafetyTip(movement, violation, mode) {
  const movUpper = (movement || '').toUpperCase();
  const violUpper = (violation || '').toUpperCase();

  if (movUpper.includes('LANE SPLITTING')) {
    return 'CHP Lane-Splitting Advisory: Maintain speed differential under 10-15 mph above traffic; never split adjacent to wide trucks or near off-ramp bottleneck merges.';
  }
  if (violUpper.includes('21801') || movUpper.includes('LEFT TURN')) {
    return 'SMIDSY Alert: Drivers consistently misjudge motorcycle & bike approach velocity. Perform lane weave to create optical motion contrast and cover your brakes.';
  }
  if (violUpper.includes('22350') || movUpper.includes('OVERTURNED')) {
    return 'Entry Speed Advisory: Blind apex or sudden surface changes (tar snakes, debris). Look deeply through the corner and establish trail-braking before lean-in.';
  }
  if (violUpper.includes('21658') || movUpper.includes('CHANGING LANES')) {
    return 'Blind Spot Hazard: Never cruise in the quarter-panel blind zone of adjacent passenger vehicles; accelerate ahead or fall back into open clear air.';
  }
  if (mode === 'bicycle') {
    return 'Urban Commuter Tip: Stay at least 4-5 feet away from parked car doors. Use primary lane positioning when passing street pinch points.';
  }
  return 'Defensive Riding: Maintain a 3-second space cushion ahead and plan your escape lane towards shoulders at every signal intersection.';
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || '2024';
    const mode = searchParams.get('mode') || 'all'; // 'all' | 'motorcycle' | 'bicycle' | 'ebike'
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 300);
    const county = searchParams.get('county') || '19'; // 19 = Los Angeles County

    const yearsToQuery = year === 'all' ? ['2025', '2024', '2023'] : [year];
    const perYearLimit = Math.ceil(limit / yearsToQuery.length);

    let vehicleTypesCondition = "('Motorcycle', 'Bicycle', 'ElectricBicycles', 'PoliceMotorcycle', 'MotorizedBicycle')";
    if (mode === 'motorcycle') {
      vehicleTypesCondition = "('Motorcycle', 'PoliceMotorcycle', 'MotorizedBicycle')";
    } else if (mode === 'bicycle') {
      vehicleTypesCondition = "('Bicycle', 'ElectricBicycles')";
    } else if (mode === 'ebike') {
      vehicleTypesCondition = "('ElectricBicycles', 'MotorizedBicycle')";
    }

    const allRecords = [];

    for (const yr of yearsToQuery) {
      const cfg = CCRS_YEAR_RESOURCE_MAP[yr];
      if (!cfg) continue;

      const sql = `SELECT c."Collision Id", c."Report Number", c."Crash Date Time", c."City Name", c."Latitude", c."Longitude", c."Collision Type Description", c."Primary Collision Factor Violation", c."PrimaryRoad", c."SecondaryRoad", c."NumberInjured", c."NumberKilled", p."Vehicle1TypeDesc", p."MovementPrecCollDescription", p."IsAtFault" FROM "${cfg.crashes}" c JOIN "${cfg.parties}" p ON c."Collision Id"::text = p."CollisionId"::text WHERE p."Vehicle1TypeDesc" IN ${vehicleTypesCondition} AND c."County Code"::text = '${county}' AND c."Latitude" IS NOT NULL LIMIT ${perYearLimit}`;

      const ckanUrl = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sql)}`;

      try {
        const res = await fetch(ckanUrl, {
          headers: {
            'User-Agent': 'SafePath-Rider-Safety/1.0',
            Accept: 'application/json',
          },
          next: { revalidate: 3600 }, // Cache 1 hour
        });

        if (!res.ok) continue;

        const json = await res.json();
        if (json.success && json.result?.records) {
          allRecords.push(...json.result.records.map((r) => ({ ...r, _year: yr })));
        }
      } catch (err) {
        console.error(`Error querying CCRS for year ${yr}:`, err);
      }
    }

    // Format records into standard app Incident schema
    const formattedIncidents = allRecords
      .filter((r) => r.Latitude && r.Longitude)
      .map((r) => {
        const lat = parseFloat(r.Latitude);
        const lng = parseFloat(r.Longitude);

        if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;

        const killed = parseInt(r.NumberKilled || '0', 10);
        const injured = parseInt(r.NumberInjured || '0', 10);
        const isFatal = killed > 0;

        const vDesc = (r.Vehicle1TypeDesc || '').toLowerCase();
        let incidentMode = 'motorcycle';
        if (vDesc.includes('electric') || vDesc.includes('ebike')) {
          incidentMode = 'ebike';
        } else if (vDesc.includes('bicycle')) {
          incidentMode = 'bicycle';
        }

        const dateTimeStr = r['Crash Date Time'] || '';
        const datePart = dateTimeStr.includes('T') ? dateTimeStr.split('T')[0] : dateTimeStr;
        const timePart = dateTimeStr.includes('T') ? dateTimeStr.split('T')[1].substring(0, 5) : '';

        // Determine timeOfDay
        let timeOfDay = 'day';
        if (timePart) {
          const hour = parseInt(timePart.split(':')[0], 10);
          if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19)) {
            timeOfDay = hour < 12 ? 'commute_morning' : 'commute_evening';
          } else if (hour >= 20 || hour < 6) {
            timeOfDay = 'night';
          }
        }

        const violationInfo = parsePcfViolation(r['Primary Collision Factor Violation']);
        const primaryRoad = r.PrimaryRoad || 'Primary Arterial';
        const secondaryRoad = r.SecondaryRoad || '';
        const streetLabel = secondaryRoad ? `${primaryRoad} & ${secondaryRoad}` : primaryRoad;
        const movement = r.MovementPrecCollDescription || 'Vehicle in Motion';

        const highInjuryRoads = [
          'FIGUEROA',
          'WESTERN',
          'VERMONT',
          'VENICE',
          'OLYMPIC',
          'WILSHIRE',
          'SANTA MONICA',
          'SUNSET',
          'PACIFIC COAST',
          'SEPULVEDA',
          'VAN NUYS',
          'AVALON',
          'CRENSHAW',
          'BROADWAY',
        ];
        const isHIN = highInjuryRoads.some((h) => primaryRoad.toUpperCase().includes(h));

        const safetyTip = getRiderSafetyTip(movement, violationInfo.code, incidentMode);

        return {
          id: `chp-ccrs-${r['Collision Id']}`,
          caseId: `CHP-${r['Report Number'] || r['Collision Id']}`,
          source: `CHP SWITRS / CCRS (${r._year})`,
          year: parseInt(r._year, 10),
          date: datePart,
          time: timePart || '12:00',
          timeOfDay,
          city: (r['City Name'] || 'Los Angeles').toLowerCase().replace(/\s+/g, '-'),
          county: 'Los Angeles',
          jurisdiction: `CHP Southern Division (${r._year})`,
          street: streetLabel,
          primaryRoad,
          secondaryRoad,
          coordinates: [lat, lng],
          mode: incidentMode,
          severity: isFatal ? 'fatal' : 'severe',
          pcfViolation: violationInfo.label,
          pcfCategory: violationInfo.code,
          movement,
          partiesInvolved: [
            {
              partyType: r.Vehicle1TypeDesc || 'Rider',
              vehicle: r.Vehicle1TypeDesc,
              atFault: r.IsAtFault === 'True',
            },
          ],
          collisionType: r['Collision Type Description'] || 'Traffic Collision',
          summary: `CHP Incident #${r['Report Number'] || r['Collision Id']}: ${r.Vehicle1TypeDesc} involved in ${r['Collision Type Description'] || 'collision'} while ${movement.toLowerCase()} on ${streetLabel}.`,
          safetyTakeaway: safetyTip,
          dangerRating: isFatal ? 5 : isHIN ? 4 : 3,
          highInjuryNetwork: isHIN,
          killed,
          injured,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      count: formattedIncidents.length,
      yearRequested: year,
      source: 'State of California CHP CCRS / SWITRS Open Data Portal',
      portalUrl: 'https://data.ca.gov/dataset/california-crash-reporting-system-ccrs',
      data: formattedIncidents,
    });
  } catch (error) {
    console.error('API /api/chp-switrs error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        data: [],
      },
      { status: 500 }
    );
  }
}
