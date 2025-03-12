function e() {
  new Worker(new URL(
    /* @vite-ignore */
    "" + new URL("assets/worker-B_ao5ERl.js", import.meta.url).href,
    import.meta.url
  ), {
    type: "module"
  });
}
e();
export {
  e as runWorker
};
