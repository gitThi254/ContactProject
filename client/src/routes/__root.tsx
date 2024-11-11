import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="container mx-auto min-h-screen bg-slate-200">
        <header>
          <div className="navbar bg-base-300">
            <Link to="/" className="btn btn-ghost text-xl">
              Home
            </Link>
            <Link to="/contact" className="btn btn-ghost text-xl">
              Contact
            </Link>
            <Link to="/contact/create" className="btn btn-success">
              Add Contact
            </Link>
          </div>
        </header>
        <Outlet />
        <Toaster />
      </div>
    </>
  );
}
