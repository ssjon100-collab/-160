import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Sparkles, Check, ChevronRight, Crown } from 'lucide-react';

export const PremiumSection: React.FC = () => {
  const { premiums, theme, setIsInquiryModalOpen } = useSite();
  const [selectedId, setSelectedId] = useState<string | null>(premiums[0]?.id || null);

  return (
    <section id="premium" className="relative py-24 bg-[#06050a] overflow-hidden">
      {/* Background ambient light */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
            <Crown className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-montserrat tracking-widest uppercase">PREMIUM 6 VALUE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            동탄그웬 160이 선사하는 <span className="text-purple-400">6가지 독보적 프리미엄</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            교통, 자연, 공간, 서비스, 미래 비전까지—어디서도 경험하지 못한 하이엔드 주거의 정점을 완성합니다.
          </p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {premiums.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 flex flex-col cursor-pointer border ${
                  isSelected
                    ? 'border-purple-400 shadow-2xl purple-glow'
                    : 'border-purple-500/20 hover:border-purple-400/60 hover:shadow-xl'
                }`}
              >
                {/* Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c18] via-transparent to-black/40" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-cinzel text-2xl font-black text-white px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-purple-500/40 purple-glow-sm">
                      {item.number}
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[11px] font-semibold text-purple-300 px-2.5 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/40">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-purple-400/90 mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Bullet details */}
                  <div className="pt-4 border-t border-purple-900/30 space-y-2">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[11px] text-gray-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-900/30 via-[#17122b] to-purple-900/30 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-600/25 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0 mx-auto md:mx-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                단 160분만 누릴 수 있는 하이퍼엔드 라이프를 경험하세요
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                VIP 사전 관람을 신청하시면 전담 마스터와의 1:1 프리미엄 상담이 제공됩니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span>VIP 사전 관람 예약 신청</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
