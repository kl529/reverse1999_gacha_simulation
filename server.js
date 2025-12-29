// Cloudtype standalone 배포용 시작 스크립트
// standalone 모드로 빌드된 Next.js 앱을 실행합니다.

const path = require("path");

// standalone 서버 경로
const standaloneServer = path.join(__dirname, ".next", "standalone", "server.js");

// 환경 변수 설정
process.env.PORT = process.env.PORT || "3000";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

console.log("🚀 Starting Next.js standalone server...");
console.log("📍 Server:", standaloneServer);
console.log("🌐 Port:", process.env.PORT);
console.log("🖥️  Hostname:", process.env.HOSTNAME);

// standalone 서버 실행
require(standaloneServer);
