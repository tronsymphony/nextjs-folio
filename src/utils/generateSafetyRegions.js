/**
 * Generates uniform, compact GeoJSON polygon hazard sectors based on official CCRS crash data.
 * - Only highlights areas with actual recorded collisions (Yellow = Caution, Red = Danger).
 * - Safe areas (0 collisions) are left clean with NO green boxes, keeping the dark map ultra-readable.
 * - Uses FIXED geographic cell sizing (~1.1 km) so boxes never balloon across locations.
 */

const KNOWN_BOUNDS = {
  'angeles-forest': { minLat: 34.12, maxLat: 34.46, minLng: -118.35, maxLng: -117.65 },
  'malibu-canyons': { minLat: 33.98, maxLat: 34.16, minLng: -119.05, maxLng: -118.52 },
  'orange-county': { minLat: 33.42, maxLat: 33.95, minLng: -118.10, maxLng: -117.45 },
  'los-angeles': { minLat: 33.92, maxLat: 34.18, minLng: -118.50, maxLng: -118.15 },
};

// Fixed physical cell size (~1.1 km by ~1.1 km)
const CELL_SIZE_LAT = 0.010;
const CELL_SIZE_LNG = 0.012;

export function generateSafetyRegions(incidents = [], city = null) {
  if (!incidents || incidents.length === 0) {
    return { type: 'FeatureCollection', features: [] };
  }

  const cityId = city?.id;
  const known = cityId && KNOWN_BOUNDS[cityId] ? KNOWN_BOUNDS[cityId] : null;

  // 1. Filter out coordinate outliers based on known city perimeter or median clustering
  let validIncidents = [];
  if (known) {
    validIncidents = incidents.filter((d) => {
      if (!d.coordinates || d.coordinates.length < 2) return false;
      const [lat, lng] = d.coordinates;
      return (
        lat >= known.minLat - 0.02 &&
        lat <= known.maxLat + 0.02 &&
        lng >= known.minLng - 0.02 &&
        lng <= known.maxLng + 0.02
      );
    });
  } else {
    const cLat = city?.center ? city.center[0] : 34.05;
    const cLng = city?.center ? city.center[1] : -118.25;
    validIncidents = incidents.filter((d) => {
      if (!d.coordinates || d.coordinates.length < 2) return false;
      const [lat, lng] = d.coordinates;
      return Math.abs(lat - cLat) < 0.4 && Math.abs(lng - cLng) < 0.45;
    });
  }

  if (validIncidents.length === 0) {
    return { type: 'FeatureCollection', features: [] };
  }

  // Determine origin anchor for fixed-size grid tiling
  const baseLat = known ? known.minLat : Math.min(...validIncidents.map((i) => i.coordinates[0]));
  const baseLng = known ? known.minLng : Math.min(...validIncidents.map((i) => i.coordinates[1]));

  // 2. Aggregate incidents into FIXED-SIZE cells
  const cellMap = new Map();

  for (const item of validIncidents) {
    const [lat, lng] = item.coordinates;
    const r = Math.floor((lat - baseLat) / CELL_SIZE_LAT);
    const c = Math.floor((lng - baseLng) / CELL_SIZE_LNG);
    const key = `${r}:${c}`;

    if (!cellMap.has(key)) {
      cellMap.set(key, {
        r,
        c,
        crashes: 0,
        fatalities: 0,
        severe: 0,
      });
    }

    const cell = cellMap.get(key);
    cell.crashes += 1;
    if (item.severity === 'fatal' || item.killed > 0) {
      cell.fatalities += (item.killed || 1);
    } else if (item.severity === 'severe_injury' || item.injured > 0) {
      cell.severe += (item.injured || 1);
    }
  }

  // 3. Build GeoJSON features ONLY for statistically meaningful hazard zones
  // Filter out single-isolated incidents to keep the map clean and digestible
  const features = [];
  for (const [key, cell] of cellMap.entries()) {
    if (!cell) continue;

    const isDanger = cell.fatalities > 0 || cell.severe >= 2 || cell.crashes >= 6;
    const isCaution = !isDanger && (cell.severe > 0 || cell.crashes >= 3);

    // Skip low-incident noise (1-2 minor incidents without injury) to avoid visual checkerboard
    if (!isDanger && !isCaution) continue;

    const cellMinLat = baseLat + cell.r * CELL_SIZE_LAT;
    const cellMaxLat = cellMinLat + CELL_SIZE_LAT;
    const cellMinLng = baseLng + cell.c * CELL_SIZE_LNG;
    const cellMaxLng = cellMinLng + CELL_SIZE_LNG;

    const level = isDanger ? 'danger' : 'caution';
    const title = cell.fatalities > 0 
      ? 'Critical Fatal Hazard Zone' 
      : isDanger 
      ? 'High Crash Density Zone' 
      : 'Frequent Collision Caution Zone';

    const score = isDanger 
      ? Math.max(12, 45 - cell.fatalities * 12 - cell.crashes)
      : Math.max(55, 85 - cell.crashes * 5);

    const fillColor = isDanger 
      ? 'rgba(239, 68, 68, 0.16)' 
      : 'rgba(245, 158, 11, 0.12)';

    const borderColor = isDanger 
      ? 'rgba(239, 68, 68, 0.35)' 
      : 'rgba(245, 158, 11, 0.30)';

    const description = isDanger
      ? `${cell.crashes} collisions (${cell.fatalities} fatal, ${cell.severe} severe). High kinetic conflict probability; observe lane discipline and speed margins.`
      : `${cell.crashes} reported collisions. Moderate traffic friction; watch for intersection left hooks and arterial turnouts.`;

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [cellMinLng, cellMinLat],
          [cellMaxLng, cellMinLat],
          [cellMaxLng, cellMaxLat],
          [cellMinLng, cellMaxLat],
          [cellMinLng, cellMinLat],
        ]],
      },
      properties: {
        id: `region-${key}`,
        isRegion: true,
        level,
        title,
        score,
        crashes: cell.crashes,
        fatalities: cell.fatalities,
        severe: cell.severe,
        fillColor,
        borderColor,
        description,
      },
    });
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}
