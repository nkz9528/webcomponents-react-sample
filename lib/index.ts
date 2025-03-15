// simple-component.ts
export class SimpleComponent extends HTMLElement {
  // Shadow DOMを使用
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Shadow DOMを作成
    this.shadow = this.attachShadow({ mode: "open" });

    // レンダリング
    this.render();
  }

  // コンポーネントがDOMに追加されたときに呼ばれるライフサイクルメソッド
  connectedCallback() {
    console.log("SimpleComponent要素がDOMに追加されました");
  }

  // レンダリングメソッド
  private render() {
    // Shadow DOMの内容を設定
    this.shadow.innerHTML = `
      <style>
        .container {
          font-family: 'Arial', sans-serif;
          color: #333;
          background-color: #f8f8f8;
          padding: 16px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          margin: 0;
          font-size: 1.5em;
          color: #0066cc;
        }
      </style>
      
      <div class="container">
        <h1>Hello, World!</h1>
      </div>
    `;
  }
}

// コンポーネントを登録
customElements.define("simple-component", SimpleComponent);
