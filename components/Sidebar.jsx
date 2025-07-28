"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const menuItems = [
  { name: "User Management", href: "/users", icon: "heroicons:users" },
];

function MenuItem({ item, isActive }) {
  const linkClass = isActive
    ? "bg-slate-800 text-white shadow-lg"
    : "text-slate-300 hover:bg-slate-800 hover:text-white";

  const iconClass = isActive
    ? "text-white"
    : "text-slate-400 group-hover:text-slate-300";

  return (
    <Link
      href={item.href}
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${linkClass}`}
    >
      <Icon
        icon={item.icon}
        className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${iconClass}`}
      />
      {item.name}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900">
      <nav className="flex-1 px-4 py-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          PAGES
        </h3>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
