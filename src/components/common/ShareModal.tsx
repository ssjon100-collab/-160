import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { X, Copy, Check, Share2, MessageCircle, Globe, QrCode } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareOpen, setIsShareOpen, seo, showToast } = useSite();
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://dongtan-gwen160.kr';

  if (!isShareOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('홈페이지 주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKakaoShare = () => {
    // Kakao share URL scheme / web fallback
    const text = encodeURIComponent(`[동탄그웬 160] 하이퍼엔드 주거명작 분양홍보관\n${seo.metaDescription}\n${currentUrl}`);
    window.open(`https://story.kakao.com/s/share?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`[동탄그웬 160] 분양홍보관 - ${seo.metaDescription}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-7 rounded-2xl bg-[#0e0c18] border border-purple-500/30 shadow-2xl purple-glow text-white">
        {/* Close Button */}
        <button
          onClick={() => setIsShareOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">홈페이지 공유하기</h3>
            <p className="text-xs text-purple-300/80">동탄그웬 160 분양정보를 주변에 공유하세요</p>
          </div>
        </div>

        {/* Link Copy Box */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-400 mb-2">공식 홈페이지 URL</label>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#161324] border border-purple-500/20">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-purple-200 flex-1 outline-none px-2 truncate select-all"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shrink-0 active:scale-95 shadow-md shadow-purple-600/30"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : '복사'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={handleKakaoShare}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#201a35] hover:bg-[#2b2247] border border-purple-500/20 hover:border-purple-500/50 transition-all text-xs text-gray-300 hover:text-white"
          >
            <div className="w-10 h-10 rounded-full bg-[#fee500] text-[#191919] flex items-center justify-center font-bold shadow-md">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <span>카카오스토리</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#201a35] hover:bg-[#2b2247] border border-purple-500/20 hover:border-purple-500/50 transition-all text-xs text-gray-300 hover:text-white"
          >
            <div className="w-10 h-10 rounded-full bg-[#1da1f2]/20 border border-[#1da1f2]/40 text-[#1da1f2] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <span>X (트위터)</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#201a35] hover:bg-[#2b2247] border border-purple-500/20 hover:border-purple-500/50 transition-all text-xs text-gray-300 hover:text-white"
          >
            <div className="w-10 h-10 rounded-full bg-[#1877f2]/20 border border-[#1877f2]/40 text-[#1877f2] flex items-center justify-center font-bold">
              <span className="font-bold text-base">f</span>
            </div>
            <span>페이스북</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#201a35] hover:bg-[#2b2247] border border-purple-500/20 hover:border-purple-500/50 transition-all text-xs text-gray-300 hover:text-white"
          >
            <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <span>링크복사</span>
          </button>
        </div>

        {/* QR Code helper preview */}
        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/15 text-center text-xs text-purple-300/80">
          모바일 기기에서도 QR 코드 스캔 또는 링크를 통해 편리하게 분양 정보를 확인할 수 있습니다.
        </div>
      </div>
    </div>
  );
};
