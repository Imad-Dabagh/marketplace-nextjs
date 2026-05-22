import Link from "next/link";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { ListingService } from "@/lib/services/listing.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteListing, updateListingStatus } from "./actions";

type AdminListingsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

const statuses = ["active", "sold", "draft"] as const;

export default async function AdminListingsPage({
  searchParams,
}: AdminListingsPageProps) {
  const { q, status } = await searchParams;
  const listings = await ListingService.getListings({ q, status });

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-950">Listing Management</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Review marketplace posts, update visibility, and remove invalid listings.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle>All Listings</CardTitle>
          <form className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                name="q"
                defaultValue={q || ""}
                placeholder="Search listings"
                className="pl-9"
              />
            </div>
            <Select name="status" defaultValue={status || "all"}>
              <SelectTrigger className="sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {statuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">Filter</Button>
          </form>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-[2fr_1fr_120px_150px_180px] gap-4 border-b px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <span>Listing</span>
                <span>Category</span>
                <span>Price</span>
                <span>Status</span>
                <span className="text-right">Actions</span>
              </div>

              <div className="divide-y">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="grid grid-cols-[2fr_1fr_120px_150px_180px] items-center gap-4 px-3 py-4"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="block truncate font-medium text-zinc-950 hover:text-primary"
                      >
                        {listing.title}
                      </Link>
                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {listing.location} · Seller {listing.sellerId || "unknown"}
                      </p>
                    </div>
                    <span className="truncate text-sm text-zinc-600">
                      {listing.categoryName || "Uncategorized"}
                    </span>
                    <span className="font-medium">${listing.price.toLocaleString()}</span>
                    <form action={updateListingStatus.bind(null, listing.id)}>
                      <Select name="status" defaultValue={listing.status}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="submit" size="sm" variant="outline" className="mt-2 w-full">
                        Save
                      </Button>
                    </form>
                    <div className="flex justify-end gap-2">
                      <Button asChild size="icon" variant="outline">
                        <Link
                          href={`/admin/listings/${listing.id}/edit`}
                          aria-label={`Edit ${listing.title}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="icon" variant="outline">
                        <Link href={`/listings/${listing.id}`} aria-label={`View ${listing.title}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={deleteListing.bind(null, listing.id)}>
                        <Button
                          type="submit"
                          size="icon"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          aria-label={`Delete ${listing.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>

              {listings.length === 0 && (
                <div className="py-12 text-center">
                  <Badge variant="outline">No results</Badge>
                  <p className="mt-3 text-sm text-zinc-500">
                    No listings match the current filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
