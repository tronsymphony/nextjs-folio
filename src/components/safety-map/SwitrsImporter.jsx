'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Database, 
  Download, 
  ExternalLink,
  Zap,
  Calendar
} from 'lucide-react';

const CCRS_ANNUAL_FILES = [
  { year: '2026', id: 'b8ce0ca4-b4e9-490d-b4d1-1f4ec48cbefb', name: 'crashes_2026.csv', label: '2026 (Live)' },
  { year: '2025', id: '9f4fc839-122d-4595-a146-43bc4ed16f46', name: 'crashes_2025.csv', label: '2025' },
  { year: '2024', id: 'f775df59-b89b-4f82-bd3d-8807fa3a22a0', name: 'crashes_2024.csv', label: '2024' },
  { year: '2023', id: '436642c0-cd04-4a4c-b45e-564b66437476', name: 'crashes_2023.csv', label: '2023' },
  { year: '2022', id: '7828780b-117b-455e-9275-986ad3ffde50', name: 'crashes_2022.csv', label: '2022' },
  { year: '2021', id: 'd08692e2-6d36-487e-bca0-28cd127a626f', name: 'crashes_2021.csv', label: '2021' },
  { year: '2020', id: 'a2e0605d-0695-4bce-806d-4d0dda7ace68', name: 'crashes_2020.csv', label: '2020' },
  { year: '2019', id: '2b4c7d03-e684-435e-80da-17935de9499f', name: 'crashes_2019.csv', label: '2019' },
  { year: '2018', id: 'a4b57216-5110-43d3-884c-d95366b19158', name: 'crashes_2018.csv', label: '2018' },
  { year: '2017', id: '4784664d-b7cf-4427-af25-7c7307bad56c', name: 'crashes_2017.csv', label: '2017' },
  { year: '2016', id: '3d5f2586-cf68-4213-aa1c-60df37399d10', name: 'crashes_2016.csv', label: '2016' },
];

export default function SwitrsImporter({ onImportSuccess, onClose }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [importStats, setImportStats] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingLiveYear, setLoadingLiveYear] = useState(null);

  // Parse SWITRS / CCRS CSV line by line
  const parseSwitrsCSV = (csvText) => {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) throw new Error('File is empty or missing data rows');

    // Parse header
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, '').toUpperCase());

    // Locate column indices with full support for data.ca.gov/dataset/ccrs CSV headers
    const latIdx = headers.findIndex((h) => ['LATITUDE', 'POINT_Y', 'LAT', 'Y'].includes(h));
    const lonIdx = headers.findIndex((h) => ['LONGITUDE', 'POINT_X', 'LON', 'LNG', 'X'].includes(h));
    const caseIdIdx = headers.findIndex((h) => ['COLLISION ID', 'REPORT NUMBER', 'CASE_ID', 'CASEID', 'DR_NO', 'ID'].includes(h));
    const dateIdx = headers.findIndex((h) => ['CRASH DATE TIME', 'COLLISION_DATE', 'COLLISION_DATE_OCC', 'DATE_OCC', 'DATE'].includes(h));
    const primaryRdIdx = headers.findIndex((h) => ['PRIMARYROAD', 'PRIMARY_ROAD', 'PRIMARY ROAD', 'PRIMARY_RD', 'LOCATION', 'STREET'].includes(h));
    const secondaryRdIdx = headers.findIndex((h) => ['SECONDARYROAD', 'SECONDARY_ROAD', 'SECONDARY ROAD', 'SECONDARY_RD', 'CROSS_STREET'].includes(h));
    const killedIdx = headers.findIndex((h) => ['NUMBERKILLED', 'NUMBER KILLED', 'KILLED'].includes(h));
    const injuredIdx = headers.findIndex((h) => ['NUMBERINJURED', 'NUMBER INJURED', 'INJURED'].includes(h));
    const severityIdx = headers.findIndex((h) => ['COLLISION_SEVERITY', 'SEVERITY'].includes(h));
    const pcfIdx = headers.findIndex((h) => ['PRIMARY COLLISION FACTOR VIOLATION', 'PCF_VIOL_CATEGORY', 'PCF_VIOLATION', 'VIOLATION'].includes(h));
    const collTypeIdx = headers.findIndex((h) => ['COLLISION TYPE DESCRIPTION', 'COLLISION_TYPE'].includes(h));
    const involvedWithIdx = headers.findIndex((h) => ['MOTORVEHICLEINVOLVEDWITHDESC', 'INVOLVED WITH', 'INVOLVEDWITH'].includes(h));
    const motorcycleIdx = headers.findIndex((h) => ['MOTORCYCLE_COLLISION', 'MC_INVOLVED', 'MOTORCYCLE'].includes(h));
    const bicycleIdx = headers.findIndex((h) => ['BICYCLE_COLLISION', 'BIKE_INVOLVED', 'BICYCLE'].includes(h));

    if (latIdx === -1 || lonIdx === -1) {
      throw new Error('Could not find latitude/longitude columns (expected POINT_Y/POINT_X or LATITUDE/LONGITUDE)');
    }

    const parsedIncidents = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.trim().replace(/^["']|["']$/g, ''));

      const lat = parseFloat(cols[latIdx]);
      const lon = parseFloat(cols[lonIdx]);

      // Skip invalid coordinates
      if (isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) continue;

      const caseId = caseIdIdx !== -1 ? cols[caseIdIdx] : `CCRS-${i}`;
      const dateVal = dateIdx !== -1 ? cols[dateIdx] : '2024-01-01';
      const pRd = primaryRdIdx !== -1 ? cols[primaryRdIdx] : 'California Highway / Arterial';
      const sRd = secondaryRdIdx !== -1 ? cols[secondaryRdIdx] : '';
      const streetName = sRd ? `${pRd} & ${sRd}` : pRd;

      const killed = killedIdx !== -1 ? parseInt(cols[killedIdx] || '0', 10) : 0;
      const injured = injuredIdx !== -1 ? parseInt(cols[injuredIdx] || '0', 10) : 0;
      const sevCode = severityIdx !== -1 ? cols[severityIdx] : '3';
      const isFatal = killed > 0 || sevCode === '1' || sevCode.toLowerCase().includes('fatal');
      const isSevere = injured > 0 || sevCode === '2' || sevCode.toLowerCase().includes('severe');

      const involved = involvedWithIdx !== -1 ? cols[involvedWithIdx].toUpperCase() : '';
      const isMotorcycle = (motorcycleIdx !== -1 && ['Y', '1', 'YES', 'TRUE'].includes(cols[motorcycleIdx].toUpperCase())) || involved.includes('MOTORCYCLE');
      const isBicycle = (bicycleIdx !== -1 && ['Y', '1', 'YES', 'TRUE'].includes(cols[bicycleIdx].toUpperCase())) || involved.includes('BICYCLE');

      const pcf = pcfIdx !== -1 ? cols[pcfIdx] : 'Unsafe Speed / Turning Failure';
      const cType = collTypeIdx !== -1 ? cols[collTypeIdx] : 'Traffic Collision';

      parsedIncidents.push({
        id: `ccrs-import-${caseId}`,
        caseId: `CHP-${caseId}`,
        source: 'CHP CCRS CSV Import (data.ca.gov/dataset/ccrs)',
        street: streetName,
        coordinates: [lat, lon],
        city: 'los-angeles',
        mode: isBicycle ? 'bicycle' : 'motorcycle',
        severity: isFatal ? 'fatal' : isSevere ? 'severe_injury' : 'moderate',
        year: parseInt(dateVal.slice(0, 4), 10) || 2024,
        date: dateVal,
        time: 'Logged by CHP',
        timeOfDay: 'day',
        collisionType: cType,
        vehicleInvolved: isMotorcycle ? 'Motorcycle & Passenger Vehicle' : isBicycle ? 'Bicycle & Passenger Vehicle' : 'Vehicle Collision',
        factors: [`CHP Report #${caseId}`, `Primary Factor: ${pcf}`, `Collision: ${cType}`],
        speedLimit: 'Highway / Arterial',
        lighting: 'Reported',
        weather: 'Clear',
        description: `Official California Highway Patrol collision report #${caseId}. Sourced from CCRS annual dataset.`,
        safetyRecommendation: isFatal
          ? 'FATAL INCIDENT SITE: High collision energy corridor. Reduce speed and hold defensive positioning.'
          : 'High conflict intersection. Exercise heightened vigilance and cover your brakes.',
        dangerRating: isFatal ? 5 : 4,
        highInjuryNetwork: true,
        isCustomImport: true,
      });
    }

    return parsedIncidents;
  };

  const handleFile = (file) => {
    if (!file) return;
    setParsing(true);
    setErrorMsg(null);

    const reader = new FileReader();

    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          let rawList = [];

          if (Array.isArray(json)) {
            rawList = json;
          } else if (json.type === 'FeatureCollection' && Array.isArray(json.features)) {
            rawList = json.features.map((f, i) => {
              const coords = f.geometry?.coordinates || [0, 0];
              const p = f.properties || {};
              return {
                id: `geojson-${p.CASE_ID || p.id || i}`,
                caseId: p.CASE_ID || `CHP-${i}`,
                source: 'CHP CCRS GeoJSON',
                street: p.PRIMARY_RD ? `${p.PRIMARY_RD} & ${p.SECONDARY_RD || ''}` : (p.street || 'Highway Corridor'),
                coordinates: [coords[1], coords[0]],
                city: 'los-angeles',
                mode: (p.MOTORCYCLE || p.mode === 'motorcycle') ? 'motorcycle' : 'bicycle',
                severity: (p.NUMBER_KILLED > 0 || p.severity === 'fatal') ? 'fatal' : 'severe_injury',
                year: parseInt(p.ACCIDENT_YEAR || p.year, 10) || 2024,
                date: p.COLLISION_DATE || '2024-01-01',
                time: p.COLLISION_TIME || '12:00',
                timeOfDay: 'day',
                collisionType: p.TYPE_OF_COLLISION || 'Collision',
                vehicleInvolved: 'Vehicle',
                factors: ['Imported GeoJSON Incident'],
                speedLimit: '35 mph',
                lighting: 'Daylight',
                weather: 'Clear',
                description: 'Imported collision record from official CCRS GIS data.',
                safetyRecommendation: 'Exercise caution along this road segment.',
                dangerRating: 4,
                highInjuryNetwork: true,
                isCustomImport: true,
              };
            });
          }

          if (rawList.length === 0) {
            throw new Error('No valid coordinate features found in JSON file');
          }

          setImportStats({
            count: rawList.length,
            fatalCount: rawList.filter((i) => i.severity === 'fatal').length,
          });

          onImportSuccess(rawList);
        } catch (err) {
          setErrorMsg(err.message || 'Failed to parse JSON file');
        } finally {
          setParsing(false);
        }
      };
    } else {
      reader.onload = (e) => {
        try {
          const parsed = parseSwitrsCSV(e.target.result);
          if (parsed.length === 0) {
            throw new Error('No records with valid latitude/longitude coordinates could be extracted.');
          }
          setImportStats({
            count: parsed.length,
            fatalCount: parsed.filter((i) => i.severity === 'fatal').length,
          });
          onImportSuccess(parsed);
        } catch (err) {
          setErrorMsg(err.message || 'Failed to parse CSV file');
        } finally {
          setParsing(false);
        }
      };
    }

    reader.onerror = () => {
      setErrorMsg('Failed to read the file.');
      setParsing(false);
    };

    reader.readAsText(file);
  };

  const handleInstantLiveQuery = async (year) => {
    setLoadingLiveYear(year);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/chp-switrs/?year=${year}&mode=all&limit=250`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setImportStats({
          count: json.data.length,
          fatalCount: json.data.filter((i) => i.severity === 'fatal').length,
        });
        onImportSuccess(json.data);
      } else {
        throw new Error(`Could not fetch live CCRS data for ${year}. Try another year or drop downloaded CSV.`);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoadingLiveYear(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 relative animate-in fade-in zoom-in-95 duration-200 my-auto text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              California Crash Reporting System (CCRS)
            </h3>
            <p className="text-xs text-slate-500">
              Official California Highway Patrol Annual Datasets (2016–2026)
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Download annual CSV files directly from the State of California at <a href="https://data.ca.gov/dataset/ccrs" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline font-bold">data.ca.gov/dataset/ccrs</a>, or drop any exported CSV file to render all verified coordinates directly on your map.
        </p>

        {/* Annual CSV Download Grid */}
        <div className="mb-4 p-3.5 rounded-2xl bg-slate-50">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>Download Annual Crashes CSV (State Portal)</span>
            </div>
            <a
              href="https://data.ca.gov/dataset/ccrs"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-sky-600 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <span>View CCRS Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-xs">
            {CCRS_ANNUAL_FILES.map((item) => (
              <a
                key={item.year}
                href={`https://data.ca.gov/dataset/80c6a49d-c6b3-40ba-86d8-379c9741b4be/resource/${item.id}/download/${item.name}`}
                target="_blank"
                rel="noreferrer"
                download={item.name}
                className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex flex-col items-center justify-center transition-all group"
                title={`Download ${item.name} from data.ca.gov`}
              >
                <span className="font-bold text-[11px] group-hover:scale-105 transition-transform">{item.label}</span>
                <span className="text-[9px] text-slate-500 group-hover:text-sky-600 flex items-center gap-0.5">
                  CSV <Download className="w-2.5 h-2.5" />
                </span>
              </a>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            💡 Click any year above to download the raw state CSV, then drop it below. Or use Instant 1-Click Live Query below.
          </p>
        </div>

        {/* Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all ${
            dragActive
              ? 'bg-sky-50'
              : 'bg-slate-50 hover:bg-slate-100'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.geojson"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
            }}
          />

          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            {parsing ? (
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload className="w-5 h-5 text-sky-600" />
            )}
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-slate-800 block">
              {parsing ? 'Parsing CCRS Collision Records...' : 'Drop Downloaded Crashes_YYYY.csv Here'}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Directly parses official columns from data.ca.gov/dataset/ccrs
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3.5 p-3 rounded-xl bg-rose-50 text-xs text-rose-700 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {importStats && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-emerald-50 text-xs text-emerald-800 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Successfully Imported {importStats.count} Collision Records
            </div>
            <div className="text-[11px] text-slate-600">
              Found <strong>{importStats.fatalCount} fatal incidents</strong>. All coordinates rendered directly onto the map!
            </div>
          </div>
        )}

        {/* Quick Instant Live Query */}
        <div className="mt-4 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Or load directly without downloading:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {['2025', '2024', '2023'].map((yr) => (
              <button
                key={yr}
                onClick={() => handleInstantLiveQuery(yr)}
                disabled={loadingLiveYear !== null}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-[11px] transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {loadingLiveYear === yr ? (
                  <span className="w-2.5 h-2.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>⚡</span>
                )}
                <span>Load {yr}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Close
          </button>

          {importStats && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 transition-colors"
            >
              View on Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
