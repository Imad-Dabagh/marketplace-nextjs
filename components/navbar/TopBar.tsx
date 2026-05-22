"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  Store,
  UserPlus,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  role?: string;
};

const navItems = [
  {
    href: "/listings",
    label: "Browse",
  },
];

export default function TopBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user as SessionUser | undefined;
  const isAdmin = user?.role === "admin";
  const displayName = user?.name || user?.email || "Account";

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Store className="h-5 w-5" />
            </span>
            <span className="truncate text-base font-semibold text-zinc-950">
              Marketplace
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                  isActive(item.href) && "bg-zinc-100 text-zinc-950"
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-blue-50 hover:text-primary",
                  isActive("/admin") && "bg-blue-50 text-primary"
                )}
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                    isActive("/dashboard") && "bg-zinc-100 text-zinc-950"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="hidden max-w-40 truncate border-l pl-3 text-sm text-zinc-500 lg:block">
                  {displayName}
                </div>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Button asChild variant="outline">
                  <Link href="/register">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </>
            )}

            <Button asChild>
              <Link href="/listings/create">
                <Plus className="mr-2 h-4 w-4" />
                Sell
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t py-3 md:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100",
                    isActive(item.href) && "bg-zinc-100 text-zinc-950"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-blue-50 hover:text-primary",
                    isActive("/admin") && "bg-blue-50 text-primary"
                  )}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              )}

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100",
                      isActive("/dashboard") && "bg-zinc-100 text-zinc-950"
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      signOut();
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </>
              )}

              <Button asChild className="mt-2 w-full">
                <Link href="/listings/create" onClick={closeMenu}>
                  <Plus className="mr-2 h-4 w-4" />
                  Sell an item
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
