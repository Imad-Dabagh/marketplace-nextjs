import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { connectToDatabase } from "@/lib/mongodb";
import Listing from "@/models/listing.model";

type ListingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailsPage({
  params,
}: ListingDetailsPageProps) {
  const { id } = await params;

  await connectToDatabase();

  const listing = await Listing.findById(id).lean();

  if (!listing) {
    return <div className="p-10">Listing not found.</div>;
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
        {/* IMAGE */}
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border bg-white">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{listing.category}</Badge>

                <Badge variant="outline">{listing.location}</Badge>
              </div>

              <div>
                <CardTitle className="text-3xl">{listing.title}</CardTitle>

                <p className="mt-2 text-3xl font-bold text-zinc-950">
                  ${listing.price.toFixed(0)}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* DESCRIPTION */}
              <div>
                <h2 className="mb-2 font-semibold">Description</h2>

                <p className="leading-7 text-zinc-600">{listing.description}</p>
              </div>

              {/* POSTED DATE */}
              <div className="rounded-2xl border bg-zinc-50 p-4">
                <p className="text-sm font-medium">Posted On</p>

                <p className="mt-1 text-sm text-zinc-600">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full">
                  Contact Seller
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/listings">Back to Listings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
