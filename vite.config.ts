import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createRequire } from "module";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const plugins: any[] = [react(), tailwindcss()];

  // Platform-specific dev plugins — skipped silently in production.
  // This file is ESM ("type": "module"), so require() is not defined here and
  // the old try/catch swallowed a ReferenceError, meaning neither plugin ever
  // loaded. createRequire gives us a working require.
  if (mode === "development") {
    const require = createRequire(import.meta.url);
    try {
      const { jsxLocPlugin } = require("@builder.io/vite-plugin-jsx-loc");
      plugins.push(jsxLocPlugin());
    } catch {}
    try {
      const { vitePluginManusRuntime } = require("vite-plugin-manus-runtime");
      plugins.push(vitePluginManusRuntime());
    } catch {}
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    publicDir: path.resolve(import.meta.dirname, "client", "public"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // Keep dependencies in their own chunks so a content change to the
          // site doesn't invalidate the cached copy of React et al.
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (/[\/]node_modules[\/](react|react-dom|scheduler)[\/]/.test(id)) return "react-vendor";
            if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "motion-vendor";
            if (id.includes("@radix-ui") || id.includes("lucide-react")) return "ui-vendor";
            if (id.includes("@trpc") || id.includes("@tanstack") || id.includes("superjson")) return "data-vendor";
            return "vendor";
          },
        },
      },
    },
    server: {
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
