import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: [
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
      "api/**/*.test.ts",
      // Pure logic in the client is testable too — the amount-in-words used on
      // generated invoices is exactly the kind of thing that breaks silently.
      "client/src/lib/**/*.test.ts",
    ],
  },
});
