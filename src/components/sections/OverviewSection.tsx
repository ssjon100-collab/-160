import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Building, MapPin, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  const { content, theme } = useSite();
  const { overview } = content;

  const specItems = [
    { label: '사업명', value: overview.projectName },
    { label: '사업지 위치', value: overview.location },
    { label: '건축 규모', value: overview.scale },
    { label: '공급 세대수', value: overview.totalUnits },
    { label: '용도 / 상품', value: overview.buildingType },
    { label: '용적률 / 건폐율', value: `${overview.floorAreaRatio} / ${overview.buildingCoverageRatio}` },
    { label: '주차 계획', value: overview.parkingRatio },
    { label: '입주 예정시기', value: overview.completionDate },
    { label: '시행사 / 신탁사', value: `${overview.developer} / ${overview.trustee}` },
    { label: '시공사', value: overview.constructionCompany },
  ];

  return (
    <section id="overview" className="relative py-24 bg-[#08070d] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-montserrat tracking-widest uppercase">PROJECT OVERVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            동탄2 신주거문화타운 <span className="text-purple-400">B11블록 하이엔드 테라스하우스</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            분양가 상한제 적용 · 전세대 85㎡ 초과 100% 추첨제 · 단지 바로 앞 초품아 & 숲세권 160세대 한정
          </p>
        </div>

        {/* Content Layout: Architectural Image + Spec Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left: Architectural Visual with overlay stats */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/25 shadow-2xl purple-glow-sm">
              <img
                src={overview.imageUrl || '/assets/aistudio/260306-____2_______-______2b0666a7.jpg'}
                alt="동탄 그웬 160 조감도"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#120f22]/85 backdrop-blur-md border border-purple-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white tracking-wide">{theme.logoText}</span>
                  <span className="text-[10px] font-semibold text-purple-300 px-2 py-0.5 rounded bg-purple-900/60 border border-purple-500/30">
                    전세대 테라스 특화
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{overview.location}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Specifications Table */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-card p-6 sm:p-7 border border-purple-500/20 shadow-xl">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-purple-900/40">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <span>사업개요 상세 제원</span>
                </h3>
                <span className="text-xs text-purple-300 font-mono">160 UNITS PRIVATE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm">
                {specItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col py-2 border-b border-purple-950/50 hover:bg-purple-950/20 px-2 rounded-lg transition-colors"
                  >
                    <span className="text-gray-400 text-xs mb-0.5 font-medium">{item.label}</span>
                    <span className="text-white font-medium break-keep">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 5 Key Highlights row */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#130f24] to-purple-950/40 p-6 sm:p-8 border border-purple-500/25">
          <div className="flex items-center gap-2 mb-5 text-purple-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span>DONGTAN GWEN 160 ARCHITECTURAL SIGNATURE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overview.keyHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 sm:p-4.5 rounded-xl bg-black/45 border border-purple-500/20 text-sm sm:text-[15px] lg:text-base text-gray-100 font-medium leading-relaxed"
              >
                <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="break-keep">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
