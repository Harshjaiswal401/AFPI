const fallbackRoutes = [
  { id: 1, origin: 'DEL', destination: 'BOM', name: 'New Delhi - Mumbai Metro Corridor', distance_km: 1148, block_time: '2h 10m', daily_flights: 68, corridor_type: 'METRO_TRUNK', weight: 0.28, p0: 4850, current_avg: 5850, lowest_fare: 4199, median_peak: 8900, volatility: 0.28, status: 'High Volume', change_pct: 14.2 },
  { id: 2, origin: 'BLR', destination: 'DEL', name: 'Bengaluru - New Delhi Trunk', distance_km: 1740, block_time: '2h 45m', daily_flights: 48, corridor_type: 'METRO_TRUNK', weight: 0.27, p0: 5200, current_avg: 6200, lowest_fare: 4499, median_peak: 9800, volatility: 0.24, status: 'High Vol', change_pct: -12.7 },
  { id: 3, origin: 'BOM', destination: 'BLR', name: 'Mumbai - Bengaluru Commercial Link', distance_km: 842, block_time: '1h 45m', daily_flights: 38, corridor_type: 'METRO_TRUNK', weight: 0.15, p0: 3800, current_avg: 4120, lowest_fare: 3250, median_peak: 6800, volatility: 0.18, status: 'Norm', change_pct: 3.8 }
];

const fareRecords = [
  { flight: '6E 205', depArr: '06:10 - 08:20', carrier: 'IndiGo', baseFare: 3649, tax: 200, udf: 0, convenience: 350, fare: 4199, status: 'Lowest Available', seatClass: 'Eco Saver' },
  { flight: 'UK 933', depArr: '07:30 - 09:45', carrier: 'Vistara', baseFare: 4850, tax: 250, udf: 0, convenience: 350, fare: 5450, status: 'Normal', seatClass: 'Eco Standard' },
  { flight: 'AI 865', depArr: '10:00 - 12:15', carrier: 'Air India', baseFare: 4400, tax: 230, udf: 0, convenience: 350, fare: 4980, status: 'Normal', seatClass: 'Eco Value' }
];

const fallbackIndex = {
  status: 'success', model: 'Laspeyres Capacity-Weighted Formulation v2.8', anchor_date: '2026-01-15', anchor_base: 100, current_index: 121.3, yoy_change_pct: 18.64, mom_change_pct: 3.2, wow_points: 1.8, thirty_day_high: 126.8, thirty_day_low: 112.1, volatility_sigma: 4.82,
  basket_weights: { metro: 0.55, tier1_tier2: 0.3, regional: 0.15 },
  sub_baskets: { metro_trunk: { weight_pct: 55, index: 121.3, driver: 'Jet Fuel ATF Price Surcharge' }, tier1_tier2: { weight_pct: 30, index: 114.2, driver: 'Booking Window Compression' }, regional_udan: { weight_pct: 15, index: 108.9, driver: 'Fleet Supply Constraints' } },
  drivers: [{ name: 'Fuel Price (ATF) Impact', impact_pts: 1.4, details: 'Fuel price impact' }, { name: 'Booking Window Compression', impact_pts: 2.1, details: 'Late booking impact' }, { name: 'Fleet Supply Constraints', impact_pts: 0.6, details: 'Capacity impact' }]
};

const fallbackTrend = { status: 'success', range: 'Last 90 Days', baseline_date: '2024-08-15', data: [
  { date: '2024-08-15', label: 'Aug 15', fare: 4900, index: 106.5 }, { date: '2024-09-10', label: 'Sep 10', fare: 4320, index: 104.2 }, { date: '2024-09-20', label: 'Sep 20', fare: 4580, index: 109.6 }, { date: '2024-10-05', label: 'Oct 05', fare: 5640, index: 118.4 }, { date: '2024-10-19', label: 'Oct 19', fare: 5850, index: 121.3 }
] };

const fallbackAnalytics = { status: 'success', modules: { decision_engine: { model: 'AFPI Local Analytics', confidence_target: '95%', ensemble_f1: '94.2%', false_positive_rate: '2.1%', training_sample_size: '1.8M Indian flight records', last_updated: 'Live demo' }, anomalies: { total_24h: 14, critical_surges: 8, flash_drops: 4, suspected_glitches: 2, records: [] }, forecast_14d: [], lead_time_decay: [], price_dispersion: [], buy_decision: { route: 'DEL-BOM', signal: 'BUY WITHIN 48 HOURS', confidence: '91%', expected_shift: '+₹1,640', recommended_action: 'Secure Floor Target sub-₹4,500', rationale: 'Local demo analytics are active.' } } };
const fallbackScrape = { status: 'success', engine_status: 'Demo Mode', active_workers: 0, degraded_nodes: 0, daily_records_ingested: 184290, records_throughput: 'Local demo', job_success_rate: '99.42%', proxy_health: 'N/A', residential_latency: 'N/A', lockouts: 0, fleet: [], sanitization_rules: {}, incident_breakdown: [] };
const fallbackLogs = { status: 'success', buffer_utilization: '0/1024 KB', logs: [{ timestamp: new Date().toLocaleTimeString(), level: 'INFO', worker: 'frontend', message: 'AFPI frontend demo mode is running without a backend.' }] };
const fallbackHistory = { status: 'success', monitored_corridor: 'DEL (Delhi) ⇄ BLR (Bengaluru)', all_time_lowest: { fare: 3240, label: 'Monsoon Low', date: 'July 12, 2024' }, all_time_peak: { fare: 14800, label: '+150% Spike Diwali', date: 'Nov 11, 2023' }, historical_mean: 5920, price_inflation_index: '+8.4%', cagr: '6.1%', carriers: [] };

const mock = (value) => Promise.resolve(value);

export const api = {
  getRoutes: () => mock({ status: 'success', total_monitored: fallbackRoutes.length, active_corridors: 142, corridors: fallbackRoutes }),
  getFares: (params = {}) => {
    const records = fareRecords.filter((item) => (!params.carrier || item.carrier.toLowerCase().includes(params.carrier.toLowerCase())) && (!params.status || item.status.toLowerCase().includes(params.status.toLowerCase())));
    return mock({ status: 'success', count: records.length, total_records_ingested: 184290, records });
  },
  getIndex: () => mock(fallbackIndex),
  getTrend: () => mock(fallbackTrend),
  getAnalytics: () => mock(fallbackAnalytics),
  getScraperStatus: () => mock(fallbackScrape),
  getScraperLogs: () => mock(fallbackLogs),
  triggerScraper: () => mock({ status: 'triggered', message: 'Demo sweep completed locally', job_id: 'DEMO-9999', estimated_duration: '0 seconds' }),
  getHistory: () => mock(fallbackHistory),
  updateSettings: (settings) => mock({ status: 'success', message: 'Demo settings saved locally', recalculated_index: 121.3, weights: { metro: 0.55, tier1_tier2: 0.3, regional: 0.15 }, settings }),
  downloadDGCAExport: () => {
    const csv = ['Route,Carrier,Flight_Number,Travel_Date,Total_Fare,Status', ...fareRecords.map((item) => `DEL-BOM,${item.carrier},${item.flight},2026-09-19,${item.fare},${item.status}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a'); link.href = url; link.download = 'AFPI_DGCA_Compliance_Audit.csv'; link.click(); URL.revokeObjectURL(url);
  }
};
