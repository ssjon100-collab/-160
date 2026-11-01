import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeConfig,
  SeoConfig,
  SiteContent,
  PremiumFeature,
  UnitType,
  ScheduleStep,
  Post,
  InquirySubmission,
} from '../types';
import {
  DEFAULT_THEME,
  DEFAULT_SEO,
  DEFAULT_SITE_CONTENT,
  DEFAULT_PREMIUMS,
  DEFAULT_UNITS,
  DEFAULT_SCHEDULE,
  DEFAULT_POSTS,
  DEFAULT_INQUIRIES,
} from '../data/defaultData';

interface SiteContextType {
  // Theme & Appearance
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;

  // Site Content
  content: SiteContent;
  updateContent: (updates: Partial<SiteContent>) => void;
  updateHero: (heroUpdates: Partial<SiteContent['hero']>) => void;
  updateOverview: (overviewUpdates: Partial<SiteContent['overview']>) => void;
  updateContact: (contactUpdates: Partial<SiteContent['contact']>) => void;

  // Premiums
  premiums: PremiumFeature[];
  updatePremium: (id: string, updates: Partial<PremiumFeature>) => void;
  addPremium: (item: Omit<PremiumFeature, 'id'>) => void;
  deletePremium: (id: string) => void;

  // Units
  units: UnitType[];
  updateUnit: (id: string, updates: Partial<UnitType>) => void;
  addUnit: (item: Omit<UnitType, 'id'>) => void;
  deleteUnit: (id: string) => void;

  // Schedule
  schedule: ScheduleStep[];
  updateScheduleStep: (id: string, updates: Partial<ScheduleStep>) => void;
  addScheduleStep: (step: Omit<ScheduleStep, 'id'>) => void;
  deleteScheduleStep: (id: string) => void;

  // Posts / Blog / Announcements
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'views' | 'date'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  incrementPostViews: (id: string) => void;

  // Inquiries
  inquiries: InquirySubmission[];
  addInquiry: (inquiry: Omit<InquirySubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquirySubmission['status']) => void;
  deleteInquiry: (id: string) => void;

  // SEO
  seo: SeoConfig;
  updateSeo: (updates: Partial<SeoConfig>) => void;

  // Modals & UI controls
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;

  // Reset to default sample content
  resetToDefaults: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'dongtan_gwen160_v6_theme',
  CONTENT: 'dongtan_gwen160_v16_content',
  PREMIUMS: 'dongtan_gwen160_v9_premiums',
  UNITS: 'dongtan_gwen160_v13_units',
  SCHEDULE: 'dongtan_gwen160_v6_schedule',
  POSTS: 'dongtan_gwen160_v7_posts',
  INQUIRIES: 'dongtan_gwen160_v6_inquiries',
  SEO: 'dongtan_gwen160_v7_seo',
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved ? { ...DEFAULT_THEME, ...JSON.parse(saved) } : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  // Content state
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          hero: {
            ...DEFAULT_SITE_CONTENT.hero,
            ...(parsed.hero || {}),
            stats: (parsed.hero?.stats && parsed.hero.stats.length >= 4)
              ? parsed.hero.stats
              : DEFAULT_SITE_CONTENT.hero.stats,
          },
          contact: {
            ...DEFAULT_SITE_CONTENT.contact,
            ...(parsed.contact || {}),
            formspreeEndpoint: parsed.contact?.formspreeEndpoint || 'https://formspree.io/f/xeaalndz',
          },
        };
      }
      return DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Premiums
  const [premiums, setPremiums] = useState<PremiumFeature[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREMIUMS);
      return saved ? JSON.parse(saved) : DEFAULT_PREMIUMS;
    } catch {
      return DEFAULT_PREMIUMS;
    }
  });

  // Units
  const [units, setUnits] = useState<UnitType[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
      return saved ? JSON.parse(saved) : DEFAULT_UNITS;
    } catch {
      return DEFAULT_UNITS;
    }
  });

  // Schedule
  const [schedule, setSchedule] = useState<ScheduleStep[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    } catch {
      return DEFAULT_SCHEDULE;
    }
  });

  // Posts
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<InquirySubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  // SEO
  const [seo, setSeo] = useState<SeoConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEO);
      return saved ? { ...DEFAULT_SEO, ...JSON.parse(saved) } : DEFAULT_SEO;
    } catch {
      return DEFAULT_SEO;
    }
  });

  // Modals & UI
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync with document title & theme CSS variables
  useEffect(() => {
    document.title = seo.siteTitle;
    const root = document.documentElement;
    root.style.setProperty('--accent-purple', theme.accentColor);
    
    // Update meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.metaDescription);
    }
  }, [seo.siteTitle, seo.metaDescription, theme.accentColor]);

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREMIUMS, JSON.stringify(premiums));
  }, [premiums]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo));
  }, [seo]);

  // Actions
  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
    showToast('디자인 & 테마 설정이 저장되었습니다.');
  };

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
    showToast('사이트 콘텐츠가 저장되었습니다.');
  };

  const updateHero = (heroUpdates: Partial<SiteContent['hero']>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
    }));
    showToast('히어로 섹션이 저장되었습니다.');
  };

  const updateOverview = (overviewUpdates: Partial<SiteContent['overview']>) => {
    setContent(prev => ({
      ...prev,
      overview: { ...prev.overview, ...overviewUpdates },
    }));
    showToast('사업개요가 업데이트되었습니다.');
  };

  const updateContact = (contactUpdates: Partial<SiteContent['contact']>) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates },
    }));
    showToast('대표 연락처 및 오시는 길이 업데이트되었습니다.');
  };

  // Premiums
  const updatePremium = (id: string, updates: Partial<PremiumFeature>) => {
    setPremiums(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast('프리미엄 정보가 수정되었습니다.');
  };

  const addPremium = (item: Omit<PremiumFeature, 'id'>) => {
    const newPrem: PremiumFeature = { ...item, id: `prem-${Date.now()}` };
    setPremiums(prev => [...prev, newPrem]);
    showToast('새 프리미엄 특화항목이 추가되었습니다.');
  };

  const deletePremium = (id: string) => {
    setPremiums(prev => prev.filter(p => p.id !== id));
    showToast('프리미엄 항목이 삭제되었습니다.');
  };

  // Units
  const updateUnit = (id: string, updates: Partial<UnitType>) => {
    setUnits(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
    showToast('평면 및 세대 정보가 수정되었습니다.');
  };

  const addUnit = (item: Omit<UnitType, 'id'>) => {
    const newUnit: UnitType = { ...item, id: `unit-${Date.now()}` };
    setUnits(prev => [...prev, newUnit]);
    showToast('새 평면 타입이 추가되었습니다.');
  };

  const deleteUnit = (id: string) => {
    setUnits(prev => prev.filter(u => u.id !== id));
    showToast('평면 타입이 삭제되었습니다.');
  };

  // Schedule
  const updateScheduleStep = (id: string, updates: Partial<ScheduleStep>) => {
    setSchedule(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    showToast('분양 일정이 수정되었습니다.');
  };

  const addScheduleStep = (step: Omit<ScheduleStep, 'id'>) => {
    const newStep: ScheduleStep = { ...step, id: `sch-${Date.now()}` };
    setSchedule(prev => [...prev, newStep]);
    showToast('새 분양 일정이 추가되었습니다.');
  };

  const deleteScheduleStep = (id: string) => {
    setSchedule(prev => prev.filter(s => s.id !== id));
    showToast('분양 일정이 삭제되었습니다.');
  };

  // Posts
  const addPost = (post: Omit<Post, 'id' | 'views' | 'date'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;
    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      views: 1,
      date: formattedDate,
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('새로운 게시글이 등록되었습니다.');
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast('게시글이 수정되었습니다.');
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    showToast('게시글이 삭제되었습니다.');
  };

  const incrementPostViews = (id: string) => {
    setPosts(prev => prev.map(p => (p.id === id ? { ...p, views: p.views + 1 } : p)));
  };

  // Inquiries
  const addInquiry = (inquiryData: Omit<InquirySubmission, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: InquirySubmission = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: dateStr,
      status: '신규접수',
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('관심고객 VIP 사전 등록이 성공적으로 접수되었습니다.');
  };

  const updateInquiryStatus = (id: string, status: InquirySubmission['status']) => {
    setInquiries(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
    showToast(`상담 상태가 '${status}'(으)로 변경되었습니다.`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    showToast('접수 내역이 삭제되었습니다.');
  };

  // SEO
  const updateSeo = (updates: Partial<SeoConfig>) => {
    setSeo(prev => ({ ...prev, ...updates }));
    showToast('SEO 검색 최적화 정보가 저장되었습니다.');
  };

  // Reset
  const resetToDefaults = () => {
    setTheme(DEFAULT_THEME);
    setContent(DEFAULT_SITE_CONTENT);
    setPremiums(DEFAULT_PREMIUMS);
    setUnits(DEFAULT_UNITS);
    setSchedule(DEFAULT_SCHEDULE);
    setPosts(DEFAULT_POSTS);
    setInquiries(DEFAULT_INQUIRIES);
    setSeo(DEFAULT_SEO);
    localStorage.clear();
    showToast('모든 설정 및 샘플 콘텐츠가 초기값으로 복원되었습니다.');
  };

  return (
    <SiteContext.Provider
      value={{
        theme,
        updateTheme,
        content,
        updateContent,
        updateHero,
        updateOverview,
        updateContact,
        premiums,
        updatePremium,
        addPremium,
        deletePremium,
        units,
        updateUnit,
        addUnit,
        deleteUnit,
        schedule,
        updateScheduleStep,
        addScheduleStep,
        deleteScheduleStep,
        posts,
        addPost,
        updatePost,
        deletePost,
        incrementPostViews,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        seo,
        updateSeo,
        isAdminOpen,
        setIsAdminOpen,
        isShareOpen,
        setIsShareOpen,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        selectedPost,
        setSelectedPost,
        resetToDefaults,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
