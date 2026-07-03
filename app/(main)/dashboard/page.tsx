import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CircleDollarSign,
  Edit,
  MapPin,
  Package,
  Plus,
  Tag,
} from "lucide-react";

import { ListingService } from "@/lib/services/listing.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getSessionUserId(sessionUser: unknown) {
  const user = sessionUser as { id?: string; email?: string | null } | undefined;
  return user?.id || user?.email || "";
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const userId = getSessionUserId(session.user);
  const listings = await ListingService.getListings({ sellerId: userId });
  const activeListings = listings.filter((listing) => listing.status === "active");
  const soldListings = listings.filter((listing) => listing.status === "sold");
  const draftListings = listings.filter((listing) => listing.status === "draft");
  const totalValue = listings.reduce((sum, listing) => sum + listing.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">Seller workspace</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-950">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Manage your listings, update product details, and keep your store ready for buyers.
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/listings/create">
            <Plus className="mr-2 h-5 w-5" />
            New Listing
          </Link>
        </Button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Active</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeListings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Visible listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{soldListings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Completed sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{draftListings.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Hidden from buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Inventory Value</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
            <p className="mt-1 text-xs text-zinc-500">Across all listings</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>My Listings</CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Edit, review, and manage everything you are selling.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {listings.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50/70 py-14 text-center">
                <p className="font-medium text-zinc-900">No listings yet</p>
                <p className="text-sm text-zinc-500 mt-1 mb-6">
                  Ready to sell something? Start by creating your first listing.
                </p>
                <Button asChild variant="outline">
                  <Link href="/listings/create">Create Listing</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="rounded-lg border bg-white p-4 transition hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-zinc-100">
                          <Image
                            src={(listing.imageUrls && listing.imageUrls[0]) || "/placeholder-image.jpg"}
                            alt={listing.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">{listing.status}</Badge>
                            <Badge variant="secondary" className="capitalize">
                              {(listing.condition || "good").replace("_", " ")}
                            </Badge>
                          </div>
                          <Link
                            href={`/listings/${listing.id}`}
                            className="mt-2 block line-clamp-1 text-base font-semibold text-zinc-950 hover:text-primary"
                          >
                            {listing.title}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                            <span className="flex items-center">
                              <Tag className="mr-1 h-3.5 w-3.5" />
                              {listing.categoryName || "Uncategorized"}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-3.5 w-3.5" />
                              {listing.location}
                            </span>
                          </div>
                          <p className="mt-3 text-xl font-bold text-zinc-950">
                            ${listing.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/listings/${listing.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/listings/${listing.id}`}>
                            View
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seller Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-md bg-zinc-50 p-4">
              <p className="font-medium text-zinc-950">Keep listings fresh</p>
              <p className="mt-1 text-zinc-500">
                Update price, images, and status when an item changes.
              </p>
            </div>
            <div className="rounded-md bg-zinc-50 p-4">
              <p className="font-medium text-zinc-950">Use clear images</p>
              <p className="mt-1 text-zinc-500">
                Listings with better photos are easier for buyers to evaluate.
              </p>
            </div>
            <div className="rounded-md bg-zinc-50 p-4">
              <p className="font-medium text-zinc-950">Mark sold items</p>
              <p className="mt-1 text-zinc-500">
                Keep your dashboard accurate by updating listing status.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
