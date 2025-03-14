import React, { useState } from "react";

const Counter = () => {
  // countという状態変数と、それを更新するsetCount関数を定義
  const [count, setCount] = useState(0);

  // カウントを増やす関数
  const increment = () => {
    setCount(count + 1);
  };

  // カウントを減らす関数
  const decrement = () => {
    setCount(count - 1);
  };

  // カウントをリセットする関数
  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>カウンター</h1>

      <div>{count}</div>

      <div>
        <button onClick={decrement}>減少 (-)</button>
        <button onClick={reset}>リセット</button>
        <button onClick={increment}>増加 (+)</button>
      </div>
    </div>
  );
};

export default Counter;
