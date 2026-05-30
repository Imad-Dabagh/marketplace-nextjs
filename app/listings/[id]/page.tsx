import Link from "next/link";
import { MapPin, User, Clock, ChevronLeft, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageGallery from "@/components/listings/ImageGallery";
import { ListingService } from "@/lib/services/listing.service";

type ListingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailsPage({
  params,
}: ListingDetailsPageProps) {
  const { id } = await params;

  const listing = await ListingService.getListingById(id);

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <h1 className="text-2xl font-bold">Listing not found.</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/listings">Back to Listings</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <Link
          href="/listings"
          className="group mb-6 flex items-center text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Listings
        </Link>

        <section className="grid w-full gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* IMAGE */}
          <div className="space-y-6">
            <ImageGallery images={listing.imageUrls || []} />

            <div className="hidden lg:block pt-4">
              <h2 className="mb-4 text-xl font-bold">Description</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-zinc-600">
                {listing.description}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-zinc-200">
              <CardHeader className="space-y-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-zinc-900 text-white hover:bg-zinc-800">
                    {listing.categoryName}
                  </Badge>
                  {listing.condition && (
                    <Badge variant="outline" className="capitalize">
                      {listing.condition.replace("_", " ")}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-zinc-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {listing.location}
                  </div>
                </div>

                <div>
                  <CardTitle className="text-3xl font-extrabold tracking-tight">
                    {listing.title}
                  </CardTitle>
                  <p className="mt-3 text-4xl font-black text-zinc-950">
                    ${listing.price.toLocaleString()}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 border-y py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Seller</p>
                    <p className="text-zinc-600">Marketplace User</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-zinc-500">
                  <Clock className="mr-2 h-4 w-4" />
                  Posted on {new Date(listing.createdAt).toLocaleDateString()}
                </div>

                <div className="lg:hidden">
                  <h2 className="mb-2 font-semibold">Description</h2>
                  <p className="text-zinc-600">{listing.description}</p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button size="lg" className="h-12 w-full font-bold">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Seller
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 w-full"
                  >
                    <Link href="/listings">More Listings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-200">
              <CardContent className="p-6">
                <h3 className="mb-2 font-bold">Safety Tip</h3>
                <p className="text-sm text-zinc-400">
                  Always meet in person and inspect the item before making a
                  payment. Avoid wire transfers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
