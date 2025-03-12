import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      name: "WorkerLib",
      // 適切な拡張子が追加されます
      fileName: "index",
      formats: ["es"],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
