import React, { useState, useMemo, useEffect } from 'react';
import { seededRandom, hashString } from '../utils/seededRandom';
import { Download, Calendar, AlertTriangle } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, LineChart, Line
} from 'recharts';
import { INDIAN_ROUTES, getRouteByCode, generate90DaySeries } from '../data/indianRoutes';
import { api } from '../services/api';

const LightTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-card-lg p-3 text-xs space-y-1">
      <div className="font-semibold text-slate-700">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-900">₹{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export const FareHistory = ({ initialRoute = 'DEL-BOM', dateRangePreset = '30', refreshTriggerKey = 0 }) => {
  const [route, setRoute] = useState(initialRoute);

  useEffect(() => {
    setRoute(initialRoute);
  }, [initialRoute]);

  const routeMeta = useMemo(() => getRouteByCode(route), [route]);

  // Generate 90-day trajectory data leading up to September 19, 2026
  const rawData = useMemo(() => {
    return generate90DaySeries(route, 90);
  }, [route, refreshTriggerKey]);

  const fareData = useMemo(() => {
    const daysLimit = dateRangePreset === '7' ? 7 : dateRangePreset === '90' ? 90 : 60;
    return rawData.slice(rawData.length - daysLimit);
  }, [rawData, dateRangePreset]);

  const summaryStats = [
    { label: 'Observed Avg', value: `₹${routeMeta.medianFare.toLocaleString()}`, badge: 'Composite', badgeCls: 'bg-slate-100 text-slate-500 border-slate-200' },
    { label: 'Historical High', value: `₹${routeMeta.peakFare.toLocaleString()}`, badge: 'Sep 2026 Peak', badgeCls: 'bg-rose-50 text-rose-600 border-rose-100' },
    { label: 'Historical Low', value: `₹${routeMeta.lowestFare.toLocaleString()}`, badge: 'Sep 03', badgeCls: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Surge Days', value: '8 / 90', badge: '+35%+ events', badgeCls: 'bg-amber-50 text-amber-600 border-amber-100' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
            90-Day Audit Log · Historical Fare Ledger (Sep 2026)
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">Fare History Ledger — {routeMeta.name}</h1>
          <p className="text-xs text-slate-500">Multi-carrier fare trajectory analysis with surge event annotation</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Route selector */}
          <select
            value={route}
            onChange={e => setRoute(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 font-mono"
          >
            {INDIAN_ROUTES.map(r => (
              <option key={r.code} value={r.code}>{r.code} — {r.name}</option>
            ))}
          </select>

          <button onClick={() => api.downloadDGCAExport()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-colors">
            <Download className="w-3.5 h-3.5 text-blue-500" />Export CSV
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{s.label}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border font-mono ${s.badgeCls}`}>{s.badge}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 tracking-tight font-mono">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Multi-Carrier Historical Trajectory ({route})</h2>
            <p className="text-[11px] text-slate-500">Continuous daily fare progression leading up to Sep 19, 2026</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">DGCA Node #8841</span>
        </div>

        <div className="h-[280px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE5EF" vertical={false} />
              <XAxis dataKey="date" stroke="#66748F" tick={{ fontSize: 10, fill: '#66748F' }} tickLine={false} interval={Math.ceil(fareData.length / 10)} />
              <YAxis stroke="#66748F" tick={{ fontSize: 10, fill: '#66748F' }} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip content={<LightTooltip />} />
              <Line type="monotone" dataKey="indigo" name="IndiGo" stroke="#1F4FBF" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="airIndia" name="Air India" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="vistara" name="Vistara" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="akasa" name="Akasa Air" stroke="#F58A1F" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
