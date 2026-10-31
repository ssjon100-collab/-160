export interface Post {
  id: string;
  title: string;
  category: '공지사항' | '분양일정' | '프리미엄소식' | '보도자료' | '현장스케치';
  summary: string;
  content: string;
  author: string;
  date: string;
  views: number;
  isPinned: boolean;
  imageUrl?: string;
}

export interface UnitType {
  id: string;
  name: string;
  typeCode: string; // e.g. 84A, 114B, 160P
  areaExclusive: string; // 전용면적
  areaSupply: string; // 공급면적
  householdCount: string; // 세대수
  description: string;
  features: string[];
  imageUrl: string;
  floorplanUrl: string;
  vrUrl?: string;
}

export interface PremiumFeature {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  imageUrl: string;
  details: string[];
}

export interface ScheduleStep {
  id: string;
  title: string;
  dateRange: string;
  status: '진행중' | '예정' | '마감';
  description: string;
  highlight?: boolean;
}

export interface InquirySubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredType: string;
  preferredTime: string;
  message?: string;
  agreePrivacy: boolean;
  createdAt: string;
  status: '신규접수' | '상담완료' | '보류';
}

export interface ThemeConfig {
  accentColor: string; // e.g. #a855f7
  accentColorName: string;
  bgDepth: 'obsidian' | 'charcoal' | 'violet';
  fontFamily: 'pretendard' | 'cinzel' | 'montserrat';
  borderRadius: 'sm' | 'md' | 'lg';
  logoText: string;
  logoSubtext: string;
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
  naverVerificationCode: string;
  googleVerificationCode: string;
  enableRobotsIndex: boolean;
}

export interface HeroStat {
  label: string;
  value: string;
  desc: string;
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    badgeText: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    backgroundImage: string;
    stats: HeroStat[];
  };
  overview: {
    projectName: string;
    location: string;
    scale: string;
    totalUnits: string;
    buildingType: string;
    floorAreaRatio: string; // 용적률
    buildingCoverageRatio: string; // 건폐율
    parkingRatio: string;
    completionDate: string;
    developer: string; // 시행
    constructionCompany: string; // 시공사
    trustee: string; // 신탁
    imageUrl?: string;
    keyHighlights: string[];
  };
  contact: {
    phone: string;
    consultationHours: string;
    modelHouseAddress: string;
    modelHouseNote: string;
    siteAddress: string;
    kakaoChatUrl: string;
    naverBlogUrl: string;
    youtubeUrl: string;
    instagramUrl: string;
    formspreeEndpoint?: string;
  };
}
