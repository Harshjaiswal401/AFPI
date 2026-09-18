import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/profile/ProfileModal';
import { AeroBot } from './components/common/AeroBot';
import { NoticeGenerator } from './components/audit/NoticeGenerator';
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
  const [dateRangePreset, setDateRangePreset] = useState('30');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [refreshTriggerKey, setRefreshTriggerKey] = useState(0);
  const [noticeEvent, setNoticeEvent] = useState(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleOpenNotice = (eventData) => {
    setNoticeEvent(eventData || null);
    setIsNoticeOpen(true);
  };

  const handleNavigate = (page, route) => {
    if (route) setSelectedRoute(route);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchRoute = (routeCode) => {
    setSelectedRoute(routeCode);
    setCurrentPage('route');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshTelemetry = () => {
    setRefreshTriggerKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Tricolour accent strip */}
      <div className="tricolor-bar shrink-0" />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar Navigation */}
        <Sidebar
          currentPage={currentPage}
          onSelectPage={(page) => handleNavigate(page)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        {/* Main Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <Header
            onSearchRoute={handleSearchRoute}
            activeRoute={selectedRoute}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            dateRangePreset={dateRangePreset}
            onDateRangeChange={setDateRangePreset}
            onRefreshTelemetry={handleRefreshTelemetry}
          />

          {/* Dynamic Page Router */}
          <main className="flex-1 pb-8">
            {currentPage === 'dashboard' && (
              <DashboardOverview
                onNavigate={handleNavigate}
                selectedRoute={selectedRoute}
                dateRangePreset={dateRangePreset}
                refreshTriggerKey={refreshTriggerKey}
                onOpenNotice={handleOpenNotice}
              />
            )}
            {currentPage === 'index' && (
              <AirfareIndexMacro
                dateRangePreset={dateRangePreset}
                refreshTriggerKey={refreshTriggerKey}
              />
            )}
            {currentPage === 'route' && (
              <RouteAnalysis
                initialRoute={selectedRoute}
                dateRangePreset={dateRangePreset}
                refreshTriggerKey={refreshTriggerKey}
              />
            )}
            {currentPage === 'history' && (
              <FareHistory
                initialRoute={selectedRoute}
                dateRangePreset={dateRangePreset}
                refreshTriggerKey={refreshTriggerKey}
              />
            )}
            {currentPage === 'analytics' && <AnalyticsModels />}
            {currentPage === 'scraper' && <ScraperMonitor refreshTriggerKey={refreshTriggerKey} />}
            {currentPage === 'data' && <DataManagement />}
            {currentPage === 'reports' && <ReportsPage />}
            {currentPage === 'settings' && <SettingsFormula />}
          </main>

          <Footer />
        </div>
      </div>

      {/* Official Officer Credentials Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* DGCA Show-Cause Notice Generator Modal */}
      <NoticeGenerator
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        eventData={noticeEvent}
      />

      {/* AeroBot DGCA AI Floating Sentinel */}
      <AeroBot
        onOpenNotice={handleOpenNotice}
        onNavigate={handleNavigate}
        onSelectRoute={handleSearchRoute}
      />
    </div>
  );
};

export default App;
