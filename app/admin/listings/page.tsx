import Link from "next/link";
import Image from "next/image";
import { Edit, Eye, Search, Trash2, User } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteListing, updateListingStatus } from "./actions";

type AdminListingsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    edit?: string;
  }>;
};

import { CategoryService } from "@/lib/services/category.service";
import { EditListingSidePanel } from "./components/EditListingSidePanel";

const statuses = ["active", "sold", "draft"] as const;

export default async function AdminListingsPage({
  searchParams,
}: AdminListingsPageProps) {
  const { q, status, edit } = await searchParams;
  
  const [listings, editListing, categories] = await Promise.all([
    ListingService.getListings({ q, status }),
    edit ? ListingService.getListingById(edit) : Promise.resolve(null),
    edit ? CategoryService.getAllCategories() : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {edit && (
        <EditListingSidePanel
          listingId={edit}
          listing={editListing}
          categories={categories}
        />
      )}
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
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Listing</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[200px]">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <Badge variant="outline" className="mb-2">No results</Badge>
                      <p className="text-sm text-zinc-500">
                        No listings match the current filters.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium max-w-[300px]">
                        <Link
                          href={`/admin/listings?edit=${listing.id}`}
                          className="group flex items-center gap-3"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-zinc-100">
                            <Image
                              src={(listing.imageUrls && listing.imageUrls[0]) || "/placeholder-image.jpg"}
                              alt={listing.title}
                              fill
                              sizes="40px"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <span className="truncate font-medium text-zinc-950 group-hover:text-primary">
                            {listing.title}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {listing.sellerImage ? (
                            <Image
                              src={listing.sellerImage}
                              alt={listing.sellerName || "Seller"}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                              <User className="h-3 w-3" />
                            </div>
                          )}
                          <span className="max-w-[120px] truncate text-sm text-zinc-600">
                            {listing.sellerName || "Unknown"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="truncate text-sm text-zinc-600">
                        {listing.categoryName || "Uncategorized"}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${listing.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <form action={updateListingStatus.bind(null, listing.id)} className="flex items-center gap-2">
                          <Select name="status" defaultValue={listing.status}>
                            <SelectTrigger className="h-8 w-28">
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
                          <Button type="submit" size="sm" variant="secondary" className="h-8 px-2 text-xs">
                            Save
                          </Button>
                        </form>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="icon" variant="outline" className="h-8 w-8">
                            <Link href={`/listings/${listing.id}`} aria-label={`View ${listing.title}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <form action={deleteListing.bind(null, listing.id)}>
                            <Button
                              type="submit"
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              aria-label={`Delete ${listing.title}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
