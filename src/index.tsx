import { createRoot, Root } from "react-dom/client";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import styles from "../index.css?inline";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});
const router = createRouter({ routeTree, history: memoryHistory });

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

    this.root.render(<RouterProvider router={router} />);
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
