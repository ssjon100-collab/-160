/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { OverviewSection } from './components/sections/OverviewSection';
import { PremiumSection } from './components/sections/PremiumSection';
import { UnitsSection } from './components/sections/UnitsSection';
import { NewsSection } from './components/sections/NewsSection';
import { LocationSection } from './components/sections/LocationSection';
import { InquirySection } from './components/sections/InquirySection';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { AdminModal } from './components/admin/AdminModal';
import { ShareModal } from './components/common/ShareModal';
import { PostDetailModal } from './components/common/PostDetailModal';
import { Toast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const { theme } = useSite();

  // Dynamic background style based on theme.bgDepth
  const getBgStyle = () => {
    switch (theme.bgDepth) {
      case 'charcoal':
        return 'bg-[#0e0e16]';
      case 'violet':
        return 'bg-[#0c0818]';
      case 'obsidian':
      default:
        return 'bg-[#07070a]';
    }
  };

  // Dynamic font class
  const getFontClass = () => {
    switch (theme.fontFamily) {
      case 'cinzel':
        return 'font-sans font-cinzel-body';
      case 'montserrat':
        return 'font-montserrat';
      case 'pretendard':
      default:
        return '';
    }
  };

  return (
    <div
      className={`min-h-screen text-slate-100 ${getBgStyle()} ${getFontClass()} transition-colors duration-300 relative selection:bg-purple-600 selection:text-white`}
      style={{
        // Define root accent variables for reactive color adjustments
        ['--color-accent' as any]: theme.accentColor,
      }}
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <OverviewSection />
        <PremiumSection />
        <UnitsSection />
        <NewsSection />
        <LocationSection />
        <InquirySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar />

      {/* Modals & Dialogs */}
      <AdminModal />
      <ShareModal />
      <PostDetailModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
