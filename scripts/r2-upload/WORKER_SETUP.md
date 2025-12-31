# Cloudflare Workers로 R2 Public Access 설정하기

R2 버킷의 Public Access 옵션이 보이지 않을 때 Workers를 사용하는 방법입니다.

## 방법 A: Cloudflare 대시보드에서 생성 (쉬움)

### Step 1: Worker 생성

1. [Cloudflare 대시보드](https://dash.cloudflare.com) 접속
2. **Workers & Pages** 메뉴 클릭
3. **Create Application** 클릭
4. **Create Worker** 선택
5. Worker 이름 입력: `reverse1999-r2-public`
6. **Deploy** 클릭

### Step 2: Worker 코드 수정

1. 배포된 Worker 클릭
2. **Quick Edit** 버튼 클릭
3. `worker.js` 파일의 모든 코드를 삭제하고 아래 코드 붙여넣기:

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

4. **Save and Deploy** 클릭

### Step 3: R2 버킷 바인딩

1. Worker 페이지에서 **Settings** 탭 클릭
2. **Variables** 섹션으로 스크롤
3. **R2 Bucket Bindings** 섹션 찾기
4. **Add binding** 클릭
5. 설정:
   - **Variable name**: `BUCKET`
   - **R2 bucket**: `reverse1999-assets` (드롭다운에서 선택)
6. **Save** 클릭

### Step 4: Worker URL 확인

1. Worker 페이지 상단에서 URL 확인

   ```
   https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
   ```

2. 테스트:
   ```
   https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev/infos/character_skin/list/vertin.webp
   ```

### Step 5: 환경 변수 업데이트

`.env.local`:

```env
NEXT_PUBLIC_CDN_URL=https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

---

## 방법 B: Wrangler CLI 사용 (고급)

### Step 1: Wrangler 설치

```bash
npm install -g wrangler
```

### Step 2: Cloudflare 로그인

```bash
wrangler login
```

브라우저가 열리고 Cloudflare 계정 인증

### Step 3: Worker 배포

```bash
cd scripts/r2-upload

# wrangler.toml 파일 수정
# bucket_name을 실제 버킷 이름으로 변경

# 배포
wrangler deploy
```

### Step 4: URL 확인

배포 후 터미널에 URL 출력:

```
Published reverse1999-r2-public (0.xx sec)
  https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

---

## 커스텀 도메인 연결 (선택사항)

자신의 도메인이 Cloudflare에 있다면:

### Step 1: DNS 레코드 추가

Cloudflare 대시보드 > 도메인 > **DNS**:

- **Type**: CNAME
- **Name**: cdn
- **Target**: `reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev`
- **Proxy status**: Proxied (주황색 구름)

### Step 2: Worker Routes 설정

Worker 페이지 > **Settings** > **Triggers**:

1. **Add route** 클릭
2. **Route**: `cdn.reverse1999-simulator.com/*`
3. **Zone**: `reverse1999-simulator.com`
4. **Add route** 클릭

### Step 3: 환경 변수 업데이트

```env
NEXT_PUBLIC_CDN_URL=https://cdn.reverse1999-simulator.com
```

---

## 테스트

### 1. Worker URL 테스트

브라우저에서 직접 접속:

```
https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev/infos/character_skin/list/vertin.webp
```

### 2. curl 테스트

```bash
curl -I https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev/infos/character_skin/list/vertin.webp
```

예상 응답:

```
HTTP/2 200
content-type: image/webp
cache-control: public, max-age=31536000, immutable
access-control-allow-origin: *
```

### 3. 로컬 Next.js 테스트

```bash
# .env.local에 NEXT_PUBLIC_CDN_URL 추가
npm run dev
```

브라우저 개발자 도구 > Network 탭에서 이미지 로딩 확인

---

## 문제 해결

### Q: Worker가 "BUCKET is not defined" 오류

A: R2 Bucket Binding이 제대로 설정되지 않았습니다.
Settings > Variables > R2 Bucket Bindings 다시 확인

### Q: 404 Not Found

A:

1. R2에 파일이 업로드되었는지 확인
2. 파일 경로가 정확한지 확인 (대소문자 구분)

### Q: CORS 오류

A: Worker 코드에 CORS 헤더가 포함되어 있는지 확인

### Q: 이미지가 깨져 보임

A: Content-Type이 올바르게 설정되었는지 확인
R2에 업로드 시 `--content-type` 옵션 사용

---

## Lifecycle 설정에 대해

질문하신 **Multipart Abort Rule**은:

- 업로드가 중단된 멀티파트 업로드를 7일 후 자동 삭제
- **기본 설정이며 정상입니다**
- Public Access와는 무관합니다

---

## 다음 단계

1. ✅ Worker 배포 완료
2. ✅ Worker URL로 이미지 접근 확인
3. 📝 이미지 업로드 (아직 안 했다면)
4. 📝 환경 변수 설정
5. 📝 코드 수정

궁금한 점이 있으면 언제든지 물어보세요! 🚀
