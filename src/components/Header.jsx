import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Bell,
  HelpCircle,
  TrendingDown,
  ChevronDown,
  ShieldCheck,
  X,
  RefreshCw,
  Plane,
  Check
} from 'lucide-react';
import { INDIAN_ROUTES, getRouteByCode } from '../data/indianRoutes';

export const Header = ({
  onSearchRoute,
  activeRoute = 'DEL-BOM',
  onOpenProfile,
  dateRangePreset = '30',
  onDateRangeChange,
  onRefreshTelemetry
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [latencyText, setLatencyText] = useState('2s ago');

  const searchContainerRef = useRef(null);
  const datePickerRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { title: 'Dynamic Surge Alert', desc: 'IndiGo 6E-205 (DEL-BOM) surged +38.1%', time: '12m ago', dot: 'bg-rose-500' },
    { title: 'Telemetry Sweep Done', desc: 'Worker #04 completed DEL-BLR sweep (1,240 recs)', time: '18m ago', dot: 'bg-emerald-500' },
    { title: 'ATF Surcharge Revision', desc: 'Index benchmark updated (+1.8 WoW)', time: '41m ago', dot: 'bg-blue-500' },
  ]);

  // Active route metadata
  const currentRouteMeta = useMemo(() => getRouteByCode(activeRoute), [activeRoute]);

  // Filter routes for search auto-suggest
  const matchingRoutes = useMemo(() => {
    if (!searchVal.trim()) return [];
    const q = searchVal.toUpperCase().trim();
    return INDIAN_ROUTES.filter(r =>
      r.code.includes(q) ||
      r.name.toUpperCase().includes(q) ||
      r.origin.includes(q) ||
      r.destination.includes(q)
    ).slice(0, 6);
  }, [searchVal]);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRoute = (code) => {
    setSearchVal('');
    setShowSuggest(false);
    if (onSearchRoute) onSearchRoute(code);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const q = searchVal.toUpperCase().trim();
      if (matchingRoutes.length > 0) {
        handleSelectRoute(matchingRoutes[0].code);
      } else if (q && onSearchRoute) {
        onSearchRoute(q);
        setShowSuggest(false);
      }
    }
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setLatencyText('Syncing…');
    setTimeout(() => {
      setIsRefreshing(false);
      setLatencyText('Just now');
      // Push new live alert to notifications
      const newAlerts = [
        {
          title: 'Live Telemetry Refresh',
          desc: `Recalculated fares for ${activeRoute} across 68 daily flights`,
          time: 'Just now',
          dot: 'bg-emerald-500'
        },
        ...notifications
      ];
      setNotifications(newAlerts);
      if (onRefreshTelemetry) onRefreshTelemetry();
    }, 900);
  };

  const datePresets = [
    { id: '7', label: 'Next 7 Days', sub: 'Sep 19 – Sep 26, 2026' },
    { id: '30', label: 'Next 30 Days', sub: 'Sep 19 – Oct 19, 2026' },
    { id: '90', label: 'Next 90 Days', sub: 'Jun 21 – Sep 19, 2026' },
    { id: 'custom', label: 'Custom Range', sub: 'Sep 2026 Season' }
  ];

  const currentDateLabel = useMemo(() => {
    const found = datePresets.find(p => p.id === dateRangePreset);
    return found ? found.sub : 'Sep 19 – Oct 19, 2026';
  }, [dateRangePreset]);

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-5 flex items-center justify-between sticky top-0 z-30 shadow-card">
      {/* ── Left: Search & Auto-suggest ── */}
      <div className="flex items-center space-x-3 flex-1 max-w-lg">
        <div className="relative w-full" ref={searchContainerRef}>
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setShowSuggest(true);
            }}
            onFocus={() => setShowSuggest(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Indian corridor e.g. DEL-BOM, BLR, MAA…"
            className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-10 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">
            ⌘K
          </kbd>

          {/* Auto-suggest Menu */}
          {showSuggest && matchingRoutes.length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in duration-150">
              <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                Matching Indian Domestic Corridors
              </div>
              {matchingRoutes.map((r) => (
                <button
                  key={r.code}
                  onClick={() => handleSelectRoute(r.code)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-mono text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Plane className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>{r.code}</span>
                        <span className="text-[10px] font-normal text-slate-500 font-mono">({r.block_time})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[240px]">{r.name}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-slate-900">₹{r.medianFare.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">{r.daily_flights} daily flights</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Route ticker */}
        <button
          onClick={handleRefreshClick}
          title="Click to refresh corridor telemetry"
          className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 text-xs shrink-0 font-mono transition-colors"
        >
          <TrendingDown className="w-3 h-3" />
          <span className="font-semibold">{activeRoute}</span>
          <span className="text-emerald-600 font-normal">₹{currentRouteMeta.medianFare.toLocaleString()}</span>
        </button>
      </div>

      {/* ── Right: Controls ── */}
      <div className="flex items-center space-x-2 ml-4">
        {/* Telemetry Refresh Button */}
        <button
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:border-slate-300 hover:bg-slate-100 transition-colors"
          title="Telemetry Sync / Recalculate Live Fares"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="font-mono text-[11px]">{latencyText}</span>
        </button>

        {/* Dynamic Date range calendar picker */}
        <div className="relative" ref={datePickerRef}>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-mono text-[11px]">{currentDateLabel}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <div className="px-2.5 py-1.5 border-b border-slate-100 text-[10px] font-mono font-semibold uppercase text-slate-400">
                Select Analysis Horizon (2026)
              </div>
              {datePresets.map((p) => {
                const isSelected = dateRangePreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onDateRangeChange) onDateRangeChange(p.id);
                      setShowDatePicker(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{p.label}</div>
                      <div className="text-[10px] font-mono text-slate-400">{p.sub}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Institutional Marker: MoCA Node #8841 */}
        <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-200 font-semibold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-saffron-400" />
          <span>MoCA Node #8841</span>
        </div>

        {/* Bell Radar Alerts */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-8 h-8 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 ring-1 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-card-lg p-3 z-50 space-y-1.5">
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">DGCA Radar Alerts</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100">
                    {notifications.length} Active
                  </span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${n.dot}`}></span>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{n.desc}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help */}
        <button className="w-8 h-8 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Harsh Jaiswal Official Avatar */}
        <div className="pl-2 border-l border-slate-200">
          <button
            onClick={onOpenProfile}
            title="View DGCA Officer Credentials & Session Node"
            className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-blue-100 transition-all"
          >
            HJ
          </button>
        </div>
      </div>
    </header>
  );
};
