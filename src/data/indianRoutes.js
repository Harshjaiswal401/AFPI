// Indian Domestic Airport Pairs Data Dictionary & 90-Day Time-Series Generator

export const AIRPORTS_DICT = {
  DEL: { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', state: 'Delhi' },
  BOM: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', state: 'Maharashtra' },
  BLR: { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', state: 'Karnataka' },
  MAA: { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', state: 'Tamil Nadu' },
  CCU: { code: 'CCU', name: 'Netaji Subhash Chandra Bose Airport', city: 'Kolkata', state: 'West Bengal' },
  HYD: { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', state: 'Telangana' },
  PNQ: { code: 'PNQ', name: 'Pune Airport', city: 'Pune', state: 'Maharashtra' },
  GOI: { code: 'GOI', name: 'Dabolim International Airport', city: 'Goa', state: 'Goa' },
  IXC: { code: 'IXC', name: 'Shaheed Bhagat Singh Airport', city: 'Chandigarh', state: 'Punjab' },
  AMD: { code: 'AMD', name: 'Sardar Vallabhbhai Patel Airport', city: 'Ahmedabad', state: 'Gujarat' },
  PAT: { code: 'PAT', name: 'Jayprakash Narayan Airport', city: 'Patna', state: 'Bihar' },
  LKO: { code: 'LKO', name: 'Chaudhary Charan Singh Airport', city: 'Lucknow', state: 'Uttar Pradesh' },
  GAU: { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi Airport', city: 'Guwahati', state: 'Assam' },
  COK: { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', state: 'Kerala' },
  BBI: { code: 'BBI', name: 'Biju Patnaik International Airport', city: 'Bhubaneswar', state: 'Odisha' },
};

export const INDIAN_ROUTES = [
  {
    code: 'DEL-BOM',
    origin: 'DEL',
    destination: 'BOM',
    name: 'New Delhi ✈ Mumbai Metro Trunk',
    distance_km: 1148,
    block_time: '2h 10m',
    daily_flights: 68,
    corridor_type: 'METRO_TRUNK',
    medianFare: 5850,
    lowestFare: 4199,
    peakFare: 8900,
    volatility: 0.28,
    changePct: 14.2,
    baseFareRatio: 0.65,
    atfRatio: 0.22,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 52, color: '#1F4FBF', flights: 35, min: 4199, mean: 5400, max: 8200 },
      { code: 'AI', name: 'Air India', share: 28, color: '#EF4444', flights: 19, min: 4650, mean: 6100, max: 9400 },
      { code: 'UK', name: 'Vistara', share: 20, color: '#8B5CF6', flights: 14, min: 5200, mean: 6800, max: 12100 },
    ]
  },
  {
    code: 'DEL-BLR',
    origin: 'DEL',
    destination: 'BLR',
    name: 'New Delhi ✈ Bengaluru Tech Corridor',
    distance_km: 1740,
    block_time: '2h 45m',
    daily_flights: 48,
    corridor_type: 'METRO_TRUNK',
    medianFare: 6200,
    lowestFare: 4499,
    peakFare: 9800,
    volatility: 0.24,
    changePct: -12.7,
    baseFareRatio: 0.64,
    atfRatio: 0.23,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 50, color: '#1F4FBF', flights: 24, min: 4499, mean: 5800, max: 8900 },
      { code: 'AI', name: 'Air India', share: 30, color: '#EF4444', flights: 14, min: 4900, mean: 6400, max: 9800 },
      { code: 'QP', name: 'Akasa Air', share: 20, color: '#F58A1F', flights: 10, min: 4200, mean: 5500, max: 8100 },
    ]
  },
  {
    code: 'BOM-BLR',
    origin: 'BOM',
    destination: 'BLR',
    name: 'Mumbai ✈ Bengaluru Commercial Link',
    distance_km: 842,
    block_time: '1h 45m',
    daily_flights: 38,
    corridor_type: 'METRO_TRUNK',
    medianFare: 4120,
    lowestFare: 3250,
    peakFare: 6800,
    volatility: 0.18,
    changePct: 3.8,
    baseFareRatio: 0.66,
    atfRatio: 0.21,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 55, color: '#1F4FBF', flights: 21, min: 3250, mean: 3950, max: 6200 },
      { code: 'AI', name: 'Air India', share: 25, color: '#EF4444', flights: 9, min: 3600, mean: 4300, max: 6800 },
      { code: 'QP', name: 'Akasa Air', share: 20, color: '#F58A1F', flights: 8, min: 3100, mean: 3800, max: 5900 },
    ]
  },
  {
    code: 'MAA-DEL',
    origin: 'MAA',
    destination: 'DEL',
    name: 'Chennai ✈ New Delhi Capital Express',
    distance_km: 1760,
    block_time: '2h 50m',
    daily_flights: 32,
    corridor_type: 'METRO_TRUNK',
    medianFare: 5900,
    lowestFare: 4300,
    peakFare: 9200,
    volatility: 0.22,
    changePct: 5.4,
    baseFareRatio: 0.63,
    atfRatio: 0.24,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 54, color: '#1F4FBF', flights: 17, min: 4300, mean: 5500, max: 8700 },
      { code: 'AI', name: 'Air India', share: 46, color: '#EF4444', flights: 15, min: 4700, mean: 6200, max: 9200 },
    ]
  },
  {
    code: 'CCU-DEL',
    origin: 'CCU',
    destination: 'DEL',
    name: 'Kolkata ✈ New Delhi Eastern Corridor',
    distance_km: 1305,
    block_time: '2h 20m',
    daily_flights: 36,
    corridor_type: 'METRO_TRUNK',
    medianFare: 5400,
    lowestFare: 3990,
    peakFare: 8400,
    volatility: 0.26,
    changePct: 8.9,
    baseFareRatio: 0.65,
    atfRatio: 0.22,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 58, color: '#1F4FBF', flights: 21, min: 3990, mean: 5100, max: 7900 },
      { code: 'AI', name: 'Air India', share: 42, color: '#EF4444', flights: 15, min: 4400, mean: 5700, max: 8400 },
    ]
  },
  {
    code: 'HYD-BOM',
    origin: 'HYD',
    destination: 'BOM',
    name: 'Hyderabad ✈ Mumbai Deccan Trunk',
    distance_km: 620,
    block_time: '1h 30m',
    daily_flights: 28,
    corridor_type: 'TIER1_TIER2',
    medianFare: 3850,
    lowestFare: 2899,
    peakFare: 6100,
    volatility: 0.19,
    changePct: -2.1,
    baseFareRatio: 0.67,
    atfRatio: 0.20,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 60, color: '#1F4FBF', flights: 17, min: 2899, mean: 3600, max: 5600 },
      { code: 'AI', name: 'Air India', share: 40, color: '#EF4444', flights: 11, min: 3200, mean: 4100, max: 6100 },
    ]
  },
  {
    code: 'PNQ-DEL',
    origin: 'PNQ',
    destination: 'DEL',
    name: 'Pune ✈ New Delhi Commercial Link',
    distance_km: 1160,
    block_time: '2h 15m',
    daily_flights: 26,
    corridor_type: 'TIER1_TIER2',
    medianFare: 5200,
    lowestFare: 3800,
    peakFare: 8100,
    volatility: 0.23,
    changePct: 4.1,
    baseFareRatio: 0.65,
    atfRatio: 0.22,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 55, color: '#1F4FBF', flights: 14, min: 3800, mean: 4900, max: 7600 },
      { code: 'AI', name: 'Air India', share: 45, color: '#EF4444', flights: 12, min: 4100, mean: 5400, max: 8100 },
    ]
  },
  {
    code: 'GOI-BOM',
    origin: 'GOI',
    destination: 'BOM',
    name: 'Goa ✈ Mumbai Tourism Shuttle',
    distance_km: 435,
    block_time: '1h 10m',
    daily_flights: 30,
    corridor_type: 'TIER1_TIER2',
    medianFare: 3400,
    lowestFare: 2450,
    peakFare: 6500,
    volatility: 0.31,
    changePct: 18.5,
    baseFareRatio: 0.68,
    atfRatio: 0.19,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 50, color: '#1F4FBF', flights: 15, min: 2450, mean: 3200, max: 5900 },
      { code: 'QP', name: 'Akasa Air', share: 30, color: '#F58A1F', flights: 9, min: 2300, mean: 3100, max: 5400 },
      { code: 'AI', name: 'Air India', share: 20, color: '#EF4444', flights: 6, min: 2700, mean: 3800, max: 6500 },
    ]
  },
  {
    code: 'IXC-DEL',
    origin: 'IXC',
    destination: 'DEL',
    name: 'Chandigarh ✈ New Delhi Northern Feeder',
    distance_km: 235,
    block_time: '0h 55m',
    daily_flights: 14,
    corridor_type: 'REGIONAL',
    medianFare: 2950,
    lowestFare: 1999,
    peakFare: 4900,
    volatility: 0.16,
    changePct: 1.2,
    baseFareRatio: 0.70,
    atfRatio: 0.17,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 70, color: '#1F4FBF', flights: 10, min: 1999, mean: 2800, max: 4500 },
      { code: 'AI', name: 'Air India', share: 30, color: '#EF4444', flights: 4, min: 2300, mean: 3200, max: 4900 },
    ]
  },
  {
    code: 'AMD-BOM',
    origin: 'AMD',
    destination: 'BOM',
    name: 'Ahmedabad ✈ Mumbai Western Express',
    distance_km: 440,
    block_time: '1h 15m',
    daily_flights: 24,
    corridor_type: 'TIER1_TIER2',
    medianFare: 3200,
    lowestFare: 2200,
    peakFare: 5500,
    volatility: 0.20,
    changePct: -3.4,
    baseFareRatio: 0.67,
    atfRatio: 0.20,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 58, color: '#1F4FBF', flights: 14, min: 2200, mean: 3000, max: 5100 },
      { code: 'AI', name: 'Air India', share: 42, color: '#EF4444', flights: 10, min: 2500, mean: 3400, max: 5500 },
    ]
  },
  {
    code: 'PAT-DEL',
    origin: 'PAT',
    destination: 'DEL',
    name: 'Patna ✈ New Delhi Gangetic Trunk',
    distance_km: 855,
    block_time: '1h 45m',
    daily_flights: 22,
    corridor_type: 'TIER1_TIER2',
    medianFare: 4800,
    lowestFare: 3400,
    peakFare: 8900,
    volatility: 0.33,
    changePct: 15.8,
    baseFareRatio: 0.65,
    atfRatio: 0.22,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 65, color: '#1F4FBF', flights: 14, min: 3400, mean: 4500, max: 8200 },
      { code: 'AI', name: 'Air India', share: 35, color: '#EF4444', flights: 8, min: 3800, mean: 5100, max: 8900 },
    ]
  },
  {
    code: 'LKO-DEL',
    origin: 'LKO',
    destination: 'DEL',
    name: 'Lucknow ✈ New Delhi Awadh Feeder',
    distance_km: 420,
    block_time: '1h 10m',
    daily_flights: 18,
    corridor_type: 'REGIONAL',
    medianFare: 3100,
    lowestFare: 2150,
    peakFare: 5200,
    volatility: 0.17,
    changePct: 2.3,
    baseFareRatio: 0.68,
    atfRatio: 0.19,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 60, color: '#1F4FBF', flights: 11, min: 2150, mean: 2950, max: 4800 },
      { code: 'AI', name: 'Air India', share: 40, color: '#EF4444', flights: 7, min: 2400, mean: 3300, max: 5200 },
    ]
  },
  {
    code: 'GAU-DEL',
    origin: 'GAU',
    destination: 'DEL',
    name: 'Guwahati ✈ New Delhi North-East Trunk',
    distance_km: 1460,
    block_time: '2h 35m',
    daily_flights: 16,
    corridor_type: 'TIER1_TIER2',
    medianFare: 5950,
    lowestFare: 4250,
    peakFare: 9900,
    volatility: 0.29,
    changePct: 11.2,
    baseFareRatio: 0.64,
    atfRatio: 0.23,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 56, color: '#1F4FBF', flights: 9, min: 4250, mean: 5600, max: 9100 },
      { code: 'AI', name: 'Air India', share: 44, color: '#EF4444', flights: 7, min: 4600, mean: 6300, max: 9900 },
    ]
  },
  {
    code: 'COK-BLR',
    origin: 'COK',
    destination: 'BLR',
    name: 'Kochi ✈ Bengaluru Malabar Link',
    distance_km: 370,
    block_time: '1h 05m',
    daily_flights: 16,
    corridor_type: 'REGIONAL',
    medianFare: 2800,
    lowestFare: 1899,
    peakFare: 4700,
    volatility: 0.15,
    changePct: -1.8,
    baseFareRatio: 0.69,
    atfRatio: 0.18,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 62, color: '#1F4FBF', flights: 10, min: 1899, mean: 2650, max: 4300 },
      { code: 'AI', name: 'Air India', share: 38, color: '#EF4444', flights: 6, min: 2100, mean: 2980, max: 4700 },
    ]
  },
  {
    code: 'BBI-DEL',
    origin: 'BBI',
    destination: 'DEL',
    name: 'Bhubaneswar ✈ New Delhi Kalinga Corridor',
    distance_km: 1270,
    block_time: '2h 15m',
    daily_flights: 14,
    corridor_type: 'TIER1_TIER2',
    medianFare: 5150,
    lowestFare: 3700,
    peakFare: 8300,
    volatility: 0.25,
    changePct: 6.7,
    baseFareRatio: 0.65,
    atfRatio: 0.22,
    taxRatio: 0.13,
    airlines: [
      { code: '6E', name: 'IndiGo', share: 64, color: '#1F4FBF', flights: 9, min: 3700, mean: 4900, max: 7800 },
      { code: 'AI', name: 'Air India', share: 36, color: '#EF4444', flights: 5, min: 4100, mean: 5400, max: 8300 },
    ]
  },
];

// Lookup route by code or fuzzy pair
export function getRouteByCode(code = 'DEL-BOM') {
  const norm = code.toUpperCase().trim();
  const match = INDIAN_ROUTES.find(r => r.code === norm);
  if (match) return match;
  
  // Fuzzy match origin/dest
  const parts = norm.split(/[-–\s✈]+/);
  if (parts.length >= 2) {
    const found = INDIAN_ROUTES.find(
      r => (r.origin === parts[0] && r.destination === parts[1]) || (r.origin === parts[1] && r.destination === parts[0])
    );
    if (found) return found;
  }
  
  // Default to DEL-BOM
  return INDIAN_ROUTES[0];
}

// Generate continuous 90-day data leading up to September 19, 2026
export function generate90DaySeries(routeCode = 'DEL-BOM', daysCount = 90) {
  const route = getRouteByCode(routeCode);
  const baseFare = route.medianFare;
  const endDate = new Date(2026, 8, 19); // Sep 19, 2026
  
  const series = [];
  
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(endDate);
    d.setDate(d.getDate() - i);
    
    // Deterministic pseudo-random variation based on day index and route code
    const charSum = route.code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const dayFactor = Math.sin((i + charSum) * 0.25) * 0.12;
    const trendFactor = (daysCount - i) * 0.0015;
    const weekendMultiplier = d.getDay() === 0 || d.getDay() === 6 ? 1.08 : 0.97;
    
    const fare = Math.round(baseFare * (1 + dayFactor + trendFactor) * weekendMultiplier);
    
    const baseComponent = Math.round(fare * route.baseFareRatio);
    const atfComponent = Math.round(fare * route.atfRatio);
    const taxComponent = fare - baseComponent - atfComponent;
    
    const indexPts = +(100 * (fare / (route.medianFare * 0.85))).toFixed(2);
    const benchmarkPts = +(98.5 + Math.sin(i * 0.15) * 3).toFixed(2);
    
    // Carrier breakdowns
    const indigoFare = Math.round(fare * 0.92);
    const airIndiaFare = Math.round(fare * 1.04);
    const vistaraFare = Math.round(fare * 1.15);
    const akasaFare = Math.round(fare * 0.88);
    
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }); // e.g. "Jun 21", "Sep 19"
    const fullDateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); // "Sep 19, 2026"
    
    series.push({
      date: dateStr,
      fullDate: fullDateStr,
      isoDate: d.toISOString().split('T')[0],
      fare: fare,
      index: indexPts,
      benchmark: benchmarkPts,
      baseFare: baseComponent,
      atfSurcharge: atfComponent,
      taxes: taxComponent,
      indigo: indigoFare,
      airIndia: airIndiaFare,
      vistara: vistaraFare,
      akasa: akasaFare,
    });
  }
  
  return series;
}
