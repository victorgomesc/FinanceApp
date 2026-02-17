"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItem = (
    href: string,
    label: string,
    Icon: React.ElementType
  ) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
      >
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`h-screen bg-zinc-900 text-white flex flex-col p-4 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex items-center justify-between mb-10">
        {!collapsed && (
          <h1 className="text-xl font-bold">FinanceApp</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItem("/dashboard", "Dashboard", LayoutDashboard)}
        {menuItem("/transactions", "Transações", Receipt)}
        {menuItem("/reports", "Relatórios", FileText)}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
      >
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
