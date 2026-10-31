import React from 'react';
import { useSite } from '../../context/SiteContext';
import { X, Calendar, Eye, User, Share2, Tag, ChevronLeft } from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { selectedPost, setSelectedPost, setIsShareOpen } = useSite();

  if (!selectedPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-auto rounded-2xl bg-[#0e0c18] border border-purple-500/30 shadow-2xl purple-glow text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#141024]/90 backdrop-blur-md border-b border-purple-500/20">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareOpen(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-900/40 transition-colors"
              title="공유하기"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedPost(null)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Category & Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/25 border border-purple-500/40 text-purple-300 flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {selectedPost.category}
            </span>
            {selectedPost.isPinned && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                주요공지 ★
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {selectedPost.title}
          </h2>

          {/* Metadata info */}
          <div className="flex items-center gap-4 text-xs text-gray-400 border-b border-purple-900/40 pb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {selectedPost.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              {selectedPost.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              조회 {selectedPost.views.toLocaleString()}
            </span>
          </div>

          {/* Featured Image */}
          {selectedPost.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-purple-500/20 max-h-96 w-full">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Summary Callout */}
          {selectedPost.summary && (
            <div className="p-4 rounded-xl bg-purple-950/25 border border-purple-500/20 text-sm font-medium text-purple-200 leading-relaxed">
              {selectedPost.summary}
            </div>
          )}

          {/* Body Content */}
          <div className="text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-line space-y-4 font-light">
            {selectedPost.content}
          </div>

          {/* Bottom disclaimer */}
          <div className="p-4 rounded-xl bg-[#131021] border border-purple-500/15 text-xs text-gray-400 leading-normal">
            ※ 본 게시물에 포함된 이미지 및 조감도, CG, 조망 시뮬레이션 등은 소비자의 이해를 돕기 위한 것으로 실제 시공 시 다소 변경될 수 있습니다. 분양 관련 확정 사항은 입주자 모집공고를 반드시 확인하시기 바랍니다.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#141024]/90 border-t border-purple-500/20 flex justify-end">
          <button
            onClick={() => setSelectedPost(null)}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-600/30"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
