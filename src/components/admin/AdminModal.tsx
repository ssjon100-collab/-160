import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { PostManagerTab } from './tabs/PostManagerTab';
import { ThemeCustomizerTab } from './tabs/ThemeCustomizerTab';
import { ContentEditorTab } from './tabs/ContentEditorTab';
import { SeoToolsTab } from './tabs/SeoToolsTab';
import { InquiriesTab } from './tabs/InquiriesTab';
import {
  X,
  Sliders,
  FileText,
  Palette,
  FileEdit,
  Globe,
  UserCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

type AdminTab = 'posts' | 'theme' | 'content' | 'seo' | 'inquiries';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, inquiries, resetToDefaults, theme } = useSite();
  const [activeTab, setActiveTab] = useState<AdminTab>('posts');

  if (!isAdminOpen) return null;

  const newInquiriesCount = inquiries.filter(i => i.status === '신규접수').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0d0b17] border border-purple-500/40 shadow-2xl purple-glow-lg text-white flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141026] border-b border-purple-500/25">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Sliders className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {theme.logoText} 통합 관리자 CMS 대시보드
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shadow-sm">
                  ADMIN v2.0
                </span>
              </div>
              <p className="text-xs text-gray-400">
                실시간 콘텐츠 편집, 게시글 등록, 디자인 커스터마이징 및 관심고객 접수 관리
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset to defaults button */}
            <button
              onClick={() => {
                if (confirm('샘플 콘텐츠 및 테마를 초기 상태로 복원하시겠습니까? (기존 수정 내용이 리셋됩니다)')) {
                  resetToDefaults();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b152e] hover:bg-purple-900/40 border border-purple-500/25 text-gray-300 hover:text-white text-xs transition-colors"
              title="샘플 초기 데이터 복원"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
              <span>초기값 복원</span>
            </button>

            {/* Close button */}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-[#0f0c1d] border-b border-purple-900/40 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'posts'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>게시글 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'theme'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>디자인 & 테마 커스터마이징</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'content'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>콘텐츠 편집 (히어로/사업개요/평면)</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'seo'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO 검색 최적화</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'inquiries'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>관심고객 접수 내역</span>
            {newInquiriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                {newInquiriesCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0a0814]/60">
          {activeTab === 'posts' && <PostManagerTab />}
          {activeTab === 'theme' && <ThemeCustomizerTab />}
          {activeTab === 'content' && <ContentEditorTab />}
          {activeTab === 'seo' && <SeoToolsTab />}
          {activeTab === 'inquiries' && <InquiriesTab />}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#141026] border-t border-purple-500/20 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>실시간 자동 저장 중 (Local Storage)</span>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 active:scale-95"
          >
            적용 내용 확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
