import Link from "next/link";

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
import { fakeCategories } from "@/data/fakeCategories";
import { createListing } from "./actions";

export default function CreateListingPage() {
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

                  <Select name="category">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {fakeCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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
                <label className="text-sm font-medium">Product Image</label>

                <div className="rounded-xl border border-dashed bg-zinc-50 p-6 text-center">
                  <Input name="image" type="file" accept="image/*" />

                  <p className="mt-3 text-sm text-zinc-500">
                    Upload a clear image of your product.
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
