'use client';

import React from 'react';
import { 
  Bike, 
  Flame, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  Box, 
  Layers, 
  Check, 
  Compass 
} from 'lucide-react';

export default function MapboxFilterBar({
  currentCity,
  onSelectCity,
  selectedMode,
  onSelectMode,
  severityFilter,
  onSelectSeverity,
  timeFilter,
  onSelectTime,
  selectedYear,
  onSelectYear,
  is3DMode,
  onToggle3D,
  showSafetyRegions = true,
  onToggleSafetyRegions,
  totalCount,
  fatalCount,
  cities = [],
  selectedRoadType = 'all',
  onSelectRoadType = null,
  showBikeLanes = true,
  onToggleBikeLanes = null
}) {
  const years = [
    { id: 'all', label: 'All (2016–2026)' },
    { id: '2026', label: '2026' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: '2020', label: '2020' },
    { id: '2019', label: '2019' },
    { id: '2018', label: '2018' },
    { id: '2017', label: '2017' },
    { id: '2016', label: '2016' },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 bg-[#090d16]/95 backdrop-blur-xl border border-neutral-800/90 rounded-2xl shadow-2xl text-xs">
      {/* ROW 1: REGION SELECTOR & REAL-TIME STATS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> California Region:
          </span>
          <div className="flex items-center gap-1.5">
            {cities.map((city) => {
              const active = currentCity?.id === city.id;
              const icon = 
                city.id === 'angeles-forest' ? '🌲' :
                city.id === 'malibu-canyons' ? '🌊' :
                city.id === 'orange-county' ? '🍊' : '🏙️';
              return (
                <button
                  key={city.id}
                  onClick={() => onSelectCity(city.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span>{icon}</span>
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STATS & 3D TILT BUTTON */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>{fatalCount} Fatalities</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalCount} CCRS Crashes</span>
          </div>

          {/* Hazard Zones Toggle (Yellow & Red Areas) */}
          <button
            onClick={onToggleSafetyRegions}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 border ${
              showSafetyRegions
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-800'
            }`}
            title="Toggle Yellow (Caution) and Red (Danger) Accident Zones"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{showSafetyRegions ? 'Hazard Zones: ON' : 'Hazard Zones: OFF'}</span>
          </button>

          {/* Dedicated Bike Lanes Toggle */}
          {onToggleBikeLanes && (
            <button
              onClick={onToggleBikeLanes}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 border ${
                showBikeLanes
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-800'
              }`}
              title="Toggle Dedicated Bike Paths and On-Street Cycle Lanes"
            >
              <Bike className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showBikeLanes ? '🚲 Bike Lanes: ON' : '🚲 Bike Lanes: OFF'}</span>
            </button>
          )}

          {/* 3D Terrain Pitch Toggle */}
          <button
            onClick={onToggle3D}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 border ${
              is3DMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-800'
            }`}
            title="Toggle Mapbox 3D Camera Pitch & Elevation"
          >
            <Box className="w-3.5 h-3.5 text-amber-400" />
            <span>{is3DMode ? '3D Canyon Tilt' : '2D Flat'}</span>
          </button>
        </div>
      </div>

      {/* ROW 2: FILTERS (MODE, SEVERITY, TIME OF DAY) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
          {[
            { id: 'all', label: 'All Modes', emoji: '👥' },
            { id: 'car', label: 'Cars & Autos', emoji: '🚗' },
            { id: 'motorcycle', label: 'Motorcycle', emoji: '🏍️' },
            { id: 'bicycle', label: 'Bicycle', emoji: '🚲' },
            { id: 'ebike', label: 'E-Bike', emoji: '⚡' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                selectedMode === m.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Roadway Type (Surface Streets vs Freeways) */}
        {onSelectRoadType && (
          <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            {[
              { id: 'all', label: 'All Roads', emoji: '🛣️' },
              { id: 'surface', label: 'Surface Streets', emoji: '🏙️' },
              { id: 'freeway', label: 'Freeways Only', emoji: '🚗' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRoadType(r.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                  selectedRoadType === r.id
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={
                  r.id === 'surface'
                    ? 'Focus on city arterials & local intersections (hides freeways)'
                    : r.id === 'freeway'
                    ? 'Show interstate & freeway crashes (I-405, US-101, I-10, etc.)'
                    : 'Show all reported roadway collisions'
                }
              >
                <span>{r.emoji}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Severity */}
        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
          {[
            { id: 'all', label: 'All Severities' },
            { id: 'fatal', label: 'Fatal Only', dot: 'bg-red-500' },
            { id: 'severe', label: 'Severe +', dot: 'bg-orange-500' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSeverity(s.id)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                severityFilter === s.id
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {s.dot && <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Time of Day */}
        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
          {[
            { id: 'all', label: 'All Hours' },
            { id: 'night', label: 'Night / Dusk', icon: '🌙' },
            { id: 'commute', label: 'Rush Hours', icon: '🚦' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTime(t.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all text-xs flex items-center gap-1 ${
                timeFilter === t.id
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.icon && <span>{t.icon}</span>}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ROW 3: CCRS ANNUAL YEAR SELECTOR (2016-2026) */}
      <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80 overflow-x-auto no-scrollbar">
        <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-neutral-400" /> State CCRS Year:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {years.map((y) => (
            <button
              key={y.id}
              onClick={() => onSelectYear(y.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all shrink-0 ${
                selectedYear === y.id
                  ? 'bg-cyan-500 text-neutral-950 font-black shadow-md'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
