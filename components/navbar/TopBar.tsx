"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          Marketplace
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/listings"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Listings
          </Link>

          {session ? (
            <>
              {(session.user as any).role === "admin" && (
                <Link
                  href="/admin/categories"
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                Register
              </Link>
            </>
          )}

          <Button asChild size="sm">
            <Link href="/listings/create">Create Listing</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
