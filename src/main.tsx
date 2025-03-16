import { createRoot, Root } from "react-dom/client";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import styles from "./styles.css?inline";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});
const router = createRouter({ routeTree, history: memoryHistory });

class RootWebComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    this.shadow.adoptedStyleSheets.push(styleSheet);

    const mountPoint = document.createElement("div");
    this.shadow.appendChild(mountPoint);
    this.root = createRoot(mountPoint);
    this.root.render(<RouterProvider router={router} />);
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

customElements.define("simple-component", RootWebComponent);
