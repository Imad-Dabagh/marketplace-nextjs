"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderTree, Gauge, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Gauge,
  },
  {
    href: "/admin/listings",
    label: "Listings",
    icon: ListChecks,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: FolderTree,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b bg-white md:min-h-[calc(100vh-64px)] md:w-64 md:border-b-0 md:border-r">
      <div className="px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Admin
        </p>
        <h2 className="mt-1 text-lg font-semibold text-zinc-950">Control Center</h2>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:block md:space-y-1">
        {adminNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
