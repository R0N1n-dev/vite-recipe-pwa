import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue2";
import { VitePWA } from "vite-plugin-pwa";
const viteEnv = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});
export default defineConfig({
  alias: {
    "@": require("path").resolve(__dirname, "src"),
  },
  define: viteEnv,
  plugins: [
    vue(),
    Components(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        globPatterns: [
          // all packaged resources are stored here
          "assets/*",
          // add HTML and other resources for the root directory
          "*.{svg,png,jpg}",
          "*.html",
          //"manifest.webmanifest",
          // be careful, not to add sw.js
        ],
      },
      manifest: {
        name: "Test Project",
        short_name: "Test",
        theme_color: "#ffffff",
        id: "/",
        description: "Vue PWA ",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
