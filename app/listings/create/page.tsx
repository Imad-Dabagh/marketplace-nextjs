import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

import { Textarea } from "@/components/ui/textarea";
import { createListing } from "./actions";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/category.model";

export default async function CreateListingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/listings/create");
  }

  await connectToDatabase();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Create a New Listing
          </h1>

          <p className="mt-2 text-zinc-600">
            Fill out the form below to publish your product listing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>

          <CardContent>
            <form action={createListing} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Listing Title</label>

                <Input
                  name="title"
                  placeholder="e.g. iPhone 15 Pro in excellent condition"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>

                  <Input name="price" type="number" placeholder="e.g. 1200" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>

                  <Select name="categoryId">
                    <SelectTrigger className="w-full">

                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem
                          key={category._id.toString()}
                          value={category._id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>

                <Input name="location" placeholder="e.g. Casablanca" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>

                <Textarea
                  name="description"
                  placeholder="Write a short description about the product and its condition..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Images</label>

                <div className="rounded-xl border border-dashed bg-zinc-50 p-6 text-center">
                  <Input name="images" type="file" accept="image/*" multiple />

                  <p className="mt-3 text-sm text-zinc-500">
                    Upload one or more clear images of your product.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="sm:flex-1">
                  Publish Listing
                </Button>

                <Button asChild variant="outline">
                  <Link href="/listings">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
