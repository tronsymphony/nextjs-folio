const fs = require('fs');
const path = require('path');

const CCRS_YEARS = [
  { yr: 2025, crashes: '9f4fc839-122d-4595-a146-43bc4ed16f46' },
  { yr: 2024, crashes: 'f775df59-b89b-4f82-bd3d-8807fa3a22a0' },
  { yr: 2023, crashes: '436642c0-cd04-4a4c-b45e-564b66437476' },
  { yr: 2022, crashes: '7828780b-117b-455e-9275-986ad3ffde50' },
  { yr: 2021, crashes: 'd08692e2-6d36-487e-bca0-28cd127a626f' },
  { yr: 2020, crashes: 'a2e0605d-0695-4bce-806d-4d0dda7ace68' },
  { yr: 2019, crashes: '2b4c7d03-e684-435e-80da-17935de9499f' },
  { yr: 2018, crashes: 'a4b57216-5110-43d3-884c-d95366b19158' },
  { yr: 2017, crashes: '4784664d-b7cf-4427-af25-7c7307bad56c' },
  { yr: 2016, crashes: '3d5f2586-cf68-4213-aa1c-60df37399d10' },
];

function formatCarRecord(r, year) {
  const lat = parseFloat(r.Latitude);
  const lng = parseFloat(r.Longitude);
  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;

  const killed = parseInt(r.NumberKilled || '0', 10);
  const injured = parseInt(r.NumberInjured || '0', 10);
  const isFatal = killed > 0;

  const dateTimeStr = r['Crash Date Time'] || '';
  const datePart = dateTimeStr.includes('T') ? dateTimeStr.split('T')[0] : dateTimeStr;
  const timePart = dateTimeStr.includes('T') ? dateTimeStr.split('T')[1]?.substring(0, 5) : '12:00';

  let timeOfDay = 'day';
  if (timePart) {
    const hour = parseInt(timePart.split(':')[0], 10);
    if (hour >= 20 || hour < 6) timeOfDay = 'night';
    else if (hour >= 7 && hour <= 9) timeOfDay = 'commute_morning';
    else if (hour >= 17 && hour <= 19) timeOfDay = 'commute_evening';
  }

  const pRoad = r.PrimaryRoad || 'Highway Corridor';
  const sRoad = r.SecondaryRoad || '';
  const street = sRoad ? `${pRoad} & ${sRoad}` : pRoad;
  const cityName = r['City Name'] || 'Los Angeles';
  const caseId = r['Report Number'] || r['Collision Id'] || `CCRS-${Math.random().toString(36).substring(2, 6)}`;
  const pcf = r['Primary Collision Factor Violation'] || 'CVC Safe Speed / Right-of-Way';
  const collisionType = r['Collision Type Description'] || 'Multi-Vehicle Collision';

  let safetyTakeaway = 'Maintain 3+ second following buffer and check blind spots before lane changes.';
  if (isFatal) {
    safetyTakeaway = 'FATAL INCIDENT SITE: High velocity intrusion risk. Slow on approach and cover brakes.';
  } else if (collisionType.toUpperCase().includes('REAR END')) {
    safetyTakeaway = 'Tailgating Conflict: Leave escape buffer space when coming to a halt on highway backups.';
  } else if (collisionType.toUpperCase().includes('BROADSIDE') || collisionType.toUpperCase().includes('T-BONE')) {
    safetyTakeaway = 'Intersection T-Bone Risk: Look both directions for red-light runners before entering green light.';
  }

  return {
    id: `ccrs-la-car-${r['Collision Id'] || caseId}`,
    caseId: `CHP-${caseId}`,
    source: `CHP CCRS (${year}) - data.ca.gov/dataset/ccrs`,
    date: datePart || `${year}-01-01`,
    year,
    time: timePart,
    timeOfDay,
    city: 'los-angeles',
    county: 'Los Angeles County',
    jurisdiction: `CHP / Local - ${cityName}`,
    street,
    primaryRoad: pRoad,
    secondaryRoad: sRoad,
    coordinates: [lat, lng],
    mode: 'car',
    severity: isFatal ? 'fatal' : injured > 0 ? 'severe_injury' : 'moderate',
    pcfViolation: pcf,
    pcfCategory: 'CVC Violation',
    movement: r['Collision Type Description'] || 'Proceeding Straight',
    partiesInvolved: [
      {
        partyType: 'Passenger Vehicle / Auto',
        vehicle: 'Passenger Car / SUV / Truck',
        atFault: true,
      },
    ],
    weather: r['Weather 1'] || 'Clear',
    lighting: timeOfDay === 'night' ? 'Dark - Streetlights' : 'Daylight',
    roadSurface: 'Paved',
    collisionType,
    summary: `Official CHP Incident Report #${caseId} (${year}): Motor vehicle involved in ${collisionType.toLowerCase()} at ${street} (${cityName}).`,
    safetyTakeaway,
    dangerRating: isFatal ? 5 : injured > 1 ? 4 : 3,
    highInjuryNetwork: true,
    killed,
    injured,
    isCCRS: true,
  };
}

async function run() {
  console.log('Fetching LA County car collisions from data.ca.gov...');
  const newRecords = [];

  for (const cfg of CCRS_YEARS) {
    const sql = `SELECT "Collision Id", "Report Number", "Crash Date Time", "City Name", "Latitude", "Longitude", "Collision Type Description", "Primary Collision Factor Violation", "PrimaryRoad", "SecondaryRoad", "NumberInjured", "NumberKilled" FROM "${cfg.crashes}" WHERE "County Code"::text = '19' AND ("NumberKilled"::int > 0 OR "NumberInjured"::int > 1) AND "Latitude" IS NOT NULL LIMIT 80`;
    const url = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sql)}`;

    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'SafePath-DataCaGov-Sync/1.0' } });
      if (res.ok) {
        const json = await res.json();
        const rows = json.result?.records || [];
        for (const row of rows) {
          const rec = formatCarRecord(row, cfg.yr);
          if (rec) newRecords.push(rec);
        }
        console.log(`  > Year ${cfg.yr}: fetched ${rows.length} LA car records`);
      }
    } catch (e) {
      console.warn(`Error year ${cfg.yr}:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  const p = path.join(__dirname, '../public/data/la_county_ccrs_crashes.json');
  const existing = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
  const merged = Array.from(new Map([...existing, ...newRecords].map((r) => [r.id, r])).values());

  fs.writeFileSync(p, JSON.stringify(merged, null, 2));
  console.log(`SUCCESS: Merged LA County dataset now has ${merged.length} total records.`);
}

run().catch(console.error);
