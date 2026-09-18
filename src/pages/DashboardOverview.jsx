import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Download,
  FileDown,
  Filter,
  Plane,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Wifi,
  Zap,
} from 'lucide-react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { api } from '../services/api';

/*
  AeroIndex — Dashboard Overview
  Same layout as before, restyled to the shared navy / saffron light theme
  so it matches every other page.
*/

const C = {
  blue: '#1F4FBF',
  saffron: '#F58A1F',
  green: '#138808',
  amber: '#E0730B',
  red: '#DC2626',
  grid: '#DFE5EF',
  tick: '#66748F',
};

const badgeStyles = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
  amber: 'bg-saffron-50 text-saffron-700 border-saffron-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
};

function StatCard({ label, value, sub, badge, badgeColor = 'blue', icon: Icon, accent = C.blue }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-md">
      <div className="absolute left-0 top-0 h-full w-[3px]" style={{ background: accent }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: `${accent}14` }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
            </div>
          )}
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </span>
        </div>

        {badge && (
          <span className={`rounded-full border px-1.5 py-0.5 font-mono text-[10px] font-semibold ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-[28px] font-bold tracking-tight text-slate-900">{value}</span>
      </div>

      {sub && (
        <div className="mt-3 border-t border-slate-100 pt-2.5 text-[11px] leading-relaxed text-slate-500">
          {sub}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, action }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {eyebrow}
          </div>
        )}
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {sub && <p className="mt-0.5 text-[11px] text-slate-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[170px] rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-card-lg">
      <div className="mb-1.5 font-semibold text-slate-700">{label}</div>

      {payload.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
            {item.name === 'fare' ? 'Average fare' : 'API index'}
          </div>
          <span className="font-mono font-bold text-slate-900">
            {item.name === 'fare'
              ? `₹${Number(item.value || 0).toLocaleString()}`
              : `${item.value} pts`}
          </span>
        </div>
      ))}
    </div>
  );
};

export const DashboardOverview = ({ onNavigate }) => {
  const [granularity, setGranularity] = useState('Daily');
  const [showFare, setShowFare] = useState(true);
  const [showIndex, setShowIndex] = useState(true);
  const [trendData, setTrendData] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);
  const [routeFilter, setRouteFilter] = useState('');

  const loadTrend = async () => {
    try {
      setIsRefreshing(true);
      const response = await api.getTrend();
      if (response?.data) setTrendData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTrend();
  }, []);

  const handleScrape = async () => {
    setIsScraping(true);

    try {
      const response = await api.triggerScraper();

      setToast(
        `Scrape batch ${response?.job_id || 'SCR-8909'} completed — new fare buckets verified.`
      );

      setTimeout(() => setToast(null), 5000);
      await loadTrend();
    } catch (error) {
      console.error(error);
      setToast('Scraper request failed. Check the pipeline monitor.');
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsScraping(false);
    }
  };

  const filteredRoutes = useMemo(() => {
    const rows = [
      { pair: 'DEL ⇄ BOM', freq: '64 flights/day', fare: '₹5,850', tag: 'High volume', route: 'DEL-BOM' },
      { pair: 'BLR ⇄ DEL', freq: '48 flights/day', fare: '₹6,200', tag: 'High volume', route: 'BLR-DEL' },
      { pair: 'BOM ⇄ BLR', freq: '38 flights/day', fare: '₹4,120', tag: 'Normal', route: 'BOM-BLR' },
    ];

    if (!routeFilter.trim()) return rows;

    return rows.filter((row) =>
      `${row.pair} ${row.route}`.toLowerCase().includes(routeFilter.toLowerCase())
    );
  }, [routeFilter]);

  const movements = [
    { route: 'DEL ⇄ BOM', carrier: 'IndiGo', code: '6E', prev: 4299, curr: 5850, chg: '+38.1%', ago: '12m', up: true },
    { route: 'BLR ⇄ DEL', carrier: 'Vistara', code: 'UK', prev: 7100, curr: 6200, chg: '−12.7%', ago: '28m', up: false },
    { route: 'BOM ⇄ GOI', carrier: 'Air India', code: 'AI', prev: 3999, curr: 4150, chg: '+3.8%', ago: '41m', up: true },
    { route: 'HYD ⇄ DEL', carrier: 'SpiceJet', code: 'SG', prev: 4800, curr: 6500, chg: '+35.4%', ago: '1h', up: true },
  ];

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl space-y-6 p-6">

        {/* PAGE INTRO */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                National Overview · Live Monitor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                System Live
              </span>
            </div>

            <h1 className="text-xl font-bold text-slate-900">Airfare Price Intelligence</h1>

            <p className="mt-0.5 max-w-2xl text-xs text-slate-500">
              A live view of fare movement, route activity and the national airfare price index.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              onClick={loadTrend}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={handleScrape}
              disabled={isScraping}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isScraping ? 'animate-spin' : ''}`} />
              {isScraping ? 'Running…' : 'Run Scraper'}
            </button>

            <button
              onClick={() => api.downloadDGCAExport()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300"
            >
              <FileDown className="h-3.5 w-3.5 text-blue-500" />
              Export
            </button>
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              {toast}
            </div>
            <button onClick={() => setToast(null)} className="font-mono text-emerald-500">✕</button>
          </div>
        )}

        {/* KPI STRIP */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="National Avg Fare"
            value="₹5,420"
            badge="−2.4% / 7d"
            badgeColor="emerald"
            sub="Weighted across 142 monitored routes"
            icon={Plane}
            accent={C.blue}
          />
          <StatCard
            label="Airfare Price Index"
            value="118.6"
            badge="+1.8 WoW"
            badgeColor="amber"
            sub="Jan 2024 baseline = 100.00"
            icon={TrendingUp}
            accent={C.saffron}
          />
          <StatCard
            label="Monitored Corridors"
            value="142"
            badge="Active"
            badgeColor="blue"
            sub="6 key domestic hubs · 4 carriers"
            icon={Activity}
            accent={C.blue}
          />
          <StatCard
            label="Pipeline Ingestion"
            value="184,290"
            badge="99.4% valid"
            badgeColor="emerald"
            sub="Records processed across OTA sources"
            icon={Wifi}
            accent={C.green}
          />
        </div>

        {/* QUICK MARKET PULSE */}
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card md:grid-cols-4">
          {[
            ['Lowest tracked fare', '₹2,180', 'BLR → HYD'],
            ['Largest move', '+38.1%', 'DEL → BOM'],
            ['Data freshness', '04 min', 'Latest batch'],
            ['Active sources', '09', 'Airlines + OTAs'],
          ].map(([label, value, sub], i) => (
            <div key={label} className={i ? 'border-l border-slate-200 pl-4' : ''}>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
              <div className="mt-1 font-mono text-base font-bold text-slate-900">{value}</div>
              <div className="mt-0.5 text-[10px] text-slate-500">{sub}</div>
            </div>
          ))}
        </div>

        {/* CHART + ROUTES */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card xl:col-span-2">
            <SectionHeader
              eyebrow="Market movement"
              title="National airfare trend"
              sub="90-day composite fare compared with the normalised API"
              action={
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={showFare}
                      onChange={(e) => setShowFare(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ background: C.blue }} />
                    Fare
                  </label>

                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={showIndex}
                      onChange={(e) => setShowIndex(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ background: C.saffron }} />
                    Index
                  </label>

                  <div className="flex rounded-lg bg-slate-100 p-0.5 text-[11px]">
                    {['Daily', 'Weekly', 'Monthly'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setGranularity(item)}
                        className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                          granularity === item
                            ? 'bg-white text-slate-800 shadow'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              }
            />

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-saffron-50 px-3 py-1 text-[11px] font-medium text-saffron-700">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
              Festive surge window · Oct 28 — Nov 04
            </div>

            <div className="mt-3 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 8, right: 8, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fareAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: C.tick }}
                    interval={12}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: C.tick }}
                    domain={[3000, 8500]}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: C.tick }}
                    domain={[80, 150]}
                  />
                  <Tooltip content={<ChartTooltip />} />

                  {showFare && (
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="fare"
                      name="fare"
                      stroke={C.blue}
                      strokeWidth={2.25}
                      fill="url(#fareAreaGradient)"
                    />
                  )}

                  {showIndex && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="index"
                      name="index"
                      stroke={C.saffron}
                      strokeWidth={2.25}
                      dot={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
            <SectionHeader
              eyebrow="Route monitor"
              title="Corridor activity"
              sub="Selected high-frequency domestic corridors"
              action={<Filter className="h-3.5 w-3.5 text-slate-400" />}
            />

            {/* Corridor filter */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={routeFilter}
                onChange={(event) => setRouteFilter(event.target.value)}
                placeholder="Filter corridors e.g. DEL-BOM"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div className="mt-3 space-y-2">
              {filteredRoutes.map((row) => (
                <button
                  key={row.route}
                  onClick={() => onNavigate('route', row.route)}
                  className="group w-full rounded-lg border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{row.pair}</div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">{row.freq}</div>
                    </div>

                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2">
                    <span className="font-mono text-sm font-bold text-slate-900">{row.fare}</span>
                    <span
                      className={`rounded border px-1.5 py-0.5 font-mono text-[9px] font-semibold ${
                        row.tag === 'High volume'
                          ? 'border-blue-100 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-500'
                      }`}
                    >
                      {row.tag}
                    </span>
                  </div>
                </button>
              ))}

              {filteredRoutes.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">
                  No matching corridor
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('route')}
              className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
            >
              Open route analytics
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </section>
        </div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* MOVEMENTS */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card xl:col-span-2">
            <SectionHeader
              eyebrow="Anomaly watch"
              title="Recent fare movements"
              sub="Intra-day changes crossing the configured monitoring threshold"
              action={
                <button
                  onClick={() => onNavigate('route')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  View all
                </button>
              }
            />

            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    <th className="py-3">Route</th>
                    <th className="py-3">Carrier</th>
                    <th className="py-3 text-right">Previous</th>
                    <th className="py-3 text-right">Current</th>
                    <th className="py-3 text-right">Change</th>
                    <th className="py-3 text-right">Seen</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {movements.map((row) => (
                    <tr key={`${row.route}-${row.code}`} className="table-row-hover transition-colors">
                      <td className="py-3 font-bold text-slate-900">{row.route}</td>
                      <td className="py-3 text-slate-600">
                        {row.carrier}
                        <span className="ml-1 font-mono text-[10px] text-slate-400">({row.code})</span>
                      </td>
                      <td className="py-3 text-right font-mono text-slate-400">
                        ₹{row.prev.toLocaleString()}
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-slate-900">
                        ₹{row.curr.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                            row.up
                              ? 'border-rose-100 bg-rose-50 text-rose-600'
                              : 'border-emerald-100 bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          {row.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {row.chg}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono text-[11px] text-slate-400">{row.ago}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* OPERATIONS */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
            <SectionHeader
              eyebrow="Operations"
              title="Control room"
              sub="Shortcuts for the daily workflow"
            />

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                {
                  label: 'Search route',
                  sub: 'Open corridor',
                  color: C.blue,
                  icon: <ChevronRight className="h-3 w-3" />,
                  onClick: () => onNavigate('route', 'DEL-BOM'),
                },
                {
                  label: 'Instant scrape',
                  sub: 'Priority O&Ds',
                  color: C.saffron,
                  icon: <Zap className="h-3 w-3" />,
                  onClick: handleScrape,
                },
                {
                  label: 'Configure alerts',
                  sub: 'Surge margins',
                  color: C.amber,
                  icon: <SlidersHorizontal className="h-3 w-3" />,
                  onClick: () => onNavigate('settings'),
                },
                {
                  label: 'DGCA report',
                  sub: 'Export dataset',
                  color: C.green,
                  icon: <Download className="h-3 w-3" />,
                  onClick: () => api.downloadDGCAExport(),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-slate-300 hover:bg-white hover:shadow-card"
                >
                  <div
                    className="flex items-center justify-between text-[11px] font-bold"
                    style={{ color: item.color }}
                  >
                    {item.label}
                    {item.icon}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">{item.sub}</div>
                </button>
              ))}
            </div>

            {/* pipeline health */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Pipeline health
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-600">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Operational
                </span>
              </div>

              {[
                ['Collection workers', '12 / 12', 100],
                ['Validation queue', '96%', 96],
                ['Source availability', '9 / 10', 90],
              ].map(([label, value, width]) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-mono font-semibold text-slate-700">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* TELEMETRY FOOTER */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Live telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold text-emerald-600">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
              STREAMING
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              ['WORKER #04', 'DEL-BLR sweep', '1,240 records ingested', '4m ago', C.green],
              ['INDEX #884', 'National API', '118.6 pts · +1.8 WoW', '14m ago', C.blue],
              ['ANOMALY', 'DEL-BOM · 6E-204', '+38.1% vs 7d mean', '28m ago', C.red],
            ].map(([type, route, detail, ago, color]) => (
              <div
                key={type}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] font-semibold tracking-wider" style={{ color }}>
                    {type}
                  </div>
                  <div className="mt-0.5 text-xs font-bold text-slate-900">{route}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">{detail}</div>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-400">{ago}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
