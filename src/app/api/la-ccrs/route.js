import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SWITRS_RECORDS } from '@/data/switrsData';

// Serves the full authentic Los Angeles County CCRS Collision Dataset
// Source: https://data.ca.gov/dataset/ccrs

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'all';
    const year = searchParams.get('year') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const limit = parseInt(searchParams.get('limit') || '1000', 10);

    let records = [];

    // Try loading pre-compiled JSON file first
    const jsonPath = path.join(process.cwd(), 'public/data/la_county_ccrs_crashes.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      records = JSON.parse(raw);
    } else {
      records = SWITRS_RECORDS;
    }

    let filtered = records;

    if (mode !== 'all') {
      filtered = filtered.filter((r) => r.mode === mode);
    }

    if (year !== 'all') {
      const yrInt = parseInt(year, 10);
      filtered = filtered.filter((r) => r.year === yrInt);
    }

    if (severity === 'fatal') {
      filtered = filtered.filter((r) => r.severity === 'fatal');
    } else if (severity === 'severe') {
      filtered = filtered.filter((r) => r.severity === 'severe_injury' || r.severity === 'fatal');
    }

    if (limit > 0) {
      filtered = filtered.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      totalAvailable: records.length,
      source: 'California Crash Reporting System (CCRS) - data.ca.gov/dataset/ccrs',
      sourceUrl: 'https://data.ca.gov/dataset/ccrs',
      data: filtered,
    });
  } catch (err) {
    console.error('Error in /api/la-ccrs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
