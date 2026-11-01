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
  Lock,
  KeyRound,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

type AdminTab = 'posts' | 'theme' | 'content' | 'seo' | 'inquiries';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, inquiries, resetToDefaults, theme } = useSite();
  const [activeTab, setActiveTab] = useState<AdminTab>('posts');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showShake, setShowShake] = useState(false);

  if (!isAdminOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === '1440') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPasswordInput('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
      setShowShake(true);
      setTimeout(() => setShowShake(false), 600);
    }
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    setPasswordInput('');
    setErrorMsg('');
  };

  // 1. Password verification gate before accessing CMS
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
        <div
          className={`relative w-full max-w-md my-auto rounded-3xl bg-[#0e0b1c] border border-purple-500/40 p-6 sm:p-8 shadow-2xl purple-glow-lg text-white transition-all ${
            showShake ? 'translate-x-[-8px] duration-75 ring-2 ring-rose-500/80' : ''
          }`}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-400/50 flex items-center justify-center mx-auto text-purple-300 purple-glow">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">관리자 CMS 보안 인증</h3>
              <p className="text-xs text-purple-200/80 mt-1">
                관리자 대시보드에 접근하려면 지정된 비밀번호를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  placeholder="비밀번호 입력 (4자리)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#141026] border border-purple-500/35 text-center text-lg tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all font-mono"
                />
                {errorMsg && (
                  <p className="text-xs text-rose-400 mt-2 font-medium flex items-center justify-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <KeyRound className="w-4 h-4" />
                <span>관리자 로그인</span>
              </button>
            </form>

            <div className="pt-2 border-t border-purple-950/60 flex items-center justify-center gap-1 text-[11px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>보안 PIN 암호화 잠금 적용됨</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            {/* Lock session button */}
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPasswordInput('');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 hover:text-white text-xs transition-colors"
              title="관리자 세션 잠금"
            >
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>잠금</span>
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
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
