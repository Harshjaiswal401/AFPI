import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardOverview } from './pages/DashboardOverview';
import { AirfareIndexMacro } from './pages/AirfareIndexMacro';
import { RouteAnalysis } from './pages/RouteAnalysis';
import { FareHistory } from './pages/FareHistory';
import { AnalyticsModels } from './pages/AnalyticsModels';
import { ScraperMonitor } from './pages/ScraperMonitor';
import { DataManagement } from './pages/DataManagement';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsFormula } from './pages/SettingsFormula';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedRoute, setSelectedRoute] = useState('DEL-BOM');

  const handleNavigate = (page, route) => {
    if (route) setSelectedRoute(route);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchRoute = (query) => {
    const q = query.toUpperCase().trim();
    if (q.includes('DEL') || q.includes('BOM') || q.includes('BLR') || q.includes('HYD')) {
      setSelectedRoute(q);
      setCurrentPage('route');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Tricolour accent strip */}
      <div className="tricolor-bar shrink-0" />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} onSelectPage={(page) => handleNavigate(page)} />

        {/* Main Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <Header onSearchRoute={handleSearchRoute} activeRoute={selectedRoute} />

          {/* Dynamic Page Router */}
          <main className="flex-1 pb-8">
            {currentPage === 'dashboard' && <DashboardOverview onNavigate={handleNavigate} />}
            {currentPage === 'index' && <AirfareIndexMacro />}
            {currentPage === 'route' && <RouteAnalysis initialRoute={selectedRoute} />}
            {currentPage === 'history' && <FareHistory />}
            {currentPage === 'analytics' && <AnalyticsModels />}
            {currentPage === 'scraper' && <ScraperMonitor />}
            {currentPage === 'data' && <DataManagement />}
            {currentPage === 'reports' && <ReportsPage />}
            {currentPage === 'settings' && <SettingsFormula />}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
