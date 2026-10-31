import React, { useState } from 'react';
import { useSite } from '../../../context/SiteContext';
import { FileEdit, Layers, Phone, Building, Sparkles, Check } from 'lucide-react';

export const ContentEditorTab: React.FC = () => {
  const { content, updateHero, updateOverview, updateContact, units, updateUnit } = useSite();
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'overview' | 'units' | 'contact'>('hero');

  return (
    <div className="space-y-6">
      {/* Sub tabs navigation */}
      <div className="flex items-center gap-2 border-b border-purple-900/40 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeSubTab === 'hero'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#141026] text-gray-400 hover:text-white border border-purple-500/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>메인 히어로 섹션</span>
        </button>

        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeSubTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#141026] text-gray-400 hover:text-white border border-purple-500/20'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>사업개요 상세 제원</span>
        </button>

        <button
          onClick={() => setActiveSubTab('units')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeSubTab === 'units'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#141026] text-gray-400 hover:text-white border border-purple-500/20'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>평면 및 세대 타입</span>
        </button>

        <button
          onClick={() => setActiveSubTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeSubTab === 'contact'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#141026] text-gray-400 hover:text-white border border-purple-500/20'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>대표 연락처 & 주소</span>
        </button>
      </div>

      {/* 1. Hero Subtab */}
      {activeSubTab === 'hero' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">상단 영문 태그 (Eyebrow)</label>
              <input
                type="text"
                value={content.hero.eyebrow}
                onChange={e => updateHero({ eyebrow: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">상태 뱃지 문구</label>
              <input
                type="text"
                value={content.hero.badgeText}
                onChange={e => updateHero({ badgeText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">메인 헤드라인 1번째 줄</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={e => updateHero({ title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-300 mb-1">
                강조 헤드라인 (퍼플 그라데이션)
              </label>
              <input
                type="text"
                value={content.hero.titleHighlight}
                onChange={e => updateHero({ titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/40 text-xs text-purple-200 focus:outline-none focus:border-purple-400 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">서브 설명 문구</label>
            <input
              type="text"
              value={content.hero.subtitle}
              onChange={e => updateHero({ subtitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">히어로 배경 이미지 URL</label>
            <input
              type="url"
              value={content.hero.backgroundImage}
              onChange={e => updateHero({ backgroundImage: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">주요 CTA 버튼명</label>
              <input
                type="text"
                value={content.hero.ctaPrimaryText}
                onChange={e => updateHero({ ctaPrimaryText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">보조 CTA 버튼명</label>
              <input
                type="text"
                value={content.hero.ctaSecondaryText}
                onChange={e => updateHero({ ctaSecondaryText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Overview Subtab */}
      {activeSubTab === 'overview' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">사업명</label>
              <input
                type="text"
                value={content.overview.projectName}
                onChange={e => updateOverview({ projectName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">건축 규모</label>
              <input
                type="text"
                value={content.overview.scale}
                onChange={e => updateOverview({ scale: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">대지 위치</label>
            <input
              type="text"
              value={content.overview.location}
              onChange={e => updateOverview({ location: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">사업개요 조감도 / 투시도 이미지 URL</label>
            <input
              type="text"
              value={content.overview.imageUrl || ''}
              onChange={e => updateOverview({ imageUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">공급 세대수</label>
              <input
                type="text"
                value={content.overview.totalUnits}
                onChange={e => updateOverview({ totalUnits: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">주차 계획</label>
              <input
                type="text"
                value={content.overview.parkingRatio}
                onChange={e => updateOverview({ parkingRatio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">입주 예정일</label>
              <input
                type="text"
                value={content.overview.completionDate}
                onChange={e => updateOverview({ completionDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">시행사</label>
              <input
                type="text"
                value={content.overview.developer}
                onChange={e => updateOverview({ developer: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">시공사</label>
              <input
                type="text"
                value={content.overview.constructionCompany}
                onChange={e => updateOverview({ constructionCompany: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">신탁사</label>
              <input
                type="text"
                value={content.overview.trustee}
                onChange={e => updateOverview({ trustee: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Units Subtab */}
      {activeSubTab === 'units' && (
        <div className="space-y-6 animate-fade-in">
          {units.map((unit) => (
            <div key={unit.id} className="p-4 rounded-xl bg-[#141026] border border-purple-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-300 font-cinzel">{unit.typeCode}</span>
                <span className="text-xs text-gray-400 font-mono">ID: {unit.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">타입 명칭</label>
                  <input
                    type="text"
                    value={unit.name}
                    onChange={e => updateUnit(unit.id, { name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">전용면적</label>
                  <input
                    type="text"
                    value={unit.areaExclusive}
                    onChange={e => updateUnit(unit.id, { areaExclusive: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">공급 규모</label>
                  <input
                    type="text"
                    value={unit.householdCount}
                    onChange={e => updateUnit(unit.id, { householdCount: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">평면 설명</label>
                <input
                  type="text"
                  value={unit.description}
                  onChange={e => updateUnit(unit.id, { description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">인테리어 투시도 이미지 URL</label>
                <input
                  type="url"
                  value={unit.imageUrl}
                  onChange={e => updateUnit(unit.id, { imageUrl: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0e0c1a] border border-purple-500/20 text-xs text-white font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Contact Subtab */}
      {activeSubTab === 'contact' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">대표 분양 문의 전화</label>
              <input
                type="text"
                value={content.contact.phone}
                onChange={e => updateContact({ phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">상담 운영 시간</label>
              <input
                type="text"
                value={content.contact.consultationHours}
                onChange={e => updateContact({ consultationHours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">주택전시관 (모델하우스) 주소</label>
            <input
              type="text"
              value={content.contact.modelHouseAddress}
              onChange={e => updateContact({ modelHouseAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">사업지 현장 주소</label>
            <input
              type="text"
              value={content.contact.siteAddress}
              onChange={e => updateContact({ siteAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">카카오톡 상담 링크</label>
              <input
                type="url"
                value={content.contact.kakaoChatUrl}
                onChange={e => updateContact({ kakaoChatUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">공식 네이버 블로그 URL</label>
              <input
                type="url"
                value={content.contact.naverBlogUrl}
                onChange={e => updateContact({ naverBlogUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
