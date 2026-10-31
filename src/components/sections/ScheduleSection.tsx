import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Calendar, Clock, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { schedule, theme, setIsInquiryModalOpen } = useSite();

  const getStatusBadge = (status: '진행중' | '예정' | '마감') => {
    switch (status) {
      case '진행중':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-md shadow-purple-600/50 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            진행중
          </span>
        );
      case '예정':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-950/70 text-purple-300 border border-purple-500/30">
            예정
          </span>
        );
      case '마감':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
            완료
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="schedule" className="relative py-24 bg-[#06050a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-montserrat tracking-widest uppercase">SALES SCHEDULE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            동탄그웬 160 <span className="text-purple-400">공식 분양 일정</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            주요 일정과 청약 절차를 확인하시고, 당첨을 위한 사전 준비를 차질 없이 진행하시기 바랍니다.
          </p>
        </div>

        {/* Timeline Horizontal/Vertical Grid */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
            {schedule.map((step, index) => {
              const isCurrent = step.status === '진행중';
              return (
                <div
                  key={step.id}
                  className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative ${
                    isCurrent
                      ? 'bg-purple-950/40 border-2 border-purple-400 shadow-2xl purple-glow'
                      : step.highlight
                      ? 'glass-card border border-purple-500/40 bg-[#141026]/60'
                      : 'glass-card border border-purple-500/15 opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Top Step Number & Status */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cinzel text-xs font-bold text-gray-400">
                        STEP {String(index + 1).padStart(2, '0')}
                      </span>
                      {getStatusBadge(step.status)}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 mb-2">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{step.dateRange}</span>
                    </div>

                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Foot indicator */}
                  {step.status === '마감' && (
                    <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] text-gray-500 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-gray-400" />
                      <span>마감되었습니다</span>
                    </div>
                  )}
                  {step.status === '진행중' && (
                    <div className="mt-3 pt-2 border-t border-purple-800/40 text-[10px] text-purple-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      <span>현재 접수 진행 중</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Helper Callout */}
        <div className="rounded-2xl bg-[#0f0c1e] border border-purple-500/25 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">청약홈(ApplyHome) 인터넷 청약 안내</p>
              <p className="text-gray-400 text-[11px]">
                공동인증서 또는 금융인증서, 네이버/토스/KB국민인증서를 사전 준비하시기 바랍니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              청약 가이드 상담 신청
            </button>
            <a
              href="https://www.applyhome.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#1c1733] hover:bg-[#28214a] border border-purple-500/30 text-purple-300 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>청약홈 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
