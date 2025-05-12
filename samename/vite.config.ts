import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    // Express 등 외부 서버 통합을 위해 사용하는 미들웨어 모드
    middlewareMode: true,

    // 모든 호스트 허용 (boolean 대신 true)
    allowedHosts: true,

    // 커스텀 HMR 서버가 필요 없으면 아래 hmr 블록 자체를 제거하거나 주석 처리하세요.
    // hmr: {
    //   // protocol: 'ws',
    //   // host: 'localhost',
    // },
  },
});
