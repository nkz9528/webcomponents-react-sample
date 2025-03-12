export function runWorker() {
  const worker = new Worker(new URL("./worker", import.meta.url), {
    type: "module",
  });
}

runWorker();
