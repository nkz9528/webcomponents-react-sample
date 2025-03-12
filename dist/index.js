function e() {
  new Worker(new URL(
    /* @vite-ignore */
    "" + new URL("assets/worker-DC40f3ty.js", import.meta.url).href,
    import.meta.url
  ), {
    type: "module"
  });
}
export {
  e as runWorker
};
