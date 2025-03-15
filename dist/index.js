import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useState as c } from "react";
const u = () => {
  const [n, t] = c(0);
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ e("h1", { children: "カウンター" }),
    /* @__PURE__ */ e("div", { children: n }),
    /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("button", { onClick: () => {
        t(n - 1);
      }, children: "減少 (-)" }),
      /* @__PURE__ */ e("button", { onClick: () => {
        t(0);
      }, children: "リセット" }),
      /* @__PURE__ */ e("button", { onClick: () => {
        t(n + 1);
      }, children: "増加 (+)" })
    ] })
  ] });
};
export {
  u as default
};
