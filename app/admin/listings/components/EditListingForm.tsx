import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { ListingDTO } from "@/lib/dtos";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateListing } from "../actions";

interface Category {
  id: string;
  name: string;
}

interface EditListingFormProps {
  listing: ListingDTO;
  categories: Category[];
  formId: string;
}

const statuses = ["active", "sold", "draft"] as const;

export function EditListingForm({ listing, categories, formId }: EditListingFormProps) {
  return (
    <form
      id={formId}
      action={updateListing.bind(null, listing.id)}
      className="mx-auto flex h-full w-full flex-col gap-6 pb-6 pt-2"
    >
      {/* <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-10"> */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[7fr_3fr]">

        {/* LEFT COLUMN: ~70% */}
        <div className="flex min-w-0 flex-col gap-6">
          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-zinc-900">Listing Details</h3>
              <p className="text-xs text-zinc-500">
                Primary information and publishing status.
              </p>
            </div>

            <div className="grid gap-5">
              {/* Row 1: Title & Price */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Title</label>
                  <Input
                    name="title"
                    defaultValue={listing.title}
                    placeholder="e.g. iPhone 15 Pro in excellent condition"
                    className="h-10"
                    required
                  />
                </div>
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Price ($)</label>
                  <Input
                    name="price"
                    type="number"
                    min="1"
                    defaultValue={listing.price}
                    placeholder="e.g. 1200"
                    className="h-10"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Category & Condition */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Category</label>
                  <Select name="categoryId" defaultValue={listing.categoryId}>
                    <SelectTrigger className="w-full data-[size=default]:h-10">
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
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Condition</label>
                  <Select name="condition" defaultValue={listing.condition || "good"}>
                    <SelectTrigger className="w-full data-[size=default]:h-10">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like_new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3: Location & Status */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Location</label>
                  <Input
                    name="location"
                    defaultValue={listing.location}
                    placeholder="e.g. Casablanca"
                    className="h-10"
                    required
                  />
                </div>
                <div className="min-w-0 space-y-2">
                  <label className="text-sm font-medium text-zinc-900">Status</label>
                  <Select name="status" defaultValue={listing.status}>
                    <SelectTrigger className="w-full data-[size=default]:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          <span className="capitalize">{status}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Description moved into the left column to save vertical space */}
          <section className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-zinc-900">Description</h3>
              <p className="text-xs text-zinc-500">
                Detailed information about the item and its history.
              </p>
            </div>
            <Textarea
              name="description"
              defaultValue={listing.description}
              placeholder="Write a comprehensive description..."
              className="min-h-[160px] flex-1 resize-y text-sm"
              required
            />
          </section>
        </div>

        {/* RIGHT COLUMN: ~30% */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Images Panel */}
          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-zinc-900">Media</h3>
              <p className="text-xs text-zinc-500">
                Manage listing photos.
              </p>
            </div>

            <div className="space-y-4">
              {listing.imageUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {listing.imageUrls.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
                    >
                      <Image
                        src={imageUrl}
                        alt={`${listing.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 py-6 text-center text-xs text-zinc-500">
                  No images uploaded.
                </div>
              )}

              <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-center transition-colors hover:border-zinc-400 hover:bg-zinc-50">
                <UploadCloud className="mx-auto mb-2 h-5 w-5 text-zinc-400" />
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <span className="text-sm font-medium text-zinc-900">Replace images</span>
                  <Input
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full max-w-[200px] cursor-pointer text-[11px] text-zinc-500 file:mr-2 file:rounded file:border-0 file:bg-zinc-100 file:px-2 file:py-1 file:text-[11px] file:font-medium file:text-zinc-900 hover:file:bg-zinc-200"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2 rounded-md border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:bg-zinc-50">
                <input
                  name="removeImages"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-primary focus:ring-primary"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-900">Remove all</span>
                  <span className="text-xs text-zinc-500">Deletes current images on save.</span>
                </div>
              </label>
            </div>
          </section>
        </div>

      </div>
    </form>
  );
}
