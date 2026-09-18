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
import { INDIAN_ROUTES, getRouteByCode, generate90DaySeries } from '../data/indianRoutes';
import { api } from '../services/api';
import { IndiaHeatmap } from '../components/dashboard/IndiaHeatmap';
import { GougingRadar } from '../components/dashboard/GougingRadar';
import { PassengerImpact } from '../components/dashboard/PassengerImpact';

const C = {
  blue: '#1F4FBF',
  saffron: '#F58A1F',
  green: '#138808',
  amber: '#E0730B',
  red: '#DC2626',
  indigo: '#1F4FBF',
  airIndia: '#EF4444',
  vistara: '#8B5CF6',
  akasa: '#F58A1F',
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

const EnrichedTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const dataItem = payload[0]?.payload;

  return (
    <div className="min-w-[210px] rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-2xl space-y-2">
      <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
        <span>{dataItem?.fullDate || label}</span>
        <span className="text-[10px] font-mono text-slate-400 font-normal">Node #8841</span>
      </div>

      <div className="space-y-1 font-mono">
        <div className="flex items-center justify-between text-blue-700 font-bold">
          <span>Average Fare:</span>
          <span>₹{Number(dataItem?.fare || 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-saffron-600 font-semibold text-[11px]">
          <span>Index Rating:</span>
          <span>{dataItem?.index} pts</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="pt-1 border-t border-slate-100 text-[10px] space-y-0.5 text-slate-500">
        <div className="flex justify-between">
          <span>Base Fare:</span>
          <span className="font-mono text-slate-700 font-semibold">₹{dataItem?.baseFare?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Fuel Surcharge (ATF):</span>
          <span className="font-mono text-slate-700 font-semibold">₹{dataItem?.atfSurcharge?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>UDF / Airport Taxes:</span>
          <span className="font-mono text-slate-700 font-semibold">₹{dataItem?.taxes?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export const DashboardOverview = ({
  onNavigate,
  selectedRoute = 'DEL-BOM',
  dateRangePreset = '30',
  refreshTriggerKey = 0,
  onOpenNotice
}) => {
  const [granularity, setGranularity] = useState('Daily');
  const [showFare, setShowFare] = useState(true);
  const [showIndex, setShowIndex] = useState(true);
  const [showCarrierLines, setShowCarrierLines] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);
  const [routeFilter, setRouteFilter] = useState('');

  // Active route metadata
  const currentRoute = useMemo(() => getRouteByCode(selectedRoute), [selectedRoute]);

  // 90 continuous daily data points sliced by dateRangePreset
  const raw90DayData = useMemo(() => {
    return generate90DaySeries(selectedRoute, 90);
  }, [selectedRoute, refreshTriggerKey]);

  const trendData = useMemo(() => {
    const daysLimit = dateRangePreset === '7' ? 7 : dateRangePreset === '90' ? 90 : 30;
    return raw90DayData.slice(raw90DayData.length - daysLimit);
  }, [raw90DayData, dateRangePreset]);

  const loadTrend = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToast(`Corridor ${selectedRoute} telemetry updated with latest live fare points.`);
      setTimeout(() => setToast(null), 3500);
    }, 600);
  };

  useEffect(() => {
    if (refreshTriggerKey > 0) {
      loadTrend();
    }
  }, [refreshTriggerKey]);

  const handleScrape = async () => {
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
      setToast(`Scraper sweep SCR-8909 completed across ${selectedRoute} corridor — verified 1,480 fares.`);
      setTimeout(() => setToast(null), 4000);
    }, 1200);
  };

  const filteredRoutes = useMemo(() => {
    if (!routeFilter.trim()) return INDIAN_ROUTES.slice(0, 5);
    const q = routeFilter.toUpperCase().trim();
    return INDIAN_ROUTES.filter(r =>
      r.code.includes(q) || r.name.toUpperCase().includes(q) || r.origin.includes(q) || r.destination.includes(q)
    );
  }, [routeFilter]);

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl space-y-6 p-6">

        {/* PAGE INTRO */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                National Overview · Live DGCA Telemetry Node #8841
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                DGCA Node Active
              </span>
            </div>

            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Airfare Price Intelligence — {currentRoute.name}
            </h1>

            <p className="mt-0.5 max-w-2xl text-xs text-slate-500">
              Live monitoring of fare movements, carrier dispersion, and national price index across Indian domestic corridors (Sep 2026).
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              onClick={loadTrend}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              Telemetry Sync
            </button>

            <button
              onClick={handleScrape}
              disabled={isScraping}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isScraping ? 'animate-spin' : ''}`} />
              {isScraping ? 'Running Sweep…' : 'Run Scraper Sweep'}
            </button>

            <button
              onClick={() => api.downloadDGCAExport()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300"
            >
              <FileDown className="h-3.5 w-3.5 text-blue-500" />
              DGCA CSV Export
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
            label={`Corridor Median (${selectedRoute})`}
            value={`₹${currentRoute.medianFare.toLocaleString()}`}
            badge={`${currentRoute.changePct > 0 ? '+' : ''}${currentRoute.changePct}% MoM`}
            badgeColor={currentRoute.changePct > 0 ? 'rose' : 'emerald'}
            sub={`Lowest available: ₹${currentRoute.lowestFare.toLocaleString()}`}
            icon={Plane}
            accent={C.blue}
          />
          <StatCard
            label="Airfare Price Index"
            value="118.6 pts"
            badge="+1.8 WoW"
            badgeColor="amber"
            sub="Base Jan 2026 baseline = 100.00"
            icon={TrendingUp}
            accent={C.saffron}
          />
          <StatCard
            label="Monitored Corridors"
            value="15 Top Corridors"
            badge="Active"
            badgeColor="blue"
            sub={`${currentRoute.daily_flights} daily flights on ${selectedRoute}`}
            icon={Activity}
            accent={C.blue}
          />
          <StatCard
            label="Pipeline Ingestion"
            value="184,290"
            badge="99.4% valid"
            badgeColor="emerald"
            sub="Records processed across GDS & OTA feeds"
            icon={Wifi}
            accent={C.green}
          />
        </div>

        {/* QUICK MARKET PULSE */}
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card md:grid-cols-4">
          {[
            ['Lowest tracked fare', `₹${currentRoute.lowestFare.toLocaleString()}`, `${currentRoute.origin} → ${currentRoute.destination}`],
            ['Peak fare ceiling', `₹${currentRoute.peakFare.toLocaleString()}`, `${selectedRoute} Corridor`],
            ['Data freshness', '02s ago', 'DGCA Node #8841'],
            ['Carrier Market Share', `IndiGo ${currentRoute.airlines[0]?.share || 50}%`, `${currentRoute.airlines.length} active carriers`],
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
              title={`${selectedRoute} Continuous Fare Trajectory (${dateRangePreset}-Day)`}
              sub="Daily composite fare compared with normalised API index rating"
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
                    Average Fare
                  </label>

                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={showIndex}
                      onChange={(e) => setShowIndex(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ background: C.saffron }} />
                    API Index
                  </label>

                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={showCarrierLines}
                      onChange={(e) => setShowCarrierLines(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    <span className="inline-block h-2 w-2 rounded-sm bg-purple-500" />
                    Carriers
                  </label>

                  <div className="flex rounded-lg bg-slate-100 p-0.5 text-[11px]">
                    {['Daily', 'Weekly'].map((item) => (
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
              Active Corridor: {currentRoute.name} ({currentRoute.distance_km} km)
            </div>

            <div className="mt-3 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 8, right: 8, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fareAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: C.tick }}
                    interval={Math.ceil(trendData.length / 10)}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: C.tick }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
                  />
                  {showIndex && (
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: C.tick }}
                      tickFormatter={(v) => `${v}p`}
                    />
                  )}

                  <Tooltip content={<EnrichedTooltip />} />

                  {showFare && (
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="fare"
                      name="fare"
                      stroke={C.blue}
                      strokeWidth={2}
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
                      strokeWidth={2}
                      dot={false}
                    />
                  )}

                  {showCarrierLines && (
                    <>
                      <Line yAxisId="left" type="monotone" dataKey="indigo" name="IndiGo" stroke={C.indigo} strokeWidth={1.5} dot={false} strokeDasharray="2 2" />
                      <Line yAxisId="left" type="monotone" dataKey="airIndia" name="Air India" stroke={C.airIndia} strokeWidth={1.5} dot={false} strokeDasharray="2 2" />
                      <Line yAxisId="left" type="monotone" dataKey="vistara" name="Vistara" stroke={C.vistara} strokeWidth={1.5} dot={false} strokeDasharray="2 2" />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* RIGHT SIDEBAR: Indian Domestic Route Selector */}
          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card">
            <SectionHeader
              eyebrow="Corridor directory"
              title="Top Domestic Routes"
              sub="Click corridor to switch intelligence view"
            />

            <div className="mt-3 relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter route e.g. DEL, BLR, MAA…"
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:border-blue-400 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto max-h-[280px] pr-1">
              {filteredRoutes.map((r) => {
                const isSelected = selectedRoute === r.code;
                return (
                  <button
                    key={r.code}
                    onClick={() => onNavigate('route', r.code)}
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 border transition-all text-left ${
                      isSelected
                        ? 'border-blue-300 bg-blue-50/70 shadow-xs'
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <span>{r.code}</span>
                        <span className="text-[10px] font-normal text-slate-500 font-mono">({r.block_time})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{r.name}</div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-slate-900">₹{r.medianFare.toLocaleString()}</div>
                      <div className={`text-[10px] font-semibold ${r.changePct > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {r.changePct > 0 ? '+' : ''}{r.changePct}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('route')}
              className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Explore Full 15 Corridors
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </section>
        </div>

        {/* SECTION: Passenger Welfare Impact & Price Elasticity */}
        <div className="mt-6">
          <PassengerImpact selectedRouteCode={selectedRoute} />
        </div>

        {/* SECTION: Geospatial Heatmap & AI Gouging Radar */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IndiaHeatmap
            selectedRoute={selectedRoute}
            onRouteSelect={(routeCode) => onNavigate('route', routeCode)}
          />
          <GougingRadar
            onShowCauseRequest={(event) => {
              if (onOpenNotice) {
                onOpenNotice(event);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
