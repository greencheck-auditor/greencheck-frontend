import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-[80px] px-4">


      <Outlet />
    </main>
  );
}
