import React, { useState, useMemo } from 'react';
import { Sliders, TrendingDown, TrendingUp, BarChart3, RefreshCw, Info, FlaskConical } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  LineChart, Line, ReferenceLine
} from 'recharts';

const AIRLINES = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Akasa', 'Alliance'];

const BASE_DATA = {
  IndiGo:   { base: 4800, load: 89, pax: 72400000 },
  'Air India': { base: 5600, load: 82, pax: 28500000 },
  Vistara:  { base: 6200, load: 78, pax: 19200000 },
  SpiceJet: { base: 4200, load: 84, pax: 15800000 },
  Akasa:    { base: 4100, load: 91, pax: 8200000 },
  Alliance: { base: 5900, load: 76, pax: 4100000 },
};

const LightTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-card-lg p-3 text-xs space-y-1">
      <div className="font-semibold text-slate-700">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-900">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const PolicySandbox = () => {
  const [atfTax, setAtfTax] = useState(21);        // ATF tax as % of fare
  const [fareCap, setFareCap] = useState(15000);    // Max fare cap in INR
  const [competitionIndex, setCompetitionIndex] = useState(3); // Number of carriers per route (avg)

  const simulationData = useMemo(() => {
    return AIRLINES.map(airline => {
      const d = BASE_DATA[airline];
      const taxImpact = (atfTax - 21) / 100; // change from baseline 21%
      const newFare = Math.round(d.base * (1 + taxImpact * 0.7));
      const cappedFare = Math.min(newFare, fareCap);
      const loadDelta = taxImpact > 0 ? -Math.round(taxImpact * 45) : Math.round(Math.abs(taxImpact) * 20);
      const newLoad = Math.max(50, Math.min(98, d.load + loadDelta));
      const compEffect = (competitionIndex - 3) * 120;
      const finalFare = Math.max(1800, cappedFare - compEffect);

      return {
        airline,
        baseFare: d.base,
        simulatedFare: finalFare,
        fareChange: finalFare - d.base,
        fareChangePct: +(((finalFare - d.base) / d.base) * 100).toFixed(1),
        load: newLoad,
        paxImpact: Math.round(d.pax * (loadDelta / 100)),
      };
    });
  }, [atfTax, fareCap, competitionIndex]);

  const totalPaxImpact = simulationData.reduce((s, d) => s + d.paxImpact, 0);
  const avgFareChange = +(simulationData.reduce((s, d) => s + d.fareChangePct, 0) / simulationData.length).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              Regulatory Impact Modelling · DGCA Policy Unit
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-violet-500" />
              Policy Stress-Test Simulator
            </h2>
          </div>
          <button
            onClick={() => { setAtfTax(21); setFareCap(15000); setCompetitionIndex(3); }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold font-mono transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> RESET
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls panel */}
        <div className="space-y-5">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3 h-3" /> SIMULATION PARAMETERS
            </h3>

            {/* ATF Tax Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">ATF Tax Rate</label>
                <span className="text-xs font-bold font-mono text-blue-600">{atfTax}%</span>
              </div>
              <input
                type="range" min="5" max="45" value={atfTax}
                onChange={e => setAtfTax(+e.target.value)}
                className="w-full h-1.5 bg-slate-200 rounded-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                <span>5%</span><span>21% (current)</span><span>45%</span>
              </div>
            </div>

            {/* Fare Cap Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Max Fare Cap</label>
                <span className="text-xs font-bold font-mono text-blue-600">₹{fareCap.toLocaleString()}</span>
              </div>
              <input
                type="range" min="3000" max="25000" step="500" value={fareCap}
                onChange={e => setFareCap(+e.target.value)}
                className="w-full h-1.5 bg-slate-200 rounded-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                <span>₹3,000</span><span>₹25,000</span>
              </div>
            </div>

            {/* Competition Index */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Avg Carriers/Route</label>
                <span className="text-xs font-bold font-mono text-blue-600">{competitionIndex}</span>
              </div>
              <input
                type="range" min="1" max="6" value={competitionIndex}
                onChange={e => setCompetitionIndex(+e.target.value)}
                className="w-full h-1.5 bg-slate-200 rounded-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                <span>1 (monopoly)</span><span>6 (high comp.)</span>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center">
              <div className="text-[10px] text-blue-600 font-mono font-bold">AVG FARE Δ</div>
              <div className={`text-lg font-bold font-mono mt-0.5 ${avgFareChange > 0 ? 'text-rose-600' : avgFareChange < 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                {avgFareChange > 0 ? '+' : ''}{avgFareChange}%
              </div>
            </div>
            <div className="p-3 rounded-lg bg-violet-50 border border-violet-100 text-center">
              <div className="text-[10px] text-violet-600 font-mono font-bold">PAX IMPACT</div>
              <div className={`text-lg font-bold font-mono mt-0.5 ${totalPaxImpact < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {totalPaxImpact > 0 ? '+' : ''}{(totalPaxImpact / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
              Simulated Fare Impact by Carrier
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={simulationData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="airline" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<LightTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="baseFare" name="Base Fare" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="simulatedFare" name="Simulated" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
              Fare Change % by Carrier
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="airline" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <Tooltip content={<LightTooltip />} />
                <ReferenceLine y={0} stroke="#334155" strokeWidth={1.5} />
                <Bar
                  dataKey="fareChangePct"
                  name="Fare Δ%"
                  fill="#8b5cf6"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-blue-800">
              <strong>Simulation Note:</strong> Model assumes 70% ATF tax passthrough to consumer fares, linear competition effects,
              and inelastic demand below ₹5,000. Actual results may vary based on airline hedging and load management strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
