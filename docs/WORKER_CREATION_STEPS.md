# Cloudflare Worker 생성 - 정확한 단계별 가이드

"Ship something new" 화면이 나왔다면 **Pages** 탭으로 간 것입니다. Worker를 만들려면 다른 탭으로 가야 합니다!

---

## 🎯 올바른 방법

### **방법 1: Workers 탭에서 생성 (추천)**

1. **Cloudflare 대시보드** 좌측 메뉴에서 **Workers & Pages** 클릭

2. 상단에 **두 개의 탭**이 보입니다:

   ```
   [ Overview ]  [ Create ]
   ```

   또는

   ```
   [ Workers ]  [ Pages ]
   ```

3. **Workers** 탭이 선택되어 있는지 확인

4. **"Create Worker"** 버튼 클릭 (파란색 버튼)

5. Worker 이름 입력: `reverse1999-r2-public`

6. **Deploy** 클릭

---

### **방법 2: 직접 URL 접속 (가장 빠름)**

브라우저 주소창에 입력:

```
https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/worker
```

또는 Cloudflare 대시보드 URL이 다음과 같다면:

```
https://dash.cloudflare.com/abc123def456/workers-and-pages
```

다음 URL로 이동:

```
https://dash.cloudflare.com/abc123def456/workers-and-pages/create/worker
```

(`abc123def456`는 본인의 계정 ID)

---

### **방법 3: Wrangler CLI 사용 (개발자 친화)**

터미널에서:

```bash
# Wrangler 설치
npm install -g wrangler

# Cloudflare 로그인
wrangler login

# Worker 배포
cd scripts/r2-upload
wrangler deploy
```

---

## ⚠️ 주의사항

### "Ship something new" 화면이 나오면?

이것은 **Pages** 생성 화면입니다. 다음 옵션들이 보입니다:

- Continue with GitHub
- Connect GitLab
- Start with Hello World!
- Select a template
- Upload your static files

**→ 이 화면에서는 Worker를 만들 수 없습니다!**

**뒤로 가기**를 누르고 **Workers 탭**으로 이동하세요.

---

## ✅ 올바른 Worker 생성 화면

다음과 같은 화면이 나와야 합니다:

```
┌────────────────────────────────────────┐
│  Create a Worker                       │
├────────────────────────────────────────┤
│  Name your Worker:                     │
│  [ reverse1999-r2-public ]             │
│                                        │
│  [ Deploy ]                            │
└────────────────────────────────────────┘
```

또는:

```
Name: [입력 필드]
Starter: [HTTP handler / Scheduled handler 등]
```

이런 화면이 나와야 맞습니다!

---

## 🚀 Worker 생성 후 다음 단계

Worker를 생성한 후:

### 1. 코드 수정

Quick Edit 버튼 클릭 → 다음 코드 붙여넣기:

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
      return new Response("R2 Public Access - Reverse 1999", {
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

Save and Deploy 클릭

### 2. R2 버킷 바인딩

Settings > Variables > R2 Bucket Bindings:

- Variable name: `BUCKET`
- R2 bucket: `reverse1999-assets`

### 3. Worker URL 확인

상단에 표시된 URL 복사:

```
https://reverse1999-r2-public.YOUR-SUBDOMAIN.workers.dev
```

이것이 `NEXT_PUBLIC_CDN_URL`에 들어갈 값입니다!

---

## 💡 요약

1. **Workers & Pages** > **Workers 탭** 선택
2. **Create Worker** 버튼 클릭
3. 이름 입력 → Deploy
4. 코드 수정 → R2 바인딩
5. URL 복사 → 환경 변수 설정

Pages 탭이 아니라 **Workers 탭**에서 작업해야 합니다!

궁금한 점 있으면 언제든 물어보세요! 🚀
