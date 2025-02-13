import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectRegister: "auto",
      registerType: "autoUpdate",
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "my-pwa",
        short_name: "my-pwa",
        description: "my-pwa",
        theme_color: "#ffffff",
        icons: [],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
      },
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
      // No workbox configuration since we're using injectManifest
    }),
  ],
});

