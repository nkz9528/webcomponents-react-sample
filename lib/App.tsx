import React from "react";
import { Counter } from "./components/Counter";

// Reactコンポーネント
export const App: React.FC = () => {
  return (
    <div>
      <link href="http://localhost:4000/assets/index.css" rel="stylesheet" />
      <div className="bg-slate-50">
        <h1>Hello, World!</h1>
        <p>This is rendered with React 18 inside a Web Component</p>
        <Counter />
      </div>
    </div>
  );
};
