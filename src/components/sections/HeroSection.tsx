import React from 'react';
import { useSite } from '../../context/SiteContext';
import { ChevronRight, Sparkles, Phone, ArrowDown, Shield, Award } from 'lucide-react';
import { HeroInteractiveBackground } from './HeroInteractiveBackground';

export const HeroSection: React.FC = () => {
  const { content, theme, setIsInquiryModalOpen } = useSite();
  const { hero } = content;

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Image with Dark Gradient & Purple Radiance */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt={theme.logoText}
          className="w-full h-full object-cover object-center brightness-[0.35] scale-105 transform animate-pulse-slow"
        />
        {/* Layered luxury obsidian & purple ambient gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-black/85" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: theme.accentColor }}
        />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#07070a] to-transparent pointer-events-none" />
      </div>

      {/* Subtle & Sensual Interactive Background Design Layer */}
      <HeroInteractiveBackground accentColor={theme.accentColor} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Top Eyebrow & VIP status badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-950/75 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-6 shadow-lg shadow-purple-900/40 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-white font-bold tracking-wide">{hero.badgeText}</span>
          <span className="w-1 h-1 rounded-full bg-purple-400" />
          <span className="tracking-wider uppercase font-montserrat text-purple-300/80 text-[11px]">{hero.eyebrow}</span>
        </div>

        {/* Main Catchy Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          <span className="block font-light text-slate-200">{hero.title}</span>
          <span
            className="block mt-2 font-bold purple-text-glow bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 15%, ${theme.accentColor} 65%, #e879f9 100%)`,
            }}
          >
            {hero.titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light mb-10">
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${theme.accentColor}, #7e22ce)`,
              boxShadow: `0 8px 30px ${theme.accentColor}55`,
            }}
          >
            <span>{hero.ctaPrimaryText}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('#units')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-semibold text-purple-200 bg-[#161225]/80 hover:bg-[#201936] border border-purple-500/30 hover:border-purple-400 transition-all backdrop-blur-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{hero.ctaSecondaryText}</span>
          </button>

          <a
            href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`}
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-white bg-black/60 hover:bg-black/90 border border-purple-900/50 hover:border-purple-500/40 transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>대표문의 {content.contact.phone}</span>
          </a>
        </div>

        {/* Stats Cards */}
        <div className={`grid gap-3 sm:gap-4 mx-auto ${hero.stats.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl' : 'grid-cols-2 lg:grid-cols-4 max-w-5xl'}`}>
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl glass-card glass-card-hover text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-colors" />
              <div className="text-[11px] font-medium text-purple-300/80 mb-1 flex items-center justify-between">
                <span>{stat.label}</span>
                {idx === 0 ? <Award className="w-3.5 h-3.5 text-purple-400" /> : <Shield className="w-3.5 h-3.5 text-purple-400/60" />}
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel mb-1 tracking-tight"
                style={{ color: '#ffffff' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-light truncate">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollToSection('#overview')}
            className="flex flex-col items-center gap-1.5 text-xs text-gray-400 hover:text-purple-300 transition-colors group"
            aria-label="아래로 스크롤"
          >
            <span className="text-[11px] font-montserrat tracking-widest uppercase">DISCOVER MORE</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
