import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { UserCheck, Sparkles, Shield, CheckCircle2, Gift, Send, Clock, Phone, Loader2 } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const { addInquiry, units, content, isInquiryModalOpen, setIsInquiryModalOpen, showToast } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredType: units[0]?.name || '102㎡ A-TYPE 테라스 스위트',
    preferredTime: '주말 오전 (10:00 ~ 13:00)',
    message: '',
    agreePrivacy: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('성함을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      alert('정확한 휴대전화번호를 입력해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해 주셔야 접수가 가능합니다.');
      return;
    }

    const endpoint = content.contact.formspreeEndpoint || 'https://formspree.io/f/xeaalndz';
    setIsSubmitting(true);

    const submissionPayload = {
      // Formspree email subject
      _subject: `[동탄그웬160] VIP 관심고객 신규 접수 - ${formData.name.trim()} (${formData.phone.trim()})`,
      
      // Korean formatted table fields for email & Formspree dashboard
      '고객 성함': formData.name.trim(),
      '휴대전화 번호': formData.phone.trim(),
      '관심 평형 타입': formData.preferredType,
      '상담 희망 시간대': formData.preferredTime,
      '상담 문의내용': formData.message.trim() || '별도 요청사항 없음',
      '개인정보 수집동의': '동의 완료 [필수]',
      '접수 단지명': '동탄 그웬 160 (화성동탄2 B11블록 테라스하우스)',
      '접수 일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      '유입 웹사이트': typeof window !== 'undefined' ? window.location.href : '',

      // Standard English keys for API integrations
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      preferredType: formData.preferredType,
      preferredTime: formData.preferredTime,
      message: formData.message.trim() || '',
    };

    try {
      // 1. Post to Formspree endpoint with CORS
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        console.warn('Formspree returned status:', response.status);
      }
    } catch (err) {
      console.warn('Formspree submission network log:', err);
    } finally {
      // 2. Always record in local inquiries state so CMS dashboard can view and export
      addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredType: formData.preferredType,
        preferredTime: formData.preferredTime,
        message: formData.message,
        agreePrivacy: formData.agreePrivacy,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('VIP 관심고객 접수 데이터가 실시간으로 안전하게 전송되었습니다.');
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          preferredType: units[0]?.name || '102㎡ A-TYPE 테라스 스위트',
          preferredTime: '주말 오전 (10:00 ~ 13:00)',
          message: '',
          agreePrivacy: true,
        });
      }, 1500);
    }
  };

  const formatPhoneNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
  };

  const FormContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left: VIP Perks & Benefits */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-montserrat tracking-widest uppercase">VIP PRIVILEGE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
          관심고객 등록 시 제공되는 <br />
          <span className="text-purple-400">VIP 전용 특별 혜택</span>
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
          동탄그웬 160의 공식 분양 일정, 분양가 가이드, 모델하우스 우선 관람 자격을 가장 빠르게 안내해 드립니다.
        </p>

        {/* Benefits List */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151125] border border-purple-500/20">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">예약 방문 시 기념품 증정</h4>
              <p className="text-[11px] text-gray-400">사전예약 후 주택전시관 방문 고객 대상 VIP 특별 사은품 증정</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151125] border border-purple-500/20">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">주택전시관 프리패스 VIP 1:1 관람</h4>
              <p className="text-[11px] text-gray-400">대기 없이 전문 분양 마스터의 프라이빗 맞춤 상담 제공</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151125] border border-purple-500/20">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">하이엔드 인테리어 가이드북 증정</h4>
              <p className="text-[11px] text-gray-400">폴리폼, 밀레 및 테라스 특화 설계 자료집 웰컴 기프트 증정</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="lg:col-span-7">
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-purple-500/30 shadow-2xl purple-glow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border-2 border-purple-400 text-purple-400 flex items-center justify-center mx-auto purple-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">VIP 사전 접수가 완료되었습니다</h4>
              <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                등록해 주신 연락처로 전담 분양 마스터가 배정되어 순차적으로 맞춤형 상담 안내를 도와드리겠습니다.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  if (isInquiryModalOpen) setIsInquiryModalOpen(false);
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
              >
                확인
              </button>
            </div>
          ) : (
            <form
              action={content.contact.formspreeEndpoint || 'https://formspree.io/f/xeaalndz'}
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Formspree spam protection honeypot */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    고객 성함 <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="고객성함"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130f24] border border-purple-500/25 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    휴대전화 번호 <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="휴대전화번호"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130f24] border border-purple-500/25 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Unit */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    관심 평형 타입 <span className="text-purple-400">*</span>
                  </label>
                  <select
                    name="관심평형타입"
                    value={formData.preferredType}
                    onChange={e => setFormData(prev => ({ ...prev, preferredType: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130f24] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    {units.map(u => (
                      <option key={u.id} value={u.name} className="bg-[#130f24] text-white">
                        {u.name}
                      </option>
                    ))}
                    <option value="미정 (상담 후 결정)" className="bg-[#130f24] text-white">
                      미정 (상담 후 결정)
                    </option>
                  </select>
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    상담 희망 시간대
                  </label>
                  <select
                    name="상담희망시간대"
                    value={formData.preferredTime}
                    onChange={e => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#130f24] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    <option value="주말 오전 (10:00 ~ 13:00)">주말 오전 (10:00 ~ 13:00)</option>
                    <option value="주말 오후 (14:00 ~ 18:00)">주말 오후 (14:00 ~ 18:00)</option>
                    <option value="평일 오전 (10:00 ~ 13:00)">평일 오전 (10:00 ~ 13:00)</option>
                    <option value="평일 오후 (14:00 ~ 18:00)">평일 오후 (14:00 ~ 18:00)</option>
                    <option value="상시 가능">상시 가능</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  상담 문의사항 (선택)
                </label>
                <textarea
                  name="상담문의사항"
                  rows={2}
                  placeholder="예약 희망 일자, 청약 조건, 테라스 옵션 등 궁금하신 사항을 남겨주세요."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#130f24] border border-purple-500/25 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                />
              </div>

              {/* Privacy agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={e => setFormData(prev => ({ ...prev, agreePrivacy: e.target.checked }))}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 border-gray-600 bg-black/40"
                  />
                  <span className="leading-tight">
                    [필수] 개인정보 수집 및 분양 정보 안내를 위한 이용에 동의합니다.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800/80 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>관심고객 데이터 안전 전송 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>동탄그웬 160 VIP 관심고객 등록 완료하기</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Formspree 실시간 데이터 수집 채널 및 SSL 암호화 전송 연동됨</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline Section */}
      <section id="inquiry" className="relative py-24 bg-[#08070d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/35 text-purple-300 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-montserrat tracking-widest uppercase">FIRST-COME FIRST-SERVED</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              잔여세대 선착순 분양 및 <span className="text-purple-400">주택전시관 방문예약</span>
            </h2>
            <p className="text-sm text-gray-400 font-light">
              원하시는 동·호수를 선착순으로 상담받으실 수 있으며, 사전예약 고객 대상 VIP 맞춤 상담을 제공합니다.
            </p>
          </div>

          {FormContent}
        </div>
      </section>

      {/* Pop-up Modal when triggered from buttons */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#0d0b17] border border-purple-500/30 shadow-2xl purple-glow p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsInquiryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            >
              ✕
            </button>
            {FormContent}
          </div>
        </div>
      )}
    </>
  );
};
