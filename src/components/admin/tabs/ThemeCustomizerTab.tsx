import React, { useState } from 'react';
import { useSite } from '../../../context/SiteContext';
import { COLOR_PRESETS } from '../../../data/defaultData';
import { Palette, Type, Layout, Sparkles, Check } from 'lucide-react';

export const ThemeCustomizerTab: React.FC = () => {
  const { theme, updateTheme } = useSite();
  const [customHex, setCustomHex] = useState(theme.accentColor);

  const handleSelectPreset = (hex: string, name: string) => {
    setCustomHex(hex);
    updateTheme({ accentColor: hex, accentColorName: name });
  };

  const handleCustomHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomHex(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      updateTheme({ accentColor: hex, accentColorName: '커스텀 컬러' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-purple-900/40">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-400" />
          <span>디자인 & 테마 스타일 커스터마이저</span>
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          브랜드 포인트 컬러, 폰트 스타일, 배경 명도, 로고 명칭을 자유롭게 커스터마이징할 수 있습니다.
        </p>
      </div>

      {/* 1. Accent Color Customization */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider">
          포인트 컬러 설정 (보라색 계열 럭셔리 팔레트 & 커스텀)
        </label>

        {/* Color Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = theme.accentColor.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => handleSelectPreset(preset.hex, preset.name)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 shadow-lg'
                    : 'bg-[#141026] border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-white"
                  style={{ backgroundColor: preset.hex, boxShadow: `0 0 12px ${preset.glow}` }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">{preset.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{preset.hex}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Direct Color Picker & HEX Input */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141026] border border-purple-500/25 max-w-sm">
          <input
            type="color"
            value={theme.accentColor}
            onChange={e => {
              setCustomHex(e.target.value);
              updateTheme({ accentColor: e.target.value, accentColorName: '커스텀 컬러' });
            }}
            className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
          />
          <div className="flex-1">
            <span className="block text-[10px] text-gray-400 font-medium">직접 색상 코드 입력 (HEX)</span>
            <input
              type="text"
              value={customHex}
              onChange={handleCustomHexChange}
              placeholder="#a855f7"
              className="bg-transparent text-xs text-white font-mono focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* 2. Logo Branding Customization */}
      <div className="space-y-4 pt-4 border-t border-purple-950/50">
        <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider">
          브랜드 로고 명칭 및 서브텍스트
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">메인 브랜드 로고 텍스트</label>
            <input
              type="text"
              value={theme.logoText}
              onChange={e => updateTheme({ logoText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">영문 서브 슬로건</label>
            <input
              type="text"
              value={theme.logoSubtext}
              onChange={e => updateTheme({ logoSubtext: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141026] border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* 3. Dark Theme Mood & Font Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-purple-950/50">
        {/* Background Mood */}
        <div>
          <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-purple-400" />
            <span>배경 다크 테마 깊이</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'obsidian', label: '딥 옵시디언 블랙 (#07070a - 추천)', desc: '압도적인 블랙 대비감' },
              { id: 'charcoal', label: '미드나잇 차콜 (#0f0e17)', desc: '부드러운 하이엔드 톤' },
              { id: 'violet', label: '바이올렛 나이트 (#0e081c)', desc: '보랏빛 무드가 감도는 톤' },
            ].map(mood => (
              <button
                key={mood.id}
                type="button"
                onClick={() => updateTheme({ bgDepth: mood.id as any })}
                className={`w-full p-2.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                  theme.bgDepth === mood.id
                    ? 'bg-purple-950/50 border-purple-400 text-white'
                    : 'bg-[#141026] border-purple-500/20 text-gray-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-semibold">{mood.label}</div>
                  <div className="text-[10px] text-gray-500">{mood.desc}</div>
                </div>
                {theme.bgDepth === mood.id && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-purple-400" />
            <span>대표 폰트 스타일</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'pretendard', label: '프리텐다드 (Pretendard - 현대적/전문적)', desc: '가독성이 가장 뛰어난 프리미엄 서체' },
              { id: 'cinzel', label: '신젤 & 프리텐다드 (Cinzel Luxury)', desc: '하이엔드 럭셔리 영문 포인트' },
              { id: 'montserrat', label: '몬세라트 & 프리텐다드 (Montserrat)', desc: '정갈하고 세련된 기하학적 감각' },
            ].map(font => (
              <button
                key={font.id}
                type="button"
                onClick={() => updateTheme({ fontFamily: font.id as any })}
                className={`w-full p-2.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                  theme.fontFamily === font.id
                    ? 'bg-purple-950/50 border-purple-400 text-white'
                    : 'bg-[#141026] border-purple-500/20 text-gray-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-semibold">{font.label}</div>
                  <div className="text-[10px] text-gray-500">{font.desc}</div>
                </div>
                {theme.fontFamily === font.id && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
