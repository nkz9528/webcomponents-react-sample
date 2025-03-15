import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, "lib/index.tsx"),
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, "lib/index.tsx"),
  //     name: "WorkerLib",
  //     // 適切な拡張子が追加されます
  //     fileName: "index",
  //     formats: ["es"],
  //   },
  // },
  plugins: [react(), tailwindcss()],
});
