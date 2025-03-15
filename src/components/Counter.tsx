import React from "react";

export const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => setCount((prev) => prev + 1)}
      className="p-4 bg-teal-500"
    >
      Count: {count}
    </button>
  );
};
