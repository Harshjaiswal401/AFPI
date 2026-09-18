import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, Sparkles, ArrowUpRight, Plane, Info, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area
} from 'recharts';
import { INDIAN_ROUTES, getRouteByCode, generate90DaySeries } from '../data/indianRoutes';

const LightTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-card-lg p-3 text-xs space-y-1">
      <div className="font-semibold text-slate-700">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-900">{p.value ? `₹${p.value.toLocaleString()}` : '—'}</span>
        </div>
      ))}
    </div>
  );
};

export const RouteAnalysis = ({ initialRoute = 'DEL-BOM', dateRangePreset = '30', refreshTriggerKey = 0 }) => {
  const [selectedRouteCode, setSelectedRouteCode] = useState(initialRoute);

  // Sync state if initialRoute changes
  React.useEffect(() => {
    setSelectedRouteCode(initialRoute);
  }, [initialRoute]);

  const routeMeta = useMemo(() => getRouteByCode(selectedRouteCode), [selectedRouteCode]);

  const rawData = useMemo(() => {
    return generate90DaySeries(selectedRouteCode, 90);
  }, [selectedRouteCode, refreshTriggerKey]);

  const trajectoryData = useMemo(() => {
    const daysLimit = dateRangePreset === '7' ? 7 : dateRangePreset === '90' ? 90 : 30;
    return rawData.slice(rawData.length - daysLimit);
  }, [rawData, dateRangePreset]);

  // Inventory rows based on selected route
  const inventory = useMemo(() => {
    const base = routeMeta.lowestFare;
    return [
      { flight: '6E 205', depArr: '06:10 – 08:20', carrier: 'IndiGo', fare: base, tag: 'Lowest Fare', tagCls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
      { flight: 'UK 933', depArr: '07:30 – 09:45', carrier: 'Vistara', fare: Math.round(base * 1.25), tag: 'Normal Slot', tagCls: 'bg-slate-100 text-slate-500 border-slate-200' },
      { flight: 'AI 865', depArr: '10:00 – 12:15', carrier: 'Air India', fare: Math.round(base * 1.15), tag: 'Normal Slot', tagCls: 'bg-slate-100 text-slate-500 border-slate-200' },
      { flight: '6E 5012', depArr: '17:15 – 19:30', carrier: 'IndiGo', fare: Math.round(base * 1.55), tag: 'Peak Evening', tagCls: 'bg-amber-50 text-amber-700 border-amber-100' },
      { flight: 'UK 995', depArr: '18:45 – 21:00', carrier: 'Vistara', fare: Math.round(base * 1.9), tag: 'High Demand', tagCls: 'bg-rose-50 text-rose-700 border-rose-100' },
    ];
  }, [routeMeta]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* Corridor Selector Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
                Corridor Deep Analysis · Real-Time GDS Telemetry
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-mono font-semibold">
                Node #8841
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <select
                value={selectedRouteCode}
                onChange={(e) => setSelectedRouteCode(e.target.value)}
                className="text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
              >
                {INDIAN_ROUTES.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.code} — {r.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Deep parity analysis, carrier dispersion, and yield intelligence (September 2026)
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            {[[`${routeMeta.distance_km} km`, 'Air Distance'], [routeMeta.block_time, 'Block Time'], [`${routeMeta.daily_flights} flights`, 'Daily Scheduled']].map(([v, l], i) => (
              <div key={i} className={i ? 'border-l border-slate-200 pl-6' : ''}>
                <div className="text-[10px] text-slate-400 uppercase">{l}</div>
                <div className="font-bold text-slate-900 text-sm">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Market share bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-slate-500 uppercase tracking-wide">Capacity Market Share</span>
            <div className="flex items-center gap-3 font-mono">
              {routeMeta.airlines.map((a) => (
                <span key={a.code} style={{ color: a.color }}>
                  ● {a.name} {a.share}%
                </span>
              ))}
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
            {routeMeta.airlines.map((a) => (
              <div key={a.code} className="h-full" style={{ width: `${a.share}%`, backgroundColor: a.color }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Avg Fare', value: `₹${routeMeta.medianFare.toLocaleString()}`, badge: `${routeMeta.changePct > 0 ? '+' : ''}${routeMeta.changePct}%`, up: routeMeta.changePct > 0, sub: `Corridor Volatility: ${routeMeta.volatility} σ` },
          { label: 'Lowest Available', value: `₹${routeMeta.lowestFare.toLocaleString()}`, badge: 'Competitive', up: false, sub: `${routeMeta.airlines[0]?.name || 'IndiGo'} 6E-205 · 06:10 AM` },
          { label: 'Median Peak Fare', value: `₹${routeMeta.peakFare.toLocaleString()}`, badge: 'Evening Peak', up: true, sub: `${routeMeta.airlines[1]?.name || 'Vistara'} UK-995 · 18:45 PM` },
          { label: 'Corridor Type', value: routeMeta.corridor_type, badge: 'Monitored', up: null, sub: `DGCA Tariff Band Level-1` },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{c.label}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border font-mono ${
                c.up == null ? 'bg-slate-100 text-slate-500 border-slate-200'
                  : c.up ? 'bg-rose-50 text-rose-600 border-rose-100'
                         : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>{c.badge}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 font-mono tracking-tight">{c.value}</div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Fare Trajectory + Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Historical Fare Trajectory ({selectedRouteCode})</h2>
              <p className="text-[11px] text-slate-500">Continuous daily fare progression leading up to Sep 19, 2026</p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">90-Day Continuous Series</span>
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F4FBF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1F4FBF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#DFE5EF" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#66748F' }} interval={Math.ceil(trajectoryData.length / 8)} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#66748F' }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip content={<LightTooltip />} />
                <Area type="monotone" dataKey="fare" name="Average Fare" stroke="#1F4FBF" strokeWidth={2} fillOpacity={1} fill="url(#areaColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Buy/Wait recommendation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-card text-white flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-saffron-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Intelligence Signal
              </span>
              <span className="text-[10px] font-mono text-slate-400">September 2026</span>
            </div>

            <div className="mt-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Yield Recommendation</span>
              <h3 className="text-xl font-bold text-emerald-400 mt-0.5">BUY RECOMMENDED</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Fare trajectory on {selectedRouteCode} is currently operating near lowest 14-day median. Advance booking window presents minimal risk of further downward adjustment.
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-3 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Optimal Window:</span>
              <span className="text-white font-bold">14 - 21 Days Prior</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Surge Probability:</span>
              <span className="text-amber-400 font-bold">78% High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carrier Dispersion & Live Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Carrier Dispersion */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">Carrier Fare Dispersion Matrix</h3>
            <span className="text-[10px] font-mono text-slate-400">Current Active Sweeps</span>
          </div>

          <div className="space-y-3">
            {routeMeta.airlines.map((a) => (
              <div key={a.code} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900" style={{ color: a.color }}>
                    ● {a.name} ({a.code})
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{a.flights} flights/day</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>Min: ₹{a.min.toLocaleString()}</span>
                  <span>Mean: ₹{a.mean.toLocaleString()}</span>
                  <span>Max: ₹{a.max.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Inventory Snapshots */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">Live Flight Inventory Snapshots</h3>
            <span className="text-[10px] font-mono text-emerald-600">Live Stream Active</span>
          </div>

          <div className="space-y-2">
            {inventory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center font-mono font-bold text-blue-700 text-[10px]">
                    {item.flight}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{item.carrier} · {item.depArr}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Verified GDS Seat Bucket</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">₹{item.fare.toLocaleString()}</div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono font-semibold ${item.tagCls}`}>
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
