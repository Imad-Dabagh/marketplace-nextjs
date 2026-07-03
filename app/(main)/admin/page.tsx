import Link from "next/link";
import { ArrowRight, FolderTree, ListChecks, PackageCheck } from "lucide-react";
import { CategoryService } from "@/lib/services/category.service";
import { ListingService } from "@/lib/services/listing.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const [listings, categories] = await Promise.all([
    ListingService.getListings(),
    CategoryService.getAllCategories(),
  ]);

  const activeListings = listings.filter((listing) => listing.status === "active");
  const soldListings = listings.filter((listing) => listing.status === "sold");
  const draftListings = listings.filter((listing) => listing.status === "draft");
  const recentListings = listings.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Monitor marketplace inventory and keep content organized.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/listings">
            Review Listings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Listings</CardTitle>
            <ListChecks className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{listings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Total marketplace posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Active</CardTitle>
            <PackageCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeListings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Visible to buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{soldListings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Completed listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{categories.length}</p>
            <p className="mt-1 text-xs text-zinc-500">{draftListings.length} draft listings</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Listings</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/listings">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="block truncate font-medium text-zinc-950 hover:text-primary"
                    >
                      {listing.title}
                    </Link>
                    <p className="mt-1 text-xs text-zinc-500">
                      {listing.categoryName || "Uncategorized"} · {listing.location}
                    </p>
                  </div>
                  <Badge variant="outline">{listing.status}</Badge>
                </div>
              ))}
              {recentListings.length === 0 && (
                <p className="py-8 text-center text-sm text-zinc-500">No listings yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/listings">Manage listings</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/categories">Manage categories</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
