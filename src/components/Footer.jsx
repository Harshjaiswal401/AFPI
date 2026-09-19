import React from 'react';

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white px-6 py-3">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1.5 text-[11px] text-slate-500 sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">AFPI</span>
        <span className="text-slate-300">·</span>
        <span>AirFare PriceIndex — Airfare Price Intelligence Platform</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <span>Ministry of Civil Aviation (MoCA) — Govt of India</span>
        <span className="text-slate-300">|</span>
        <span>DGCA Node #8841</span>
        <span className="text-slate-300">|</span>
        <span>v2.8 (2026)</span>
      </div>
    </div>
  </footer>
);
