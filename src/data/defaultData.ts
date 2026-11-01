import { Post, UnitType, PremiumFeature, ScheduleStep, SeoConfig, ThemeConfig, SiteContent, InquirySubmission } from '../types';

export const DEFAULT_THEME: ThemeConfig = {
  accentColor: '#a855f7', // Electric Violet
  accentColorName: '로열 바이올렛',
  bgDepth: 'obsidian',
  fontFamily: 'pretendard',
  borderRadius: 'md',
  logoText: '동탄 그웬 160',
  logoSubtext: 'GWEN 160 TERRACE HOUSE',
};

export const COLOR_PRESETS = [
  { name: '로열 바이올렛 (기본)', hex: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { name: '딥 아메시스트', hex: '#9333ea', glow: 'rgba(147, 51, 234, 0.4)' },
  { name: '네온 퍼플', hex: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)' },
  { name: '사이버 마젠타', hex: '#e879f9', glow: 'rgba(232, 121, 249, 0.4)' },
  { name: '미드나잇 인디고', hex: '#818cf8', glow: 'rgba(129, 140, 248, 0.4)' },
  { name: '샴페인 골드 & 바이올렛', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
];

export const DEFAULT_SEO: SeoConfig = {
  siteTitle: '동탄 그웬 160 | 잔여세대 선착순 분양중',
  metaDescription: '동탄2신도시 신주거문화타운 B11블록(신동 720) 동탄 그웬 160 잔여세대 선착순 동·호지정 분양 안내. 분양가 상한제 적용, 현민초 초품아 160세대 하이엔드 테라스하우스.',
  keywords: '동탄그웬160, 동탄그웬, GWEN160, 잔여세대선착순, 선착순분양, 동탄2테라스하우스, 신주거문화타운, 현민초, 분양가상한제, 1688-8768',
  ogTitle: '동탄 그웬 160 - 잔여세대 선착순 분양중',
  ogDescription: '동탄 그웬 160 잔여세대 선착순 분양중. 분양가 상한제 적용, 현민초 초품아 & 숲세권 160세대 한정.',
  ogImageUrl: 'https://xn--gwen160-o331aw71q.com/img/common/og.png',
  canonicalUrl: 'https://xn--gwen160-o331aw71q.com',
  naverVerificationCode: 'naver-site-verification=gwen160-dongtan-b11-official',
  googleVerificationCode: 'google-site-verification=gwen160-terrace-kr',
  enableRobotsIndex: true,
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    eyebrow: 'DONGTAN2 NEW RESIDENTIAL CULTURE TOWN B11BL',
    title: '동탄 마지막 비규제 적용단지',
    titleHighlight: '단 160세대를 위한 하이엔드 테라스하우스',
    subtitle: '분양가 상한제 적용 · 잔여세대 선착순 동·호지정 계약 진행 · 단지 바로 앞 현민초 초품아',
    badgeText: '잔여세대 선착순 분양중',
    ctaPrimaryText: '선착순 동·호지정 상담신청',
    ctaSecondaryText: '평면 및 단지배치 보기',
    backgroundImage: 'https://xn--gwen160-o331aw71q.com/img/intro_bg.png',
    stats: [
      { label: '단지 규모', value: '160세대', desc: '지하 1층~지상 4층 9개동' },
      { label: '주차 공간', value: '1.86대', desc: '세대당 100% 지하주차(298대)' },
      { label: '입지 특권', value: '초품아', desc: '단지 앞 현민초·유치원 도보1분' },
      { label: '계약 혜택', value: '계약금 5%', desc: '중도금 60% 대출가능' },
    ],
  },
  overview: {
    projectName: '동탄 그웬 160 (GWEN 160)',
    location: '경기도 화성시 신동 화성동탄(2) 택지개발사업지구 B11블록 (신동 720번지)',
    scale: '지하 1층 ~ 지상 4층 / 총 9개동 / 블록형 단독·연립주택 (테라스하우스)',
    totalUnits: '총 160세대 (전용 102㎡ · 108㎡ · 115㎡ · 116㎡ · 118㎡ 등)',
    buildingType: '연립주택(테라스하우스) 및 부대복리시설',
    floorAreaRatio: '99.85%',
    buildingCoverageRatio: '29.74%',
    parkingRatio: '세대당 약 1.86대 (총 298대 / 100% 지하 자주식 주차 및 지상 차 없는 단지)',
    completionDate: '2028년 2월 입주 예정',
    developer: '(주)한토건설',
    constructionCompany: '(주)한토건설',
    trustee: '코리아신탁(주)',
    imageUrl: '/assets/aistudio/260306-____2_______-______2b0666a7.jpg',
    keyHighlights: [
      '분양가 상한제 적용 단지로 주변 시세 대비 합리적이고 안전한 분양가',
      '전 세대 전용 85㎡ 초과 중대형 면적 구성으로 청약 가점 상관없이 100% 추첨제 적용',
      '광폭 테라스, 최상층 다락방, 썬큰(Sunken) 등 차별화된 입체형 특화 공간 설계',
      '단지 바로 앞 현민초등학교 및 병설유치원 인접 (도보 1분 안심 초품아 학세권)',
      '100% 지하 주차 설계로 아이들이 마음껏 뛰어노는 지상 공원형 단지 & 전 세대 개별 창고 제공',
    ],
  },
  contact: {
    phone: '1688-8768',
    consultationHours: '매일 10:00 ~ 17:00 (사전예약제 운영)',
    modelHouseAddress: '경기도 화성시 동탄구 영천동 863-5번지',
    modelHouseNote: '※ 주택전시관은 쾌적한 1:1 상담 및 관람을 위해 사전 예약제로 운영됩니다.',
    siteAddress: '경기도 화성시 신동 화성동탄2 택지개발사업지구 B11블록 (신동 720번지)',
    kakaoChatUrl: 'https://open.kakao.com',
    naverBlogUrl: 'https://blog.naver.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
    formspreeEndpoint: 'https://formspree.io/f/xeaalndz',
  },
};

export const DEFAULT_PREMIUMS: PremiumFeature[] = [
  {
    id: 'prem-1',
    number: '01',
    title: '분양가 상한제 적용의 독보적 가치',
    subtitle: '합리적인 분양가로 만나는 하이엔드 테라스하우스',
    tag: '분상제 적용',
    description: '동탄2신도시 택지개발지구에 적용되는 분양가 상한제로 거품 없는 합리적인 분양가를 제시하며, 향후 신주거문화타운의 완성에 따른 높은 프리미엄 가치를 선점합니다.',
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/brand_img01.jpg',
    details: [
      '공공택지 분양가 상한제 적용으로 합리적인 공급가 실현',
      '신주거문화타운 내 희소성 높은 블록형 테라스하우스',
      '동탄2신도시 마지막 특별계획구역 미래 비전 수혜',
    ],
  },
  {
    id: 'prem-2',
    number: '02',
    title: '전 세대 85㎡ 초과 100% 추첨제 기회',
    subtitle: '청약 가점 무관! 유주택자 및 젊은 세대 당첨 기회 오픈',
    tag: '100% 추첨제',
    description: '전체 160세대 모두 전용면적 85㎡를 초과하는 중대형 평형으로 구성되어 있어, 청약 가점이 낮은 3040 세대 및 갈아타기 유주택자도 100% 추첨을 통해 당첨이 가능합니다.',
    imageUrl: '/assets/aistudio/260311-____2_______-_____9502b8d5.jpg',
    details: [
      '가점 부족으로 고민하던 수요자들을 위한 100% 추첨제 물량',
      '전용 102㎡~118㎡ 실사용 40평대 이상의 쾌적한 중대형 공간',
      '화성시 및 수도권(서울·경기·인천) 거주자 청약 가능',
    ],
  },
  {
    id: 'prem-3',
    number: '03',
    title: '광폭 테라스 · 최상층 다락 · 썬큰 특화',
    subtitle: '아파트의 편리함에 단독주택의 낭만을 더한 설계',
    tag: '공간의 미학',
    description: '천편일률적인 판상형 아파트를 벗어나, 와이드 야외 테라스, 하늘을 마주하는 최상층 다락방, 채광을 품은 썬큰(Sunken) 가든 등 층별·타입별 맞춤형 서비스 공간을 제공합니다.',
    imageUrl: '/assets/aistudio/260311-____2_______-____730905c6.jpg',
    details: [
      '가든 파티, 홈카페, 반려견 공간으로 활용 가능한 대형 테라스',
      '최상층 세대에 제공되는 독립형 다락 및 루프탑 야외 테라스',
      '전 세대 계절용품 및 레저용품 보관이 가능한 세대별 개별 창고',
    ],
  },
  {
    id: 'prem-4',
    number: '04',
    title: '단지 바로 앞 현민초등학교 & 도보 안심통학',
    subtitle: '아이들의 안전한 등하굣길을 보장하는 완벽한 초품아',
    tag: '초품아 학세권',
    description: '단지 바로 맞은편에 현민초등학교와 병설유치원이 위치하여 찻길 건넘 없이 도보 1분 안심 통학이 가능하며, 인근 바른중, 동탄11고(예정) 등 초·중·고가 인접한 명품 교육환경을 자랑합니다.',
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/brand_img03.jpg',
    details: [
      '단지 앞 현민초등학교·유치원 도보 1분 초근접 통학권',
      '바른중학교, 동탄11고등학교(예정) 등 안심 교육 벨트',
      '유해시설 없는 청정 신주거문화타운 에듀존',
    ],
  },
  {
    id: 'prem-5',
    number: '05',
    title: '100% 지하주차 & 지상에 차 없는 힐링 공원',
    subtitle: '세대당 1.86대의 여유로운 주차와 자연친화적 조경',
    tag: '쾌적한 단지설계',
    description: '총 298대의 넉넉한 자주식 주차공간을 100% 지하화하여 지상에는 차가 다니지 않는 안전하고 쾌적한 친환경 공원형 단지를 실현했습니다.',
    imageUrl: '/assets/aistudio/260311-____2_______-_____9b666fc6.jpg',
    details: [
      '가구당 약 1.86대의 여유롭고 쾌적한 광폭 주차 공간',
      '지상 전체를 테마 조경과 산책로로 채운 공원형 단지',
      '세대별 프라이버시를 지켜주는 저밀도 4층 설계 (총 9개동)',
    ],
  },
  {
    id: 'prem-6',
    number: '06',
    title: '용인 반도체 메가클러스터 & 동탄 트램 비전',
    subtitle: '세계 최대 반도체 밸리의 배후 주거단지 프리미엄',
    tag: '미래가치 비전',
    description: '삼성전자가 360조 원을 투자하는 용인 남사 첨단 시스템반도체 국가산단과 인접한 골든 배후 입지이며, 동탄 트램(예정) 개통 시 동탄역(GTX-A·SRT) 접근성이 비약적으로 향상됩니다.',
    imageUrl: 'https://xn--gwen160-o331aw71q.com/img/location_map.jpg',
    details: [
      '용인 남사·원삼 반도체 메가 클러스터 최인접 배후 주거지',
      '동탄 트램 1·2호선(추진)을 통한 SRT/GTX-A 동탄역 쾌속 연결',
      '신리천 수변공원, 왕배산 체육공원 등 자연과 도심 인프라 공유',
    ],
  },
];

export const DEFAULT_UNITS: UnitType[] = [
  {
    id: 'unit-102a',
    name: '102㎡ A-TYPE 테라스 스위트',
    typeCode: '102A',
    areaExclusive: '102.8420㎡',
    areaSupply: '135.4210㎡',
    householdCount: '42세대',
    description: '4베이 판상형 맞통풍 구조와 독립된 야외 테라스 공간이 결합된 중대형 명품 평면. 채광과 환기를 극대화하고 실사용 면적을 극대화했습니다.',
    features: [
      '전면 4베이 와이드 설계 및 야외 테라스 제공',
      '대형 팬트리 및 현관 워크인 클로젯 넉넉한 수납',
      '마스터룸 독립 드레스룸 & 파우더룸 & 호텔식 욕실',
      '세대 전용 지하 락커 창고 무상 제공',
    ],
    imageUrl: '/assets/aistudio/image_5c8bbbd6.png',
    floorplanUrl: 'https://xn--gwen160-o331aw71q.com/sub/unit01.jpg',
    vrUrl: 'https://xn--gwen160-o331aw71q.com/vr.html',
  },
  {
    id: 'unit-108a',
    name: '108㎡ A-TYPE 와이드 리빙 뷰',
    typeCode: '108A',
    areaExclusive: '108.9140㎡',
    areaSupply: '143.2500㎡',
    householdCount: '34세대',
    description: '광폭 거실과 오픈형 LDK(거실-식당-주방) 구조로 가족 간 소통과 파노라마 자연 조망을 담아낸 프리미엄 중대형 테라스 유니트입니다.',
    features: [
      '전면 6.5m 광폭 거실과 다이닝 공간 연계 혁신 평면',
      '보조주방 및 세탁실 특화 동선 설계',
      '침실 3개 + 알파룸 구성으로 재택근무·취미실 활용',
      '전 세대 홈 IoT 스마트 환기 및 공기청정 시스템',
    ],
    imageUrl: '/assets/aistudio/image_5c8bbbd6.png',
    floorplanUrl: 'https://xn--gwen160-o331aw71q.com/sub/unit03.jpg',
    vrUrl: 'https://xn--gwen160-o331aw71q.com/vr.html',
  },
  {
    id: 'unit-115p',
    name: '115㎡ P-TYPE 루프탑 다락 펜트',
    typeCode: '115P',
    areaExclusive: '115.4200㎡',
    areaSupply: '152.1800㎡',
    householdCount: '36세대 (최상층 특화)',
    description: '최상층 4층에 위치하여 높은 층고와 전용 다락방, 그리고 루프탑 야외 테라스를 모두 누릴 수 있는 단 하나의 펜트하우스형 주거 명작입니다.',
    features: [
      '최상층 전용 대형 다락방 및 루프탑 야외 스카이 테라스',
      '하늘을 바라보는 천창 채광 특화 설계',
      '홈시네마, 프라이빗 서재, 루프탑 홈글램핑 공간 구현',
      '초광폭 마스터존 및 전용 드레스룸 특화',
    ],
    imageUrl: '/assets/aistudio/image_5c8bbbd6.png',
    floorplanUrl: 'https://xn--gwen160-o331aw71q.com/sub/unit05.jpg',
    vrUrl: 'https://xn--gwen160-o331aw71q.com/vr.html',
  },
  {
    id: 'unit-116t',
    name: '116㎡ T-TYPE 가든 테라스하우스',
    typeCode: '116T',
    areaExclusive: '116.3200㎡',
    areaSupply: '154.2100㎡',
    householdCount: '28세대',
    description: '단지 내 자연 조경과 직접 연결되는 감각의 대형 야외 가든 테라스가 제공되어 단독주택의 정원 생활을 온전히 누릴 수 있습니다.',
    features: [
      '단독 정원처럼 활용 가능한 광폭 야외 테라스',
      '썬큰(Sunken) 연계로 쾌적한 자연 채광 및 환기 극대화',
      '독립적인 세대 출입 동선 및 고급 마감재 시공',
      '주방 아일랜드 대형 세라믹 상판 및 고급 주방가구',
    ],
    imageUrl: '/assets/aistudio/image_5c8bbbd6.png',
    floorplanUrl: 'https://xn--gwen160-o331aw71q.com/sub/unit06.jpg',
    vrUrl: 'https://xn--gwen160-o331aw71q.com/vr.html',
  },
  {
    id: 'unit-118a',
    name: '118㎡ A-TYPE 하이엔드 펜트하우스',
    typeCode: '118A',
    areaExclusive: '118.7500㎡',
    areaSupply: '158.4500㎡',
    householdCount: '20세대 (단지 최상급)',
    description: '동탄 그웬 160의 정점에 선 최상위 시그니처 평면. 실사용 50평형대의 압도적 공간감과 다락, 테라스, 썬큰이 어우러진 주거 예술품입니다.',
    features: [
      '최고급 대형 다락방 + 더블 와이드 야외 테라스',
      '마스터존 내 최고급 독립형 부부욕실 & 호텔식 건식 세면대',
      '전실 대형 수납 팬트리 및 3면 개방형 조망축 확보',
      '전 세대 지하 전용 창고 및 넉넉한 1.86대 주차 배정',
    ],
    imageUrl: '/assets/aistudio/image_5c8bbbd6.png',
    floorplanUrl: 'https://xn--gwen160-o331aw71q.com/sub/unit07.jpg',
    vrUrl: 'https://xn--gwen160-o331aw71q.com/vr.html',
  },
];

export const DEFAULT_SCHEDULE: ScheduleStep[] = [
  {
    id: 'sch-1',
    title: '입주자 모집공고',
    dateRange: '청약Home 공고 게재',
    status: '마감',
    description: '동탄2 B11블록 동탄 그웬 160 입주자 모집공고 게재',
  },
  {
    id: 'sch-2',
    title: '견본주택 그랜드 오픈',
    dateRange: '사전예약 관람 진행',
    status: '진행중',
    description: '영천동 863-5 견본주택 개관 및 1:1 맞춤 분양 상담 (1688-8768)',
    highlight: true,
  },
  {
    id: 'sch-3',
    title: '특별공급 청약 접수',
    dateRange: '청약Home 인터넷 접수',
    status: '예정',
    description: '다자녀가구, 신혼부부, 노부모부양 등 특별공급',
  },
  {
    id: 'sch-4',
    title: '일반 1순위 청약 접수',
    dateRange: '전 세대 100% 추첨제',
    status: '예정',
    description: '전용 85㎡ 초과 타입 100% 추첨제 (화성시 및 수도권 거주자)',
    highlight: true,
  },
  {
    id: 'sch-5',
    title: '일반 2순위 청약 접수',
    dateRange: '청약Home 인터넷 접수',
    status: '예정',
    description: '청약통장 가입자 대상 접수',
  },
  {
    id: 'sch-6',
    title: '당첨자 발표',
    dateRange: '청약Home 개별 조회',
    status: '예정',
    description: '당첨자 및 동호수 발표, SMS 개별 통보',
    highlight: true,
  },
  {
    id: 'sch-7',
    title: '정당 계약 체결',
    dateRange: '견본주택 현장 계약',
    status: '예정',
    description: '견본주택 내 자격확인 서류 제출 및 공급계약 체결',
  },
];

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '[공지] 동탄 그웬 160 견본주택 VIP 사전 관람 예약 안내 (대표: 1688-8768)',
    category: '공지사항',
    summary: '쾌적하고 안전한 관람 환경을 위하여 100% 1:1 사전 예약제로 운영됩니다.',
    content: `안녕하십니까, 동탄 그웬 160 공식 분양사업단입니다.

동탄2신도시 신주거문화타운 B11블록에 공급되는 하이엔드 테라스하우스 '동탄 그웬 160'의 견본주택이 공식 개관하여 운영 중입니다.

고객님들의 프라이버시 보호와 심도 있는 전문 분양 컨설팅을 위해, 견본주택 관람은 100% 1:1 사전 예약제로 진행됩니다.

■ 견본주택 위치: 경기도 화성시 동탄구 영천동 863-5번지
■ 사업지 현장: 경기도 화성시 신동 720번지 (B11BL)
■ 관람 시간: 오전 10:00 ~ 오후 18:00
■ 대표 문의: 1688-8768

홈페이지 내 [관심고객 VIP 등록] 메뉴를 통해 사전 예약 신청 시 담당 분양 전문 상담사가 우선 일정을 배정해 드립니다.
감사합니다.`,
    author: '분양운영팀',
    date: '2026. 10. 30',
    views: 1890,
    isPinned: true,
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/contact01.jpg',
  },
  {
    id: 'post-2',
    title: '[분양안내] 분양가 상한제 적용 안내 및 잔여세대 선착순 분양 안내',
    category: '분양일정',
    summary: '청약 가점이 낮아도 누구나 계약 가능한 전용 85㎡ 초과 중대형 단지 분양가 상한제 및 잔여세대 선착순 분양 안내.',
    content: `동탄 그웬 160 잔여세대 선착순 동·호지정 계약 및 분양 안내입니다.

1. 분양가 상한제 적용의 독보적 분양가
동탄2 택지개발지구 B11BL에 공급되어 분양가 심의를 거친 합리적인 분양가로 높은 미래가치를 선점합니다.

2. 잔여세대 선착순 동·호수 지정 계약
- 청약통장 보유 무관, 만 19세 이상 누구나 가능
- 거주지역 무관 (전국 거주자 계약 가능)
- 선착순 원하는 동·호수를 직접 선택하여 즉시 지정 계약 진행

3. 단지 프리미엄 핵심 포인트
- 전 세대 85㎡ 초과 희소성 높은 중대형 하이엔드 테라스하우스
- 4베이 맞통풍, 대형 테라스, 최상층 다락방 등 차별화된 특화 평면
- 단지 바로 앞 현민초등학교 안심 통학 초품아 프리미엄

상세한 잔여세대 분양가 및 모델하우스 방문 예약은 대표번호 1688-8768로 문의하시기 바랍니다.`,
    author: '분양상담실',
    date: '2026. 10. 28',
    views: 1540,
    isPinned: true,
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/complex.jpg',
  },
  {
    id: 'post-3',
    title: '[보도자료] ‘동탄 그웬 160’, 단지 바로 앞 현민초 품은 테라스하우스로 학부모 관심 집중',
    category: '보도자료',
    summary: '찻길 건널 필요 없는 도보 1분 초품아 입지와 쾌적한 숲세권 자연환경 결합.',
    content: `[부동산 경제신문]
동탄2신도시 신주거문화타운 B11블록에 들어서는 '동탄 그웬 160'이 우수한 학세권과 쾌적한 자연환경으로 3040 학부모 수요자들의 뜨거운 관심을 받고 있다.

단지 바로 맞은편에 현민초등학교와 병설유치원이 위치해 차도를 건너지 않고도 안전하게 도보로 등하교할 수 있는 '초품아(초등학교를 품은 아파트)' 단지다. 인근에 바른중학교와 동탄11고등학교(예정)까지 도보권에 위치해 초·중·고 원스톱 교육 벨트가 형성된다.

또한 단지 내 100% 지하 주차 설계를 적용하여 지상에는 차가 다니지 않는 공원형 단지로 조성되며, 세대당 약 1.86대의 여유로운 주차 공간과 전 세대 개별 창고가 제공된다.

분양 관계자는 “아이들의 안전한 통학 환경과 테라스하우스의 여유로운 라이프를 동시에 누릴 수 있는 유일무이한 단지”라고 강조했다.`,
    author: '홍보팀',
    date: '2026. 10. 25',
    views: 1120,
    isPinned: false,
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/brand_img03.jpg',
  },
  {
    id: 'post-4',
    title: '[상품특화] 광폭 테라스 · 최상층 다락방 · 썬큰 설계로 실사용 면적 극대화',
    category: '프리미엄소식',
    summary: '타입별 입체 설계로 단독주택의 장점과 아파트의 편리함을 한 번에 누립니다.',
    content: `동탄 그웬 160은 일반 아파트의 획일적인 평면을 탈피하여, 라이프스타일에 맞춘 다채로운 공간 솔루션을 제공합니다.

■ 광폭 야외 테라스
홈카페, 정원 가꾸기, 바비큐 파티, 아이들 물놀이장 등 계절에 따라 다양한 아웃도어 라이프가 가능합니다.

■ 최상층 다락방 & 루프탑 테라스
높은 층고와 하늘을 바라보는 천창을 갖춘 다락방은 독립된 서재, 영화관, 아이들의 놀이방으로 활용할 수 있습니다.

■ 썬큰(Sunken) 공간
지하 연계 공간에 자연 채광과 환기를 끌어들여 쾌적하고 개방감 넘치는 실사용 공간을 선사합니다.

■ 전 세대 전용 지하 창고
캠핑용품, 골프백, 계절 가전 등 부피가 큰 짐을 손쉽게 보관할 수 있는 개별 락커 창고를 무상 제공합니다.`,
    author: '상품설계팀',
    date: '2026. 10. 20',
    views: 980,
    isPinned: false,
    imageUrl: 'https://xn--gwen160-o331aw71q.com/sub/space.jpg',
  },
  {
    id: 'post-5',
    title: '[현장스케치] 화성동탄2 B11블록 현장 및 용인 반도체 클러스터 배후 비전',
    category: '현장스케치',
    summary: '신동 720번지 일원 공사 착공 현황 및 용인 남사 삼성전자 반도체 클러스터 연결 교통망.',
    content: `동탄 그웬 160이 조성되는 화성시 신동 720번지(B11블록) 현장 스케치를 전해드립니다.

현재 단지 부지는 순조롭게 대지 조성 및 토목 공사가 진행 중이며, 단지 바로 앞으로 현민초등학교가 자리해 실질적인 안심 통학로를 눈으로 확인하실 수 있습니다.

특히 정부가 추진 중인 용인 남사·원삼 반도체 메가 클러스터(삼성전자 360조 원 투자)와 인접하여 고소득 엔지니어 및 연구원들의 핵심 배후 주거지로 주목받고 있습니다.

신리천 수변공원 산책로와 다올공원 등 풍부한 녹지축을 직접 체감해 보시기 바랍니다.`,
    author: '현장취재팀',
    date: '2026. 10. 15',
    views: 890,
    isPinned: false,
    imageUrl: 'https://xn--gwen160-o331aw71q.com/img/location_map.jpg',
  },
];

export const DEFAULT_INQUIRIES: InquirySubmission[] = [
  {
    id: 'inq-1',
    name: '김도훈',
    phone: '010-5821-3920',
    email: 'dh.kim@samsung.com',
    preferredType: '115㎡ P-TYPE 루프탑 다락 펜트',
    preferredTime: '주말 오전 (10:00 ~ 13:00)',
    message: '용인 반도체 클러스터 근무 중이며, 최상층 다락방 테라스 분양가 및 청약 자격 상담 희망합니다.',
    agreePrivacy: true,
    createdAt: '2026-10-30 11:20',
    status: '신규접수',
  },
  {
    id: 'inq-2',
    name: '박미란',
    phone: '010-3419-8802',
    email: 'mr.park@naver.com',
    preferredType: '102㎡ A-TYPE 테라스 스위트',
    preferredTime: '평일 오후 (14:00 ~ 18:00)',
    message: '초등 자녀가 있어 현민초 초품아 통학 환경과 테라스 하우스 실물 견본주택 관람 예약 요청합니다.',
    agreePrivacy: true,
    createdAt: '2026-10-29 15:40',
    status: '상담완료',
  },
  {
    id: 'inq-3',
    name: '최원석',
    phone: '010-9124-7731',
    email: 'wschoidt@kakao.com',
    preferredType: '118㎡ A-TYPE 하이엔드 펜트하우스',
    preferredTime: '주말 오후 (14:00 ~ 18:00)',
    message: '1주택 보유 상태인데 100% 추첨제 청약 가능 여부와 자금조달 계획 상담 원합니다.',
    agreePrivacy: true,
    createdAt: '2026-10-28 17:10',
    status: '신규접수',
  },
];
