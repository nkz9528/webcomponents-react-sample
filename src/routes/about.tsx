import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "../components/Counter";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <h1>Hello from About!</h1>
      <Counter />
    </div>
  );
}
