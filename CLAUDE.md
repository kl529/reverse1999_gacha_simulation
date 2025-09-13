# CLAUDE.md - 프로젝트 가이드

## 🎯 프로젝트 개요

### 프로젝트 목적
- 리버스 1999 게임의 모든 정보를 한눈에 찾아볼 수 있는 웹 애플리케이션
- 가챠 시뮬레이션, 캐릭터 정보, 가이드 등을 제공하여 게임 플레이어들의 편의성 증대
- PWA(Progressive Web App)로 구현되어 모바일 환경에서도 앱처럼 사용 가능

### 주요 기능
- **가챠 시뮬레이션**: 실제 게임과 유사한 확률로 가챠 시뮬레이션 제공
- **캐릭터 정보**: 게임 내 모든 캐릭터의 상세 정보 및 스킨 정보
- **각종 가이드**: 사이큐브, 유포리아, 현금 패키지 등 게임 가이드
- **유틸리티 도구**: 빙고, 캐릭터 퀴즈, 팀 추천, 캘린더 등
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

### 기술 스택
- **Frontend**: Next.js 15.1.7, React 19.0.0, TypeScript 5
- **UI Library**: Radix UI, Tailwind CSS 3.4.1, Framer Motion
- **Styling**: Tailwind CSS, Sass, CSS Modules
- **Testing**: Jest, Testing Library
- **Build & Deploy**: Vercel, PWA 지원
- **개발 도구**: ESLint, Prettier, PostCSS

### 아키텍처
```
Next.js App Router
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 홈페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── globals.css        # 글로벌 스타일
│   └── [feature]/         # 기능별 페이지
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── [feature]/        # 기능별 컴포넌트
│   ├── modals/           # 모달 컴포넌트
│   └── etc/              # 공통 유틸리티 컴포넌트
└── lib/                  # 유틸리티 함수
```

## 📝 개발 가이드라인

### 코딩 스타일 및 컨벤션
- **언어별 스타일**: ESLint + Prettier 설정 사용
- **네이밍 규칙**:
  - 변수/함수: camelCase
  - 상수: UPPER_SNAKE_CASE
  - 컴포넌트: PascalCase
  - 파일명: PascalCase (컴포넌트), camelCase (유틸리티)
- **커밋 메시지**: 한국어로 간결하게 작성
  - 예: "데이터 추가", "오타수정", "빗공 공략 추가"

### 폴더 구조
```
project/
├── app/                   # Next.js App Router
│   ├── [feature]/        # 기능별 페이지 (page.tsx)
│   ├── [feature]/[id]/   # 동적 라우팅 페이지
│   └── globals.css       # 전역 스타일
├── components/           # React 컴포넌트
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   ├── [feature]/       # 기능별 컴포넌트
│   ├── modals/          # 모달 컴포넌트
│   └── etc/             # 공통 유틸리티 컴포넌트
├── lib/                 # 유틸리티 함수
├── public/              # 정적 자산
└── config files         # 설정 파일들
```

## 🔑 중요한 컨텍스트

### 핵심 비즈니스 로직
- **가챠 시스템**: 실제 게임과 동일한 확률 시스템 구현
- **캐릭터 데이터**: 게임 내 모든 캐릭터 정보를 체계적으로 관리
- **가이드 컨텐츠**: 게임 플레이어를 위한 각종 공략 및 가이드 제공
- **PWA 기능**: 오프라인 사용 가능 및 앱 설치 기능

### 주의해야 할 부분들
⚠️ **성능 관련**
- 대용량 이미지 최적화 (webp 포맷 사용)
- 동적 라우팅 페이지의 메타데이터 SEO 최적화
- PWA 캐싱 전략 고려

⚠️ **사용자 경험**
- 모바일 반응형 디자인 필수
- 다크/라이트 테마 지원
- 로딩 상태 및 에러 처리

⚠️ **데이터 관리**
- 게임 업데이트에 따른 캐릭터 데이터 동기화
- 이미지 경로 및 메타데이터 일관성 유지

### 자주 사용하는 패턴들
- **모달 시스템**: ModalProvider를 통한 중앙화된 모달 관리
- **테마 관리**: next-themes를 활용한 다크/라이트 모드
- **로딩 처리**: GlobalLoadingManager를 통한 전역 로딩 상태
- **반응형 디자인**: Tailwind CSS breakpoints 활용

## 🚀 개발 워크플로우

### 브랜치 전략
- `main`: 프로덕션 배포용 안정 브랜치
- feature 브랜치는 직접 main에 merge하여 간단한 워크플로우 유지

### 개발 프로세스
1. 기능 개발 또는 데이터 업데이트
2. 로컬 테스트 및 빌드 확인
3. main 브랜치에 커밋 및 푸시
4. Vercel 자동 배포

### 테스트 방법
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format
```

### 배포 프로세스
1. **개발 환경**: localhost:3000에서 개발 및 테스트
2. **프로덕션 환경**: main 브랜치 푸시 시 Vercel에 자동 배포
3. **PWA 업데이트**: next-sitemap을 통한 사이트맵 자동 생성

### 주요 명령어
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드 (사이트맵 포함)
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 품질 관리
npm run lint
npm run lint:fix
npm run format
```

## 📚 추가 리소스

### 주요 페이지 구조
- **홈페이지**: 전체 기능에 대한 네비게이션 제공
- **가챠 시뮬레이터**: 실시간 가챠 시뮬레이션 및 통계
- **캐릭터 정보**: 상세 캐릭터 정보 및 스킨 갤러리
- **각종 가이드**: 게임 공략 및 팁 제공
- **유틸리티**: 빙고, 퀴즈, 캘린더 등 부가 기능

### 핵심 컴포넌트
- **HomePage**: 메인 페이지 네비게이션
- **GachaGame**: 가챠 시뮬레이션 로직
- **ThemeProvider**: 테마 관리
- **ModalProvider**: 모달 상태 관리
- **HamburgerMenu**: 모바일 네비게이션

### 배포 정보
- **도메인**: https://www.reverse1999-simulator.com
- **플랫폼**: Vercel
- **PWA**: 모바일 앱 설치 지원

---
*이 문서는 프로젝트의 진행 상황에 따라 지속적으로 업데이트됩니다.*