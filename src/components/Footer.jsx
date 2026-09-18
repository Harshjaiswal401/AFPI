import React from 'react';

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white px-6 py-3">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1.5 text-[11px] text-slate-500 sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">AeroIndex</span>
        <span className="text-slate-300">·</span>
        <span>Airfare Price Index &amp; Intelligence Platform</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <span>Smart India Hackathon 2026</span>
        <span className="text-slate-300">|</span>
        <span>v1.0</span>
      </div>
    </div>
  </footer>
);
