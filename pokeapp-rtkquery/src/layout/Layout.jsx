import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <header className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Demo RTKQuery Pokemon</a>
        </div>
      </header> */}
      <main className="container p-8 max-w-full">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
