'use client';

import React from 'react';
import { 
  Bike, 
  MapPin, 
  ShieldAlert, 
  Layers, 
  Skull, 
  Flame,
  Radio
} from 'lucide-react';
import { CITIES } from '../../data/incidentsData';

export default function MapFilterBar({
  currentCity,
  onSelectCity,
  selectedMode,
  onSelectMode,
  severityFilter,
  onSelectSeverity,
  timeFilter,
  onSelectTime,
  showHIN,
  onToggleHIN,
  totalFilteredCount,
  fatalFilteredCount,
  selectedYear = 'all',
  onSelectYear
}) {
  const YEARS = ['all', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  return (
    <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-3 md:p-4 shadow-2xl flex flex-col gap-3">
      {/* ROW 1: City Hubs & Live Fatal Hazard Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* City Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> City Hub:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCity(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  currentCity.id === c.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent'
                }`}
              >
                {c.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Incident Metric Counters */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
            <Skull className="w-3.5 h-3.5" />
            <span className="font-bold">{fatalFilteredCount}</span> Fatalities Logged
          </span>
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{totalFilteredCount}</span> Crash Hotspots
          </span>
        </div>
      </div>

      <div className="h-px bg-neutral-800/80 w-full" />

      {/* ROW 2: Commuter Vehicle Mode & Severity Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-950/60 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => onSelectMode('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Riders
          </button>
          <button
            onClick={() => onSelectMode('bicycle')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'bicycle'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            🚲 Bicycle
          </button>
          <button
            onClick={() => onSelectMode('motorcycle')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'motorcycle'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            🏍️ Motorcycle
          </button>
          <button
            onClick={() => onSelectMode('ebike')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'ebike'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            ⚡ E-Bike
          </button>
        </div>

        {/* Severity, Time & Corridor Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Severity toggle */}
          <div className="flex items-center gap-1 text-xs bg-neutral-950/60 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => onSelectSeverity('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                severityFilter === 'all' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Severities
            </button>
            <button
              onClick={() => onSelectSeverity('fatal')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                severityFilter === 'fatal' ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Fatal Only
            </button>
            <button
              onClick={() => onSelectSeverity('severe')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                severityFilter === 'severe' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Severe +
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-1 text-xs bg-neutral-950/60 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => onSelectTime('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Hours
            </button>
            <button
              onClick={() => onSelectTime('night')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'night' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-neutral-400 hover:text-white'
              }`}
            >
              🌙 Night / Dusk
            </button>
            <button
              onClick={() => onSelectTime('commute')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeFilter === 'commute' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' : 'text-neutral-400 hover:text-white'
              }`}
            >
              🚦 Rush Hours
            </button>
          </div>

          {/* Danger Corridors toggle */}
          <button
            onClick={onToggleHIN}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              showHIN
                ? 'bg-rose-950/50 text-rose-300 border-rose-600/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                : 'bg-neutral-800/40 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Danger Arterials ({currentCity.corridors?.length || 0})
          </button>
        </div>
      </div>

      {/* ROW 3: SWITRS / CCRS Historical Crash Year Selection (2016-2025) */}
      {onSelectYear && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-800/60">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            <span>📅</span>
            <span>CHP Crash Year:</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none flex-1">
            {YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => onSelectYear(yr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                  selectedYear === yr
                    ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'bg-neutral-950/40 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/60'
                }`}
              >
                {yr === 'all' ? 'All (2016–2025)' : yr}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
