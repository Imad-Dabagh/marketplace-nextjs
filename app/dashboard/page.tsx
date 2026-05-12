import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Package, MapPin, Tag } from "lucide-react";

import { ListingService } from "@/lib/services/listing.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const userId = (session.user as any).id || session.user.email;
  const listings = await ListingService.getListings({ sellerId: userId });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Your Dashboard
          </h1>
          <p className="mt-1 text-zinc-600">
            Manage your listings and track your sales performance.
          </p>
        </div>

        <Button asChild size="lg" className="rounded-full shadow-md">
          <Link href="/listings/create">
            <Plus className="mr-2 h-5 w-5" />
            Post New Listing
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-zinc-50 border-none shadow-sm ring-1 ring-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                Active Listings
              </CardTitle>
              <Package className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{listings.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>
              A list of all the products you have posted on the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {listings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl border-zinc-100 bg-zinc-50/50">
                <p className="font-medium text-zinc-900">No listings yet</p>
                <p className="text-sm text-zinc-500 mt-1 mb-6">
                  Ready to sell something? Start by creating your first listing.
                </p>
                <Button asChild variant="outline">
                  <Link href="/listings/create">Create Listing</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border bg-zinc-50">
                        <img
                          src={(listing.imageUrls && listing.imageUrls[0]) || "/placeholder-image.jpg"}
                          alt={listing.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <Link
                          href={`/listings/${listing.id}`}
                          className="font-bold text-zinc-900 hover:underline"
                        >
                          {listing.title}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span className="flex items-center">
                            <Tag className="mr-1 h-3 w-3" />
                            {listing.categoryName}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {listing.location}
                          </span>
                        </div>
                        <p className="text-lg font-black text-zinc-950 pt-1">
                          ${listing.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                        Active
                      </Badge>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/listings/${listing.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
