'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Skull, 
  Zap, 
  Compass, 
  Maximize2, 
  Minimize2,
  Navigation as NavIcon,
  Info,
  Calendar,
  Clock,
  Car,
  Search,
  Crosshair,
  Radio,
  Layers,
  MapPin
} from 'lucide-react';

export default function RiderSafetyMap({
  city,
  incidents,
  selectedMode,
  severityFilter,
  timeFilter,
  selectedYear = 'all',
  showHIN,
  onSelectIncident,
  selectedIncidentId
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const corridorsGroupRef = useRef(null);
  const userMarkerRef = useRef(null);
  const watchIdRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [activePopupData, setActivePopupData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRideTracking, setIsRideTracking] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHazards, setNearbyHazards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Haversine distance calculator (in miles)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const cityRef = useRef(city);
  cityRef.current = city;

  // Safe client-side Leaflet loader
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined') return;

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!window.L) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const L = window.L;

      const map = L.map(mapContainerRef.current, {
        preferCanvas: true,
        center: cityRef.current?.center || [34.0522, -118.2437],
        zoom: cityRef.current?.zoom || 13,
        zoomControl: false,
        attributionControl: false,
      });

      // High-performance Dark Canvas Basemap (Free, No watermark, Clean night street contrast)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18,
      }).addTo(map);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        attribution: '',
        maxZoom: 18,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      corridorsGroupRef.current = L.layerGroup().addTo(map);
      markersGroupRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    initMap();

    return () => {
      isMounted = false;
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center when city changes
  const { center, zoom } = city || {};
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !center || !zoom) return;
    mapInstanceRef.current.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [center, zoom, mapLoaded]);

  // Center on selected incident if requested externally
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !selectedIncidentId) return;
    const target = incidents.find((i) => i.id === selectedIncidentId);
    if (target) {
      mapInstanceRef.current.flyTo(target.coordinates, 16, { duration: 1.0 });
      setActivePopupData(target);
    }
  }, [selectedIncidentId, incidents, mapLoaded]);

  // Render Dangerous Arterial Corridors (High-Injury Network Street Segments)
  useEffect(() => {
    if (!mapLoaded || !corridorsGroupRef.current || !window.L) return;
    const L = window.L;
    corridorsGroupRef.current.clearLayers();

    if (!showHIN || !city.corridors) return;

    city.corridors.forEach((corridor) => {
      const isCritical = corridor.riskLevel === 'Critical';
      const polylineColor = isCritical ? '#ef4444' : '#f97316';

      // 1. Glow outer line
      const glowLine = L.polyline(corridor.path, {
        color: polylineColor,
        weight: 10,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // 2. Core danger line with dashed stripe
      const coreLine = L.polyline(corridor.path, {
        color: polylineColor,
        weight: 4,
        opacity: 0.95,
        dashArray: '6, 6',
      });

      const tooltipContent = `
        <div style="font-size: 11px; line-height: 1.3;">
          <b style="color: ${polylineColor};">⚠️ ${corridor.riskLevel.toUpperCase()} HAZARD ARTERIAL</b><br/>
          <b>${corridor.name}</b><br/>
          <span>${corridor.fatalities} Fatalities • ${corridor.crashes} Severe Collisions</span><br/>
          <i style="color: #cbd5e1;">Conflict: ${corridor.dominantConflict}</i>
        </div>
      `;

      coreLine.bindTooltip(tooltipContent, {
        sticky: true,
        className: 'corridor-hazard-tooltip',
      });

      corridorsGroupRef.current.addLayer(glowLine);
      corridorsGroupRef.current.addLayer(coreLine);
    });
  }, [mapLoaded, showHIN, city]);

  // Render Incident Markers
  useEffect(() => {
    if (!mapLoaded || !markersGroupRef.current || !window.L) return;
    const L = window.L;
    markersGroupRef.current.clearLayers();

    const filteredIncidents = incidents.filter((item) => {
      const cityMatch = item.city === city.id || 
        (city.id === 'los-angeles' && (item.county === 'Los Angeles' || !item.city || item.city === 'unincorporated'));
      if (!cityMatch) return false;
      if (selectedYear && selectedYear !== 'all' && item.year && item.year !== parseInt(selectedYear, 10)) return false;
      if (selectedMode !== 'all' && item.mode !== selectedMode) return false;
      if (severityFilter === 'fatal' && item.severity !== 'fatal') return false;
      if (severityFilter === 'severe' && item.severity !== 'severe_injury' && item.severity !== 'fatal') return false;
      if (timeFilter === 'night' && item.timeOfDay !== 'night' && item.timeOfDay !== 'dusk') return false;
      if (timeFilter === 'commute' && item.timeOfDay !== 'commute_morning' && item.timeOfDay !== 'commute_evening') return false;
      return true;
    });

    const useCanvas = filteredIncidents.length > 150;
    const canvasRenderer = useCanvas ? L.canvas({ padding: 0.5 }) : null;

    filteredIncidents.forEach((incident) => {
      const isFatal = incident.severity === 'fatal';
      const isSevere = incident.severity === 'severe_injury';

      const primaryColor = isFatal ? '#ef4444' : isSevere ? '#f97316' : '#eab308';
      const glowColor = isFatal
        ? 'rgba(239, 68, 68, 0.55)'
        : isSevere
        ? 'rgba(249, 115, 22, 0.4)'
        : 'rgba(234, 179, 8, 0.3)';
      const modeEmoji = incident.mode === 'bicycle' ? '🚲' : incident.mode === 'motorcycle' ? '🏍️' : incident.mode === 'ebike' ? '⚡' : '🚗';

      if (useCanvas) {
        // High-performance canvas marker for large datasets (60 FPS, 0 DOM bloat)
        const circle = L.circleMarker(incident.coordinates, {
          radius: isFatal ? 6.5 : isSevere ? 5 : 4,
          fillColor: primaryColor,
          color: isFatal ? '#ffffff' : primaryColor,
          weight: isFatal ? 2 : 1,
          opacity: 0.95,
          fillOpacity: 0.85,
          renderer: canvasRenderer,
        });

        circle.on('click', () => {
          setActivePopupData(incident);
          if (onSelectIncident) onSelectIncident(incident.id);
        });

        markersGroupRef.current.addLayer(circle);
      } else {
        // Rich animated HTML pulse icon for focused views
        const customIcon = L.divIcon({
          className: 'custom-rider-marker',
          html: `
            <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
              ${
                isFatal
                  ? `<div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${glowColor}; animation: marker-pulse 1.8s infinite ease-out;"></div>`
                  : ''
              }
              <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #0b0f17; border: 2px solid ${primaryColor}; box-shadow: 0 0 10px ${glowColor}; display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer;">
                <span>${modeEmoji}</span>
              </div>
              ${
                isFatal
                  ? `<span style="position: absolute; top: -2px; right: -2px; width: 9px; height: 9px; border-radius: 50%; background: #ef4444; border: 1.5px solid #000;"></span>`
                  : ''
              }
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker(incident.coordinates, { icon: customIcon });

        marker.on('click', () => {
          setActivePopupData(incident);
          if (onSelectIncident) onSelectIncident(incident.id);
        });

        markersGroupRef.current.addLayer(marker);
      }
    });
  }, [mapLoaded, incidents, city, selectedMode, severityFilter, timeFilter, selectedYear, onSelectIncident]);

  // Live Location & Ride Tracking Toggle
  const toggleRideTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    if (isRideTracking) {
      // Turn off
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsRideTracking(false);
      setNearbyHazards([]);
    } else {
      // Turn on live ride tracker
      setIsRideTracking(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);

          if (mapInstanceRef.current && window.L) {
            const L = window.L;

            if (!userMarkerRef.current) {
              userMarkerRef.current = L.circleMarker([latitude, longitude], {
                radius: 10,
                color: '#38bdf8',
                fillColor: '#0284c7',
                fillOpacity: 1,
                weight: 3,
              }).addTo(mapInstanceRef.current);
              userMarkerRef.current.bindPopup('<b>🚴 You are riding here</b>');
            } else {
              userMarkerRef.current.setLatLng([latitude, longitude]);
            }

            mapInstanceRef.current.flyTo([latitude, longitude], 16, { duration: 1 });
          }

          // Scan for nearest hazards within 1.0 mile
          const closeIncidents = incidents
            .map((inc) => ({
              ...inc,
              distanceMiles: calculateDistance(latitude, longitude, inc.coordinates[0], inc.coordinates[1]),
            }))
            .filter((inc) => inc.distanceMiles <= 1.0)
            .sort((a, b) => a.distanceMiles - b.distanceMiles);

          setNearbyHazards(closeIncidents);
        },
        (err) => {
          setIsRideTracking(false);
          alert('Could not access GPS location. Please check your browser location permissions.');
        },
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
      );
    }
  };

  // Search for streets within the active city
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    const query = searchQuery.toLowerCase();
    const match = incidents.find(
      (inc) => inc.city === city.id && inc.street.toLowerCase().includes(query)
    );

    if (match) {
      mapInstanceRef.current.flyTo(match.coordinates, 17, { duration: 1.2 });
      setActivePopupData(match);
    } else {
      // Check corridors
      const corridorMatch = city.corridors?.find((c) => c.name.toLowerCase().includes(query));
      if (corridorMatch) {
        mapInstanceRef.current.flyTo(corridorMatch.path[0], 15, { duration: 1.2 });
      } else {
        alert(`No historical crash records directly matching "${searchQuery}" in ${city.name.split(',')[0]}. Always ride with caution on unfamiliar streets.`);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!isFullscreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 250);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] rounded-2xl overflow-hidden border border-neutral-800 bg-[#07090e]">
      {/* MAP CANVAS */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[640px] z-0" />

      {/* TOP FLOATING BAR: Quick Street Search & Ride Tracker */}
      <div className="absolute top-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Street Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="pointer-events-auto flex items-center gap-2 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-xl px-3 py-2 shadow-2xl w-full max-w-sm"
        >
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder={`Search street in ${city.name.split(',')[0]} (e.g. Figueroa, Western)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-white placeholder:text-neutral-500 w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-neutral-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </form>

        {/* Live Ride Tracker & Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleRideTracking}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xl backdrop-blur-md border ${
              isRideTracking
                ? 'bg-cyan-500 text-neutral-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse'
                : 'bg-neutral-900/90 text-neutral-200 hover:text-white border-neutral-700 hover:border-cyan-500'
            }`}
          >
            <Radio className={`w-4 h-4 ${isRideTracking ? 'animate-spin' : 'text-cyan-400'}`} />
            <span>{isRideTracking ? 'Tracking Live Ride GPS' : 'Track My Ride GPS'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
            className="p-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 shadow-lg flex items-center justify-center"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* LIVE PROXIMITY HAZARD ALERT (Appears when tracking ride and hazard is within 1 mile) */}
      {isRideTracking && nearbyHazards.length > 0 && (
        <div className="absolute top-18 left-4 right-4 md:right-auto md:max-w-md z-20 bg-rose-950/95 backdrop-blur-xl border border-rose-600/80 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Real-Time Hazard Alert ({nearbyHazards[0].distanceMiles.toFixed(1)} mi away)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
              {nearbyHazards[0].severity === 'fatal' ? 'FATAL ZONE' : 'HIGH INJURY'}
            </span>
          </div>
          <div className="text-sm font-bold text-white mb-1">
            Approaching: {nearbyHazards[0].street}
          </div>
          <p className="text-xs text-rose-200/90 leading-relaxed mb-2">
            ⚠️ <strong>Conflict:</strong> {nearbyHazards[0].collisionType}. {nearbyHazards[0].safetyRecommendation}
          </p>
          <div className="text-[11px] text-neutral-300 bg-black/40 rounded-lg p-2 flex items-center justify-between">
            <span>Riding Tip: Look for parallel calmed side-streets to bypass this junction.</span>
          </div>
        </div>
      )}

      {/* MAP LEGEND (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 p-3.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-2xl max-w-xs text-xs pointer-events-auto">
        <div className="font-bold text-white mb-2 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Street Safety Map Key
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-neutral-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse border border-white/20"></span>
            <span className="text-neutral-200 font-medium">Fatal Crash</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-neutral-200">Severe Injury</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="text-neutral-200">Collision/Dooring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-red-500 rounded border border-red-400"></span>
            <span className="text-rose-300 font-medium">Danger Arterial</span>
          </div>
        </div>
      </div>

      {/* DETAILED INCIDENT INSPECTOR MODAL */}
      {activePopupData && (
        <div className="absolute inset-x-4 bottom-4 md:inset-auto md:top-4 md:left-4 md:max-w-md z-20 bg-neutral-950/95 backdrop-blur-2xl border border-neutral-700/80 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                  activePopupData.severity === 'fatal'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {activePopupData.severity === 'fatal' ? (
                  <>
                    <Skull className="w-3.5 h-3.5" /> Fatal Incident
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" /> Severe Crash
                  </>
                )}
              </span>

              <span className="px-2 py-0.5 rounded-full text-xs bg-neutral-800 text-neutral-300 capitalize font-medium">
                {activePopupData.mode === 'bicycle' ? '🚲 Bicycle' : activePopupData.mode === 'motorcycle' ? '🏍️ Motorcycle' : '⚡ E-Bike'}
              </span>
            </div>

            <button
              onClick={() => setActivePopupData(null)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <h3 className="text-base font-black text-white mb-1">
            {activePopupData.street}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {activePopupData.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {activePopupData.time}
            </span>
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-neutral-500" />
              {activePopupData.vehicleInvolved}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            {activePopupData.caseId && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono font-bold">
                {activePopupData.caseId}
              </span>
            )}
            {activePopupData.source && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                Source: {activePopupData.source}
              </span>
            )}
            {activePopupData.roadSurface && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Surface: {activePopupData.roadSurface}
              </span>
            )}
          </div>

          <div className="bg-neutral-900/80 rounded-xl p-3 border border-neutral-800 mb-3 text-xs text-neutral-300 leading-relaxed">
            <div className="font-bold text-rose-400 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Collision Mechanism: {activePopupData.collisionType}
            </div>
            {activePopupData.movement && (
              <div className="text-[11px] text-cyan-300 font-semibold mb-1">
                🏍️ Pre-Crash Movement: <span className="text-white font-mono">{activePopupData.movement}</span>
              </div>
            )}
            {activePopupData.pcfViolation && (
              <div className="text-[11px] text-amber-300 font-semibold mb-1">
                ⚖️ Violation Factor: {activePopupData.pcfViolation}
              </div>
            )}
            {activePopupData.summary || activePopupData.description}
          </div>

          {activePopupData.factors && (
            <div className="mb-3">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                Risk Hazards at this Spot:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activePopupData.factors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-900 text-neutral-300 border border-neutral-800"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(activePopupData.safetyRecommendation || activePopupData.safetyTakeaway) && (
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-200 leading-relaxed">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Defensive Riding Advisory:
              </div>
              {activePopupData.safetyTakeaway || activePopupData.safetyRecommendation}
            </div>
          )}
        </div>
      )}

      {/* Pulse Animations and Leaflet Styles */}
      <style jsx global>{`
        @keyframes marker-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          70% {
            transform: scale(2.4);
            opacity: 0;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .leaflet-container {
          background-color: #07090e !important;
          font-family: inherit;
        }
        .corridor-hazard-tooltip {
          background-color: rgba(10, 15, 25, 0.95) !important;
          border: 1px solid #ef4444 !important;
          color: #f8fafc !important;
          border-radius: 8px !important;
          font-size: 11px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6) !important;
          padding: 6px 10px !important;
        }
      `}</style>
    </div>
  );
}
