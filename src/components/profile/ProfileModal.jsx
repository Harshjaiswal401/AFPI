import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Key,
  Activity,
  Server,
  X,
  Lock,
  CheckCircle2,
  AlertCircle,
  Radio,
  RefreshCw,
  LogOut
} from 'lucide-react';

export const ProfileModal = ({ isOpen, onClose }) => {
  const [nodeStatus, setNodeStatus] = useState('ONLINE');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2s ago');

  if (!isOpen) return null;

  const handleSyncNode = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Government Banner */}
        <div className="bg-slate-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 border border-saffron-500/40 flex items-center justify-center text-saffron-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-wider text-saffron-400 uppercase font-semibold">
                Government of India · Civil Aviation Security Portal
              </div>
              <h2 className="text-base font-bold text-white leading-tight">National Officer Credentials</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* User Profile Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white shadow-md">
                HJ
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Clearance" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-slate-900">Harsh Jaiswal</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Level-5 Officer
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-700 mt-0.5">
                Senior Director &amp; Chief Aviation Intelligence Officer
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Directorate General of Civil Aviation (DGCA) &amp; Ministry of Civil Aviation (MoCA)
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-mono text-[11px]">
                <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs">
                  ID: DGCA-MOCA-2026-8841
                </span>
                <span className="px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold shadow-xs">
                  Node #8841
                </span>
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-500" /> Security Clearance Level
              </div>
              <div className="font-bold text-slate-900 text-sm">Level-5 National Airfare Officer</div>
              <div className="text-slate-500 text-[11px]">Authorized for Tariff Regulation &amp; Surge Audit</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> Encryption &amp; Protocol
              </div>
              <div className="font-bold text-slate-900 text-sm">TLS 1.3 / Quantum-Safe G2G</div>
              <div className="text-slate-500 text-[11px]">NIC Direct High-Speed Airfare Telemetry</div>
            </div>
          </div>

          {/* Node Control Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Regional Monitoring Node #8841</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Radio className="w-3 h-3 animate-pulse text-emerald-500" /> ACTIVE TELEMETRY
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
              <span>Node Latency: <strong className="text-slate-900">12ms</strong></span>
              <span>Last Telemetry Sync: <strong className="text-slate-900">{lastSyncTime}</strong></span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSyncNode}
                disabled={isSyncing}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Resynchronizing Telemetry Node…' : 'Sync Regional Telemetry Node'}
              </button>
            </div>
          </div>

          {/* Session Activity Logs */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-400" /> Active Session Logs (Sep 19, 2026)
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-32 overflow-y-auto">
              <div className="text-emerald-400">[02:11:05 IST] AUTH_SUCCESS: Officer Harsh Jaiswal authenticated via Digital Token #8841</div>
              <div className="text-blue-300">[02:08:42 IST] GDS_SYNC: DEL-BOM corridor sweep finished (1,480 fares active)</div>
              <div className="text-amber-300">[01:55:10 IST] ALERT_TRIGGER: IndiGo 6E-205 surge +38.1% logged for review</div>
              <div className="text-slate-400">[01:30:00 IST] SYSTEM_HEARTBEAT: DGCA Node #8841 operational across all 15 corridors</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">Official Officer Portal · MoCA Govt of India</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
          >
            Close Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
