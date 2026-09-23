const fs = require('fs');
const path = require('path');

const CCRS_YEARS = [
  { yr: 2025, crashes: '9f4fc839-122d-4595-a146-43bc4ed16f46', parties: 'a2676918-a825-4b77-8e5c-6eadb38d6b1a' },
  { yr: 2024, crashes: 'f775df59-b89b-4f82-bd3d-8807fa3a22a0', parties: '93892d36-017b-4a2a-bc0b-f1f385060b96' },
  { yr: 2023, crashes: '436642c0-cd04-4a4c-b45e-564b66437476', parties: '84376be5-548b-44e3-8ebc-73e8a2ca9945' },
  { yr: 2022, crashes: '7828780b-117b-455e-9275-986ad3ffde50', parties: '9ef51178-51cb-4939-9344-2d0907740580' },
  { yr: 2021, crashes: 'd08692e2-6d36-487e-bca0-28cd127a626f', parties: '754fe00c-f3bf-4f2f-80d0-ed4aa7b89b77' },
  { yr: 2020, crashes: 'a2e0605d-0695-4bce-806d-4d0dda7ace68', parties: 'ebfed5da-82d6-4af2-bf40-b9516d7935a9' },
  { yr: 2019, crashes: '2b4c7d03-e684-435e-80da-17935de9499f', parties: '1a06775e-7d4a-4574-b3d4-f815d02d236a' },
  { yr: 2018, crashes: 'a4b57216-5110-43d3-884c-d95366b19158', parties: '42f3f3d1-c130-4ebc-9536-98bf7880b0b9' },
  { yr: 2017, crashes: '4784664d-b7cf-4427-af25-7c7307bad56c', parties: 'e8c625e8-674a-49f2-abe9-405267613045' },
  { yr: 2016, crashes: '3d5f2586-cf68-4213-aa1c-60df37399d10', parties: '2e8e3d81-4615-4b8e-ab7f-408f10f64bba' },
];

const MALIBU_ROADS = [
  'PACIFIC COAST HWY', 'PCH', 'MULHOLLAND HWY', 'KANAN DUME RD', 'KANAN RD', 
  'TOPANGA CANYON BLVD', 'LATIGO CANYON RD', 'DECKER RD', 'DECKER CANYON RD', 
  'ENCINAL CANYON RD', 'CORRAL CANYON RD', 'LAS FLORES CANYON RD', 'CARBON CANYON RD', 
  'TUNA CANYON RD', 'STUNT RD', 'SADDLE PEAK RD', 'MALIBU CANYON RD'
];

const OC_ROADS = [
  'ORTEGA HWY', 'SANTIAGO CANYON RD', 'PACIFIC COAST HWY', 'PCH', 'CARBON CANYON RD', 
  'LAGUNA CANYON RD', 'LIVE OAK CANYON RD', 'TRABUCO CANYON RD', 'SILVERADO CANYON RD', 
  'CROWN VALLEY PKWY', 'BEACH BLVD', 'NEWPORT COAST DR', 'JAMBOREE RD', 'MACARTHUR BLVD', 
  'EL TORO RD', 'ANTONIO PKWY', 'SANTA MARGARITA PKWY'
];

function formatRecord(r, regionName, regionId, partyMap = {}) {
  const lat = parseFloat(r.Latitude);
  const lng = parseFloat(r.Longitude);
  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;

  const killed = parseInt(r.NumberKilled || '0', 10);
  const injured = parseInt(r.NumberInjured || '0', 10);
  const isFatal = killed > 0;

  const party = partyMap[r['Collision Id']] || {};
  const vDesc = (party.Vehicle1TypeDesc || r.MotorVehicleInvolvedWithDesc || '').toLowerCase();
  
  let mode = 'motorcycle';
  if (vDesc.includes('bicycle')) mode = 'bicycle';
  else if (vDesc.includes('electric') || vDesc.includes('ebike')) mode = 'ebike';
  else if (vDesc.includes('pedestrian')) mode = 'bicycle';

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
  const cityName = r['City Name'] || regionName;
  const caseId = r['Report Number'] || r['Collision Id'] || `CCRS-${Math.random().toString(36).substring(2, 6)}`;
  const pcf = r['Primary Collision Factor Violation'] || 'CVC Safe Speed / Turning Movement';
  const movement = party.MovementPrecCollDescription || r['Collision Type Description'] || 'Proceeding Straight';
  const collisionType = r['Collision Type Description'] || 'Vehicle Collision';

  let safetyTakeaway = 'Maintain buffer distance and look through blind apexes before leaning in.';
  if (isFatal) {
    safetyTakeaway = 'FATAL INCIDENT SITE: Extreme kinetic collision zone. Strictly observe lane boundaries and cover your brakes.';
  } else if (pRoad.toUpperCase().includes('ORTEGA') || pRoad.toUpperCase().includes('MULHOLLAND') || pRoad.toUpperCase().includes('SANTIAGO')) {
    safetyTakeaway = 'Canyon Switchback Protocol: Zero double-yellow crossing. Stay in the outside wheel track to avoid oncoming drift vehicles.';
  } else if (pRoad.toUpperCase().includes('PACIFIC COAST') || pRoad.toUpperCase().includes('PCH')) {
    safetyTakeaway = 'Coastal Corridor Protocol: Watch for sudden U-turns and beach turnout exits across the flow of traffic.';
  }

  return {
    id: `ccrs-${regionId}-${r['Collision Id'] || caseId}`,
    caseId: `CHP-${caseId}`,
    source: `CHP CCRS (${r._year}) - data.ca.gov/dataset/ccrs`,
    date: datePart || `${r._year}-01-01`,
    year: r._year,
    time: timePart,
    timeOfDay,
    city: regionId,
    county: regionId === 'orange-county' ? 'Orange County' : 'Los Angeles County',
    jurisdiction: `CHP / Local - ${cityName}`,
    street,
    primaryRoad: pRoad,
    secondaryRoad: sRoad,
    coordinates: [lat, lng],
    mode,
    severity: isFatal ? 'fatal' : injured > 0 ? 'severe_injury' : 'moderate',
    pcfViolation: pcf,
    pcfCategory: 'CVC Violation',
    movement,
    partiesInvolved: [
      {
        partyType: party.Vehicle1TypeDesc || 'Motor Vehicle',
        vehicle: party.Vehicle1TypeDesc || 'Vehicle',
        atFault: party.IsAtFault === 'Y' || party.IsAtFault === '1',
      },
    ],
    weather: r['Weather 1'] || 'Clear',
    lighting: r.LightingDescription || (timeOfDay === 'night' ? 'Dark - Streetlights' : 'Daylight'),
    roadSurface: 'Paved',
    collisionType,
    summary: `Official CHP Crash Report #${caseId} (${r._year}): Involved in ${collisionType.toLowerCase()} at ${street} (${cityName}).`,
    safetyTakeaway,
    dangerRating: isFatal ? 5 : injured > 1 ? 4 : 3,
    highInjuryNetwork: true,
    killed,
    injured,
    isCCRS: true,
  };
}

async function fetchParties(partiesTable, collisionIds) {
  if (!collisionIds || collisionIds.length === 0) return {};
  const idList = collisionIds.slice(0, 100).map(id => `'${id}'`).join(',');
  const sql = `SELECT "CollisionId", "Vehicle1TypeDesc", "MovementPrecCollDescription", "IsAtFault" FROM "${partiesTable}" WHERE "CollisionId"::text IN (${idList})`;
  const url = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sql)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'SafePath-DataCaGov-Sync/1.0' } });
    if (!res.ok) return {};
    const json = await res.json();
    const map = {};
    for (const r of (json.result?.records || [])) {
      map[r.CollisionId] = r;
    }
    return map;
  } catch (e) {
    return {};
  }
}

async function run() {
  console.log('Extracting authentic Malibu & Orange County CCRS records from data.ca.gov/dataset/ccrs...');

  const malibuRecords = [];
  const ocRecords = [];

  const malibuRoadsClause = MALIBU_ROADS.map(r => `"PrimaryRoad" = '${r}'`).join(' OR ');
  const ocRoadsClause = OC_ROADS.map(r => `"PrimaryRoad" = '${r}'`).join(' OR ');

  for (const cfg of CCRS_YEARS) {
    console.log(`Querying CCRS year ${cfg.yr}...`);

    // 1. Malibu & Santa Monica Canyons Query (County 19)
    const sqlMalibu = `SELECT "Collision Id", "Report Number", "Crash Date Time", "City Name", "Latitude", "Longitude", "Collision Type Description", "Primary Collision Factor Violation", "PrimaryRoad", "SecondaryRoad", "NumberInjured", "NumberKilled", "MotorVehicleInvolvedWithDesc", "Weather 1", "LightingDescription" FROM "${cfg.crashes}" WHERE "County Code"::text = '19' AND ("City Name" = 'MALIBU' OR ${malibuRoadsClause}) AND "Latitude" IS NOT NULL LIMIT 120`;

    // 2. Orange County Query (County 30)
    const sqlOC = `SELECT "Collision Id", "Report Number", "Crash Date Time", "City Name", "Latitude", "Longitude", "Collision Type Description", "Primary Collision Factor Violation", "PrimaryRoad", "SecondaryRoad", "NumberInjured", "NumberKilled", "MotorVehicleInvolvedWithDesc", "Weather 1", "LightingDescription" FROM "${cfg.crashes}" WHERE "County Code"::text = '30' AND ("NumberKilled"::int > 0 OR ${ocRoadsClause}) AND "Latitude" IS NOT NULL LIMIT 120`;

    try {
      // Fetch Malibu
      const urlM = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sqlMalibu)}`;
      const resM = await fetch(urlM, { headers: { 'User-Agent': 'SafePath-DataCaGov-Sync/1.0' } });
      if (resM.ok) {
        const jsonM = await resM.json();
        const rows = (jsonM.result?.records || []).map((r) => ({ ...r, _year: cfg.yr }));
        const ids = rows.map(r => r['Collision Id']).filter(Boolean);
        const partyMap = await fetchParties(cfg.parties, ids);

        for (const row of rows) {
          const f = formatRecord(row, 'Malibu', 'malibu-canyons', partyMap);
          if (f) malibuRecords.push(f);
        }
        console.log(`  > ${cfg.yr} Malibu: fetched ${rows.length} rows`);
      }

      // Fetch OC
      const urlOC = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sqlOC)}`;
      const resOC = await fetch(urlOC, { headers: { 'User-Agent': 'SafePath-DataCaGov-Sync/1.0' } });
      if (resOC.ok) {
        const jsonOC = await resOC.json();
        const rows = (jsonOC.result?.records || []).map((r) => ({ ...r, _year: cfg.yr }));
        const ids = rows.map(r => r['Collision Id']).filter(Boolean);
        const partyMap = await fetchParties(cfg.parties, ids);

        for (const row of rows) {
          const f = formatRecord(row, 'Orange County', 'orange-county', partyMap);
          if (f) ocRecords.push(f);
        }
        console.log(`  > ${cfg.yr} Orange County: fetched ${rows.length} rows`);
      }
    } catch (e) {
      console.warn(`Error for year ${cfg.yr}:`, e.message);
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  // Deduplicate
  const uniqueMalibu = Array.from(new Map(malibuRecords.map((r) => [r.id, r])).values());
  const uniqueOC = Array.from(new Map(ocRecords.map((r) => [r.id, r])).values());

  console.log(`Extracted total ${uniqueMalibu.length} Malibu records and ${uniqueOC.length} Orange County records.`);

  const outMalibu = path.join(__dirname, '../public/data/malibu_canyons_ccrs.json');
  fs.writeFileSync(outMalibu, JSON.stringify(uniqueMalibu, null, 2));

  const outOC = path.join(__dirname, '../public/data/orange_county_ccrs.json');
  fs.writeFileSync(outOC, JSON.stringify(uniqueOC, null, 2));

  console.log(`SUCCESS: Saved ${outMalibu} (${uniqueMalibu.length} records) and ${outOC} (${uniqueOC.length} records).`);
}

run().catch(console.error);
