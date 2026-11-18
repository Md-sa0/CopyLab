import { readFileSync } from "node:fs";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const apiTarget = process.env.API_PROXY_TARGET || "http://127.0.0.1:8000";
const tlsCertPath = process.env.DEV_TLS_CERT;
const tlsKeyPath = process.env.DEV_TLS_KEY;
const https = tlsCertPath && tlsKeyPath
  ? {
      cert: readFileSync(tlsCertPath),
      key: readFileSync(tlsKeyPath),
    }
  : undefined;

const apiProxy = {
  target: apiTarget,
  changeOrigin: false,
  headers: { "X-Forwarded-Proto": process.env.APP_PUBLIC_SCHEME || "http" },
};

export default defineConfig({
  plugins: [pluginReact()],
  source: { entry: { index: "./src/main.tsx" } },
  html: { template: "./index.html" },
  output: { distPath: { js: "assets", css: "assets" } },
  server: {
    host: "127.0.0.1",
    port: 5173,
    https,
    proxy: {
      "/api": apiProxy,
      "/health": apiProxy,
    },
  },
});
