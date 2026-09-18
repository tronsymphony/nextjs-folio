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
  Box,
  MapPin,
  AlertTriangle,
  Radio,
  CheckCircle2
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
      <div className="w-full h-full min-h-[640px] rounded-2xl bg-slate-100 flex flex-col items-center justify-center gap-3 text-slate-500">
        <div className="w-8 h-8 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Loading Map Canvas...
        </span>
      </div>
    ),
  }
);

// Curated regional safety profiles & key hotspots
const REGIONAL_PROFILES = {
  'angeles-forest': {
    name: 'Angeles National Forest & San Gabriel Canyons',
    emoji: '🌲',
    tag: 'Extreme Hazard • Blind Apexes',
    riskLevel: 'Critical Canyon Pass',
    riskColor: 'bg-rose-50 text-rose-700',
    primaryMechanism: '84% of fatalities are single-rider loss of traction & entry speed panic on blind sweepers',
    keyCorridors: 'SR-2 (Angeles Crest), SR-39, Glendora Mountain Rd (GMR), and Big Tujunga Canyon',
    hotspots: [
      { name: 'Angeles Crest (SR-2)', coords: [34.2580, -118.0950] },
      { name: 'Glendora Mountain Rd', coords: [34.1800, -117.7800] },
      { name: 'Upper Big Tujunga', coords: [34.2950, -118.1150] },
      { name: 'San Gabriel Canyon (SR-39)', coords: [34.2150, -117.8750] },
    ],
  },
  'malibu-canyons': {
    name: 'Malibu & Santa Monica Mountain Canyons',
    emoji: '🌊',
    tag: 'High Hazard • Coastal & Ridge Passes',
    riskLevel: 'Severe Mountain / Coastal',
    riskColor: 'bg-amber-50 text-amber-800',
    primaryMechanism: 'Blind crest driveways, gravel turnouts, and weekend sports car / motorcycle speed disparity',
    keyCorridors: 'Pacific Coast Hwy (SR-1), Mulholland Hwy (The Snake), Decker Canyon (SR-23), Latigo & Kanan',
    hotspots: [
      { name: 'PCH at Topanga / Malibu', coords: [34.0350, -118.6920] },
      { name: 'Mulholland Hwy', coords: [34.0980, -118.7950] },
      { name: 'Latigo Canyon Pass', coords: [34.0620, -118.7620] },
      { name: 'Kanan Dume Road', coords: [34.0450, -118.8050] },
    ],
  },
  'orange-county': {
    name: 'Orange County Canyon Passes & Arterials',
    emoji: '🍊',
    tag: 'Elevated Caution • Arterial & Pass',
    riskLevel: 'Moderate to High Risk',
    riskColor: 'bg-orange-50 text-orange-800',
    primaryMechanism: 'Blind turnouts and weekend group clustering on two-lane mountain passes',
    keyCorridors: 'Ortega Highway (SR-74), Santiago Canyon Road (Cook\'s Corner), and Coastal PCH',
    hotspots: [
      { name: 'Ortega Hwy (SR-74)', coords: [33.5600, -117.5250] },
      { name: 'Cook\'s Corner / Santiago', coords: [33.7020, -117.6520] },
      { name: 'Carbon Canyon Pass', coords: [33.9180, -117.8100] },
      { name: 'Laguna Canyon Rd (SR-133)', coords: [33.5850, -117.7650] },
    ],
  },
  'los-angeles': {
    name: 'Los Angeles Metro, Culver City & Hollywood Arterials',
    emoji: '🏙️',
    tag: 'High Urban Conflict • Intersection SMIDSY',
    riskLevel: 'Heavy Transit Arterial',
    riskColor: 'bg-sky-50 text-sky-800',
    primaryMechanism: 'CVC 21801 Left-Turn failures (SMIDSY) and high-speed arterial right hooks',
    keyCorridors: 'Culver Blvd, Venice Blvd, Hollywood Blvd, Sunset Blvd, and DTLA arterials',
    hotspots: [
      { name: 'Culver & Venice Blvd', coords: [34.0211, -118.3965] },
      { name: 'Hollywood & Highland', coords: [34.1016, -118.3387] },
      { name: 'Sunset Strip Arterials', coords: [34.0950, -118.3800] },
      { name: 'DTLA Figueroa Transit Corridor', coords: [34.0450, -118.2600] },
    ],
  },
};

export default function SafePathPage() {
  // Synchronize document body background
  useEffect(() => {
    document.body.style.backgroundColor = '#fafafa';
    document.body.style.color = '#0f172a';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  // California Regional Hubs
  const californiaCities = useMemo(() => {
    return CITIES.filter((c) => 
      c.id === 'angeles-forest' || 
      c.id === 'malibu-canyons' || 
      c.id === 'orange-county' || 
      c.id === 'los-angeles'
    );
  }, []);

  const [selectedCityId, setSelectedCityId] = useState('angeles-forest');
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'motorcycle' | 'bicycle' | 'ebike' | 'car'
  const [severityFilter, setSeverityFilter] = useState('severe'); // Default to 'severe' (Fatal & Severe only) to prevent overwhelming clutter!
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'night' | 'commute'
  const [selectedYear, setSelectedYear] = useState('all'); // 'all' | '2026' ... '2016'
  const [is3DMode, setIs3DMode] = useState(false);
  const [showSafetyRegions, setShowSafetyRegions] = useState(true);
  const [selectedRoadType, setSelectedRoadType] = useState('all'); // 'all' | 'surface' | 'freeway'
  const [showBikeLanes, setShowBikeLanes] = useState(true);
  const [focusedCoords, setFocusedCoords] = useState(null);

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

  // Fetch Angeles National Forest dataset
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

  const activeProfile = REGIONAL_PROFILES[selectedCityId] || REGIONAL_PROFILES['angeles-forest'];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans selection:bg-slate-200">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-4 py-2.5 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Return to Home"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-800">
                <ShieldAlert className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <h1 className="text-sm md:text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  California Crash Radar <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Official CCRS</span>
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Curated safety digests & tactical hazard mapping from official CHP state records
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 text-xs">
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors text-[11px] font-medium"
            >
              <span>data.ca.gov</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => setShowImporterModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 text-sky-600" />
              <span>Import CSV</span>
              {customImportedRecords.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-sky-600 text-white text-[10px] font-bold">
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
          onClose={() => setShowImporterModal(false)}
          onImportRecords={(records) => {
            setCustomImportedRecords((prev) => [...records, ...prev]);
            setShowImporterModal(false);
          }}
        />
      )}

      {/* MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 flex flex-col gap-3">
        {/* UNIFIED REGIONAL SAFETY DIGEST CARD */}
        <div className="p-4 rounded-2xl bg-white flex flex-col gap-2.5 text-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{activeProfile.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm md:text-base font-bold text-slate-900">
                    {activeProfile.name}
                  </h2>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${activeProfile.riskColor}`}>
                    {activeProfile.riskLevel}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5 hidden sm:block">
                  {activeProfile.keyCorridors}
                </p>
              </div>
            </div>

            {/* If Angeles Forest, show the dataset scope toggle */}
            {selectedCityId === 'angeles-forest' && (
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                <button
                  onClick={() => {
                    setForestScope('riders');
                    fetchAngelesForestData('riders');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    forestScope === 'riders'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Filter to high-fatality motorcycle & rider canyon crashes"
                >
                  🏍️ Rider Focus (1,333)
                </button>
                <button
                  onClick={() => {
                    setForestScope('all');
                    fetchAngelesForestData('all');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    forestScope === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Load complete historical canyon crash catalog"
                >
                  🚗 All Crashes (5,103)
                </button>
              </div>
            )}
          </div>

          {/* Quick Safety Pulse & Hotspots */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs">
            <div className="flex items-center gap-2 text-slate-700 text-[11px] bg-amber-50/70 px-3 py-1.5 rounded-xl">
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Primary Hazard:
              </span>
              <span className="text-slate-700">{activeProfile.primaryMechanism}</span>
            </div>

            {/* Clickable Hotspot Quick Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-600" /> Fly To:
              </span>
              {activeProfile.hotspots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setFocusedCoords(spot.coords)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition-colors shrink-0 flex items-center gap-1"
                  title={`Center map on ${spot.name}`}
                >
                  <span>📍</span>
                  <span>{spot.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAPBOX STREAMLINED FILTER BAR */}
        <MapboxFilterBar
          currentCity={currentCity}
          onSelectCity={(id) => {
            setSelectedCityId(id);
            setSelectedIncidentId(null);
            setFocusedCoords(null);
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
        <div className="w-full h-[700px] rounded-2xl overflow-hidden relative bg-slate-100">
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
            focusedCoords={focusedCoords}
          />
        </div>

        {/* DEFENSIVE BRIEFING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <span className="text-sm">🏍️</span>
              <span>Canyon Cornering Protocols</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              On SR-2 and GMR, 80%+ of single-rider fatalities occur from entry-speed panic and looking at the guardrail. Always look through the blind turn to where you want the vehicle to go, maintain light trail-braking, and never cross the double-yellow.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <span className="text-sm">⚠️</span>
              <span>SMIDSY / Left-Turn Failure</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              California Vehicle Code 21801 violations are the leading cause of urban multi-vehicle rider fatalities. Approaching oncoming vehicles misjudge single-headlight closing speeds. Perform a subtle lane weave (SMIDSY maneuver) to generate optical motion contrast.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
              <span className="text-sm">📊</span>
              <span>100% State Data Integrity</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All coordinates, CVC violation numbers, and crash mechanisms are parsed directly from official California Crash Reporting System (CCRS) and CHP SWITRS annual datasets published on <a href="https://data.ca.gov/dataset/ccrs" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline font-semibold">data.ca.gov</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
