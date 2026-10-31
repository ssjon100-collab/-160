import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Phone, UserCheck, MessageSquare, MapPin } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { content, setIsInquiryModalOpen } = useSite();

  const handleLocationClick = () => {
    const el = document.querySelector('#location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090712]/95 backdrop-blur-xl border-t border-purple-500/25 px-2 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 max-w-lg mx-auto">
        {/* Direct Call */}
        <a
          href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 hover:text-white transition-all active:scale-95"
        >
          <Phone className="w-4 h-4 text-purple-400 mb-0.5" />
          <span className="text-[11px] font-bold">전화상담</span>
        </a>

        {/* Kakao 1:1 chat */}
        <a
          href={content.contact.kakaoChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#221c36] border border-purple-500/20 text-yellow-300 hover:text-yellow-200 transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-yellow-400 mb-0.5" />
          <span className="text-[11px] font-bold">카톡상담</span>
        </a>

        {/* Directions */}
        <button
          onClick={handleLocationClick}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#161225] border border-purple-500/20 text-gray-300 hover:text-white transition-all active:scale-95"
        >
          <MapPin className="w-4 h-4 text-purple-400 mb-0.5" />
          <span className="text-[11px] font-medium">오시는길</span>
        </button>

        {/* VIP Customer Registration */}
        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-purple-600 border border-purple-400 text-white shadow-lg shadow-purple-600/40 transition-all active:scale-95"
        >
          <UserCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold">관심고객</span>
        </button>
      </div>
    </div>
  );
};
