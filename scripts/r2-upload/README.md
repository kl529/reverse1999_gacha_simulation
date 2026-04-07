# Cloudflare R2 이미지 업로드 가이드

이 스크립트는 로컬 `public/` 폴더의 이미지를 Cloudflare R2로 업로드합니다.

## 사전 준비

### 1. Cloudflare R2 버킷 생성

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 접속
2. **R2** 메뉴 클릭
3. **Create bucket** 클릭
4. 버킷 이름 입력 (예: `reverse1999-assets`)
5. 리전 선택 (APAC 추천)
6. **Create bucket** 클릭

### 2. R2 API 토큰 생성

1. Cloudflare 대시보드 > **R2** > **Manage R2 API Tokens**
2. **Create API Token** 클릭
3. **R2 Token** 선택
4. 권한: **Object Read & Write** 선택
5. **Create API Token** 클릭
6. 생성된 정보 복사:
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (상단에 표시됨)

### 3. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일 생성:

```bash
cp .env.example .env
```

`.env` 파일 편집:

```env
CLOUDFLARE_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=reverse1999-assets
```

## 사용 방법

### 1. 의존성 설치

```bash
cd scripts/r2-upload
npm install
```

### 2. 이미지 업로드

```bash
npm run upload
```

업로드 중 진행률이 표시됩니다:

```
🚀 Cloudflare R2 업로드 시작...
📦 버킷: reverse1999-assets

📂 업로드 중: ../../public/infos/character_skin
   파일 개수: 940
   진행: 100/940 (11%)
   진행: 200/940 (21%)
   ...
   ✅ 완료: ../../public/infos/character_skin

🎉 업로드 완료!
✅ 성공: 1000/1000
```

### 3. R2 버킷 퍼블릭 액세스 설정

업로드 후 버킷을 퍼블릭으로 설정:

**⚠️ 중요**: R2 버킷에 "Public access" 옵션이 보이지 않는다면 **Cloudflare Workers**를 사용해야 합니다.

#### 옵션 A: R2.dev 서브도메인 (있는 경우)

1. Cloudflare 대시보드 > **R2** > 버킷 클릭
2. **Settings** 탭
3. **Public access** 또는 **R2.dev subdomain** 섹션 찾기
4. **Allow Access** 클릭
5. 도메인 확인 (예: `https://reverse1999-assets.r2.dev`)

#### 옵션 B: Cloudflare Workers 사용 (Public Access 없는 경우)

자세한 방법은 `WORKER_SETUP.md` 참고:

1. Workers 생성 및 코드 배포
2. R2 버킷 바인딩 설정
3. Worker URL 사용: `https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev`

**→ 자세한 가이드: [WORKER_SETUP.md](./WORKER_SETUP.md)**

### 4. 환경 변수 업데이트

프로젝트 루트의 `.env.local`에 CDN URL 추가:

```env
NEXT_PUBLIC_CDN_URL=https://reverse1999-assets.r2.dev
```

Cloudtype 배포 설정에도 동일하게 추가하세요.

## 업로드되는 폴더

- `public/infos/character_skin/` (407MB)
- `public/infos/banner_img/` (36MB)
- `public/infos/home/` (27MB)
- `public/characters/` (13MB)

총 약 **480MB**의 이미지가 업로드됩니다.

## 이미지 업데이트 후 캐시 갱신

R2에 파일을 재업로드해도 엣지 캐시(`caches.default`)가 남아있어 이전 이미지가 보일 수 있습니다.
Worker 재배포만으로는 해결되지 않으며, 아래 방법으로 퍼지해야 합니다.

### 단일 파일 퍼지

```bash
curl "https://reverse1999-r2-public.lyva.workers.dev/{경로}?purge=1"
```

예시:
```bash
curl "https://reverse1999-r2-public.lyva.workers.dev/infos/character_skin/mini/the_last_fluttering_beat.webp?purge=1"
```

### 여러 파일 한번에 퍼지

```bash
curl -X POST "https://reverse1999-r2-public.lyva.workers.dev/_purge" \
  -H "Content-Type: application/json" \
  -d '[
    "infos/character_skin/mini/foo.webp",
    "infos/character_skin/standing/foo.webp"
  ]'
```

### 업로드 + 퍼지 한번에

```bash
# 1. R2 업로드
wrangler r2 object put reverse1999-assets/infos/character_skin/mini/foo.webp \
  --file=public/infos/character_skin/mini/foo.webp \
  --content-type="image/webp"

# 2. 캐시 퍼지
curl "https://reverse1999-r2-public.lyva.workers.dev/infos/character_skin/mini/foo.webp?purge=1"
```

## 문제 해결

### 인증 오류

```
❌ 환경 변수가 설정되지 않았습니다.
```

→ `.env` 파일이 올바르게 생성되었는지 확인

### 권한 오류

```
AccessDenied: Access Denied
```

→ R2 API 토큰이 **Object Read & Write** 권한을 가지고 있는지 확인

### 업로드 실패

```
❌ 실패: infos/xxx.webp
```

→ 파일이 실제로 존재하는지, 읽기 권한이 있는지 확인

## 다음 단계

업로드 완료 후:

1. ✅ 코드에서 이미지 경로를 CDN URL로 변경
2. ✅ Git에서 이미지 파일 제거
3. ✅ `.gitignore`에 `public/infos/` 추가
4. ✅ 배포 후 이미지 로딩 확인
