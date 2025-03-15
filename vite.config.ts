import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      name: "WorkerLib",
      // 適切な拡張子が追加されます
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      // output: {
      //   globals: {
      //     react: "react",
      //     reactDom: "react-dom",
      //     "react/jsx-runtime": "react/jsx-runtime",
      //   },
      // },
    },
  },
  worker: {
    format: "es",
  },
  plugins: [react(), dts({ rollupTypes: true })],
});
