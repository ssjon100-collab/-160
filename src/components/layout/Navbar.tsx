import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Phone,
  Share2,
  Sliders,
  Menu,
  X,
  Sparkles,
  Building2,
  Layers,
  MapPin,
  Newspaper,
  UserCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, content, setIsAdminOpen, setIsShareOpen, setIsInquiryModalOpen } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '사업개요', href: '#overview', icon: Building2 },
    { name: '프리미엄', href: '#premium', icon: Sparkles },
    { name: '평면안내', href: '#units', icon: Layers },
    { name: '분양소식', href: '#news', icon: Newspaper },
    { name: '오시는길', href: '#location', icon: MapPin },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08070d]/92 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-lg shadow-black/50'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center group"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
                    {theme.logoText || '동탄그웬 160'}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    잔여세대 선착순 분양중
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] tracking-widest text-purple-300/80 font-montserrat uppercase">
                  {theme.logoSubtext || 'High-End Private Residence'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-purple-950/30 hover:border hover:border-purple-500/25 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone CTA (Desktop) */}
              <a
                href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 text-purple-200 text-xs font-semibold hover:bg-purple-900/40 transition-all purple-glow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span className="tracking-wide">{content.contact.phone}</span>
              </a>

              {/* VIP Registration CTA */}
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentColor}, #7e22ce)`,
                  boxShadow: `0 4px 20px ${theme.accentColor}44`,
                }}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>관심고객등록</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-2.5 rounded-xl bg-[#141122] border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-400 transition-all"
                title="공유하기"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Admin CMS Trigger Button */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/50 text-purple-200 text-xs font-semibold transition-all hover:text-white group"
                title="관리자 CMS 대시보드 열기"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-45 transition-transform" />
                <span className="hidden xs:inline">관리자 CMS</span>
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2.5 rounded-xl bg-[#141122] border border-purple-500/20 text-gray-300 hover:text-white transition-all"
                aria-label="메뉴 열기"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0c0a15]/98 border-b border-purple-500/30 p-5 shadow-2xl backdrop-blur-xl animate-fade-in z-50">
            <div className="space-y-1 mb-5">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-purple-950/40 border border-transparent hover:border-purple-500/25 transition-all"
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-purple-900/40 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>관심고객 VIP 사전 등록</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="py-2.5 rounded-xl bg-[#181429] border border-purple-500/30 text-purple-300 flex items-center justify-center gap-1.5 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>전화상담</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 flex items-center justify-center gap-1.5 font-semibold"
                >
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>관리자 대시보드</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
