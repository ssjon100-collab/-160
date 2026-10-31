import React, { useState } from 'react';
import { useSite } from '../../../context/SiteContext';
import { Globe, Search, Share2, Code, Copy, Check, ShieldCheck } from 'lucide-react';

export const SeoToolsTab: React.FC = () => {
  const { seo, updateSeo, theme, showToast } = useSite();
  const [copiedLd, setCopiedLd] = useState(false);

  // Generate real estate property JSON-LD structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: seo.siteTitle,
    description: seo.metaDescription,
    url: seo.canonicalUrl,
    image: seo.ogImageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: '화성시 동탄',
      addressRegion: '경기도',
      addressCountry: 'KR',
    },
    brand: {
      '@type': 'Brand',
      name: theme.logoText,
    },
  };

  const jsonLdString = JSON.stringify(jsonLdData, null, 2);

  const handleCopyJsonLd = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopiedLd(true);
    showToast('Schema.org JSON-LD 코드가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedLd(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-purple-900/40">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          <span>SEO 검색엔진 최적화 & 소셜 공유 관리 도구</span>
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          구글(Google), 네이버(Naver), 카카오톡 검색 노출 및 메타태그를 실시간으로 설정하고 시뮬레이션합니다.
        </p>
      </div>

      {/* Basic SEO Tags Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            웹사이트 메인 타이틀 (Title Tag) <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            value={seo.siteTitle}
            onChange={e => updateSeo({ siteTitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
          />
          <span className="text-[10px] text-gray-500 mt-0.5 block">
            현재 길이: {seo.siteTitle.length}자 (권장: 30~55자)
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            메타 디스크립션 (Meta Description) <span className="text-purple-400">*</span>
          </label>
          <textarea
            rows={2}
            value={seo.metaDescription}
            onChange={e => updateSeo({ metaDescription: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
          />
          <span className="text-[10px] text-gray-500 mt-0.5 block">
            현재 길이: {seo.metaDescription.length}자 (권장: 70~120자)
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            검색 키워드 (쉼표 구분)
          </label>
          <input
            type="text"
            value={seo.keywords}
            onChange={e => updateSeo({ keywords: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              대표 캐노니컬 URL (Canonical URL)
            </label>
            <input
              type="url"
              value={seo.canonicalUrl}
              onChange={e => updateSeo({ canonicalUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white font-mono focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              오픈그래프 대표 이미지 URL (SNS 공유 썸네일)
            </label>
            <input
              type="url"
              value={seo.ogImageUrl}
              onChange={e => updateSeo({ ogImageUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white font-mono focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Verification Tags for Naver & Google */}
      <div className="p-4 rounded-xl bg-[#141026] border border-purple-500/25 space-y-3">
        <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>네이버 서치어드바이저 & 구글 서치콘솔 소유권 인증 태그</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">네이버 소유확인 메타태그 값</label>
            <input
              type="text"
              value={seo.naverVerificationCode}
              onChange={e => updateSeo({ naverVerificationCode: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">구글 서치콘솔 인증 메타태그 값</label>
            <input
              type="text"
              value={seo.googleVerificationCode}
              onChange={e => updateSeo({ googleVerificationCode: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Simulators (Google SERP & Kakao Share Card) */}
      <div className="space-y-4 pt-4 border-t border-purple-950/50">
        <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider">
          실시간 검색 및 소셜 공유 미리보기 시뮬레이터
        </label>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Google SERP Preview */}
          <div className="p-4 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm text-left font-sans">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold">G</div>
              <span className="text-[11px] text-gray-700 font-mono truncate">{seo.canonicalUrl}</span>
            </div>
            <div className="text-blue-800 hover:underline font-semibold text-sm leading-snug line-clamp-1 mb-1 cursor-pointer">
              {seo.siteTitle}
            </div>
            <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {seo.metaDescription}
            </div>
          </div>

          {/* Kakao / OpenGraph Share Preview Card */}
          <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-[#141026] text-left">
            <div className="h-32 bg-gray-900 relative">
              <img
                src={seo.ogImageUrl}
                alt="OG Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-purple-300 font-mono">
                OG CARD
              </div>
            </div>
            <div className="p-3 bg-[#110d21]">
              <div className="text-[10px] text-purple-400 font-mono mb-0.5">{seo.canonicalUrl}</div>
              <div className="text-xs font-bold text-white truncate mb-1">{seo.ogTitle || seo.siteTitle}</div>
              <div className="text-[11px] text-gray-400 line-clamp-1">{seo.ogDescription || seo.metaDescription}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <div className="p-4 rounded-xl bg-[#0f0c1e] border border-purple-500/25 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Code className="w-4 h-4 text-purple-400" />
            <span>Schema.org RealEstateListing 구조화 데이터 (JSON-LD)</span>
          </div>
          <button
            onClick={handleCopyJsonLd}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
          >
            {copiedLd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLd ? '복사됨' : 'JSON 복사'}</span>
          </button>
        </div>
        <pre className="p-3 rounded-lg bg-[#08070e] text-[11px] text-purple-200 font-mono overflow-x-auto max-h-40 scrollbar-thin">
          {jsonLdString}
        </pre>
      </div>
    </div>
  );
};
