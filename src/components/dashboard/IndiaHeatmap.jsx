import React, { useState, useMemo } from 'react';
import { INDIAN_ROUTES, AIRPORTS_DICT } from '../../data/indianRoutes';

// SVG coordinates for major Indian airports on a simplified India map
const AIRPORT_COORDS = {
  DEL: { x: 280, y: 140, label: 'New Delhi' },
  BOM: { x: 195, y: 310, label: 'Mumbai' },
  BLR: { x: 255, y: 415, label: 'Bengaluru' },
  MAA: { x: 305, y: 400, label: 'Chennai' },
  CCU: { x: 395, y: 230, label: 'Kolkata' },
  HYD: { x: 265, y: 340, label: 'Hyderabad' },
  PNQ: { x: 220, y: 320, label: 'Pune' },
  GOI: { x: 195, y: 365, label: 'Goa' },
  IXC: { x: 275, y: 105, label: 'Chandigarh' },
  AMD: { x: 195, y: 240, label: 'Ahmedabad' },
  PAT: { x: 360, y: 180, label: 'Patna' },
  LKO: { x: 315, y: 165, label: 'Lucknow' },
  GAU: { x: 430, y: 165, label: 'Guwahati' },
  COK: { x: 240, y: 440, label: 'Kochi' },
  BBI: { x: 355, y: 290, label: 'Bhubaneswar' },
};

export const IndiaHeatmap = ({ selectedRoute, onRouteSelect }) => {
  const [hoveredRoute, setHoveredRoute] = useState(null);

  const routeArcs = useMemo(() => {
    return INDIAN_ROUTES.map(r => {
      const from = AIRPORT_COORDS[r.origin];
      const to = AIRPORT_COORDS[r.destination];
      if (!from || !to) return null;

      const isSurge = r.changePct > 25;
      const isHigh = r.changePct > 10;
      const isSelected = selectedRoute === r.code;

      return { ...r, from, to, isSurge, isHigh, isSelected };
    }).filter(Boolean);
  }, [selectedRoute]);

  const getArcColor = (arc) => {
    if (arc.isSurge) return '#DC2626';
    if (arc.isHigh) return '#F59E0B';
    return '#1F4FBF';
  };

  const getArcPath = (from, to) => {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curvature = Math.min(dist * 0.25, 40);
    const cx = mx - (dy / dist) * curvature;
    const cy = my + (dx / dist) * curvature;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400">
            Geospatial Intelligence · National Corridors
          </div>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5">Interactive Tariff Heatmap of India</h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block rounded"></span> Surge &gt;25%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-amber-500 inline-block rounded"></span> High &gt;10%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-600 inline-block rounded"></span> Normal</span>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <svg viewBox="100 50 400 440" className="w-full max-w-md h-auto" style={{ maxHeight: 380 }}>
          {/* India outline simplified */}
          <path
            d="M240 60 L210 80 L175 100 L155 130 L145 170 L140 210 L145 250 L155 290 L165 320 L180 350 L200 380 L215 410 L230 440 L245 460 L260 470 L275 460 L285 440 L310 420 L330 400 L350 370 L370 330 L390 290 L410 250 L430 220 L445 190 L450 160 L440 130 L420 110 L400 100 L370 90 L340 80 L310 70 L280 62 Z"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Flight arcs */}
          {routeArcs.map((arc) => (
            <g key={arc.code}>
              <path
                d={getArcPath(arc.from, arc.to)}
                fill="none"
                stroke={arc.isSelected ? '#7C3AED' : getArcColor(arc)}
                strokeWidth={arc.isSelected ? 3 : hoveredRoute === arc.code ? 2.5 : 1.5}
                strokeLinecap="round"
                opacity={arc.isSelected ? 1 : hoveredRoute === arc.code ? 0.9 : 0.5}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRoute(arc.code)}
                onMouseLeave={() => setHoveredRoute(null)}
                onClick={() => onRouteSelect && onRouteSelect(arc.code)}
              />
            </g>
          ))}

          {/* Airport dots */}
          {Object.entries(AIRPORT_COORDS).map(([code, pos]) => {
            const isActiveOrigin = INDIAN_ROUTES.some(r =>
              (r.origin === code || r.destination === code) && selectedRoute === r.code
            );
            return (
              <g key={code}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActiveOrigin ? 6 : 4}
                  fill={isActiveOrigin ? '#7C3AED' : '#1F4FBF'}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => {
                    const route = INDIAN_ROUTES.find(r => r.origin === code || r.destination === code);
                    if (route && onRouteSelect) onRouteSelect(route.code);
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y - 10}
                  textAnchor="middle"
                  className="text-[8px] font-bold fill-slate-700 font-mono select-none pointer-events-none"
                >
                  {code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hovered route info */}
      {hoveredRoute && (() => {
        const r = INDIAN_ROUTES.find(rt => rt.code === hoveredRoute);
        if (!r) return null;
        return (
          <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900">{r.code}</span>
              <span className="text-slate-500 ml-2">{r.name}</span>
            </div>
            <div className="font-mono text-right">
              <span className="font-bold text-slate-900">₹{r.medianFare.toLocaleString()}</span>
              <span className={`ml-2 font-semibold ${r.changePct > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {r.changePct > 0 ? '+' : ''}{r.changePct}%
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
