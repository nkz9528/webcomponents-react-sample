import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <hr />
      <main
        className={css({
          fontWeight: "bold",
          background: "aliceblue",
          padding: 8,
        })}
      >
        <Outlet />
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
