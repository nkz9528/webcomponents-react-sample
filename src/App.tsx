import React from "react";
import { Counter } from "./components/Counter";
import { css } from "../styled-system/css";

// Reactコンポーネント
export const App: React.FC = () => {
  return (
    <div
      className={css({
        fontWeight: "bold",
        background: "aliceblue",
        padding: 8,
      })}
    >
      <div>
        <h1>Hello, World!</h1>
        <p>This is rendered with React 18 inside a Web Component</p>
        <Counter />
      </div>
    </div>
  );
};
