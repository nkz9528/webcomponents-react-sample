import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "../components/Counter";
import { useEffect, useState } from "react";
import { callback } from "../main";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const [val, setVal] = useState("");

  useEffect(() => {
    console.log(callback);
    const v = callback?.(12) ?? "none";
    setVal(v);
  }, []);

  return (
    <div>
      <h1>Hello from About!</h1>
      <p className="border py-4 font-bold text-xl">{val}</p>
      <Counter />
    </div>
  );
}
