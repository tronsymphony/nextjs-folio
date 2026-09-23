'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  AlertTriangle,
  Flame, 
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


// Helper to extract clean road names, variants, and highway refs from CCRS primaryRoad strings
function extractRoadVariants(raw) {
  if (!raw) return { names: [], refs: [] };
  raw = raw.trim();
  const names = new Set();
  const refs = new Set();

  let subName = '';
  const m = raw.match(/\((.*?)\)/);
  if (m) {
    subName = m[1].trim();
    raw = raw.replace(/\(.*?\)/, '').trim();
  }

  // Detect State Route / CA highway numbers
  const mRoute = raw.match(/(?:SR|STATE ROUTE|CA)[-\s]*(\d+)/i) || (subName && subName.match(/(?:SR|STATE ROUTE|CA)[-\s]*(\d+)/i));
  if (mRoute) {
    const num = mRoute[1];
    ['CA ' + num, 'SR ' + num, 'SR-' + num, 'State Route ' + num, num].forEach((r) => refs.add(r));
  }

  // Detect Interstate highway numbers
  const mInter = raw.match(/I[-\s]*(\d+)/i);
  if (mInter) {
    const num = mInter[1];
    ['I ' + num, 'I-' + num, 'Interstate ' + num, num].forEach((r) => refs.add(r));
  }

  [raw, subName].filter(Boolean).forEach((n) => {
    n = n.replace(/\s+(?:N\/B|S\/B|E\/B|W\/B|NORTHBOUND|SOUTHBOUND|EASTBOUND|WESTBOUND)\b/gi, '').trim();
    n = n.replace(/\./g, '').trim();
    if (!n) return;

    const words = n.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    names.add(words.join(' '));

    const replacements = {
      Rd: 'Road',
      Hwy: 'Highway',
      Blvd: 'Boulevard',
      Bl: 'Boulevard',
      Ave: 'Avenue',
      Av: 'Avenue',
      Pkwy: 'Parkway',
      Dr: 'Drive',
      St: 'Street',
      Ln: 'Lane',
      Ct: 'Court',
      Wy: 'Way',
      Pch: 'Pacific Coast Highway',
    };
    names.add(words.map((w) => replacements[w] || w).join(' '));
  });

  return { names: Array.from(names), refs: Array.from(refs) };
}

export default function MapboxRiderMap({
  city,
  incidents = [],
  selectedMode = 'all',
  selectedRoadType = 'all',
  severityFilter = 'all',
  timeFilter = 'all',
  selectedYear = 'all',
  is3DMode = false,
  showSafetyRegions = true,
  showBikeLanes = true,
  showDangerousRoads = true,
  showCollisionPins = true,
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
  const [activeRoadData, setActiveRoadData] = useState(null);
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
      zoom: city.zoom || 9.6,
      pitch: is3DMode ? 40 : 0,
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
      if (city.bounds && Array.isArray(city.bounds) && city.bounds.length === 2) {
        map.fitBounds(city.bounds, {
          padding: { top: 60, bottom: 60, left: 60, right: 60 },
          pitch: is3DMode ? 40 : 0,
          bearing: is3DMode ? -15 : 0,
          duration: 0,
        });
      }
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

  // Zoom out to show the entire location when location changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    if (city.bounds && Array.isArray(city.bounds) && city.bounds.length === 2) {
      map.fitBounds(city.bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        pitch: is3DMode ? 40 : 0,
        bearing: is3DMode ? -15 : 0,
        duration: 1600,
        essential: true,
      });
    } else {
      map.flyTo({
        center: [city.center[1], city.center[0]],
        zoom: city.zoom || 9.6,
        pitch: is3DMode ? 40 : 0,
        bearing: is3DMode ? -15 : 0,
        duration: 1600,
        essential: true,
      });
    }
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
        if (selectedMode === 'bicycle') {
          // STRICTLY cycling accidents (bicycles & e-bikes) - zero clutter from cars or motorcycles
          if (item.mode !== 'bicycle' && item.mode !== 'ebike') return false;
        } else if (selectedMode === 'motorcycle') {
          // STRICTLY motorcycle accidents
          if (item.mode !== 'motorcycle') return false;
        } else if (selectedMode === 'car') {
          // STRICTLY car accidents
          if (item.mode !== 'car' && item.mode !== 'vehicle') return false;
        } else if (item.mode !== selectedMode) {
          return false;
        }
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

  // Build GeoJSON from filtered incidents with strict Z-Index sorting:
  // 1. Cars sorted first (rendered at bottom)
  // 2. Motorcycles sorted second (rendered in middle)
  // 3. Bicycles sorted last (rendered on top)
  const geojsonData = React.useMemo(() => {
    const sorted = [...filteredIncidents].sort((a, b) => {
      const modeScore = (m) => {
        if (m === 'car' || m === 'vehicle') return 1;
        if (m === 'motorcycle') return 2;
        if (m === 'bicycle' || m === 'ebike') return 3;
        return 1;
      };
      return modeScore(a.mode) - modeScore(b.mode);
    });

    const features = sorted.map((item) => ({
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
        isBicycle: item.mode === 'bicycle' || item.mode === 'ebike',
        isMotorcycle: item.mode === 'motorcycle',
        isCar: item.mode === 'car' || item.mode === 'vehicle',
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

  // DYNAMICALLY calculate color-coded hazard tiers directly from active collision records
  const { 
    tier1Names, tier1Refs, 
    tier2Names, tier2Refs, 
    tier3Names, tier3Refs, 
    roadStatsMap 
  } = React.useMemo(() => {
    if (!filteredIncidents || filteredIncidents.length === 0) {
      return {
        tier1Names: [], tier1Refs: [],
        tier2Names: [], tier2Refs: [],
        tier3Names: [], tier3Refs: [],
        roadStatsMap: {},
      };
    }

    // Also tally reckless car conflict per corridor from all raw incidents for hazard context
    const carConflictMap = {};
    incidents.forEach((inc) => {
      if (inc.mode === 'car' || inc.mode === 'vehicle') {
        let r = inc.primaryRoad;
        if (!r && inc.street) {
          r = inc.street.split('&')[0].split(' AT ')[0].split(' / ')[0].trim();
        }
        if (!r) return;
        r = r.toUpperCase().trim();
        for (const d of [' N/B', ' S/B', ' E/B', ' W/B', ' NORTHBOUND', ' SOUTHBOUND', ' EASTBOUND', ' WESTBOUND']) {
          r = r.replace(d, '');
        }
        carConflictMap[r] = (carConflictMap[r] || 0) + 1;
      }
    });

    const stats = {};

    filteredIncidents.forEach((inc) => {
      let r = inc.primaryRoad;
      if (!r && inc.street) {
        r = inc.street.split('&')[0].split(' AT ')[0].split(' / ')[0].trim();
      }
      if (!r) return;
      r = r.toUpperCase().trim();
      for (const d of [' N/B', ' S/B', ' E/B', ' W/B', ' NORTHBOUND', ' SOUTHBOUND', ' EASTBOUND', ' WESTBOUND']) {
        r = r.replace(d, '');
      }

      if (!stats[r]) {
        stats[r] = {
          rawName: r,
          displayName: '',
          crashes: 0,
          fatalities: 0,
          severe: 0,
          bikeCrashes: 0,
          carCrashes: carConflictMap[r] || 0,
          motorcycleCrashes: 0,
          dominantConflict: inc.collisionType || inc.summary || 'High Collision Frequency Corridor',
          tier: 'tier3',
          tierLabel: 'Tier 3: Elevated Caution Corridor',
          tierColor: '#eab308',
        };
      }

      stats[r].crashes += 1;
      if (inc.mode === 'bicycle' || inc.mode === 'ebike') stats[r].bikeCrashes += 1;
      else if (inc.mode === 'motorcycle') stats[r].motorcycleCrashes += 1;
      else if (inc.mode === 'car' || inc.mode === 'vehicle') stats[r].carCrashes += 1;

      if (inc.severity === 'fatal' || inc.isFatal || inc.killed > 0) {
        stats[r].fatalities += (inc.killed || 1);
      }
      if (inc.severity === 'severe_injury' || inc.isSevere || inc.injured > 0) {
        stats[r].severe += (inc.injured || 1);
      }
    });

    const qualifyingRoads = Object.values(stats).filter((item) => item.crashes >= 2 || item.fatalities > 0);

    const t1Names = new Set(), t1Refs = new Set();
    const t2Names = new Set(), t2Refs = new Set();
    const t3Names = new Set(), t3Refs = new Set();
    const lookup = {};

    qualifyingRoads.forEach((item) => {
      const { names, refs } = extractRoadVariants(item.rawName);
      if (names.length > 0) item.displayName = names[names.length - 1];

      // Tier 1: Fatalities or heavy repeated collisions
      if (item.fatalities >= 1 || item.crashes >= 25) {
        item.tier = 'tier1';
        item.tierLabel = 'Critical Fatal Corridor';
        item.tierColor = '#dc2626';
        names.forEach((n) => t1Names.add(n));
        refs.forEach((rf) => t1Refs.add(rf));
      } else if (item.severe >= 2 || item.crashes >= 6) {
        // Tier 2: Severe injury hazard or high collision frequency
        item.tier = 'tier2';
        item.tierLabel = 'High Injury Hazard Corridor';
        item.tierColor = '#ea580c';
        names.forEach((n) => t2Names.add(n));
        refs.forEach((rf) => t2Refs.add(rf));
      } else {
        // Tier 3: Elevated caution / recurrent conflict
        item.tier = 'tier3';
        item.tierLabel = 'Elevated Caution Corridor';
        item.tierColor = '#eab308';
        names.forEach((n) => t3Names.add(n));
        refs.forEach((rf) => t3Refs.add(rf));
      }

      names.forEach((n) => { lookup[n.toLowerCase()] = item; });
      refs.forEach((rf) => { lookup[rf.toLowerCase()] = item; });
    });

    return {
      tier1Names: Array.from(t1Names),
      tier1Refs: Array.from(t1Refs),
      tier2Names: Array.from(t2Names),
      tier2Refs: Array.from(t2Refs),
      tier3Names: Array.from(t3Names),
      tier3Refs: Array.from(t3Refs),
      roadStatsMap: lookup,
    };
  }, [filteredIncidents, incidents]);

  const roadStatsMapRef = useRef(roadStatsMap);
  useEffect(() => {
    roadStatsMapRef.current = roadStatsMap;
  }, [roadStatsMap]);

  // Helper to build Mapbox filter expressions for a list of names and refs
  const tier1Filter = React.useMemo(() => {
    if (tier1Names.length === 0 && tier1Refs.length === 0) return ['==', '$type', 'None'];
    const parts = ['any'];
    if (tier1Names.length > 0) {
      parts.push(['in', ['get', 'name'], ['literal', tier1Names]]);
      parts.push(['in', ['get', 'name_en'], ['literal', tier1Names]]);
    }
    if (tier1Refs.length > 0) parts.push(['in', ['get', 'ref'], ['literal', tier1Refs]]);
    return parts;
  }, [tier1Names, tier1Refs]);

  const tier2Filter = React.useMemo(() => {
    if (tier2Names.length === 0 && tier2Refs.length === 0) return ['==', '$type', 'None'];
    const parts = ['any'];
    if (tier2Names.length > 0) {
      parts.push(['in', ['get', 'name'], ['literal', tier2Names]]);
      parts.push(['in', ['get', 'name_en'], ['literal', tier2Names]]);
    }
    if (tier2Refs.length > 0) parts.push(['in', ['get', 'ref'], ['literal', tier2Refs]]);
    return parts;
  }, [tier2Names, tier2Refs]);

  const tier3Filter = React.useMemo(() => {
    if (tier3Names.length === 0 && tier3Refs.length === 0) return ['==', '$type', 'None'];
    const parts = ['any'];
    if (tier3Names.length > 0) {
      parts.push(['in', ['get', 'name'], ['literal', tier3Names]]);
      parts.push(['in', ['get', 'name_en'], ['literal', tier3Names]]);
    }
    if (tier3Refs.length > 0) parts.push(['in', ['get', 'ref'], ['literal', tier3Refs]]);
    return parts;
  }, [tier3Names, tier3Refs]);







  // Update or add Mapbox sources and layers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    // Clean up legacy corridor and boxy grid layers
    if (map.getLayer('bike-lanes-glow')) map.removeLayer('bike-lanes-glow');
    if (map.getLayer('corridors-labels')) map.removeLayer('corridors-labels');
    if (map.getLayer('corridors-core')) map.removeLayer('corridors-core');
    if (map.getLayer('corridors-glow')) map.removeLayer('corridors-glow');
    if (map.getSource('ccrs-corridors')) map.removeSource('ccrs-corridors');
    if (map.getLayer('crashes-unclustered')) map.removeLayer('crashes-unclustered');
    if (map.getLayer('safety-regions-line')) map.removeLayer('safety-regions-line');
    if (map.getLayer('safety-regions-fill')) map.removeLayer('safety-regions-fill');
    if (map.getSource('ccrs-safety-regions')) map.removeSource('ccrs-safety-regions');

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

    // 2. BIKE INFRASTRUCTURE LAYER (Subtle, delicate hairline that doesn't overpower the map)
    if (map.getLayer('bike-lanes-glow')) {
      map.removeLayer('bike-lanes-glow');
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
          'line-color': '#059669', // Sophisticated, muted emerald green
          'line-width': [
            'interpolate', ['linear'], ['zoom'],
            10, 0.8,
            13, 1.5,
            16, 2.6
          ],
          'line-opacity': 0.38, // Soft and subtle so roads & hazard tiers take priority
          'line-dasharray': [3, 2], // Refined dashed styling indicating cycling path
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

    // 3. COLOR-CODED DANGER ROAD NETWORK HIGHLIGHT (Primary visual layer directly on vector tiles)
    const tiersConfig = [
      { id: 'tier3', filter: tier3Filter, color: '#eab308', glowColor: '#facc15', width: 2.0, glowWidth: 5.5, opacity: 0.90, hasData: tier3Names.length > 0 },
      { id: 'tier2', filter: tier2Filter, color: '#ea580c', glowColor: '#f97316', width: 2.6, glowWidth: 8.0, opacity: 0.95, hasData: tier2Names.length > 0 },
      { id: 'tier1', filter: tier1Filter, color: '#dc2626', glowColor: '#ef4444', width: 3.4, glowWidth: 11.0, opacity: 0.98, hasData: tier1Names.length > 0 },
    ];

    tiersConfig.forEach((cfg) => {
      const glowId = `danger-${cfg.id}-glow`;
      const coreId = `danger-${cfg.id}-core`;

      if (!map.getLayer(glowId)) {
        map.addLayer({
          id: glowId,
          type: 'line',
          source: 'composite',
          'source-layer': 'road',
          filter: cfg.filter,
          layout: {
            visibility: showDangerousRoads && cfg.hasData ? 'visible' : 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': cfg.glowColor,
            'line-width': [
              'interpolate', ['linear'], ['zoom'],
              10, cfg.glowWidth * 0.6,
              14, cfg.glowWidth,
              18, cfg.glowWidth * 2.0
            ],
            'line-opacity': 0.40,
            'line-blur': 2,
          },
        });
      } else {
        map.setFilter(glowId, cfg.filter);
        map.setLayoutProperty(glowId, 'visibility', showDangerousRoads && cfg.hasData ? 'visible' : 'none');
      }

      if (!map.getLayer(coreId)) {
        map.addLayer({
          id: coreId,
          type: 'line',
          source: 'composite',
          'source-layer': 'road',
          filter: cfg.filter,
          layout: {
            visibility: showDangerousRoads && cfg.hasData ? 'visible' : 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': cfg.color,
            'line-width': [
              'interpolate', ['linear'], ['zoom'],
              10, cfg.width * 0.7,
              14, cfg.width,
              18, cfg.width * 2.2
            ],
            'line-opacity': cfg.opacity,
          },
        });

        // Click handler to inspect road corridor
        map.on('click', coreId, (e) => {
          if (e.features && e.features[0]) {
            const feat = e.features[0];
            const rawName = feat.properties.name || feat.properties.name_en || feat.properties.ref || 'High-Risk Road Corridor';
            const matchedStats = roadStatsMapRef.current[rawName.toLowerCase()] || roadStatsMapRef.current[(feat.properties.ref || '').toLowerCase()];

            setActiveRoadData({
              name: matchedStats?.displayName || rawName,
              ref: feat.properties.ref || '',
              crashes: matchedStats?.crashes || 0,
              fatalities: matchedStats?.fatalities || 0,
              severe: matchedStats?.severe || 0,
              bikeCrashes: matchedStats?.bikeCrashes || 0,
              carCrashes: matchedStats?.carCrashes || 0,
              motorcycleCrashes: matchedStats?.motorcycleCrashes || 0,
              tierLabel: matchedStats?.tierLabel || 'High-Risk Road Corridor',
              tierColor: matchedStats?.tierColor || '#dc2626',
              dominantConflict: matchedStats?.dominantConflict || 'High Collision Frequency Corridor',
              roadClass: feat.properties.class || 'arterial',
            });
            setActivePopupData(null);
            setActiveRegionData(null);
          }
        });

        map.on('mouseenter', coreId, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', coreId, () => {
          map.getCanvas().style.cursor = '';
        });
      } else {
        map.setFilter(coreId, cfg.filter);
        map.setLayoutProperty(coreId, 'visibility', showDangerousRoads && cfg.hasData ? 'visible' : 'none');
      }
    });

    // 4. CRASHES GEOJSON SOURCE WITH SEVERITY CLUSTER PROPERTIES & ORGANIC HEAT TRAILS
    if (!map.getSource('ccrs-crashes')) {
      map.addSource('ccrs-crashes', {
        type: 'geojson',
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 16,
        clusterRadius: 22, // Tighter radius to generate significantly more localized micro-clusters along corridors
        clusterProperties: {
          fatal_count: ['+', ['case', ['get', 'isFatal'], 1, 0]],
          severe_count: ['+', ['case', ['get', 'isSevere'], 1, 0]],
          bike_count: ['+', ['case', ['==', ['get', 'mode'], 'bicycle'], 1, ['==', ['get', 'mode'], 'ebike'], 1, 0]],
          moto_count: ['+', ['case', ['==', ['get', 'mode'], 'motorcycle'], 1, 0]],
          car_count: ['+', ['case', ['==', ['get', 'mode'], 'car'], 1, ['==', ['get', 'mode'], 'vehicle'], 1, 0]],
        },
      });

      // A. ORGANIC COLLISION HEAT TRAILS (Smooth continuous heat glow beneath clusters)
      map.addLayer({
        id: 'crashes-heat',
        type: 'heatmap',
        source: 'ccrs-crashes',
        maxzoom: 15,
        layout: {
          visibility: showSafetyRegions ? 'visible' : 'none',
        },
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'killed'],
            0, ['case', ['get', 'isSevere'], 1.8, 1.0],
            1, 3.0,
            3, 5.0,
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 0.5,
            11, 1.1,
            14, 2.0,
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(254, 240, 138, 0)',
            0.15, 'rgba(253, 224, 71, 0.22)',
            0.35, 'rgba(251, 146, 60, 0.48)',
            0.65, 'rgba(239, 68, 68, 0.72)',
            0.85, 'rgba(185, 28, 28, 0.88)',
            1.0, 'rgba(127, 29, 29, 0.95)',
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 16,
            11, 28,
            14, 44,
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, 0.50,
            14, 0.30,
            15, 0,
          ],
        },
      });

      // B. FATAL CLUSTER WARNING HALO (Delicate, ethereal ruby halo that lets map labels shine)
      map.addLayer({
        id: 'crashes-cluster-fatal-halo',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['has', 'point_count'], ['>', ['get', 'fatal_count'], 0]],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': '#ef4444',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            12,
            10, 15,
            50, 18,
          ],
          'circle-opacity': 0.18,
          'circle-blur': 0.75,
        },
      });

      // C. SEVERITY-AWARE CLUSTER DISCS (Crimson for fatal hotspots, warm amber for severe, cobalt for standard)
      map.addLayer({
        id: 'crashes-clusters',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['has', 'point_count'],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': [
            'case',
            ['>', ['get', 'fatal_count'], 0],
            '#dc2626', // Fatal hotspot: crimson red
            ['>', ['get', 'bike_count'], 0],
            '#059669', // Contains cyclist casualties: emerald
            ['>', ['get', 'moto_count'], 0],
            '#7c3aed', // Contains motorcycle incidents: violet
            ['>', ['get', 'severe_count'], 0],
            '#ea580c', // Severe injury zone: amber-orange
            '#0284c7', // General collision cluster: cobalt blue
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            8.5, // Small cluster (2 - 9): subtle 8.5px disc
            10,
            11.0, // Medium cluster (10 - 49): 11px
            50,
            13.5, // Large cluster (50+): 13.5px
          ],
          'circle-opacity': 0.58, // Translucent so underlying streets, curves & labels remain visible
          'circle-stroke-width': 1.2, // Delicate hairline border
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.65,
        },
      });

      // D. CLUSTER COUNT TYPOGRAPHY
      map.addLayer({
        id: 'crashes-cluster-count',
        type: 'symbol',
        source: 'ccrs-crashes',
        filter: ['has', 'point_count'],
        layout: {
          visibility: showCollisionPins ? 'visible' : 'none',
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': [
            'step',
            ['get', 'point_count'],
            10,
            10, 10.5,
            50, 11
          ],
        },
        paint: {
          'text-color': 'rgba(255, 255, 255, 0.95)',
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

      // 1. CAR ACCIDENTS LAYER (LAST PRIORITY - BOTTOM LAYER, SUBDUED RECKLESS HAZARD BACKDROP)
      map.addLayer({
        id: 'crashes-cars',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['!', ['has', 'point_count']], ['in', ['get', 'mode'], ['literal', ['car', 'vehicle']]]],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': [
            'case',
            ['get', 'isFatal'],
            '#dc2626',
            ['get', 'isSevere'],
            '#ea580c',
            '#f43f5e',
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 2.0,
            12, 3.0,
            16, 4.8,
          ],
          'circle-opacity': 0.40, // Subdued, translucent so it stays in the background
          'circle-stroke-width': 0.6,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.45,
        },
      });

      // 2. MOTORCYCLE ACCIDENTS LAYER (2ND PRIORITY - MIDDLE LAYER, VIVID VIOLET)
      map.addLayer({
        id: 'crashes-motorcycles',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['!', ['has', 'point_count']], ['==', ['get', 'mode'], 'motorcycle']],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': [
            'case',
            ['get', 'isFatal'],
            '#5b21b6',
            ['get', 'isSevere'],
            '#7c3aed',
            '#8b5cf6',
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 3.4,
            12, 5.2,
            16, 8.0,
          ],
          'circle-opacity': 0.88,
          'circle-stroke-width': 1.4,
          'circle-stroke-color': '#f5f3ff',
          'circle-stroke-opacity': 0.95,
        },
      });

      // 3. BICYCLE ACCIDENTS HALO (GLOWING EMERALD RADIANCE AROUND CYCLIST PINS)
      map.addLayer({
        id: 'crashes-bicycles-halo',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['!', ['has', 'point_count']], ['in', ['get', 'mode'], ['literal', ['bicycle', 'ebike']]]],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': '#10b981',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 6.0,
            12, 10.0,
            16, 16.0,
          ],
          'circle-opacity': 0.28,
          'circle-blur': 0.65,
        },
      });

      // 4. BICYCLE ACCIDENTS LAYER (1ST PRIORITY - TOP LAYER, BOLD EMERALD)
      map.addLayer({
        id: 'crashes-bicycles',
        type: 'circle',
        source: 'ccrs-crashes',
        filter: ['all', ['!', ['has', 'point_count']], ['in', ['get', 'mode'], ['literal', ['bicycle', 'ebike']]]],
        layout: { visibility: showCollisionPins ? 'visible' : 'none' },
        paint: {
          'circle-color': [
            'case',
            ['get', 'isFatal'],
            '#047857',
            ['get', 'isSevere'],
            '#059669',
            '#10b981',
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 4.4,
            12, 6.8,
            16, 10.5,
          ],
          'circle-opacity': 0.98,
          'circle-stroke-width': 2.0,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 1.0,
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

      // Click any unclustered accident point (Bicycles top priority, Motorcycles middle, Cars last)
      const accidentLayers = ['crashes-bicycles', 'crashes-motorcycles', 'crashes-cars'];
      accidentLayers.forEach((layerId) => {
        map.on('click', layerId, (e) => {
          const feature = e.features && e.features[0];
          if (!feature) return;

          const p = feature.properties;
          const coords = feature.geometry.coordinates;

          setActivePopupData(p);
          setActiveRoadData(null);
          setActiveRegionData(null);
          if (onSelectIncident) onSelectIncident(p.id);

          map.easeTo({
            center: coords,
            zoom: Math.max(map.getZoom(), 13.5),
            duration: 600,
          });
        });

        map.on('mouseenter', layerId, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerId, () => {
          map.getCanvas().style.cursor = '';
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

      if (map.getLayer('bike-lanes-core')) {
        map.setLayoutProperty('bike-lanes-core', 'visibility', showBikeLanes ? 'visible' : 'none');
      }
      if (map.getLayer('danger-roads-glow')) {
        map.setFilter('danger-roads-glow', dynamicDangerRoadFilter);
        map.setLayoutProperty('danger-roads-glow', 'visibility', showDangerousRoads && (dangerRoadNames.length > 0) ? 'visible' : 'none');
      }
      if (map.getLayer('danger-roads-core')) {
        map.setFilter('danger-roads-core', dynamicDangerRoadFilter);
        map.setLayoutProperty('danger-roads-core', 'visibility', showDangerousRoads && (dangerRoadNames.length > 0) ? 'visible' : 'none');
      }
      if (map.getLayer('crashes-heat')) {
        map.setLayoutProperty('crashes-heat', 'visibility', showSafetyRegions ? 'visible' : 'none');
      }
      if (map.getLayer('crashes-clusters')) {
        map.setLayoutProperty('crashes-clusters', 'visibility', showCollisionPins ? 'visible' : 'none');
      }
      if (map.getLayer('crashes-cluster-count')) {
        map.setLayoutProperty('crashes-cluster-count', 'visibility', showCollisionPins ? 'visible' : 'none');
      }
      if (map.getLayer('crashes-cluster-fatal-halo')) {
        map.setLayoutProperty('crashes-cluster-fatal-halo', 'visibility', showCollisionPins ? 'visible' : 'none');
      }
      ['crashes-cars', 'crashes-motorcycles', 'crashes-bicycles', 'crashes-bicycles-halo'].forEach((id) => {
        if (map.getLayer(id)) {
          map.setLayoutProperty(id, 'visibility', showCollisionPins ? 'visible' : 'none');
        }
      });
      ['tier1', 'tier2', 'tier3'].forEach((t) => {
        if (map.getLayer(`danger-${t}-glow`)) {
          map.setLayoutProperty(`danger-${t}-glow`, 'visibility', showDangerousRoads ? 'visible' : 'none');
        }
        if (map.getLayer(`danger-${t}-core`)) {
          map.setLayoutProperty(`danger-${t}-core`, 'visibility', showDangerousRoads ? 'visible' : 'none');
        }
      });
    }
  }, [mapLoaded, geojsonData, safetyRegionsGeoJson, tier1Filter, tier2Filter, tier3Filter, tier1Names.length, tier2Names.length, tier3Names.length, showCollisionPins, showSafetyRegions, showBikeLanes, showDangerousRoads, onSelectIncident]);

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
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-white/95 backdrop-blur-md max-w-xs text-xs pointer-events-auto shadow-xs">
        <div className="font-bold text-slate-900 mb-2 flex items-center justify-between gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Shield className={`w-3.5 h-3.5 ${selectedMode === 'bicycle' ? 'text-emerald-600' : selectedMode === 'motorcycle' ? 'text-purple-600' : 'text-sky-600'}`} />
            <span className="font-bold">
              {selectedMode === 'bicycle' 
                ? 'Cycling Safety Radar' 
                : selectedMode === 'motorcycle' 
                ? 'Motorcycle Safety Radar' 
                : selectedMode === 'car' 
                ? 'Reckless Driver Conflict Radar' 
                : 'State Crash Radar (All Modes)'}
            </span>
          </div>
          {selectedMode === 'bicycle' && (
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase tracking-wider">
              Bikes Only
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-[11px]">
          {/* Corridors */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
            <span className="text-rose-900 font-bold">
              {selectedMode === 'bicycle' ? 'High-Risk Cycling Corridor' : 'Critical Hazard Corridor'}
            </span>
          </div>

          {/* Cycling Infrastructure */}
          {showBikeLanes && (
            <div className="flex items-center gap-2 pt-0.5 border-t border-slate-100">
              <span className="w-4 h-0.5 border-b-2 border-dashed border-emerald-600 shrink-0"></span>
              <span className="text-emerald-800 font-medium">Designated Bike Lane</span>
            </div>
          )}

          {/* Incident Pins */}
          {showCollisionPins && (
            <div className="pt-1.5 border-t border-slate-100 space-y-1.5">
              {selectedMode === 'bicycle' ? (
                <>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-xs shrink-0"></span>
                      <span className="text-emerald-900 font-bold">🚲 Verified Bicycle Casualty</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Bikes Only</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
                    <span>Filtering: Exclusively plotting verified bicycle and e-bike casualties.</span>
                  </div>
                </>
              ) : selectedMode === 'motorcycle' ? (
                <>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-xs shrink-0"></span>
                      <span className="text-purple-900 font-bold">🏍️ Motorcycle Collision</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">Moto Only</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
                    <span>Filtering: Exclusively plotting verified motorcycle incidents.</span>
                  </div>
                </>
              ) : selectedMode === 'car' ? (
                <>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0"></span>
                      <span className="text-rose-900 font-bold">🚗 Reckless Motorist Crash</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">Cars Only</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
                    <span>Plotting reckless motorist collision hotspots & speed disparity.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Accident Differentiation:
                  </div>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-xs shrink-0"></span>
                      <span className="text-emerald-900 font-bold">🚲 Bicycle Accidents</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Top Layer</span>
                  </div>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600 border border-white shrink-0"></span>
                      <span className="text-purple-900 font-medium">🏍️ Motorcycle Accidents</span>
                    </div>
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">Mid Layer</span>
                  </div>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400/80 shrink-0"></span>
                      <span className="text-rose-900 font-normal text-[10px]">🚗 Car Accidents</span>
                    </div>
                    <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">Last (Backdrop)</span>
                  </div>
                </>
              )}
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

      {/* FLOATING ACTIVE DANGER ROAD INSPECTOR */}
      {activeRoadData && !activePopupData && !activeRegionData && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 animate-in fade-in duration-200 pointer-events-auto text-slate-800">
          <div className="flex items-start justify-between gap-2 mb-2 pb-1">
            <div className="flex items-center gap-2">
              <span 
                className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{
                  backgroundColor: activeRoadData.tierColor ? `${activeRoadData.tierColor}18` : '#fef2f2',
                  color: activeRoadData.tierColor || '#dc2626'
                }}
              >
                <Flame className="w-3 h-3" /> {activeRoadData.tierLabel || 'Dangerous Road Corridor'}
              </span>
              {activeRoadData.ref && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  {activeRoadData.ref}
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveRoadData(null)}
              className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
            {activeRoadData.name}
          </h3>

          {activeRoadData.crashes > 0 && (
            <div className="grid grid-cols-4 gap-1.5 mb-2.5 text-center">
              {/* 1. BICYCLE ACCIDENTS (FIRST PRIORITY) */}
              <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[9px] text-emerald-800 block uppercase font-bold flex items-center justify-center gap-0.5">
                  <span>🚲</span> Bikes
                </span>
                <span className="text-base font-black text-emerald-700">
                  {activeRoadData.bikeCrashes || 0}
                </span>
                <span className="text-[8px] text-emerald-600 font-semibold block uppercase">1st Priority</span>
              </div>

              {/* 2. MOTORCYCLE ACCIDENTS (SECOND PRIORITY) */}
              <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100">
                <span className="text-[9px] text-purple-800 block uppercase font-bold flex items-center justify-center gap-0.5">
                  <span>🏍️</span> Moto
                </span>
                <span className="text-base font-black text-purple-700">
                  {activeRoadData.motorcycleCrashes || 0}
                </span>
                <span className="text-[8px] text-purple-600 font-semibold block uppercase">2nd Priority</span>
              </div>

              {/* 3. CAR ACCIDENTS (LAST PRIORITY - HAZARD CONTEXT) */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[9px] text-slate-600 block uppercase font-bold flex items-center justify-center gap-0.5">
                  <span>🚗</span> Cars
                </span>
                <span className="text-base font-black text-slate-700">
                  {activeRoadData.carCrashes || 0}
                </span>
                <span className="text-[8px] text-slate-400 font-semibold block uppercase">Last (Hazard)</span>
              </div>

              {/* 4. FATALITIES */}
              <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="text-[9px] text-rose-800 block uppercase font-bold flex items-center justify-center gap-0.5">
                  <span>💀</span> Fatal
                </span>
                <span className={`text-base font-black ${activeRoadData.fatalities > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                  {activeRoadData.fatalities || 0}
                </span>
                <span className="text-[8px] text-rose-600 font-semibold block uppercase">Casualties</span>
              </div>
            </div>
          )}

          {/* Contextual Reckless Motorist Alert */}
          {activeRoadData.carCrashes > 0 && (
            <div className="bg-rose-50/70 border-l-2 border-rose-400 rounded-r-xl p-2 mb-2 text-[11px] text-rose-900 leading-snug">
              <span className="font-bold flex items-center gap-1">
                <Car className="w-3 h-3 text-rose-600" /> Reckless Driver Conflict:
              </span>
              <span className="text-slate-700 mt-0.5 block">
                {activeRoadData.carCrashes} recorded car collisions along this corridor indicate frequent speeding, red-light running, and turning conflicts across travel lanes.
              </span>
            </div>
          )}

          <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-700 space-y-1 mb-2.5">
            <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Primary Crash Factor:
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeRoadData.dominantConflict || 'High Collision Frequency Corridor based on official CCRS records.'}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
            <span>Official State Crash Radar</span>
            <span className="text-rose-600 font-semibold">Live Road Highlight</span>
          </div>
        </div>
      )}

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

              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 ${
                  activePopupData.mode === 'bicycle' || activePopupData.mode === 'ebike'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : activePopupData.mode === 'motorcycle'
                    ? 'bg-purple-50 text-purple-800 border border-purple-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <span>
                  {activePopupData.mode === 'bicycle' || activePopupData.mode === 'ebike'
                    ? '🚲 Bicycle Accident (1st Priority)'
                    : activePopupData.mode === 'motorcycle'
                    ? '🏍️ Motorcycle Accident (2nd Priority)'
                    : '🚗 Car Collision (Last Priority • Hazard Context)'}
                </span>
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
