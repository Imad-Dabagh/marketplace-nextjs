import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListingService } from "@/lib/services/listing.service";
import { CategoryService } from "@/lib/services/category.service";
import ListingCard from "@/components/listings/ListingCard";
import {
  ShoppingBag,
  Users,
  Grid as GridIcon,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";



export default async function Home() {
  // Fetch data
  const [allListings, categories] = await Promise.all([
    ListingService.getListings(),
    CategoryService.getAllCategories(),
  ]);

  // Calculate statistics
  const activeListings = allListings.filter((l) => l.status === "active");
  const featuredListings = activeListings.slice(0, 8);
  const heroListing = activeListings[0]; // Showcase listing

  const uniqueSellers = new Set(activeListings.map((l) => l.sellerId)).size;

  // Calculate new listings this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newListingsThisWeek = activeListings.filter(
    (l) => new Date(l.createdAt) > oneWeekAgo
  ).length;



  return (
    <main className="bg-zinc-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                Buy and sell anything in one place
              </h1>
              <p className="text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0">
                Discover great deals, browse trusted listings, and sell items in minutes. Join our growing local community today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
                  <Link href="/listings">Browse Listings</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-white">
                  <Link href="/listings/create">Sell Item</Link>
                </Button>
              </div>
            </div>

            {/* Right Side Showcase */}
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -m-6 transform rotate-3 blur-2xl z-0" />
              <div className="relative z-10 w-full transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                {heroListing ? (
                  <div className="bg-white p-3 pb-6 rounded-2xl shadow-xl border border-zinc-100">
                    <ListingCard listing={heroListing} />
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-zinc-500 font-medium">Marketplace is waiting for its first listing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Listings */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Featured Listings</h2>
            <p className="text-zinc-600">Fresh items added by our community.</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex rounded-full">
            <Link href="/listings">View All</Link>
          </Button>
        </div>

        {featuredListings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 border-2 border-dashed border-zinc-200 rounded-xl">
            <p className="text-zinc-500">No listings available right now.</p>
          </div>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" asChild className="w-full rounded-full">
            <Link href="/listings">View All Listings</Link>
          </Button>
        </div>
      </section>

      {/* 5. Statistics Section */}
      <section className="bg-zinc-50 py-24 border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Listings */}
            <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-12 px-6 flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-bold text-zinc-900">{activeListings.length}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Listings</p>
                </div>
              </CardContent>
            </Card>

            {/* Active Sellers */}
            <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-12 px-6 flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-2">
                  <Users className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-bold text-zinc-900">{uniqueSellers}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Active Sellers</p>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-12 px-6 flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-2">
                  <GridIcon className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-bold text-zinc-900">{categories.length}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Categories</p>
                </div>
              </CardContent>
            </Card>

            {/* New This Week */}
            <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-12 px-6 flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-600 mb-2">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-bold text-zinc-900">+{newListingsThisWeek}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">New This Week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
