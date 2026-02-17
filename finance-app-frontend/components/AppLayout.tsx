"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Navbar";

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white overflow-hidden">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 min-w-screen">
        {children}
      </main>
    </div>
  );
}
