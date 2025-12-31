# Worker URL 확인 및 생성 가이드

이 문서는 `NEXT_PUBLIC_CDN_URL` 환경 변수에 필요한 **Worker URL**을 확인하거나 생성하는 방법을 설명합니다.

---

## 🔍 Worker URL 확인하기 (이미 생성한 경우)

### Step 1: Cloudflare 대시보드 접속

- https://dash.cloudflare.com 로그인

### Step 2: Workers & Pages 메뉴

- 좌측 메뉴에서 **Workers & Pages** 클릭

### Step 3: Worker 찾기

- 생성한 Worker 이름 찾기: `reverse1999-r2-public`
- 목록에서 클릭

### Step 4: URL 복사

- 페이지 상단에 Worker URL이 표시됨
- 예시: `https://reverse1999-r2-public.abc123.workers.dev`
- 이 URL을 복사하세요!

---

## 🆕 Worker 생성하기 (아직 없는 경우)

### Step 1: Worker 생성

1. Cloudflare 대시보드 > **Workers & Pages**
2. **Create Application** 버튼 클릭
3. **Create Worker** 선택
4. Worker 이름 입력: **`reverse1999-r2-public`**
5. **Deploy** 클릭

### Step 2: Worker 코드 수정

1. 배포된 Worker 클릭
2. **Quick Edit** 버튼 클릭 (또는 **Edit code**)
3. 왼쪽 에디터의 **모든 코드 삭제**
4. 다음 코드를 복사해서 **붙여넣기**:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    if (!key) {
      return new Response("R2 Public Access", {
        headers: { "Content-Type": "text/plain", ...corsHeaders },
      });
    }

    try {
      const object = await env.BUCKET.get(key);

      if (object === null) {
        return new Response("Object Not Found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);

      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

      if (object.httpMetadata?.contentType?.startsWith("image/")) {
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        headers.set("Cache-Control", "public, max-age=3600");
      }

      return new Response(object.body, { headers });
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
```

5. **Save and Deploy** 클릭

### Step 3: R2 버킷 바인딩

Worker가 R2 버킷에 접근할 수 있도록 설정합니다:

1. Worker 페이지에서 **Settings** 탭 클릭
2. 아래로 스크롤하여 **Variables** 섹션 찾기
3. **R2 Bucket Bindings** 섹션에서 **Add binding** 클릭
4. 다음 정보 입력:
   - **Variable name**: `BUCKET`
   - **R2 bucket**: `reverse1999-assets` (드롭다운에서 선택)
5. **Save** 클릭

### Step 4: Worker URL 확인

1. Worker 페이지 상단으로 스크롤
2. URL이 표시됨 (예: `https://reverse1999-r2-public.abc123.workers.dev`)
3. 이 URL을 복사하세요!

### Step 5: 테스트

브라우저에서 다음 URL 접속:

```
https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev/infos/character_skin/list/vertin.webp
```

Vertin 스킨 이미지가 보이면 성공! ✅

---

## ✅ Worker URL 사용하기

이제 확인한 Worker URL을 환경 변수에 설정하세요:

### 로컬 개발 환경

`.env.local` 파일 생성/편집:

```env
NEXT_PUBLIC_CDN_URL=https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

**YOUR-SUBDOMAIN**을 실제 값으로 변경!

### Cloudtype 배포 환경

1. Cloudtype 대시보드 > 프로젝트 선택
2. **Settings** > **Environment Variables**
3. 추가:
   - Key: `NEXT_PUBLIC_CDN_URL`
   - Value: `https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev`
4. 저장 후 재배포

---

## 🔧 문제 해결

### Q: Workers & Pages 메뉴가 안 보여요

**원인**: Cloudflare 계정에 Workers가 활성화되지 않았습니다.

**해결**:

1. Cloudflare 대시보드 홈
2. 좌측 메뉴에서 **Workers & Pages** 찾기
3. 없다면 **Add-ons** 또는 **Account Home**에서 Workers 활성화

### Q: R2 버킷이 드롭다운에 없어요

**원인**: R2 버킷이 생성되지 않았거나 다른 계정에 있습니다.

**해결**:

1. Cloudflare 대시보드 > **R2**
2. 버킷 목록 확인
3. `reverse1999-assets` 버킷이 있는지 확인
4. 없다면 먼저 R2 버킷 생성 필요

### Q: Worker URL을 복사했는데 어디에 붙여넣나요?

**답변**:

- **로컬**: 프로젝트 루트의 `.env.local` 파일
- **Cloudtype**: 대시보드 > 환경 변수

자세한 내용은 `docs/ENV_SETUP_GUIDE.md` 참고!

### Q: 테스트 URL에서 404 에러가 나요

**원인**: R2에 이미지가 업로드되지 않았습니다.

**해결**:

```bash
cd scripts/r2-upload
npm install
npm run upload
```

---

## 📝 요약

1. **Worker URL 확인**: Cloudflare > Workers & Pages > Worker 클릭
2. **Worker 없으면 생성**: Create Worker → 코드 붙여넣기 → R2 바인딩
3. **환경 변수 설정**: `.env.local` (로컬) 및 Cloudtype (배포)
4. **테스트**: 이미지 URL 접속해서 확인

Worker URL 형식:

```
https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

궁금한 점이 있으면 언제든지 물어보세요! 🚀
