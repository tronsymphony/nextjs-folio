'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ShieldAlert, 
  ChevronLeft, 
  Compass, 
  Flame, 
  Search, 
  Bike, 
  Database, 
  UploadCloud, 
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Box
} from 'lucide-react';
import '../globals.css';
import MapboxFilterBar from '../../components/safety-map/MapboxFilterBar';
import SwitrsImporter from '../../components/safety-map/SwitrsImporter';
import { CITIES } from '../../data/incidentsData';
import { SWITRS_RECORDS } from '../../data/switrsData';

// Dynamically import MapboxRiderMap with SSR disabled (Mapbox GL requires window/webgl)
const MapboxRiderMap = dynamic(
  () => import('../../components/safety-map/MapboxRiderMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[640px] rounded-2xl bg-[#07090e] border border-neutral-800 flex flex-col items-center justify-center gap-3 text-neutral-400">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Initializing Mapbox GL Vector Canvas...
        </span>
      </div>
    ),
  }
);

export default function SafePathPage() {
  // California Regional Hubs (Angeles Forest, Malibu Canyons, Orange County, Los Angeles Metro)
  const californiaCities = useMemo(() => {
    return CITIES.filter((c) => 
      c.id === 'angeles-forest' || 
      c.id === 'malibu-canyons' || 
      c.id === 'orange-county' || 
      c.id === 'los-angeles'
    );
  }, []);

  const [selectedCityId, setSelectedCityId] = useState('angeles-forest');
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'motorcycle' | 'bicycle' | 'ebike'
  const [severityFilter, setSeverityFilter] = useState('all'); // 'all' | 'fatal' | 'severe'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'night' | 'commute'
  const [selectedYear, setSelectedYear] = useState('all'); // 'all' | '2026' ... '2016'
  const [is3DMode, setIs3DMode] = useState(false);
  const [showSafetyRegions, setShowSafetyRegions] = useState(true);
  const [selectedRoadType, setSelectedRoadType] = useState('all'); // 'all' | 'surface' | 'freeway'
  const [showBikeLanes, setShowBikeLanes] = useState(true);

  // Auto-enable bike lanes when bicycle or e-bike mode is selected
  useEffect(() => {
    if (selectedMode === 'bicycle' || selectedMode === 'ebike') {
      setShowBikeLanes(true);
    }
  }, [selectedMode]);

  // ANGELES NATIONAL FOREST DATA (5,103 raw CHP canyon crashes / 1,333 rider-focused)
  const [angelesForestIncidents, setAngelesForestIncidents] = useState([]);
  const [forestScope, setForestScope] = useState('riders'); // 'riders' | 'all'
  const [isLoadingForest, setIsLoadingForest] = useState(false);

  // MALIBU & SANTA MONICA CANYONS DATA (896 authentic CCRS records)
  const [malibuIncidents, setMalibuIncidents] = useState([]);

  // ORANGE COUNTY (OC) DATA (1,094 authentic CCRS records)
  const [orangeCountyIncidents, setOrangeCountyIncidents] = useState([]);

  // LOS ANGELES COUNTY DATA (940 CCRS records)
  const [laCountyIncidents, setLaCountyIncidents] = useState(SWITRS_RECORDS || []);

  // USER IMPORTED CCRS CSV RECORDS
  const [customImportedRecords, setCustomImportedRecords] = useState([]);
  const [showImporterModal, setShowImporterModal] = useState(false);

  // ACTIVE INCIDENT INSPECTION
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  // Fetch complete Angeles National Forest dataset (from public/data/ or /api/angeles-forest/)
  const fetchAngelesForestData = useCallback(async (scope = forestScope) => {
    setIsLoadingForest(true);
    try {
      const res = await fetch(`/api/angeles-forest/?scope=${scope}&limit=5500`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAngelesForestIncidents(data.data);
      }
    } catch (err) {
      console.warn('Failed to load Angeles Forest data:', err);
    } finally {
      setIsLoadingForest(false);
    }
  }, [forestScope]);

  // Load Angeles Forest data initially
  useEffect(() => {
    if (angelesForestIncidents.length === 0) {
      fetchAngelesForestData('riders');
    }
  }, [fetchAngelesForestData, angelesForestIncidents.length]);

  // Load Malibu, Orange County, and LA County CCRS datasets
  useEffect(() => {
    fetch('/data/malibu_canyons_ccrs.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMalibuIncidents(data);
      })
      .catch((err) => console.warn('Failed loading Malibu CCRS data:', err));

    fetch('/data/orange_county_ccrs.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOrangeCountyIncidents(data);
      })
      .catch((err) => console.warn('Failed loading Orange County CCRS data:', err));

    fetch('/data/la_county_ccrs_crashes.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLaCountyIncidents(data);
      })
      .catch((err) => console.warn('Failed loading LA County CCRS data:', err));
  }, []);

  // When car mode is selected in Angeles Forest, automatically fetch all 5,103 canyon crashes
  useEffect(() => {
    if (selectedCityId === 'angeles-forest' && selectedMode === 'car' && forestScope !== 'all') {
      setForestScope('all');
      fetchAngelesForestData('all');
    }
  }, [selectedCityId, selectedMode, forestScope, fetchAngelesForestData]);

  // Current active city
  const currentCity = useMemo(() => {
    return californiaCities.find((c) => c.id === selectedCityId) || californiaCities[0];
  }, [californiaCities, selectedCityId]);

  // Active pool of raw incidents for the current city
  const activeIncidents = useMemo(() => {
    let pool = [];
    if (selectedCityId === 'angeles-forest') {
      pool = angelesForestIncidents;
    } else if (selectedCityId === 'malibu-canyons') {
      pool = malibuIncidents;
    } else if (selectedCityId === 'orange-county') {
      pool = orangeCountyIncidents;
    } else {
      pool = laCountyIncidents;
    }

    if (customImportedRecords.length > 0) {
      pool = [...customImportedRecords, ...pool];
    }

    return pool;
  }, [selectedCityId, angelesForestIncidents, malibuIncidents, orangeCountyIncidents, laCountyIncidents, customImportedRecords]);

  // Filtered counts for status badges
  const { totalCount, fatalCount } = useMemo(() => {
    const list = activeIncidents.filter((item) => {
      if (selectedYear !== 'all' && item.year && item.year !== parseInt(selectedYear, 10)) return false;
      if (selectedMode !== 'all') {
        if (selectedMode === 'car' && item.mode !== 'car' && item.mode !== 'vehicle') return false;
        if (selectedMode !== 'car' && item.mode !== selectedMode) return false;
      }
      if (severityFilter === 'fatal' && item.severity !== 'fatal') return false;
      if (severityFilter === 'severe' && item.severity !== 'severe_injury' && item.severity !== 'fatal') return false;
      if (timeFilter === 'night' && item.timeOfDay !== 'night' && item.timeOfDay !== 'dusk') return false;
      if (timeFilter === 'commute' && item.timeOfDay !== 'commute_morning' && item.timeOfDay !== 'commute_evening') return false;
      if (selectedRoadType !== 'all') {
        if (selectedRoadType === 'surface' && (item.roadType === 'freeway' || item.isFreeway)) return false;
        if (selectedRoadType === 'freeway' && item.roadType !== 'freeway' && !item.isFreeway) return false;
      }
      return true;
    });

    return {
      totalCount: list.length,
      fatalCount: list.filter((i) => i.severity === 'fatal').length,
    };
  }, [activeIncidents, selectedYear, selectedMode, severityFilter, timeFilter, selectedRoadType]);

  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#07090e]/95 backdrop-blur-xl border-b border-neutral-800/80 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all flex items-center gap-1 text-xs font-semibold"
              title="Return to Home"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07090e] animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base md:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                    California Crash Radar <span className="text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Mapbox GL</span>
                  </h1>
                </div>
                <p className="text-[11px] text-neutral-400 hidden sm:block">
                  100% Official California Highway Patrol CCRS records from data.ca.gov (2016–2026)
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS: ANNUAL CSV IMPORTER & PORTAL LINK */}
          <div className="flex items-center gap-2 text-xs">
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <span>data.ca.gov/dataset/ccrs</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>

            <button
              onClick={() => setShowImporterModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              <span>Download & Import CSVs</span>
              {customImportedRecords.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-neutral-950 text-[10px] font-black">
                  +{customImportedRecords.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ANNUAL CSV IMPORTER MODAL */}
      {showImporterModal && (
        <SwitrsImporter
          onImportSuccess={(records) => {
            setCustomImportedRecords((prev) => [...records, ...prev]);
          }}
          onClose={() => setShowImporterModal(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 flex flex-col gap-4">
        {/* BANNER: ANGELES NATIONAL FOREST CORRIDORS */}
        {selectedCityId === 'angeles-forest' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-neutral-900 to-neutral-950 border border-emerald-500/40 text-xs shadow-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌲</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">Angeles National Forest Canyon Safety Radar</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    5,103 Total Crashes • 1,211 Motorcycles • 130 Fatalities
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Extracted from official CHP CCRS records covering SR-2 (Angeles Crest), SR-39 (San Gabriel Canyon), Glendora Mountain Rd (GMR), and Big Tujunga.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setForestScope('riders');
                  fetchAngelesForestData('riders');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  forestScope === 'riders'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                🏍️ Rider & Fatal (1,333)
              </button>
              <button
                onClick={() => {
                  setForestScope('all');
                  fetchAngelesForestData('all');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  forestScope === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                🚗 All 5,103 Canyon Crashes
              </button>
            </div>
          </div>
        )}

        {/* BANNER: MALIBU & SANTA MONICA CANYONS */}
        {selectedCityId === 'malibu-canyons' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-teal-950/50 via-neutral-900 to-neutral-950 border border-teal-500/40 text-xs shadow-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌊</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">Malibu & Santa Monica Canyons Safety Radar</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                    896 Official CCRS Incidents • PCH & Canyon Passes
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  100% official California Crash Reporting System (CCRS) records across Pacific Coast Hwy (SR-1), Mulholland Hwy (The Snake), Decker Canyon (SR-23), Latigo Canyon, and Kanan Dume.
                </p>
              </div>
            </div>
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>data.ca.gov/dataset/ccrs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* BANNER: ORANGE COUNTY (OC) */}
        {selectedCityId === 'orange-county' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-950/50 via-neutral-900 to-neutral-950 border border-orange-500/40 text-xs shadow-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🍊</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">Orange County (OC) Rider Safety Radar</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">
                    1,094 Official CCRS Records • Ortega & Santiago Canyons
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Statewide CHP CCRS records for County 30: Ortega Highway (SR-74), Santiago Canyon Road (Cook's Corner), coastal Pacific Coast Highway (Laguna/Newport/HB), and Carbon Canyon.
                </p>
              </div>
            </div>
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>data.ca.gov/dataset/ccrs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* BANNER: LOS ANGELES METRO COUNTY */}
        {selectedCityId === 'los-angeles' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-950/50 via-neutral-900 to-neutral-950 border border-blue-500/40 text-xs shadow-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏙️</span>
              <div>
                <span className="font-bold text-white block">Los Angeles Metro, Culver City & Hollywood Arterials</span>
                <span className="text-neutral-400 text-[11px]">
                  {totalCount.toLocaleString()} verified CHP CCRS collision records covering Culver City, Hollywood, DTLA, Venice Blvd, Washington Blvd, and Sunset Blvd.
                </span>
              </div>
            </div>
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>data.ca.gov/dataset/ccrs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* MAPBOX INTERACTIVE CONTROLS */}
        <MapboxFilterBar
          currentCity={currentCity}
          onSelectCity={(id) => {
            setSelectedCityId(id);
            setSelectedIncidentId(null);
          }}
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          severityFilter={severityFilter}
          onSelectSeverity={setSeverityFilter}
          timeFilter={timeFilter}
          onSelectTime={setTimeFilter}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          is3DMode={is3DMode}
          onToggle3D={() => setIs3DMode((prev) => !prev)}
          showSafetyRegions={showSafetyRegions}
          onToggleSafetyRegions={() => setShowSafetyRegions((prev) => !prev)}
          totalCount={totalCount}
          fatalCount={fatalCount}
          cities={californiaCities}
          selectedRoadType={selectedRoadType}
          onSelectRoadType={setSelectedRoadType}
          showBikeLanes={showBikeLanes}
          onToggleBikeLanes={() => setShowBikeLanes((prev) => !prev)}
        />

        {/* MAPBOX GL WORKSPACE */}
        <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl relative">
          <MapboxRiderMap
            city={currentCity}
            incidents={activeIncidents}
            selectedMode={selectedMode}
            selectedRoadType={selectedRoadType}
            severityFilter={severityFilter}
            timeFilter={timeFilter}
            selectedYear={selectedYear}
            is3DMode={is3DMode}
            showSafetyRegions={showSafetyRegions}
            showBikeLanes={showBikeLanes}
            onSelectIncident={(id) => setSelectedIncidentId(id)}
            onCityChange={(cityId) => setSelectedCityId(cityId)}
          />
        </div>

        {/* CANYON & STREET DEFENSE BRIEFING */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <span className="text-base">🏍️</span>
              <span>Canyon Cornering Protocols</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              On SR-2 and GMR, 80%+ of single-rider fatalities occur from entry-speed panic and looking at the guardrail. Always look through the blind turn to where you want the vehicle to go, maintain light trail-braking, and never cross the double-yellow.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <span className="text-base">⚠️</span>
              <span>SMIDSY / Left-Turn Failure</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              California Vehicle Code 21801 violations are the leading cause of urban multi-vehicle rider fatalities. Approaching oncoming vehicles misjudge single-headlight closing speeds. Perform a subtle lane weave (SMIDSY maneuver) to generate optical motion contrast.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <span className="text-base">📊</span>
              <span>100% State Data Integrity</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              All coordinates, CVC violation numbers, and crash mechanisms are parsed directly from official California Crash Reporting System (CCRS) and CHP SWITRS annual datasets published on <a href="https://data.ca.gov/dataset/ccrs" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">data.ca.gov</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
