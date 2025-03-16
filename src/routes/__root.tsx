import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <div className="px-4 py-2 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <hr />
      <main className="p-4">
        <Outlet />
      </main>
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
