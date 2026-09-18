'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  AlertTriangle, 
  Shield, 
  Calendar, 
  Clock, 
  Car, 
  Radio, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Search, 
  ExternalLink,
  Info,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { generateSafetyRegions } from '../../utils/generateSafetyRegions';

export default function MapboxRiderMap({
  city,
  incidents = [],
  corridors = [],
  selectedMode = 'all',
  selectedRoadType = 'all',
  severityFilter = 'all',
  timeFilter = 'all',
  selectedYear = 'all',
  is3DMode = false,
  showSafetyRegions = true,
  showBikeLanes = true,
  onSelectIncident = null,
  onCityChange = null,
  focusedCoords = null,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activePopupData, setActivePopupData] = useState(null);
  const [activeRegionData, setActiveRegionData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRideTracking, setIsRideTracking] = useState(false);
  const geolocateControlRef = useRef(null);

  // Set Mapbox token
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_GLMAP;
  if (token) {
    mapboxgl.accessToken = token;
  }

  // Initialize Mapbox map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [city.center[1], city.center[0]], // [lng, lat]
      zoom: city.zoom || 11,
      pitch: is3DMode ? 52 : 0,
      bearing: is3DMode ? -15 : 0,
      antialias: true,
      attributionControl: true,
    });

    // Add navigation controls (zoom, compass with pitch)
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add geolocation control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geolocate, 'top-right');
    geolocateControlRef.current = geolocate;

    map.on('load', () => {
      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update camera pitch and bearing when 3D mode changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.easeTo({
      pitch: is3DMode ? 52 : 0,
      bearing: is3DMode ? -18 : 0,
      duration: 1400,
    });
  }, [is3DMode, mapLoaded]);

  // FlyTo when city changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.flyTo({
      center: [city.center[1], city.center[0]],
      zoom: city.zoom || 11,
      pitch: is3DMode ? 52 : 0,
      bearing: is3DMode ? -18 : 0,
      duration: 1800,
      essential: true,
    });
  }, [city, mapLoaded, is3DMode]);

  // FlyTo focused hotspot coordinates when selected from safety digest
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !focusedCoords) return;
    mapRef.current.flyTo({
      center: [focusedCoords[1], focusedCoords[0]],
      zoom: 13.5,
      pitch: is3DMode ? 48 : 0,
      duration: 1600,
      essential: true,
    });
  }, [focusedCoords, mapLoaded, is3DMode]);

  // Filter incidents based on all active UI filters (Mode, Road Type, Severity, Time, Year)
  const filteredIncidents = React.useMemo(() => {
    return incidents.filter((item) => {
      if (!item.coordinates || item.coordinates.length < 2) return false;
      const [lat, lng] = item.coordinates;
      if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return false;

      // Apply filters
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
  }, [incidents, selectedYear, selectedMode, severityFilter, timeFilter, selectedRoadType]);

  // Build GeoJSON from filtered incidents
  const geojsonData = React.useMemo(() => {
    const features = filteredIncidents.map((item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.coordinates[1], item.coordinates[0]], // [lng, lat]
      },
      properties: {
        id: item.id,
        caseId: item.caseId || `CHP-${item.id}`,
        street: item.street,
        city: item.city || 'Los Angeles',
        severity: item.severity,
        isFatal: item.severity === 'fatal',
        isSevere: item.severity === 'severe_injury',
        mode: item.mode,
        roadType: item.roadType || (item.isFreeway ? 'freeway' : 'surface'),
        isFreeway: Boolean(item.isFreeway),
        year: item.year || 2024,
        date: item.date || '2024',
        time: item.time || 'Logged by CHP',
        timeOfDay: item.timeOfDay || 'day',
        collisionType: item.collisionType || 'Collision',
        pcfViolation: item.pcfViolation || 'State Traffic Code Factor',
        movement: item.movement || 'Proceeding Straight',
        summary: item.summary || item.description || '',
        safetyTakeaway: item.safetyTakeaway || item.safetyRecommendation || '',
        killed: item.killed || 0,
        injured: item.injured || 0,
        source: item.source || 'CHP CCRS (data.ca.gov/dataset/ccrs)',
      },
    }));

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [filteredIncidents]);

  // Generate Yellow and Red Hazard Regions from active filtered crash data
  const safetyRegionsGeoJson = React.useMemo(() => {
    return generateSafetyRegions(filteredIncidents, city);
  }, [filteredIncidents, city]);

  // Update or add Mapbox sources and layers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    // Clean up any existing corridor layers if present
    if (map.getLayer('corridors-core')) map.removeLayer('corridors-core');
    if (map.getLayer('corridors-glow')) map.removeLayer('corridors-glow');
    if (map.getSource('ccrs-corridors')) map.removeSource('ccrs-corridors');

    // 1. SAFETY REGIONS SOURCE & LAYERS (Rendered first so it sits beneath points)
    if (!map.getSource('ccrs-safety-regions')) {
      map.addSource('ccrs-safety-regions', {
        type: 'geojson',
        data: safetyRegionsGeoJson,
      });

      // Safety Region Fill (Green = Safe, Yellow = Caution, Red = Danger)
      map.addLayer({
        id: 'safety-regions-fill',
        type: 'fill',
        source: 'ccrs-safety-regions',
        layout: {
          visibility: showSafetyRegions ? 'visible' : 'none',
        },
        paint: {
          'fill-color': ['get', 'fillColor'],
          'fill-opacity': 0.28,
        },
      });

      // Safety Region Border (Subtle hairline for clean readability)
      map.addLayer({
        id: 'safety-regions-line',
        type: 'line',
        source: 'ccrs-safety-regions',
        layout: {
          visibility: showSafetyRegions ? 'visible' : 'none',
        },
        paint: {
          'line-color': ['get', 'borderColor'],
          'line-width': 0.75,
          'line-opacity': 0.35,
        },
      });

      // Click Safety Region to inspect safety metrics
      map.on('click', 'safety-regions-fill', (e) => {
        if (e.features && e.features[0]) {
          setActiveRegionData(e.features[0].properties);
          setActivePopupData(null);
        }
      });

      map.on('mouseenter', 'safety-regions-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'safety-regions-fill', () => {
        map.getCanvas().style.cursor = '';
      });
    } else {
      map.getSource('ccrs-safety-regions').setData(safetyRegionsGeoJson);
      if (map.getLayer('safety-regions-fill')) {
        map.setLayoutProperty('safety-regions-fill', 'visibility', showSafetyRegions ? 'visible' : 'none');
      }
      if (map.getLayer('safety-regions-line')) {
        map.setLayoutProperty('safety-regions-line', 'visibility', showSafetyRegions ? 'visible' : 'none');
      }
    }

    // 2. DEDICATED BIKE LANES & CYCLEWAYS (Mapbox Streets v8 Vector Tiles)
    const bikeFilter = [
      'any',
      ['all', ['==', ['get', 'class'], 'path'], ['in', ['get', 'type'], ['literal', ['cycleway', 'bicycle']]]],
      ['==', ['get', 'type'], 'cycleway'],
      ['==', ['get', 'class'], 'path'],
      ['==', ['get', 'bike_lane'], 'yes'],
      ['has', 'bike_lane'],
      ['==', ['get', 'bicycle'], 'designated'],
      ['==', ['get', 'bicycle'], 'yes'],
    ];

    if (!map.getLayer('bike-lanes-glow')) {
      map.addLayer({
        id: 'bike-lanes-glow',
        type: 'line',
        source: 'composite',
        'source-layer': 'road',
        filter: bikeFilter,
        layout: {
          visibility: showBikeLanes ? 'visible' : 'none',
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#059669',
          'line-width': [
            'interpolate', ['linear'], ['zoom'],
            10, 2.5,
            14, 5.5,
            18, 9
          ],
          'line-opacity': 0.4,
          'line-blur': 1.5,
        },
      });
    }

    if (!map.getLayer('bike-lanes-core')) {
      map.addLayer({
        id: 'bike-lanes-core',
        type: 'line',
        source: 'composite',
        'source-layer': 'road',
        filter: bikeFilter,
        layout: {
          visibility: showBikeLanes ? 'visible' : 'none',
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#10b981',
          'line-width': [
            'interpolate', ['linear'], ['zoom'],
            10, 1.2,
            13, 2.4,
            16, 4.2
          ],
          'line-opacity': 0.95,
        },
      });

      // Hover on bike lane
      map.on('mouseenter', 'bike-lanes-core', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'bike-lanes-core', () => {
        map.getCanvas().style.cursor = '';
      });

      // Click on bike lane
      map.on('click', 'bike-lanes-core', (e) => {
        if (e.features && e.features[0]) {
          const f = e.features[0];
          const name = f.properties.name || f.properties.name_en || 'Protected Bikeway';
          const type = f.properties.type || f.properties.class || 'Dedicated Bike Path / Lane';
          new mapboxgl.Popup({ closeButton: true, className: 'dark-popup' })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 6px; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
                <div style="font-weight: 700; color: #059669; font-size: 12px; margin-bottom: 3px;">🚴 ${name}</div>
                <div style="color: #64748b; font-size: 11px;">Designated Cycling Infrastructure (${type})</div>
              </div>
            `)
            .addTo(map);
        }
      });
    }

    // 3. CRASHES GEOJSON SOURCE WITH TIGHT PINPOINT CLUSTERING
    if (!map.getSource('ccrs-crashes')) {
      map.addSource('ccrs-crashes', {
        type: 'geojson',
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 46, // Digestible regional cluster groupings
      });

      // Clusters layer - Sleeker, smaller badges to reveal road curvature & intersections
      map.addLayer({
        id: 'crashes-clusters',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#0284c7', // < 20: vibrant sky blue
            20,
            '#d97706', // 20-100: deep amber
            100,
            '#dc2626', // > 100: bold red
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            12, // Small cluster
            20,
            16, // Medium cluster
            100,
            20, // Large cluster
          ],
          'circle-opacity': 0.95,
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.95,
        },
      });

      // Cluster count text label
      map.addLayer({
        id: 'crashes-cluster-count',
        type: 'symbol',
        source: 'ccrs-crashes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 11,
        },
        paint: {
          'text-color': '#ffffff',
        },
      });

      // Fatal glow halo - Compact warning glow
      map.addLayer({
        id: 'crashes-fatal-halo',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['!', ['has', 'point_count']], ['==', ['get', 'isFatal'], true]],
        paint: {
          'circle-color': '#ef4444',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 5,
            12, 9,
            16, 15,
          ],
          'circle-opacity': 0.45,
          'circle-blur': 0.7,
        },
      });

      // Unclustered individual collision points - Sleek pinpoint precision
      map.addLayer({
        id: 'crashes-unclustered',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'case',
            ['get', 'isFatal'],
            '#ef4444',
            ['get', 'isSevere'],
            '#f97316',
            '#eab308',
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, ['case', ['get', 'isFatal'], 3, 2],
            12, ['case', ['get', 'isFatal'], 4.5, 3.2],
            16, ['case', ['get', 'isFatal'], 7.5, 5.5],
          ],
          'circle-opacity': 0.95,
          'circle-stroke-width': [
            'case',
            ['get', 'isFatal'],
            1.8,
            ['get', 'isSevere'],
            1.0,
            0.6,
          ],
          'circle-stroke-color': [
            'case',
            ['get', 'isFatal'],
            '#ffffff',
            ['get', 'isSevere'],
            '#fed7aa',
            '#fef08a',
          ],
        },
      });

      // Click cluster to zoom into bounds
      map.on('click', 'crashes-clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['crashes-clusters'] });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('ccrs-crashes').getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom + 0.5,
            duration: 800,
          });
        });
      });

      // Click unclustered point to inspect
      map.on('click', 'crashes-unclustered', (e) => {
        const feature = e.features[0];
        if (!feature) return;

        const p = feature.properties;
        const coords = feature.geometry.coordinates;

        setActivePopupData(p);
        setActiveRegionData(null);
        if (onSelectIncident) onSelectIncident(p.id);

        map.easeTo({
          center: coords,
          zoom: Math.max(map.getZoom(), 13),
          duration: 600,
        });
      });

      // Hover cursor effects
      map.on('mouseenter', 'crashes-clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'crashes-clusters', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('mouseenter', 'crashes-unclustered', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'crashes-unclustered', () => {
        map.getCanvas().style.cursor = '';
      });
    } else {
      map.getSource('ccrs-crashes').setData(geojsonData);
      if (map.getLayer('bike-lanes-glow')) {
        map.setLayoutProperty('bike-lanes-glow', 'visibility', showBikeLanes ? 'visible' : 'none');
      }
      if (map.getLayer('bike-lanes-core')) {
        map.setLayoutProperty('bike-lanes-core', 'visibility', showBikeLanes ? 'visible' : 'none');
      }
    }
  }, [mapLoaded, geojsonData, safetyRegionsGeoJson, showSafetyRegions, showBikeLanes, onSelectIncident]);

  // Street & Neighborhood Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapRef.current) return;

    const q = searchQuery.toLowerCase().trim();

    // 1. Regional / Neighborhood routing shortcuts
    if (q.includes('culver')) {
      if (city?.id !== 'los-angeles' && onCityChange) {
        onCityChange('los-angeles');
      }
      mapRef.current.flyTo({
        center: [-118.3965, 34.0211],
        zoom: 14.2,
        duration: 1500,
      });
      return;
    }

    if (q.includes('hollywood')) {
      if (city?.id !== 'los-angeles' && onCityChange) {
        onCityChange('los-angeles');
      }
      mapRef.current.flyTo({
        center: [-118.3387, 34.1016],
        zoom: 14.2,
        duration: 1500,
      });
      return;
    }

    if (q.includes('malibu') || q.includes('latigo') || q.includes('mulholland')) {
      if (city?.id !== 'malibu-canyons' && onCityChange) {
        onCityChange('malibu-canyons');
      }
      mapRef.current.flyTo({
        center: [-118.6920, 34.0350],
        zoom: 13,
        duration: 1500,
      });
      return;
    }

    if (q.includes('ortega') || q.includes('santiago') || q.includes('orange county')) {
      if (city?.id !== 'orange-county' && onCityChange) {
        onCityChange('orange-county');
      }
      mapRef.current.flyTo({
        center: [-117.5250, 33.5600],
        zoom: 13,
        duration: 1500,
      });
      return;
    }

    if (q.includes('angeles crest') || q.includes('ach') || q.includes('glendora')) {
      if (city?.id !== 'angeles-forest' && onCityChange) {
        onCityChange('angeles-forest');
      }
      mapRef.current.flyTo({
        center: [-118.1500, 34.2500],
        zoom: 12,
        duration: 1500,
      });
      return;
    }

    // 2. Incident street and road search
    const match = incidents.find(
      (i) =>
        (i.street && i.street.toLowerCase().includes(q)) ||
        (i.primaryRoad && i.primaryRoad.toLowerCase().includes(q)) ||
        (i.secondaryRoad && i.secondaryRoad.toLowerCase().includes(q)) ||
        (i.jurisdiction && i.jurisdiction.toLowerCase().includes(q)) ||
        (i.city && i.city.toLowerCase().includes(q)) ||
        (i.summary && i.summary.toLowerCase().includes(q))
    );

    if (match && match.coordinates) {
      mapRef.current.flyTo({
        center: [match.coordinates[1], match.coordinates[0]],
        zoom: 14.5,
        duration: 1500,
      });
      setActivePopupData(match);
      setActiveRegionData(null);
      if (onSelectIncident) onSelectIncident(match.id);
    }
  };

  // Toggle Live Ride GPS Tracking
  const toggleRideTracking = () => {
    if (!mapRef.current) return;
    if (isRideTracking) {
      setIsRideTracking(false);
    } else {
      setIsRideTracking(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14.5,
              duration: 2000,
            });
          },
          (err) => {
            console.warn('Geolocation error:', err);
            setIsRideTracking(false);
          },
          { enableHighAccuracy: true }
        );
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] bg-slate-100 select-none">
      {/* Mapbox Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* FLOATING TOP OVERLAY: SEARCH & GPS */}
      <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        {/* Quick Corridor / Street Search */}
        <form 
          onSubmit={handleSearch}
          className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 max-w-sm w-full transition-all"
        >
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search street or city (e.g. Culver City, Venice, PCH)..."
            className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-700 text-xs px-1 font-bold"
            >
              ✕
            </button>
          )}
        </form>

        {/* Live GPS Tracker Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleRideTracking}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-md ${
              isRideTracking
                ? 'bg-sky-600 text-white animate-pulse'
                : 'bg-white/95 text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Radio className={`w-4 h-4 ${isRideTracking ? 'animate-spin text-white' : 'text-sky-600'}`} />
            <span>{isRideTracking ? 'Live Ride GPS Active' : 'Track My Ride GPS'}</span>
          </button>
        </div>
      </div>

      {/* MAP LEGEND: (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-white/95 backdrop-blur-md max-w-xs text-xs pointer-events-auto">
        <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-[11px]">
          <Shield className="w-3.5 h-3.5 text-sky-600" />
          <span>Rider Safety Radar (CCRS)</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500/30 shrink-0"></span>
            <span className="text-slate-700 font-medium">Caution Zone (Dense Collisions)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500/30 shrink-0"></span>
            <span className="text-slate-700 font-medium">Critical Hazard Zone (Fatal / Severe)</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0"></span>
            <span className="text-slate-600 text-[10px]">Pinpoint Incident Cluster</span>
          </div>
          {showBikeLanes && (
            <div className="flex items-center gap-2 pt-1">
              <span className="w-3.5 h-1 rounded-full bg-emerald-600 shrink-0"></span>
              <span className="text-emerald-800 font-medium text-[10px]">Protected Bike Lane / Cycleway</span>
            </div>
          )}
        </div>
      </div>

      {/* MAPBOX POWERED BADGE (Bottom Center) */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-10">
        <div className="px-3 py-1 rounded-full bg-white/90 text-[10px] text-slate-500 flex items-center gap-1.5 backdrop-blur-sm pointer-events-auto">
          <span>WebGL Hardware Accelerated • Powered by</span>
          <strong className="text-slate-800">Mapbox GL JS</strong>
          <span>&</span>
          <a
            href="https://data.ca.gov/dataset/ccrs"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 hover:underline font-bold"
          >
            data.ca.gov/dataset/ccrs
          </a>
        </div>
      </div>

      {/* FLOATING SAFETY REGION INSPECTOR */}
      {activeRegionData && !activePopupData && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 animate-in fade-in duration-200 pointer-events-auto text-slate-800">
          <div className="flex items-start justify-between gap-2 mb-2.5 pb-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  activeRegionData.level === 'safe'
                    ? 'bg-emerald-50 text-emerald-800'
                    : activeRegionData.level === 'caution'
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-rose-50 text-rose-800'
                }`}
              >
                <span>{activeRegionData.level === 'safe' ? '🟢' : activeRegionData.level === 'caution' ? '🟡' : '🔴'}</span>
                <span>{activeRegionData.title}</span>
              </span>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-sky-700">
                Score: {activeRegionData.score}/100
              </span>
            </div>

            <button
              onClick={() => setActiveRegionData(null)}
              className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-2">
            {activeRegionData.level === 'safe'
              ? 'Safe Flow Riding Sector'
              : activeRegionData.level === 'caution'
              ? 'Moderate Conflict Riding Sector'
              : 'High Collision Risk Sector'}
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Crashes</span>
              <span className={`text-base font-black ${activeRegionData.crashes === 0 ? 'text-emerald-600' : 'text-amber-700'}`}>
                {activeRegionData.crashes}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Severe</span>
              <span className="text-base font-black text-orange-600">
                {activeRegionData.severe || 0}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Fatal</span>
              <span className={`text-base font-black ${activeRegionData.fatalities > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                {activeRegionData.fatalities || 0}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl mb-2.5">
            {activeRegionData.description}
          </p>

          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2">
            <span>Derived from official CHP CCRS records</span>
            <span className="text-sky-700 font-semibold">Live Sector Analysis</span>
          </div>
        </div>
      )}

      {/* FLOATING INCIDENT INSPECTOR (Bottom Right Card) */}
      {activePopupData && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 animate-in fade-in duration-200 pointer-events-auto max-h-[85vh] overflow-y-auto text-slate-800">
          <div className="flex items-start justify-between gap-2 mb-2 pb-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  activePopupData.isFatal || activePopupData.severity === 'fatal'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-amber-50 text-amber-800'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>
                  {activePopupData.isFatal || activePopupData.severity === 'fatal'
                    ? 'Fatal Incident'
                    : 'Severe Collision'}
                </span>
              </span>

              <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium capitalize">
                {activePopupData.mode === 'bicycle'
                  ? '🚲 Bicycle'
                  : activePopupData.mode === 'motorcycle'
                  ? '🏍️ Motorcycle'
                  : activePopupData.mode === 'ebike'
                  ? '⚡ E-Bike'
                  : '🚗 Passenger Car / Auto'}
              </span>
            </div>

            <button
              onClick={() => setActivePopupData(null)}
              className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
            {activePopupData.street}
          </h3>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {activePopupData.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {activePopupData.time}
            </span>
            {activePopupData.caseId && (
              <span className="font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                #{activePopupData.caseId}
              </span>
            )}
          </div>

          {/* Crash Mechanism Details */}
          <div className="bg-slate-50 rounded-xl p-3 mb-2.5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
            <div className="font-bold text-slate-900 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Collision: {activePopupData.collisionType}
            </div>
            {activePopupData.movement && (
              <div className="text-[11px] text-slate-700 font-medium">
                🏍️ Movement: <span className="text-slate-900 font-mono font-semibold">{activePopupData.movement}</span>
              </div>
            )}
            {activePopupData.pcfViolation && (
              <div className="text-[11px] text-slate-700 font-medium">
                ⚖️ Factor: <span className="text-slate-900">{activePopupData.pcfViolation}</span>
              </div>
            )}
            {activePopupData.summary && (
              <p className="text-[11px] text-slate-600 pt-1">
                {activePopupData.summary}
              </p>
            )}
          </div>

          {/* Defensive Advisory */}
          {(activePopupData.safetyTakeaway || activePopupData.safetyRecommendation) && (
            <div className="bg-emerald-50 rounded-xl p-2.5 text-xs text-emerald-900 leading-relaxed">
              <div className="font-bold text-emerald-800 mb-0.5 flex items-center gap-1 text-[11px]">
                <Shield className="w-3 h-3 text-emerald-600" /> Defensive Riding Advisory:
              </div>
              <p className="text-[11px]">
                {activePopupData.safetyTakeaway || activePopupData.safetyRecommendation}
              </p>
            </div>
          )}

          <div className="mt-2.5 pt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Verified State Record</span>
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:underline flex items-center gap-0.5 font-medium"
            >
              <span>data.ca.gov</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
