// react18-web-component.tsx
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { App } from "./App";

import styles from "../index.css?inline";

// Web Component
class React18WebComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    console.log("React18WebComponent要素がDOMに追加されました");

    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    this.shadow.adoptedStyleSheets.push(styleSheet);

    // Reactコンポーネントをマウントするためのコンテナ
    const mountPoint = document.createElement("div");
    this.shadow.appendChild(mountPoint);

    // React 18のcreateRootを使用
    this.root = createRoot(mountPoint);
    this.root.render(<App />);
  }

  disconnectedCallback() {
    // コンポーネントが削除されたときにReactをアンマウント
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    console.log("React18WebComponent要素がDOMから削除されました");
  }
}

// コンポーネントを登録
customElements.define("simple-component", React18WebComponent);
