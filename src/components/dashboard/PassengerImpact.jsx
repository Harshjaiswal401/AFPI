import React, { useMemo } from 'react';
import { Users, TrendingDown, DollarSign, Award, Shield, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { INDIAN_ROUTES } from '../../data/indianRoutes';

export const PassengerImpact = ({ selectedRouteCode }) => {
  const route = useMemo(() => {
    return INDIAN_ROUTES.find(r => r.code === selectedRouteCode) || INDIAN_ROUTES[0];
  }, [selectedRouteCode]);

  // Economic burden calculations
  const baselineFare = route.medianFare / (1 + (route.changePct / 100));
  const surgeAmountPerPax = Math.max(0, route.medianFare - baselineFare);
  const estimatedPaxPerMonth = 145000;
  const consumerSurplusLossCr = +((surgeAmountPerPax * estimatedPaxPerMonth * 0.6) / 10000000).toFixed(2); // in Crores INR
  const priceElasticity = -1.24; // typical domestic price elasticity of demand
  const projectedPaxDropPct = +Math.abs((route.changePct * priceElasticity) / 10).toFixed(1);
  const routeGiniCoeff = 0.38; // Tariff inequality index across buckets

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
            Welfare Economics · MoCA Socio-Economic Assessment
          </div>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Passenger Welfare Impact &amp; Price Elasticity Index
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-mono font-bold">
          {route.code} Corridor
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1 */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase flex items-center justify-between">
            <span>Surplus Loss</span>
            <DollarSign className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg font-bold font-mono text-rose-600 mt-1">
            ₹{consumerSurplusLossCr} Cr
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Est. monthly consumer burden</p>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase flex items-center justify-between">
            <span>Price Elasticity</span>
            <TrendingDown className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-lg font-bold font-mono text-blue-700 mt-1">
            {priceElasticity}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Highly elastic (leisure sensitivity)</p>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase flex items-center justify-between">
            <span>Tariff Gini Coeff.</span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-lg font-bold font-mono text-amber-600 mt-1">
            {routeGiniCoeff}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Bucket inequality score (0-1)</p>
        </div>

        {/* Metric 4 */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-mono font-bold uppercase flex items-center justify-between">
            <span>UDAN Capped Cap</span>
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-lg font-bold font-mono text-emerald-600 mt-1">
            ₹2,500 / hr
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">RCS Subsidized benchmark</p>
        </div>
      </div>

      {/* Welfare Impact Assessment Bar */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="font-semibold text-slate-800">
            {route.changePct > 20 ? 'High Vulnerability Corridor' : route.changePct > 5 ? 'Moderate Welfare Friction' : 'Stable Passenger Welfare Index'}
          </span>
          <span className="text-slate-500">
            ({projectedPaxDropPct}% estimated passenger displacement under current tariff trajectory)
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 shrink-0">
          <span>Active Pax Monitored:</span>
          <strong className="text-slate-900">{estimatedPaxPerMonth.toLocaleString()} / mo</strong>
        </div>
      </div>
    </div>
  );
};
