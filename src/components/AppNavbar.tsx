"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-toggler";

const AppNavbar = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border p-4">
      <SidebarTrigger />
      <ModeToggle />
    </header>
  );
};

export default AppNavbar;
