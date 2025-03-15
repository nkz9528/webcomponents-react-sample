// react18-web-component.tsx
import React from "react";
import { createRoot, Root } from "react-dom/client";

// Reactコンポーネント
const SimpleReactComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>This is rendered with React 18 inside a Web Component</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </button>
    </div>
  );
};

// Web Component
class React18WebComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("React18WebComponent要素がDOMに追加されました");

    // Reactコンポーネントをマウントするためのコンテナ
    const mountPoint = document.createElement("div");
    this.shadow.appendChild(mountPoint);

    // React 18のcreateRootを使用
    this.root = createRoot(mountPoint);
    this.root.render(<SimpleReactComponent />);
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
