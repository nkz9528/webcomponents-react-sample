function e(r) {
  return new Worker(
    "" + new URL("assets/worker-B_ao5ERl.js", import.meta.url).href,
    {
      name: r == null ? void 0 : r.name
    }
  );
}
function n() {
  new e();
}
n();
export {
  n as runWorker
};
