import Link from "next/link";
import { Package2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white transition-transform group-hover:scale-105">
                <Package2 className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">
                Marketplace
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Your local marketplace for discovering great deals, selling items, and connecting with your community.
            </p>
          </div>

          {/* Links Cols */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link href="/listings" className="hover:text-primary transition-colors">All Listings</Link>
              </li>
              <li>
                <Link href="/listings?condition=new" className="hover:text-primary transition-colors">New Items</Link>
              </li>
              <li>
                <Link href="/listings?condition=like_new" className="hover:text-primary transition-colors">Like New</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">Sell</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link href="/listings/create" className="hover:text-primary transition-colors">Post an Item</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Selling Tips</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Safety Guidelines</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-600">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} Marketplace Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-zinc-400">
            {/* Social icons could go here */}
            <span className="text-sm hover:text-zinc-600 cursor-pointer transition-colors">Twitter</span>
            <span className="text-sm hover:text-zinc-600 cursor-pointer transition-colors">Instagram</span>
            <span className="text-sm hover:text-zinc-600 cursor-pointer transition-colors">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
