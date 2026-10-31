import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Layers, CheckCircle2, Eye, Compass, UserCheck, ZoomIn, X } from 'lucide-react';

export const UnitsSection: React.FC = () => {
  const { units, theme, setIsInquiryModalOpen } = useSite();
  const [activeUnitId, setActiveUnitId] = useState<string>(units[0]?.id || '');
  const [viewMode, setViewMode] = useState<'interior' | 'floorplan'>('interior');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const currentUnit = units.find(u => u.id === activeUnitId) || units[0];

  if (!currentUnit) return null;

  // 102A와 동일한 고화질 모델하우스 실물 LDK 이미지로 전 세대 인테리어 뷰 통일
  const getInteriorImage = () => {
    return '/assets/aistudio/image_5c8bbbd6.png';
  };

  const activeVisualUrl = viewMode === 'interior'
    ? getInteriorImage()
    : currentUnit.floorplanUrl;

  return (
    <section id="units" className="relative py-24 bg-[#08070d] overflow-hidden">
      {/* Decorative radial gradients */}
      <div
        className="absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-montserrat tracking-widest uppercase">FLOOR PLAN & SUITE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            공간의 미학을 극대화한 <span className="text-purple-400">하이엔드 평면 설계</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            전 세대 와이드 테라스와 고품격 이탈리아 수입 마감재가 조화를 이루는 독창적인 주거 컬렉션
          </p>
        </div>

        {/* Unit Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {units.map((unit) => {
            const isActive = unit.id === currentUnit.id;
            return (
              <button
                key={unit.id}
                onClick={() => setActiveUnitId(unit.id)}
                className={`px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400 scale-105'
                    : 'bg-[#151125] text-gray-400 hover:text-white border border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                <span className="font-montserrat">{unit.typeCode}</span>
                <span className="text-xs opacity-80 font-normal">({unit.householdCount})</span>
              </button>
            );
          })}
        </div>

        {/* Current Unit Showcase Card */}
        <div className="rounded-3xl glass-card border border-purple-500/30 overflow-hidden shadow-2xl purple-glow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual View (Interior or Floorplan) */}
            <div className="lg:col-span-7 bg-[#0b0a13] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-purple-900/30">
              {/* Visual switcher toggle */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-white font-cinzel">
                    {currentUnit.typeCode}
                  </span>
                  <span className="text-xs text-purple-300 font-medium px-2 py-0.5 rounded bg-purple-900/50 border border-purple-500/30">
                    {currentUnit.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-[#171329] border border-purple-500/25 text-xs">
                  <button
                    onClick={() => setViewMode('interior')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      viewMode === 'interior'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    3D 인테리어 투시도
                  </button>
                  <button
                    onClick={() => setViewMode('floorplan')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      viewMode === 'floorplan'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    평면도 상세
                  </button>
                </div>
              </div>

              {/* Main Image Display */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/25 bg-black/60 aspect-video flex items-center justify-center group my-auto">
                <img
                  src={activeVisualUrl}
                  alt={`${currentUnit.name} ${viewMode}`}
                  onClick={() => setIsZoomOpen(true)}
                  onError={(e) => {
                    if (viewMode === 'interior') {
                      (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/image_5c8bbbd6.png';
                    }
                  }}
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  className={`w-full h-full cursor-zoom-in transition-all duration-300 ${
                    viewMode === 'floorplan'
                      ? 'object-contain bg-white p-3 sm:p-4'
                      : 'object-cover contrast-[1.09] brightness-[1.03] saturate-[1.04]'
                  } group-hover:scale-101`}
                />

                {/* Floating badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-purple-500/30 text-[11px] text-purple-200 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>{viewMode === 'interior' ? 'LDK 프리미엄 조망 연출' : '확장형 단위세대 평면구성'}</span>
                </div>

                {/* Sharpness & Zoom High-Res Button */}
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/80 hover:bg-purple-900/80 backdrop-blur-md border border-purple-500/35 text-[11px] text-purple-200 hover:text-white flex items-center gap-1.5 transition-all shadow-lg"
                  title="고화질 원본 크게보기"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                  <span>선명하게 크게보기</span>
                </button>
              </div>

              {/* VR Tour & Zoom Callout */}
              <div className="mt-4 pt-3 border-t border-purple-950/60 flex items-center justify-between text-xs text-gray-400">
                <span>※ 인테리어 투시도 및 CG는 고객 이해를 돕기 위한 예시입니다.</span>
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>실물 유니트 관람 예약</span>
                </button>
              </div>
            </div>

            {/* Spec & Features Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Title & Description */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                    SUITE SPECIFICATION
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {currentUnit.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {currentUnit.description}
                  </p>
                </div>

                {/* Area Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-[#151125] border border-purple-500/25 mb-6 text-center">
                  <div className="p-2 rounded-xl bg-black/40">
                    <span className="block text-[10px] text-gray-400 font-medium">전용면적</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{currentUnit.areaExclusive}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40">
                    <span className="block text-[10px] text-gray-400 font-medium">공급면적</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{currentUnit.areaSupply}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30">
                    <span className="block text-[10px] text-purple-300 font-medium">공급규모</span>
                    <span className="text-xs sm:text-sm font-bold text-purple-200">{currentUnit.householdCount}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold text-purple-200 mb-3 flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>주요 특화 옵션 & 설계 포인트</span>
                  </h4>
                  <div className="space-y-2.5">
                    {currentUnit.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#120f22] border border-purple-500/15 text-xs text-gray-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action for This Unit */}
              <div className="pt-4 border-t border-purple-900/40">
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{currentUnit.typeCode} 타입 VIP 사전 상담 신청하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Crystal Clear Image Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-[#0c0a18] rounded-2xl border border-purple-500/40 p-4 sm:p-6 overflow-hidden flex flex-col shadow-2xl purple-glow"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="font-montserrat text-purple-400">{currentUnit.typeCode}</span>
                  <span>{currentUnit.name} - {viewMode === 'interior' ? '3D 인테리어 고화질 투시도' : '확장형 단위세대 평면도 원본'}</span>
                </h3>
                <p className="text-xs text-gray-400">
                  {viewMode === 'floorplan' ? '도면의 모든 치수와 실별 구조를 선명하게 확인하실 수 있습니다.' : '고해상도 실내 공간 연출 이미지입니다.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-9 h-9 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`flex-1 overflow-auto rounded-xl border border-purple-500/20 flex items-center justify-center p-2 sm:p-4 ${viewMode === 'floorplan' ? 'bg-white' : 'bg-black/70'}`}>
              <img
                src={activeVisualUrl}
                alt={`${currentUnit.name} 고화질 확대`}
                onError={(e) => {
                  if (viewMode === 'interior') {
                    (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/image_5c8bbbd6.png';
                  }
                }}
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
                className={`max-w-full max-h-[76vh] object-contain rounded-lg shadow-inner ${
                  viewMode === 'interior' ? 'contrast-[1.09] brightness-[1.03] saturate-[1.04]' : ''
                }`}
              />
            </div>

            <div className="mt-3 pt-2 border-t border-purple-950/40 flex items-center justify-between text-xs text-gray-400">
              <span>※ {currentUnit.householdCount} / {currentUnit.areaExclusive}</span>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
