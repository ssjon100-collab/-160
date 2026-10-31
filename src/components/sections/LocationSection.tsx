import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { MapPin, Navigation, Copy, Check, Train, ShoppingBag, TreePine, Cpu, X, ZoomIn } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { content, showToast } = useSite();
  const { contact } = content;
  const [copiedType, setCopiedType] = useState<'model' | 'site' | null>(null);
  const [mapTab, setMapTab] = useState<'official' | 'interactive'>('official');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleCopy = (text: string, type: 'model' | 'site') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    showToast('주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const infraItems = [
    {
      icon: TreePine,
      title: '단지 앞 초품아 & 명문 교육',
      points: ['단지 바로 앞 현민초등학교·병설유치원(도보 1분)', '바른중학교, 동탄11고(예정) 도보 통학권', '유해시설 없는 안심 청정 교육환경'],
    },
    {
      icon: Train,
      title: '광역 교통망 & 동탄 트램',
      points: ['동탄 도시철도 트램(예정) 역세권 비전', 'GTX-A & SRT 동탄역 연계 광역교통', '수도권제2순환고속도로, 경부고속도로 진입 용이'],
    },
    {
      icon: TreePine,
      title: '자연을 품은 에코 힐링 숲세권',
      points: ['신리천 수변공원 산책로 연결', '단지 앞 근린공원 및 다올공원 인접', '왕배산 체육공원, 무봉산 등 청정 자연'],
    },
    {
      icon: Cpu,
      title: '세계 최대 반도체 메가 클러스터',
      points: ['삼성전자 360조 투자 용인 남사 반도체 배후', '삼성전자 기흥·화성 캠퍼스 직주근접', '신주거문화타운 중심상업용지 인접 편의 인프라'],
    },
  ];

  return (
    <section id="location" className="relative py-24 bg-[#06050a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
            <Navigation className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-montserrat tracking-widest uppercase">LOCATION & DIRECTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            동탄2 신주거문화타운 B11BL, <span className="text-purple-400">초품아와 자연을 품은 명품 입지</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            단지 바로 앞 현민초등학교와 신리천 수변공원, 용인 반도체 메가 클러스터의 핵심 배후 주거단지
          </p>
        </div>

        {/* Map & Address Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Interactive Styled Map View */}
          <div className="lg:col-span-7 rounded-2xl glass-card border border-purple-500/30 overflow-hidden relative min-h-[420px] flex flex-col justify-between">
            {/* View Mode Toggle Header */}
            <div className="relative z-20 p-4 pb-0 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-lg purple-glow-sm">
                  동탄 그웬 160 입지
                </span>
                <span className="text-[11px] text-gray-400 bg-black/60 px-2.5 py-1 rounded-md border border-purple-500/20">
                  신주거문화타운 B11블록
                </span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/70 border border-purple-500/30 text-xs">
                <button
                  type="button"
                  onClick={() => setMapTab('official')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    mapTab === 'official' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  공식 입지 안내도
                </button>
                <button
                  type="button"
                  onClick={() => setMapTab('interactive')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    mapTab === 'interactive' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  스마트 안내핀
                </button>
              </div>
            </div>

            {mapTab === 'official' ? (
              /* Official Location Map Graphic from xn--gwen160-o331aw71q.com */
              <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col justify-center items-center">
                <div className="relative w-full rounded-xl overflow-hidden border border-purple-500/30 group bg-black/50">
                  <img
                    src="https://xn--gwen160-o331aw71q.com/img/location_map.jpg"
                    alt="동탄 그웬 160 공식 입지안내도"
                    className="w-full h-[320px] sm:h-[360px] object-contain cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    onClick={() => setIsMapModalOpen(true)}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMapModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-purple-900/80 backdrop-blur-md border border-purple-400/40 text-[11px] text-purple-200 hover:text-white transition-all flex items-center gap-1 shadow-lg"
                    >
                      <span>🔍 크게 보기</span>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-purple-500/30 text-[10px] text-purple-300">
                    공식 광역 입지도 (동탄 트램 · 신리천 · 초품아)
                  </div>
                </div>
              </div>
            ) : (
              /* Visual map backdrop illustration with interactive pins */
              <div className="relative flex-1 flex flex-col justify-between">
                <div className="absolute inset-0 bg-[#0c0a18]">
                  <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6b21a8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M 0 180 Q 250 140 500 220 T 1000 200" fill="none" stroke="#a855f7" strokeWidth="3" />
                    <path d="M 320 0 L 320 600" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                    <path d="M 0 340 L 1000 340" fill="none" stroke="#7e22ce" strokeWidth="2" />
                    <path d="M 0 80 Q 400 120 700 40 T 1200 100" fill="none" stroke="#38bdf8" strokeWidth="4" strokeOpacity="0.4" />
                  </svg>
                </div>

                <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="my-auto py-8 flex flex-col items-center justify-center gap-6">
                    <div className="p-4 rounded-2xl bg-black/85 backdrop-blur-md border-2 border-purple-400 shadow-2xl purple-glow text-center max-w-xs animate-bounce-slow">
                      <div className="flex items-center justify-center gap-2 text-purple-300 font-bold text-sm mb-1">
                        <MapPin className="w-5 h-5 text-purple-400 fill-purple-400/30" />
                        <span>동탄 그웬 160 현장</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-snug">
                        경기도 화성시 신동 720번지 (B11블록)
                      </p>
                      <div className="mt-2 text-[10px] text-purple-300 font-semibold bg-purple-950/80 py-0.5 px-2.5 rounded border border-purple-500/30">
                        전세대 85㎡ 초과 100% 추첨제 · 초품아
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
                      <span className="px-3 py-1 rounded-lg bg-[#19152e] border border-amber-500/30 text-amber-300 shadow">
                        🏫 현민초등학교 & 병설유치원 (도보 1분)
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[#19152e] border border-emerald-500/30 text-emerald-300 shadow">
                        🌿 신리천 수변공원 & 다올공원
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[#19152e] border border-blue-500/30 text-blue-300 shadow">
                        🚊 동탄 트램(예정) & 동탄역 환승망
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right: Address Cards & Visit Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">

            {/* Site Address Card */}
            <div className="p-6 rounded-2xl glass-card border border-purple-500/30 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">사업지 현장</span>
                <span className="text-[10px] font-semibold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">공사 착공 중</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{contact.siteAddress}</h3>
              <p className="text-xs text-gray-400 mb-4">
                ※ 현장은 안전 사고 예방을 위해 일반인의 출입이 제한되오니 주택전시관으로 방문해 주시기 바랍니다.
              </p>

              <button
                onClick={() => handleCopy(contact.siteAddress, 'site')}
                className="w-full py-2.5 rounded-xl bg-[#1b1633] hover:bg-[#28214c] border border-purple-500/30 text-purple-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                {copiedType === 'site' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
                <span>{copiedType === 'site' ? '현장 주소 복사완료' : '현장 주소 복사'}</span>
              </button>
            </div>

            {/* Consultation Hours banner */}
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300/90 flex items-center justify-between">
              <span>관람 운영시간 : <strong>{contact.consultationHours}</strong></span>
              <span className="font-semibold text-white">대표 {contact.phone}</span>
            </div>
          </div>
        </div>

        {/* 4 Infrastructure Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infraItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-purple-500/15 hover:border-purple-500/40 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2.5">{item.title}</h4>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5 leading-snug">
                      <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Map Enlarged Modal */}
      {isMapModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsMapModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0a18] rounded-2xl border border-purple-500/40 p-4 sm:p-6 overflow-hidden flex flex-col shadow-2xl purple-glow"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  동탄 그웬 160 공식 광역 입지 안내도
                </h3>
                <p className="text-xs text-gray-400">
                  신주거문화타운 B11블록 · 초품아 · 동탄 트램(예정) · 신리천 수변공원
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-xl bg-black/60 border border-purple-500/20 flex items-center justify-center p-2">
              <img
                src="https://xn--gwen160-o331aw71q.com/img/location_map.jpg"
                alt="동탄 그웬 160 입지안내도 확대"
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-purple-950/40 flex items-center justify-between text-xs text-gray-400">
              <span>※ 사업지: {contact.siteAddress}</span>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
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
