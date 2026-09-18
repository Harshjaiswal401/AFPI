import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  GitFork,
  History,
  BrainCircuit,
  Radio,
  Database,
  FileSpreadsheet,
  Settings,
  UserCheck,
  Plane,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = ({ currentPage, onSelectPage, onOpenProfile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard',       icon: LayoutDashboard },
    { id: 'index',     label: 'Airfare Index',   icon: TrendingUp },
    { id: 'route',     label: 'Route Analysis',  icon: GitFork },
    { id: 'history',   label: 'Fare History',    icon: History },
    { id: 'analytics', label: 'Analytics',       icon: BrainCircuit },
    { id: 'scraper',   label: 'Scraper Monitor', icon: Radio },
    { id: 'data',      label: 'Data Management', icon: Database },
    { id: 'reports',   label: 'Reports',         icon: FileSpreadsheet },
    { id: 'settings',  label: 'Settings',        icon: Settings },
  ];

  return (
    <aside className="w-60 bg-slate-900 flex flex-col justify-between shrink-0 h-full z-40 select-none">
      {/* ── Brand ── */}
      <div>
        <div className="px-5 py-4 border-b border-white/10 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-saffron-500 flex items-center justify-center shadow-md shadow-black/20">
            <Plane className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-white leading-tight">AeroIndex</h1>
            <p className="text-[9px] text-slate-400 font-mono tracking-[0.14em] uppercase mt-0.5">
              Airfare Price Intelligence
            </p>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="p-3 mt-2 space-y-0.5">
          <div className="px-3 pb-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </div>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => onSelectPage(id)}
                className={`relative w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-saffron-500"></span>
                )}
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-saffron-400' : 'text-slate-500'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Footer ── */}
      <div className="p-3 border-t border-white/10 space-y-2.5">
        {/* Telemetry node status */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-slate-200">DGCA Node: Active</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">2s ago</span>
        </div>

        {/* Harsh Jaiswal Profile Block */}
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-white/10 group-hover:ring-saffron-400 transition-all">
            HJ
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-slate-100 truncate">Harsh Jaiswal</div>
            <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
              <UserCheck className="w-2.5 h-2.5 text-emerald-400" />
              Chief Intelligence Officer
            </div>
          </div>
        </button>

        {/* Institutional Marker */}
        <div className="px-3 py-1.5 rounded-lg border border-saffron-500/30 bg-saffron-500/10 text-center">
          <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-saffron-300 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Ministry of Civil Aviation (MoCA)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
