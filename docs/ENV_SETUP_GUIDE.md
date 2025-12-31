# 환경 변수 설정 가이드

CDN 마이그레이션이 완료되었습니다! 이제 환경 변수만 설정하면 됩니다.

## 📋 설정해야 할 환경 변수

### `NEXT_PUBLIC_CDN_URL`

Cloudflare R2 Workers URL을 설정합니다.

---

## 🖥️ 로컬 개발 환경 설정

### Step 1: `.env.local` 파일 편집

프로젝트 루트에 `.env.local` 파일을 열거나 생성하세요:

```bash
# 프로젝트 루트에서
vi .env.local
# 또는
nano .env.local
# 또는 VSCode로
code .env.local
```

### Step 2: CDN URL 추가

파일 끝에 다음 줄을 추가하세요:

```env
# Cloudflare R2 CDN
NEXT_PUBLIC_CDN_URL=https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

**⚠️ 중요**: `YOUR-SUBDOMAIN`을 실제 Workers 서브도메인으로 변경하세요!

Workers URL을 찾는 방법:

1. Cloudflare 대시보드 > **Workers & Pages**
2. 생성한 Worker (`reverse1999-r2-public`) 클릭
3. 상단에 표시된 URL 복사

예시:

```env
NEXT_PUBLIC_CDN_URL=https://reverse1999-r2-public.abc123.workers.dev
```

### Step 3: 로컬 서버 재시작

```bash
# 개발 서버 중지 (Ctrl+C)
# 다시 시작
npm run dev
```

### Step 4: 테스트

브라우저에서 `http://localhost:3000` 접속 후:

1. **개발자 도구** 열기 (F12)
2. **Network** 탭 선택
3. 페이지 새로고침 (F5)
4. 이미지 요청 확인:
   - CDN 설정 전: `/infos/character_skin/...`
   - CDN 설정 후: `https://reverse1999-r2-public.abc123.workers.dev/infos/character_skin/...`

---

## 🚀 Cloudtype 배포 환경 설정

### Step 1: Cloudtype 대시보드 접속

1. https://cloudtype.io 로그인
2. 프로젝트 (`reverse1999-gacha-simulation`) 선택

### Step 2: 환경 변수 추가

1. 프로젝트 페이지에서 **Settings** 또는 **환경 변수** 탭 클릭
2. **Add Environment Variable** 또는 **환경 변수 추가** 클릭
3. 다음 정보 입력:

| Key                   | Value                                                      |
| --------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_CDN_URL` | `https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev` |

4. **Save** 또는 **저장** 클릭

### Step 3: 재배포

환경 변수 추가 후 자동으로 재배포되거나, 수동으로 **Deploy** 버튼 클릭

### Step 4: 배포 확인

1. 배포 로그에서 빌드 성공 확인
2. 프로덕션 URL 접속
3. 브라우저 개발자 도구로 이미지 URL 확인

---

## ✅ 동작 원리

### CDN URL이 설정되어 있을 때

```typescript
// lib/cdn.ts
NEXT_PUBLIC_CDN_URL = "https://reverse1999-r2-public.abc123.workers.dev";

getSkinListUrl("vertin.webp");
// → "https://reverse1999-r2-public.abc123.workers.dev/infos/character_skin/list/vertin.webp"
```

### CDN URL이 설정되지 않았을 때 (로컬 개발)

```typescript
// lib/cdn.ts
NEXT_PUBLIC_CDN_URL = undefined;

getSkinListUrl("vertin.webp");
// → "/infos/character_skin/list/vertin.webp"  (public 폴더)
```

---

## 🧪 테스트 체크리스트

배포 후 다음 페이지들을 확인하세요:

- [ ] **홈 페이지** (`/`) - 배경 이미지
- [ ] **캐릭터 목록** (`/character`) - 캐릭터 썸네일
- [ ] **캐릭터 상세** (`/character/101`) - 캐릭터 이미지, 가이드 이미지
- [ ] **스킨 목록** (`/skin`) - 스킨 리스트 이미지
- [ ] **스킨 상세** (`/skin/1`) - 스킨 일러스트, standing, mini
- [ ] **가챠 가이드** (`/gacha_guide`) - 배너 이미지
- [ ] **미래 통찰** (`/future_insight`) - 배너 이미지
- [ ] **로딩 화면** - 로딩 GIF

모든 이미지가 정상적으로 로딩되어야 합니다!

---

## 🔧 문제 해결

### Q: 이미지가 깨져서 보여요 (404 에러)

**원인**: CDN URL이 잘못되었거나, R2에 이미지가 업로드되지 않았습니다.

**해결**:

1. `NEXT_PUBLIC_CDN_URL`이 올바른지 확인
2. Workers URL 직접 접속 테스트:
   ```
   https://YOUR-WORKERS-URL/infos/character_skin/list/vertin.webp
   ```
3. R2 버킷에 이미지가 업로드되었는지 확인

### Q: 로컬에서는 되는데 배포하면 안 돼요

**원인**: Cloudtype 환경 변수가 설정되지 않았습니다.

**해결**:

1. Cloudtype 대시보드 > 환경 변수 확인
2. `NEXT_PUBLIC_CDN_URL`이 있는지 확인
3. 없다면 추가 후 재배포

### Q: 일부 이미지만 깨져요

**원인**: 특정 이미지가 R2에 업로드되지 않았습니다.

**해결**:

1. 깨진 이미지의 URL 확인 (개발자 도구)
2. 해당 이미지가 R2에 있는지 확인:
   ```bash
   cd scripts/r2-upload
   npm run upload  # 누락된 이미지 재업로드
   ```

### Q: 환경 변수를 바꿨는데 적용이 안 돼요

**원인**: 빌드 시점에 환경 변수가 포함되므로 재빌드가 필요합니다.

**해결**:

- **로컬**: 개발 서버 재시작 (`Ctrl+C` → `npm run dev`)
- **Cloudtype**: 재배포 트리거

---

## 📊 현재 설정 상태 확인

### 로컬 확인

```bash
# .env.local 내용 확인
cat .env.local | grep CDN

# 예상 출력:
# NEXT_PUBLIC_CDN_URL=https://reverse1999-r2-public.abc123.workers.dev
```

### 빌드 시 확인

```bash
npm run build

# 빌드 로그에서 환경 변수가 감지되었는지 확인
```

### 런타임 확인

브라우저 콘솔에서:

```javascript
console.log(process.env.NEXT_PUBLIC_CDN_URL);
// CDN URL이 출력되어야 함
```

---

## 🎉 완료!

환경 변수 설정이 완료되면:

1. ✅ Git 저장소 크기 감소 (731MB → ~200MB)
2. ✅ Cloudtype 빌드 성공
3. ✅ 이미지 무제한 추가 가능
4. ✅ 글로벌 CDN으로 빠른 로딩

이제 새로운 이미지를 추가할 때:

1. R2에 업로드 (`cd scripts/r2-upload && npm run upload`)
2. 코드 커밋 & 푸시 (이미지는 Git에 추가하지 않음)

궁금한 점이 있으면 `docs/R2_MIGRATION_GUIDE.md`를 참고하세요! 🚀
