import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Phone, Clock, ShieldCheck, Sliders, RotateCcw, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme, content, setIsAdminOpen, resetToDefaults } = useSite();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <footer className="relative bg-[#050508] border-t border-purple-500/20 pt-16 pb-28 md:pb-16 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-purple-900/30">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-cinzel font-bold text-white text-base shadow-md"
                style={{ background: `linear-gradient(135deg, ${theme.accentColor}, #581c87)` }}
              >
                160
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">{theme.logoText}</h3>
                <p className="text-[10px] text-purple-400 tracking-wider font-montserrat uppercase">
                  {theme.logoSubtext}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
              동탄의 새로운 랜드마크 스카이라인을 완성하는 160세대 한정 하이퍼엔드 테라스 & 펜트하우스 주거명작. 최고의 입지와 격조 높은 프라이빗 커뮤니티로 단 하나의 가치를 선사합니다.
            </p>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-purple-200 tracking-wider uppercase">분양 대표문의</h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold text-white hover:text-purple-300 transition-colors"
              >
                <Phone className="w-6 h-6 text-purple-400" />
                <span>{content.contact.phone}</span>
              </a>
              <p className="flex items-center gap-2 text-sm sm:text-base text-gray-200 font-medium">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{content.contact.consultationHours || '매일 10:00 ~ 17:00 (사전예약제 운영)'}</span>
              </p>
              <p className="text-xs sm:text-sm text-purple-300/90 leading-relaxed">
                ※ 주택전시관은 쾌적한 관람을 위해 100% 사전 예약제로 운영됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Business and Legal Information */}
        <div className="py-8 space-y-3 text-[11px] text-gray-500 leading-relaxed">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-400">
            <span><strong>시행 :</strong> {content.overview.developer}</span>
            <span><strong>시공 :</strong> {content.overview.constructionCompany}</span>
            <span><strong>신탁 :</strong> {content.overview.trustee}</span>
          </div>

          <p>
            본 웹사이트에 사용된 CG, 일러스트, 사진, 조감도, 배치도, 평면도 등은 소비자의 이해를 돕기 위해 제작된 것으로 실제 시공 시 인허가 과정에 따라 다소 변경될 수 있습니다. 
            단지 내 조경 및 세부 식재 계획, 커뮤니티 시설의 세부 집기는 실물 시공 시 변경될 수 있으며, 계약 전 주택전시관 및 입주자모집공고를 반드시 확인하시기 바랍니다.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-950/40 text-[11px]">
            <p>© {new Date().getFullYear()} {theme.logoText}. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-purple-300 transition-colors underline underline-offset-2"
              >
                개인정보처리방침
              </button>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-200 transition-colors"
              >
                <Sliders className="w-3 h-3" />
                <span>관리자 CMS 모드</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('샘플 콘텐츠 및 테마를 초기 상태로 복원하시겠습니까?')) {
                    resetToDefaults();
                  }
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
                title="초기 샘플 데이터로 복원"
              >
                <RotateCcw className="w-3 h-3" />
                <span>초기화</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl p-6 rounded-2xl bg-[#0e0c18] border border-purple-500/30 text-white shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-base">개인정보 수집 및 이용 안내</h3>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <p>1. <strong>수집 항목:</strong> 성명, 휴대전화번호, 이메일, 희망 평형 및 방문 상담 희망일시</p>
              <p>2. <strong>수집 및 이용 목적:</strong> 동탄그웬 160 분양 정보 제공, VIP 사전 관람 예약 확인, 청약 일정 및 모델하우스 관련 상담 안내</p>
              <p>3. <strong>보유 및 이용 기간:</strong> 분양 완료 및 계약 체결 종료 시까지 (또는 고객의 삭제 요청 시 즉시 파기)</p>
              <p>4. <strong>동의 거부 권리:</strong> 귀하는 개인정보 수집 동의를 거부할 권리가 있으며, 동의 거부 시 관심고객 등록 및 사전 예약 혜택 안내가 제한될 수 있습니다.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
