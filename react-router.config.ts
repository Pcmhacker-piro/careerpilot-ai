import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Disabled SSR — app uses browser-only APIs (window.puter, PDF.js)
  ssr: false,
} satisfies Config;
