import React, { useState } from 'react';
import { 
  Building2, AlertTriangle, ArrowRight, ShieldCheck, 
  HelpCircle, CheckCircle2, TrendingUp, Info, Scale 
} from 'lucide-react';

const PARITY_DATA = [
  {
    channel: 'Airline Direct Portal',
    type: 'Official Direct',
    baseFare: 4950,
    convenienceFee: 0,
    ancillaryAddons: 0,
    finalPrice: 4950,
    dripMarkupPct: 0.0,
    complianceStatus: 'COMPLIANT',
    darkPatterns: 'None detected (Clear itemized breakdown)',
  },
  {
    channel: 'MakeMyTrip (MMT)',
    type: 'OTA Aggregator',
    baseFare: 4899,
    convenienceFee: 420,
    ancillaryAddons: 199, // auto-checked baggage insurance
    finalPrice: 5518,
    dripMarkupPct: 12.6,
    complianceStatus: 'FLAGGED',
    darkPatterns: 'Pre-selected medical assist, hidden convenience fee at stage 3',
  },
  {
    channel: 'EaseMyTrip',
    type: 'OTA Aggregator',
    baseFare: 4950,
    convenienceFee: 0,
    ancillaryAddons: 99, // processing fee
    finalPrice: 5049,
    dripMarkupPct: 2.0,
    complianceStatus: 'FAIR',
    darkPatterns: 'Minimal drip; zero convenience fee promotion maintained',
  },
  {
    channel: 'Cleartrip (Flipkart)',
    type: 'OTA Aggregator',
    baseFare: 4920,
    convenienceFee: 399,
    ancillaryAddons: 149, // cancellation protection pre-selected
    finalPrice: 5468,
    dripMarkupPct: 11.1,
    complianceStatus: 'FLAGGED',
    darkPatterns: 'Hidden payment gateway surcharge; auto-opt-in trip guarantee',
  },
  {
    channel: 'Yatra Online',
    type: 'OTA Aggregator',
    baseFare: 4940,
    convenienceFee: 450,
    ancillaryAddons: 220, // seat auto-assignment addon
    finalPrice: 5610,
    dripMarkupPct: 13.5,
    complianceStatus: 'HIGH VIOLATION',
    darkPatterns: 'Countdown timer pressure tactic; non-removable convenience surcharge',
  },
];

export const ParityMatrix = () => {
  const [selectedRoute, setSelectedRoute] = useState('DEL-BOM');

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              Consumer Protection Unit · Drip Pricing &amp; Dark Pattern Surveillance
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              OTA vs Direct Airline Price Parity Matrix
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Inspected Corridor:</span>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-2.5 py-1 text-xs font-bold font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="DEL-BOM">DEL-BOM (IndiGo 6E-2041)</option>
              <option value="DEL-BLR">DEL-BLR (Air India AI-506)</option>
              <option value="BOM-GOI">BOM-GOI (Vistara UK-851)</option>
              <option value="DEL-PAT">DEL-PAT (IndiGo 6E-6383)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Highlights */}
      <div className="p-5 bg-slate-50/50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-white border border-slate-200 rounded-lg">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Avg Drip Price Markup</div>
          <div className="text-lg font-bold font-mono text-rose-600 mt-0.5">+10.8%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Average extra markup added between search and checkout</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-lg">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Dark Patterns Flagged</div>
          <div className="text-lg font-bold font-mono text-amber-600 mt-0.5">4 Aggregators</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Auto-checked add-ons, fake countdowns &amp; hidden levies</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-lg">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Statutory Guideline</div>
          <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">CCPA 2023 Rules</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Guidelines for Prevention and Regulation of Dark Patterns</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Booking Channel</th>
              <th className="py-3 px-4">Channel Type</th>
              <th className="py-3 px-4 text-right">Published Base</th>
              <th className="py-3 px-4 text-right">Convenience Fee</th>
              <th className="py-3 px-4 text-right">Auto Add-ons</th>
              <th className="py-3 px-4 text-right font-bold text-slate-900">Final Checkout</th>
              <th className="py-3 px-4 text-right">Drip Markup</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {PARITY_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{row.channel}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-normal mt-0.5">{row.darkPatterns}</span>
                </td>
                <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{row.type}</td>
                <td className="py-3 px-4 text-right font-mono font-medium text-slate-700">₹{row.baseFare.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-mono text-slate-700">
                  {row.convenienceFee === 0 ? (
                    <span className="text-emerald-600 font-bold">₹0 (Free)</span>
                  ) : (
                    <span className="text-rose-600 font-semibold">+₹{row.convenienceFee}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-700">
                  {row.ancillaryAddons === 0 ? (
                    <span className="text-slate-400">₹0</span>
                  ) : (
                    <span className="text-amber-600 font-semibold">+₹{row.ancillaryAddons}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                  ₹{row.finalPrice.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold">
                  <span className={row.dripMarkupPct > 10 ? 'text-rose-600' : row.dripMarkupPct > 0 ? 'text-amber-600' : 'text-emerald-600'}>
                    {row.dripMarkupPct > 0 ? `+${row.dripMarkupPct}%` : '0.0%'}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    row.complianceStatus === 'COMPLIANT' ? 'bg-emerald-100 text-emerald-800' :
                    row.complianceStatus === 'FAIR' ? 'bg-blue-100 text-blue-800' :
                    row.complianceStatus === 'FLAGGED' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {row.complianceStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <strong>Enforcement Advisory:</strong> Under the Guidelines for Prevention and Regulation of Dark Patterns (2023), any pre-ticked checkboxes or undisclosed surcharges not visible on initial search results constitute deceptive practices liable to penalties up to ₹50 Lakhs per instance.
        </p>
      </div>
    </div>
  );
};
