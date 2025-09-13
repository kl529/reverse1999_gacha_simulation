# 🎒 버틴의 여행가방 (Reverse 1999 Simulator)

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-green)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-orange)](https://web.dev/progressive-web-apps/)

> **리버스 1999의 모든 정보를 한눈에!** 가챠 시뮬레이션부터 캐릭터 정보, 각종 가이드까지 한 곳에서 만나보세요.

🌐 **Live Demo**: [https://www.reverse1999-simulator.com](https://www.reverse1999-simulator.com)
> 2025.02 시작 후, 꾸준히 업데이트 중

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [아키텍처](#-아키텍처)
- [시작하기](#-시작하기)
- [주요 페이지](#-주요-페이지)
- [성능 최적화](#-성능-최적화)
- [기여하기](#-기여하기)

## 🎯 프로젝트 소개

**버틴의 여행가방**은 모바일 게임 "리버스 1999"의 팬 메이드 웹 애플리케이션입니다. 게임 플레이어들이 필요한 모든 정보와 도구를 한 곳에서 제공하여 더 나은 게임 경험을 선사합니다.

### 기획 의도

- **통합된 정보 허브**: 흩어진 게임 정보를 한 곳에 모아 접근성 향상
- **실전 도구 제공**: 가챠 시뮬레이션, 계산기 등 실용적인 도구 지원
- **모바일 최적화**: PWA로 구현하여 앱과 같은 사용자 경험 제공
- **커뮤니티 기여**: 오픈소스로 공개하여 커뮤니티와 함께 발전

## ✨ 주요 기능

### 🎰 가챠 시뮬레이션
- **실제 확률 반영**: 게임과 동일한 확률 시스템 구현
- **피티 시스템**: 60회 확정 시스템 완벽 재현
- **통계 분석**: 뽑기 결과 실시간 분석 및 기록
- **배너별 시뮬레이션**: 모든 가챠 배너 지원

### 📚 캐릭터 & 가이드 정보
- **캐릭터 가이드**: 53개 캐릭터 상세 정보 및 활용법
- **스킨 갤러리**: 99개 캐릭터 스킨 모음
- **공명 & 의지 세팅**: 캐릭터별 최적 세팅 가이드
- **광상(Euphoria) 가이드**: 29개 광상 정보 및 획득 방법
- **사이큐브 가이드**: 81개 의지 아이템 상세 정보

### 🛠️ 유틸리티 도구
- **빙고 게임**: 리버스 1999 테마 빙고
- **캐릭터 퀴즈**: 캐릭터 맞추기 게임
- **경로 퀴즈**: 게임 지식 테스트
- **팀 추천**: AI 기반 팀 조합 추천
- **성장 계산기**: 캐릭터 육성 비용 계산
- **캘린더**: 게임 이벤트 일정 관리

### 💰 패키지 정보
- **현금 가이드**: 효율적인 재화 사용법
- **패키지 상점**: 현금 패키지 가성비 분석
- **재료 파밍**: 육성 재료 획득 가이드

### 🏆 콘텐츠 공략
- **빗속의 공상**: 30개 층 공략 가이드
- **미래 통찰**: 이벤트 정보 및 예측
- **청사진 세팅**: 장비 최적화 가이드

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.1.7 (App Router)
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.1, Sass
- **Component Library**: Radix UI
- **Animation**: Framer Motion 12.4.3
- **Icons**: Lucide React

### Development & Build
- **Package Manager**: npm
- **Linting**: ESLint 9 + Prettier 3.5.3
- **Testing**: Jest 29.7.0 + Testing Library
- **Build**: Next.js Standalone Build

### PWA & Performance
- **PWA**: next-pwa 5.6.0
- **SEO**: next-sitemap 4.2.3
- **Image Optimization**: Next.js Image Component
- **Caching**: Vercel Edge Caching

### Deployment & Infrastructure
- **Hosting**: Vercel
- **Domain**: Custom Domain with SSL
- **Analytics**: Built-in Performance Monitoring
- **CDN**: Vercel Edge Network

## 🏗️ 아키텍처

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│    Client (PWA)     │◄──►│   Vercel Edge CDN   │◄──►│   Static Files      │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                            │                            │
         │                            │                            │
         ▼                            ▼                            ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│   React Components  │    │   Next.js Runtime   │    │   Build Artifacts   │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### 디렉토리 구조
```
├── app/                    # Next.js App Router
│   ├── (24 pages)         # 정적 생성된 페이지들
│   ├── [dynamic]/         # 동적 라우팅 (396개 정적 생성)
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 UI 컴포넌트 (Radix 기반)
│   ├── [feature]/        # 기능별 컴포넌트 (21개 모듈)
│   ├── modals/           # 모달 컴포넌트
│   └── etc/              # 공통 유틸리티
├── data/                 # 게임 데이터 (정적 JSON/TS)
├── lib/                  # 유틸리티 함수
└── public/               # 정적 자산 (이미지, 아이콘)
```

## 🚀 시작하기

### 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/yourusername/reverse1999_gacha_simulation.git
cd reverse1999_gacha_simulation

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 품질 검사
npm run lint
npm run format
```

## 📱 주요 페이지

| 페이지 | 설명 | 특징 |
|--------|------|------|
| **홈** | 메인 네비게이션 | 24개 기능 접근점 |
| **가챠 시뮬레이터** | 실시간 가챠 시뮬레이션 | 실제 확률, 피티 시스템 |
| **캐릭터 가이드** | 53개 캐릭터 상세 정보 | SEO 최적화, 개별 페이지 |
| **스킨 갤러리** | 99개 스킨 모음 | 이미지 최적화, 반응형 |
| **공명/의지 세팅** | 캐릭터별 최적 세팅 | 82개 캐릭터 지원 |
| **사이큐브 가이드** | 81개 의지 아이템 | 상세 스탯, 획득 방법 |
| **광상 가이드** | 29개 광상 정보 | 출시 일정, 특징 분석 |

## ⚡ 성능 최적화

### 정적 생성 (SSG)
- **396개 페이지** 모두 빌드 타임에 정적 생성
- **Edge Request 95% 절감**: 동적 사이트맵 제거
- **완전 정적화**: `revalidate: false` 설정

### 캐싱 전략
```javascript
// Vercel 캐싱 설정
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, stale-while-revalidate=86400"
        }
      ]
    }
  ]
}
```

### 이미지 최적화
- **WebP 포맷** 사용으로 파일 크기 50% 절약
- **Next.js Image Component** 활용한 지연 로딩
- **적응형 이미지** 디바이스별 최적 크기 제공

### Bundle 최적화
- **패키지 Import 최적화**: lucide-react, radix-ui 등
- **코드 스플리팅**: 라우트별 자동 분할
- **Tree Shaking**: 사용하지 않는 코드 제거

### PWA 최적화
- **Service Worker**: 오프라인 캐싱
- **Pre-caching**: 핵심 자산 사전 캐싱
- **Background Sync**: 오프라인 상태 동기화

## 📊 프로젝트 통계

- **총 페이지 수**: 396개 (모두 정적 생성)
- **컴포넌트 수**: 70개+ (재사용 가능한 모듈형 설계)
- **지원 데이터**: 캐릭터 150개+, 스킨 99개, 의지 81개
- **번들 크기**: 평균 150KB (최적화된 로딩)
- **성능 지표**: Lighthouse 95+ 점수
- **SEO**: 완전한 메타데이터 및 구조화된 데이터

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 Fork 해주세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m '놀라운 기능 추가'`)
4. 브랜치에 Push 하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

### 개발 가이드라인

- **코드 스타일**: ESLint + Prettier 설정 준수
- **커밋 메시지**: 한국어로 명확하게 작성
- **테스트**: 새로운 기능은 테스트 코드 포함
- **문서화**: README 및 코드 주석 업데이트

## 📄 라이선스

이 프로젝트는 MIT 라이선스하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **리버스 1999 개발팀 (bluepoch)**: 훌륭한 게임 제작
- **오픈소스 기여자들**: 사용된 모든 라이브러리 개발자들
- **다양한 공략글 적어주신분들**: 모두 감사합니다.
- **리버스 1999의 유저분들**: 감사합니다.

---

** 문의는 jiwon803@gmail.com으로 부탁드립니다. **
**Made with ❤️ for Reverse 1999 Community**

🎮 즐거운 게임 되세요! | 🚀 [라이브 사이트 방문하기](https://www.reverse1999-simulator.com)
