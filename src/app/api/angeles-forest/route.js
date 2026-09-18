import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let cachedForestData = null;
let cachedRiderData = null;

function loadLocalData() {
  if (!cachedForestData) {
    try {
      const fullPath = path.join(process.cwd(), 'public', 'data', 'angeles_forest_crashes.json');
      const raw = fs.readFileSync(fullPath, 'utf8');
      cachedForestData = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to load full Angeles Forest data:', err);
      cachedForestData = [];
    }
  }

  if (!cachedRiderData) {
    try {
      const riderPath = path.join(process.cwd(), 'public', 'data', 'angeles_forest_riders.json');
      const raw = fs.readFileSync(riderPath, 'utf8');
      cachedRiderData = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to load rider Angeles Forest data:', err);
      cachedRiderData = [];
    }
  }
}

export async function GET(request) {
  try {
    loadLocalData();

    const { searchParams } = new URL(request.url);
    const scope = searchParams.get('scope') || 'riders'; // 'riders' | 'all'
    const mode = searchParams.get('mode') || 'all'; // 'all' | 'motorcycle' | 'bicycle' | 'ebike'
    const year = searchParams.get('year') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const limit = parseInt(searchParams.get('limit') || '2000', 10);

    const sourceData = scope === 'all' || mode === 'vehicle' || mode === 'car' ? cachedForestData : cachedRiderData;

    let filtered = sourceData.filter((item) => {
      if (mode !== 'all' && item.mode !== mode && !(mode === 'car' && (item.mode === 'vehicle' || item.mode === 'car'))) return false;
      if (year !== 'all' && item.year !== parseInt(year, 10)) return false;
      if (severity === 'fatal' && item.severity !== 'fatal') return false;
      if (severity === 'severe' && item.severity !== 'severe_injury' && item.severity !== 'fatal') return false;
      return true;
    });

    if (filtered.length > limit) {
      filtered = filtered.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      totalForestCrashes: cachedForestData.length,
      totalRiderCrashes: cachedRiderData.length,
      scope,
      source: 'California Highway Patrol (CHP) SWITRS / CCRS - Angeles National Forest Corridor (2016-2026)',
      data: filtered,
    });
  } catch (err) {
    console.error('API /api/angeles-forest error:', err);
    return NextResponse.json({ success: false, error: err.message, data: [] }, { status: 500 });
  }
}
