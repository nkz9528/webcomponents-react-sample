import MyWorker from "./worker?worker";

export function runWorker() {
  const worker = new MyWorker();
}

runWorker();
