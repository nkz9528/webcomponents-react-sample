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

export let callback: ((value: unknown) => string) | undefined;

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
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
  public renderApp(c: (value: unknown) => string) {
    callback = c;
    if (this.root) {
      this.root.render(<RouterProvider router={router} />);
    }
  }
}

interface RenderAppParams {
  callbacks: Callbacks;
}

interface Callbacks {
  readonly onMessage: () => void;
}

customElements.define("simple-component", RootWebComponent);
