import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Images, Save } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryService } from "@/lib/services/category.service";
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
import { Textarea } from "@/components/ui/textarea";
import { updateSellerListing } from "./actions";

type EditSellerListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const statuses = ["active", "sold", "draft"] as const;
const conditions = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
] as const;

function getSessionUserId(sessionUser: unknown) {
  const user = sessionUser as { id?: string; email?: string | null } | undefined;
  return user?.id || user?.email || "";
}

export default async function EditSellerListingPage({
  params,
}: EditSellerListingPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const { id } = await params;
  const [listing, categories] = await Promise.all([
    ListingService.getListingById(id),
    CategoryService.getAllCategories(),
  ]);

  if (!listing) {
    notFound();
  }

  if (listing.sellerId !== getSessionUserId(session.user)) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-zinc-950">Edit Listing</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Update your product details, listing status, and images.
          </p>
        </div>
        <Badge variant="outline">{listing.status}</Badge>
      </div>

      <form
        action={updateSellerListing.bind(null, listing.id)}
        className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input name="title" defaultValue={listing.title} required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  name="price"
                  type="number"
                  min="1"
                  defaultValue={listing.price}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select name="status" defaultValue={listing.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select name="categoryId" defaultValue={listing.categoryId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select name="condition" defaultValue={listing.condition || "good"}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input name="location" defaultValue={listing.location} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                defaultValue={listing.description}
                rows={7}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Images className="h-4 w-4" />
                Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {listing.imageUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {listing.imageUrls.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className="relative aspect-square overflow-hidden rounded-md border bg-zinc-100"
                    >
                      <Image
                        src={imageUrl}
                        alt={`${listing.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-zinc-500">
                  This listing has no uploaded images.
                </p>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Replace Images</label>
                <Input name="images" type="file" accept="image/*" multiple />
                <p className="text-xs text-zinc-500">
                  Uploading new files replaces the current image set.
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <input
                  name="removeImages"
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Remove current images
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 pt-6">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/listings/${listing.id}`}>View public listing</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
