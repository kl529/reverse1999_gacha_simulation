# Cloudflare R2 마이그레이션 가이드

Git 저장소 크기를 줄이고 이미지를 CDN으로 이전하는 완벽 가이드입니다.

## 📋 목차

1. [왜 R2로 마이그레이션하나요?](#왜-r2로-마이그레이션하나요)
2. [마이그레이션 체크리스트](#마이그레이션-체크리스트)
3. [Phase 1: R2 설정](#phase-1-r2-설정)
4. [Phase 2: 이미지 업로드](#phase-2-이미지-업로드)
5. [Phase 3: 코드 수정](#phase-3-코드-수정)
6. [Phase 4: Git 정리](#phase-4-git-정리)
7. [Phase 5: 배포 및 테스트](#phase-5-배포-및-테스트)

---

## 왜 R2로 마이그레이션하나요?

### 현재 문제

- Git 저장소 크기: **731MB** (Cloudtype 1GB 제한)
- `public/infos/`: 512MB (이미지 940개)
- 빌드 컨텍스트가 커서 배포 실패

### R2 마이그레이션 후

- ✅ Git 저장소: **~200MB** (이미지 제외)
- ✅ 빌드 속도 향상
- ✅ 무제한 이미지 추가 가능
- ✅ 글로벌 CDN으로 로딩 속도 향상
- ✅ Cloudflare R2는 egress 무료

---

## 마이그레이션 체크리스트

### 준비 단계

- [ ] Cloudflare 계정 생성/로그인
- [ ] R2 버킷 생성
- [ ] R2 API 토큰 생성
- [ ] 로컬에 업로드 스크립트 준비

### 업로드 단계

- [ ] 환경 변수 설정
- [ ] 의존성 설치
- [ ] 이미지 업로드 실행
- [ ] 퍼블릭 액세스 활성화

### 코드 수정 단계

- [ ] CDN 헬퍼 함수 추가
- [ ] 컴포넌트별 이미지 경로 수정
- [ ] 로컬 테스트
- [ ] 환경 변수 추가

### Git 정리 단계

- [ ] `.gitignore` 업데이트
- [ ] Git 히스토리에서 이미지 제거
- [ ] 저장소 크기 확인

### 배포 단계

- [ ] Cloudtype 환경 변수 설정
- [ ] 배포 후 이미지 로딩 테스트
- [ ] 모든 페이지 확인

---

## Phase 1: R2 설정

### 1-1. R2 버킷 생성

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 접속
2. 좌측 메뉴에서 **R2** 클릭
3. **Create bucket** 버튼 클릭
4. 버킷 설정:
   - **Bucket name**: `reverse1999-assets` (또는 원하는 이름)
   - **Location**: APAC (아시아-태평양) 추천
5. **Create bucket** 클릭

### 1-2. R2 API 토큰 생성

1. R2 페이지에서 **Manage R2 API Tokens** 클릭
2. **Create API Token** 클릭
3. 토큰 설정:
   - **Token name**: `reverse1999-upload`
   - **Permissions**: **Object Read & Write** 선택
   - **TTL**: 선택사항 (비워두면 영구)
4. **Create API Token** 클릭
5. 생성된 정보 **안전하게 복사**:

   ```
   Access Key ID: xxxxxxxxxxxxxxxxxxxx
   Secret Access Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
   ```

   ⚠️ **중요**: Secret Access Key는 다시 볼 수 없습니다!

6. **Account ID** 확인 (대시보드 상단 또는 R2 페이지에서 확인)

---

## Phase 2: 이미지 업로드

### 2-1. 환경 변수 설정

```bash
cd scripts/r2-upload
cp .env.example .env
```

`.env` 파일 편집:

```env
CLOUDFLARE_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=reverse1999-assets
```

### 2-2. 의존성 설치

```bash
npm install
```

### 2-3. 이미지 업로드 실행

```bash
npm run upload
```

업로드 시간: 약 10-20분 (940개 파일, 480MB)

### 2-4. 퍼블릭 액세스 활성화

1. Cloudflare 대시보드 > **R2** > 버킷 클릭
2. **Settings** 탭
3. **Public access** 섹션에서 **Allow Access** 클릭
4. 퍼블릭 URL 확인:
   ```
   https://reverse1999-assets.r2.dev
   ```

### 2-5. 업로드 확인

브라우저에서 테스트:

```
https://reverse1999-assets.r2.dev/infos/character_skin/list/vertin.webp
```

이미지가 보이면 성공! ✅

---

## Phase 3: 코드 수정

### 3-1. 환경 변수 추가

**로컬 (`.env.local`):**

```env
NEXT_PUBLIC_CDN_URL=https://reverse1999-assets.r2.dev
```

**Cloudtype 배포 설정:**
Environment Variables에 추가:

```
NEXT_PUBLIC_CDN_URL=https://reverse1999-assets.r2.dev
```

### 3-2. CDN 헬퍼 함수 사용

이미 `lib/cdn.ts`에 준비되어 있습니다.

### 3-3. 컴포넌트 수정 예시

**Before:**

```tsx
<Image src="/infos/character_skin/list/vertin.webp" alt="Vertin" />
```

**After:**

```tsx
import { getSkinListUrl } from "@/lib/cdn";

<Image src={getSkinListUrl("vertin.webp")} alt="Vertin" />;
```

### 3-4. 수정이 필요한 주요 컴포넌트

- `components/skin/CharacterSkin.tsx`
- `components/skin/CharacterSkinDetail.tsx`
- `components/character/Character.tsx`
- `components/gacha_simulator/` (배너 이미지)
- `components/home/` (홈 화면 이미지)

### 3-5. 로컬 테스트

```bash
npm run dev
```

브라우저에서 각 페이지 확인:

- 스킨 페이지
- 캐릭터 페이지
- 가챠 시뮬레이터
- 홈 화면

---

## Phase 4: Git 정리

### 4-1. .gitignore 업데이트

```gitignore
# 기존 내용...

# Large image files (moved to CDN)
public/infos/character_skin/
public/infos/banner_img/
public/infos/home/
```

### 4-2. Git 히스토리에서 이미지 제거

⚠️ **주의**: 이 작업은 Git 히스토리를 재작성합니다!

**옵션 A: BFG Repo-Cleaner (추천)**

```bash
# BFG 설치
brew install bfg

# 백업
git clone --mirror https://github.com/kl529/reverse1999_gacha_simulation.git backup-repo

# 큰 파일 제거 (100KB 이상)
bfg --strip-blobs-bigger-than 100K backup-repo

# 정리
cd backup-repo
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 강제 푸시
git push --force
```

**옵션 B: git filter-repo**

```bash
# filter-repo 설치
brew install git-filter-repo

# 백업
cp -r .git .git-backup

# 폴더 제거
git filter-repo --path public/infos/character_skin --invert-paths
git filter-repo --path public/infos/banner_img --invert-paths
git filter-repo --path public/infos/home --invert-paths

# 강제 푸시
git push --force
```

### 4-3. 저장소 크기 확인

```bash
du -sh .git
# Before: 731MB
# After: ~200MB
```

---

## Phase 5: 배포 및 테스트

### 5-1. 변경사항 커밋

```bash
git add .
git commit -m "CDN 마이그레이션: 이미지를 Cloudflare R2로 이전

- 이미지 URL을 CDN으로 변경
- Git 저장소 크기 731MB → 200MB
- Cloudtype 배포 가능"

git push origin main
```

### 5-2. Cloudtype 배포

1. Cloudtype 대시보드 접속
2. 환경 변수 `NEXT_PUBLIC_CDN_URL` 추가
3. 배포 트리거 (자동 또는 수동)
4. 빌드 로그 확인

### 5-3. 프로덕션 테스트

배포 후 확인 사항:

- [ ] 홈 페이지 이미지 로딩
- [ ] 캐릭터 페이지 (모든 레어도)
- [ ] 스킨 페이지 (리스트 + 상세)
- [ ] 가챠 시뮬레이터 배너
- [ ] 브라우저 콘솔 오류 확인
- [ ] 모바일 반응형 확인

---

## 🎉 완료!

축하합니다! 이제 프로젝트가 훨씬 가벼워지고, 이미지를 무제한으로 추가할 수 있습니다.

### 앞으로 새 이미지 추가 시

1. 로컬 `public/` 폴더에 이미지 추가 (개발용)
2. R2에 업로드: `cd scripts/r2-upload && npm run upload`
3. 코드 커밋 & 푸시 (이미지는 Git에 추가하지 않음)

### 비용 예상

Cloudflare R2 무료 플랜:

- 저장소: **10GB** (현재 0.5GB 사용)
- 읽기 요청: 1,000만 건/월
- 쓰기 요청: 100만 건/월
- **Egress (대역폭): 무료!** ⭐

당분간 비용 발생 없이 사용 가능합니다.

---

## 문제 해결

### Q: 이미지가 안 보여요

A:

1. R2 버킷 퍼블릭 액세스 확인
2. `NEXT_PUBLIC_CDN_URL` 환경 변수 확인
3. 브라우저 개발자 도구에서 네트워크 탭 확인

### Q: 일부 이미지만 깨져요

A: 해당 이미지가 R2에 업로드되었는지 확인

### Q: 로컬에서는 되는데 배포하면 안 돼요

A: Cloudtype 환경 변수에 `NEXT_PUBLIC_CDN_URL` 추가했는지 확인

### Q: Git 히스토리 정리가 무서워요

A:

1. 먼저 백업: `git clone --mirror [URL] backup`
2. 정리 후 문제 생기면: 백업에서 복구
3. 또는 Git 정리 없이 진행 (배포는 가능)

---

## 추가 최적화

### 커스텀 도메인 연결

Cloudflare에서 커스텀 도메인 설정 가능:

```
cdn.reverse1999-simulator.com
```

1. Cloudflare DNS에 CNAME 레코드 추가
2. R2 버킷 설정에서 커스텀 도메인 연결
3. 환경 변수 업데이트:
   ```
   NEXT_PUBLIC_CDN_URL=https://cdn.reverse1999-simulator.com
   ```

### 이미지 최적화

R2 앞에 Cloudflare Images 또는 Image Resizing 추가 고려

---

궁금한 점이 있으면 언제든지 물어보세요! 🚀
