"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  image?: string | null;
};

export default function TopBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = session?.user as SessionUser | undefined;
  const isAdmin = user?.role === "admin";
  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  const userInitials = displayName.substring(0, 2).toUpperCase();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const closeMenus = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileOpen &&
        !(event.target as HTMLElement).closest(".profile-dropdown")
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Store className="h-6 w-6" />
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-zinc-900 sm:block">
              Market<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Right Actions - Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <nav className="flex items-center gap-1 mr-2">
              <Link
                href="/listings"
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive("/listings")
                    ? "bg-primary/10 text-primary"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                )}
              >
                Browse
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                    isActive("/admin")
                      ? "bg-blue-50 text-primary"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                  )}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </nav>

            <div className="h-6 w-px bg-zinc-200 mx-1" />

            {session ? (
              <div className="flex items-center gap-3">
                {/* Profile Dropdown */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 transition-colors border border-zinc-200"
                  >
                    {userInitials}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-1 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in duration-100">
                      <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                        <p className="text-sm font-semibold text-zinc-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={closeMenus}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          closeMenus();
                          signOut();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Log in
                </Link>
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            <Button
              asChild
              size="sm"
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full ml-2"
            >
              <Link
                href="/listings/create"
                className="flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Sell</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-zinc-100 bg-white p-4 md:hidden animate-in slide-in-from-top duration-200">
          <nav className="grid gap-1">
            <Link
              href="/listings"
              onClick={closeMenus}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors",
                isActive("/listings")
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-600 hover:bg-zinc-50",
              )}
            >
              <Store className="h-5 w-5" />
              Browse Listings
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={closeMenus}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors",
                  isActive("/admin")
                    ? "bg-blue-50 text-primary"
                    : "text-zinc-600 hover:bg-zinc-50",
                )}
              >
                <ShieldCheck className="h-5 w-5" />
                Admin Panel
              </Link>
            )}

            <div className="my-2 border-t border-zinc-100" />

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenus}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    isActive("/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-zinc-600 hover:bg-zinc-50",
                  )}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    closeMenus();
                    signOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  <LogIn className="h-5 w-5" />
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  <UserPlus className="h-5 w-5" />
                  Create account
                </Link>
              </>
            )}

            <Button asChild className="mt-4 w-full rounded-xl py-6 text-lg">
              <Link href="/listings/create" onClick={closeMenus}>
                <Plus className="mr-2 h-5 w-5" />
                Sell an item
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
