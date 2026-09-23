'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Crosshair, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  EyeOff, 
  RotateCw, 
  Zap, 
  Gauge, 
  Compass, 
  BarChart2, 
  Info,
  CheckCircle,
  MapPin,
  CornerDownRight
} from 'lucide-react';
import { SURVIVAL_TIPS } from '../../data/incidentsData';

export default function SafetyDrawer({
  city,
  selectedMode,
  onFlyToIncident,
  isCollapsed,
  onToggleCollapse
}) {
  const [activeTab, setActiveTab] = useState('corridors'); // 'corridors' | 'rules' | 'tips'

  const iconMap = {
    AlertTriangle: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    Shield: <Shield className="w-4 h-4 text-emerald-400" />,
    RotateCw: <RotateCw className="w-4 h-4 text-cyan-400" />,
    Zap: <Zap className="w-4 h-4 text-yellow-400" />,
    EyeOff: <EyeOff className="w-4 h-4 text-rose-400" />,
    Gauge: <Gauge className="w-4 h-4 text-orange-400" />,
    Compass: <Compass className="w-4 h-4 text-purple-400" />,
    Crosshair: <Crosshair className="w-4 h-4 text-red-400" />,
  };

  const modeTipsKey = selectedMode === 'motorcycle' ? 'motorcycle' : 'bicycle';
  const tips = SURVIVAL_TIPS[modeTipsKey] || SURVIVAL_TIPS.bicycle;

  return (
    <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden">
      {/* Drawer Header */}
      <div 
        onClick={onToggleCollapse}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-800/40 transition-colors border-b border-neutral-800/80"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              City Street Intelligence
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-normal">
                {city.name.split(',')[0]}
              </span>
            </h3>
            <p className="text-[11px] text-neutral-400">
              Corridor Hazard Records & Street Decision Tactics
            </p>
          </div>
        </div>

        <button className="text-neutral-400 hover:text-white p-1 rounded-lg">
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col">
          {/* Sub Navigation Tabs */}
          <div className="flex items-center border-b border-neutral-800 text-xs px-4 bg-neutral-950/50">
            <button
              onClick={() => setActiveTab('corridors')}
              className={`py-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'corridors'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Deadly Corridors
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> How to Pick Streets
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`py-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'tips'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-amber-400" /> Rider Defense Guide
            </button>
          </div>

          {/* TAB 1: Deadly Corridors */}
          {activeTab === 'corridors' && (
            <div className="p-4 flex flex-col gap-2.5 max-h-[380px] overflow-y-auto scrollbar-thin">
              <div className="text-[11px] text-neutral-400 mb-1">
                Highest fatality streets in {city.name}. Click any corridor to focus on map:
              </div>

              {city.corridors?.map((corridor, idx) => (
                <div 
                  key={idx}
                  onClick={() => onFlyToIncident(corridor.path[0])}
                  className="group p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-cyan-500/60 transition-all cursor-pointer flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {corridor.name}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      corridor.riskLevel === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {corridor.riskLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 pl-6">
                    <span className="text-rose-400 font-bold">{corridor.fatalities} Fatalities</span>
                    <span>•</span>
                    <span>{corridor.crashes} Severe Crashes</span>
                  </div>

                  <div className="text-[11px] text-neutral-400 pl-6 flex items-center gap-1 text-neutral-300 italic">
                    <CornerDownRight className="w-3 h-3 text-neutral-500 shrink-0" />
                    Conflict: {corridor.dominantConflict}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: How to Pick Streets (Rider Decision Tactics in Unfamiliar Areas) */}
          {activeTab === 'rules' && (
            <div className="p-4 flex flex-col gap-3 max-h-[380px] overflow-y-auto scrollbar-thin text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> 1. The Parallel Street Rule
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  When you don’t know an area, <strong>never take major multi-lane commercial avenues</strong> (35+ mph). Identify parallel residential streets 1 or 2 blocks away. Traffic volume drops by over 80%, reducing crash risk drastically.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> 2. Faded &quot;Door-Zone&quot; Paint vs. Separated Space
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  A painted bike line squeezed between parked SUVs and 40 mph traffic is statistically more dangerous than taking the full lane on a calmed residential street. If a street has high turnover parking, take an alternate street.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> 3. Freeway On-Ramps & Highway Slip Lanes
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Streets approaching freeway feeder ramps (e.g. Figueroa near 110, Queens Blvd service roads, Lamar feeder roads) suffer frequent right-hook and blind-merge fatalities. Avoid arterial segments with freeway ramps.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Rider Defense Tactics */}
          {activeTab === 'tips' && (
            <div className="p-4 flex flex-col gap-3 max-h-[380px] overflow-y-auto scrollbar-thin">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-neutral-400">
                  Defensive survival for <span className="text-white font-bold capitalize">{selectedMode === 'all' ? 'Bicycle & Motorcycle' : selectedMode}</span> riders:
                </span>
              </div>

              {tips.map((tip, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 transition-all"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                    {iconMap[tip.icon] || <Shield className="w-4 h-4 text-emerald-400" />}
                    {tip.title}
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed pl-6">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
