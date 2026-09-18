import React, { useState, useMemo } from 'react';
import { AlertTriangle, ShieldAlert, Eye, Radio, ChevronRight, TrendingUp, Calendar, Flame } from 'lucide-react';
import { INDIAN_ROUTES } from '../../data/indianRoutes';

const SEVERITY = {
  CRITICAL: { color: 'bg-red-50 border-red-200 text-red-800', badge: 'bg-red-600 text-white', icon: '🔴' },
  HIGH:     { color: 'bg-amber-50 border-amber-200 text-amber-800', badge: 'bg-amber-500 text-white', icon: '🟡' },
  MODERATE: { color: 'bg-blue-50 border-blue-200 text-blue-800', badge: 'bg-blue-500 text-white', icon: '🔵' },
};

const GOUGING_EVENTS = [
  {
    id: 'GEV-2026-0901',
    carrier: 'IndiGo',
    route: 'DEL-PAT',
    severity: 'CRITICAL',
    surge: 62,
    trigger: 'Chhath Puja Festival Window',
    avgFare: 4200,
    surgedFare: 6804,
    date: '2026-09-18',
    status: 'UNDER INVESTIGATION',
    marketShare: 68,
    detail: 'Fare spike detected outside historical Q3 band. IndiGo holds 68% market share on DEL-PAT, constituting dominant market position under ARC §4.2(b).',
  },
  {
    id: 'GEV-2026-0902',
    carrier: 'Air India',
    route: 'BOM-GOI',
    severity: 'HIGH',
    surge: 41,
    trigger: 'Monsoon Disruption Recovery',
    avgFare: 3800,
    surgedFare: 5358,
    date: '2026-09-16',
    status: 'FLAGGED',
    marketShare: 42,
    detail: 'Post-disruption fare recovery exceeded permissible ceiling of +30%. Load factor suggests artificially constrained inventory (only 18 seats released in economy).',
  },
  {
    id: 'GEV-2026-0903',
    carrier: 'Vistara',
    route: 'DEL-BLR',
    severity: 'HIGH',
    surge: 37,
    trigger: 'Tech Conference Bengaluru',
    avgFare: 5400,
    surgedFare: 7398,
    date: '2026-09-14',
    status: 'CLEARED',
    marketShare: 22,
    detail: 'Event-driven demand surge. Vistara holds minority share; fare aligned with industry trend. Cleared under safe-harbor provisions.',
  },
  {
    id: 'GEV-2026-0904',
    carrier: 'SpiceJet',
    route: 'DEL-BOM',
    severity: 'MODERATE',
    surge: 19,
    trigger: 'Weekend Leisure Demand',
    avgFare: 4900,
    surgedFare: 5831,
    date: '2026-09-12',
    status: 'MONITORING',
    marketShare: 14,
    detail: 'Within seasonal tolerance band. Monitoring for sustained pattern. No enforcement action recommended at this time.',
  },
  {
    id: 'GEV-2026-0905',
    carrier: 'IndiGo',
    route: 'CCU-DEL',
    severity: 'CRITICAL',
    surge: 55,
    trigger: 'Durga Puja Return Rush',
    avgFare: 5100,
    surgedFare: 7905,
    date: '2026-09-10',
    status: 'SHOW-CAUSE ISSUED',
    marketShare: 71,
    detail: 'Systematic fare inflation across all booking classes. Inventory manipulation suspected. Show-cause notice SCN/DGCA/2026/CCU-DEL-0091 issued.',
  },
];

export const GougingRadar = ({ onShowCauseRequest }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (filter === 'ALL') return GOUGING_EVENTS;
    return GOUGING_EVENTS.filter(e => e.severity === filter);
  }, [filter]);

  const criticalCount = GOUGING_EVENTS.filter(e => e.severity === 'CRITICAL').length;
  const highCount = GOUGING_EVENTS.filter(e => e.severity === 'HIGH').length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              AI-Powered Audit · Fare Compliance Engine
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Price Gouging & Monopoly Abuse Radar
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold font-mono animate-pulse">
              <Radio className="w-3 h-3" /> LIVE
            </span>
          </div>
        </div>

        {/* Summary badges */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-100">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-bold text-red-800">{criticalCount} CRITICAL</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-bold text-amber-800">{highCount} HIGH</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded text-[10px] font-bold font-mono transition-colors ${
                  filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events list */}
      <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
        {filtered.map(event => {
          const sev = SEVERITY[event.severity];
          const isExpanded = expandedId === event.id;

          return (
            <div
              key={event.id}
              className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 ${isExpanded ? 'bg-slate-50' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : event.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{sev.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${sev.badge}`}>
                      {event.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {event.carrier} {event.route}
                    </span>
                    <span className="text-rose-600 text-xs font-bold font-mono">+{event.surge}%</span>
                    <span className="text-[10px] text-slate-400 font-mono">{event.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                    <span className="mx-1 text-slate-300">·</span>
                    <span className="font-semibold">{event.trigger}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    event.status === 'SHOW-CAUSE ISSUED' ? 'bg-red-100 text-red-700' :
                    event.status === 'UNDER INVESTIGATION' ? 'bg-amber-100 text-amber-700' :
                    event.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {event.status}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="mt-3 ml-8 p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Avg Base Fare</div>
                      <div className="font-bold text-slate-900">₹{event.avgFare.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Surged Fare</div>
                      <div className="font-bold text-rose-600">₹{event.surgedFare.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Market Share</div>
                      <div className="font-bold text-slate-900">{event.marketShare}%</div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-2">{event.detail}</p>
                  {(event.severity === 'CRITICAL' && event.status !== 'CLEARED') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowCauseRequest && onShowCauseRequest(event);
                      }}
                      className="mt-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold font-mono transition-colors flex items-center gap-1.5"
                    >
                      <ShieldAlert className="w-3 h-3" />
                      GENERATE SHOW-CAUSE NOTICE
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
