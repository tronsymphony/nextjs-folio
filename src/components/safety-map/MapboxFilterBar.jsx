'use client';

import React, { useState } from 'react';
import { 
  Bike, 
  Flame, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  Box, 
  Layers, 
  Compass,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export default function MapboxFilterBar({
  currentCity,
  onSelectCity,
  selectedMode = 'all',
  onSelectMode,
  severityFilter = 'all',
  onSelectSeverity,
  timeFilter = 'all',
  onSelectTime,
  selectedYear = 'all',
  onSelectYear,
  is3DMode = false,
  onToggle3D,
  showSafetyRegions = true,
  onToggleSafetyRegions,
  totalCount = 0,
  fatalCount = 0,
  cities = [],
  selectedRoadType = 'all',
  onSelectRoadType = null,
  showBikeLanes = true,
  onToggleBikeLanes = null
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

  // Count active non-default filters
  const activeCustomFilters = [
    selectedMode !== 'all',
    severityFilter !== 'all',
    timeFilter !== 'all',
    selectedYear !== 'all',
    selectedRoadType !== 'all',
  ].filter(Boolean).length;

  // Curated Preset Handlers
  const applyPreset = (preset) => {
    if (preset === 'critical') {
      onSelectSeverity('severe');
      onSelectMode('all');
      if (onSelectRoadType) onSelectRoadType('all');
      onSelectTime('all');
    } else if (preset === 'motorcycle') {
      onSelectMode('motorcycle');
      onSelectSeverity('all');
      if (onSelectRoadType) onSelectRoadType('all');
      onSelectTime('all');
    } else if (preset === 'bicycle') {
      onSelectMode('bicycle');
      onSelectSeverity('all');
      if (onToggleBikeLanes && !showBikeLanes) onToggleBikeLanes();
    } else if (preset === 'all') {
      onSelectMode('all');
      onSelectSeverity('all');
      if (onSelectRoadType) onSelectRoadType('all');
      onSelectTime('all');
      onSelectYear('all');
    }
  };

  const isPresetCritical = severityFilter === 'severe' && selectedMode === 'all';
  const isPresetRider = selectedMode === 'motorcycle' && severityFilter === 'all';
  const isPresetBike = selectedMode === 'bicycle';
  const isPresetAll = selectedMode === 'all' && severityFilter === 'all' && selectedRoadType === 'all' && timeFilter === 'all' && selectedYear === 'all';

  const resetAllFilters = () => {
    onSelectMode('all');
    onSelectSeverity('all');
    if (onSelectRoadType) onSelectRoadType('all');
    onSelectTime('all');
    onSelectYear('all');
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-2xl text-xs text-slate-800">
      {/* ROW 1: REGION SELECTOR & STATUS DIGEST */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* California Regional Hubs Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-sky-600" /> Region:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
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
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all text-xs flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span>{icon}</span>
                  <span>{city.name.replace(', CA', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GLANCEABLE STATS & ADVANCED CONTROLS TOGGLE */}
        <div className="flex items-center gap-2">
          {/* Fatal Count Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{fatalCount.toLocaleString()} Fatal</span>
          </div>

          {/* Total Incidents Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>{totalCount.toLocaleString()} Incidents</span>
          </div>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setIsAdvancedOpen((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 ${
              isAdvancedOpen || activeCustomFilters > 0
                ? 'bg-slate-200 text-slate-900 font-bold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
            <span>Filters</span>
            {activeCustomFilters > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-sky-600 text-white font-bold text-[10px]">
                {activeCustomFilters}
              </span>
            )}
            {isAdvancedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ROW 2: PURPOSE-DRIVEN QUICK PRESETS & ESSENTIAL LAYER TOGGLES */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
        {/* Curated Presets Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> View:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl shrink-0">
            <button
              onClick={() => applyPreset('critical')}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                isPresetCritical
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Focus exclusively on fatal and severe injury collision zones"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Critical Hotspots</span>
            </button>

            <button
              onClick={() => applyPreset('motorcycle')}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                isPresetRider
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏍️</span>
              <span>Canyon Riders</span>
            </button>

            <button
              onClick={() => applyPreset('bicycle')}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                isPresetBike
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚲</span>
              <span>Cycling & Lanes</span>
            </button>

            <button
              onClick={() => applyPreset('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all text-xs flex items-center gap-1 ${
                isPresetAll
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚗</span>
              <span>All Traffic</span>
            </button>
          </div>
        </div>

        {/* Essential Layer Quick Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSafetyRegions}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 ${
              showSafetyRegions
                ? 'bg-amber-100/70 text-amber-900 font-semibold'
                : 'bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>{showSafetyRegions ? 'Hazard Zones' : 'Zones: Off'}</span>
          </button>

          {onToggleBikeLanes && (
            <button
              onClick={onToggleBikeLanes}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 ${
                showBikeLanes
                  ? 'bg-emerald-100/70 text-emerald-900 font-semibold'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-emerald-600" />
              <span>{showBikeLanes ? 'Bike Lanes' : 'Lanes: Off'}</span>
            </button>
          )}

          <button
            onClick={onToggle3D}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all text-xs flex items-center gap-1.5 ${
              is3DMode
                ? 'bg-sky-100/70 text-sky-900 font-semibold'
                : 'bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-sky-600" />
            <span>{is3DMode ? '3D Tilt' : '2D Flat'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE ADVANCED FILTER DRAWER */}
      {isAdvancedOpen && (
        <div className="pt-2.5 mt-1 bg-slate-50 p-3 rounded-xl flex flex-col gap-2.5 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-slate-600 text-[11px] font-bold flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
              <span>Granular Filters & State Datasets:</span>
            </div>
            {activeCustomFilters > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-slate-500 hover:text-sky-700 text-[11px] flex items-center gap-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to All</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* 1. Mode Selector */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Mode</span>
              <div className="flex items-center gap-0.5 bg-slate-200/60 p-0.5 rounded-lg">
                {[
                  { id: 'all', label: 'All', emoji: '👥' },
                  { id: 'car', label: 'Cars', emoji: '🚗' },
                  { id: 'motorcycle', label: 'Moto', emoji: '🏍️' },
                  { id: 'bicycle', label: 'Bike', emoji: '🚲' },
                  { id: 'ebike', label: 'E-Bike', emoji: '⚡' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onSelectMode(m.id)}
                    className={`flex-1 py-1 rounded-md font-medium transition-all text-[11px] flex items-center justify-center gap-1 ${
                      selectedMode === m.id
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span className="hidden lg:inline">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Roadway Type */}
            {onSelectRoadType && (
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Roadway</span>
                <div className="flex items-center gap-0.5 bg-slate-200/60 p-0.5 rounded-lg">
                  {[
                    { id: 'all', label: 'All Roads' },
                    { id: 'surface', label: 'Surface Streets' },
                    { id: 'freeway', label: 'Freeways' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onSelectRoadType(r.id)}
                      className={`flex-1 py-1 rounded-md font-medium transition-all text-[11px] ${
                        selectedRoadType === r.id
                          ? 'bg-white text-slate-900 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Severity Level */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Severity</span>
              <div className="flex items-center gap-0.5 bg-slate-200/60 p-0.5 rounded-lg">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'fatal', label: 'Fatal', dot: 'bg-rose-500' },
                  { id: 'severe', label: 'Severe +', dot: 'bg-orange-500' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectSeverity(s.id)}
                    className={`flex-1 py-1 rounded-md font-medium transition-all text-[11px] flex items-center justify-center gap-1 ${
                      severityFilter === s.id
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.dot && <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>}
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Time of Day */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Time</span>
              <div className="flex items-center gap-0.5 bg-slate-200/60 p-0.5 rounded-lg">
                {[
                  { id: 'all', label: 'All Hours' },
                  { id: 'night', label: 'Night/Dusk', icon: '🌙' },
                  { id: 'commute', label: 'Rush Hours', icon: '🚦' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTime(t.id)}
                    className={`flex-1 py-1 rounded-md font-medium transition-all text-[11px] flex items-center justify-center gap-1 ${
                      timeFilter === t.id
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.icon && <span>{t.icon}</span>}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Annual State CCRS Year Selector */}
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Year:
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {years.map((y) => (
                <button
                  key={y.id}
                  onClick={() => onSelectYear(y.id)}
                  className={`px-2.5 py-0.5 rounded-lg font-medium text-[11px] transition-all shrink-0 ${
                    selectedYear === y.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-200/70 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
