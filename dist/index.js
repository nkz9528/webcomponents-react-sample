const a = `setInterval(() => {
  console.log("Hello! this is worker");
}, 5e3);
`, n = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", a], { type: "text/javascript;charset=utf-8" });
function l(e) {
  let r;
  try {
    if (r = n && (self.URL || self.webkitURL).createObjectURL(n), !r) throw "";
    const t = new Worker(r, {
      type: "module",
      name: e == null ? void 0 : e.name
    });
    return t.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(r);
    }), t;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(a),
      {
        type: "module",
        name: e == null ? void 0 : e.name
      }
    );
  }
}
function c() {
  new l();
}
export {
  c as runWorker
};
