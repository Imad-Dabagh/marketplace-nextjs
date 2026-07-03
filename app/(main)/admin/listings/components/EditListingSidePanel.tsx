"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { ListingDTO } from "@/lib/dtos";
import { SidePanel } from "@/components/admin/SidePanel";
import { EditListingForm } from "./EditListingForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
}

interface EditListingSidePanelProps {
  listingId?: string;
  listing: ListingDTO | null;
  categories: Category[];
}

export function EditListingSidePanel({
  listingId,
  listing,
  categories,
}: EditListingSidePanelProps) {
  const router = useRouter();

  // Keep previous references to allow the Radix UI close animation to complete
  // smoothly before the component contents are unmounted.
  const prevListing = useRef(listing);
  if (listing) prevListing.current = listing;
  const displayListing = listing || prevListing.current;

  const prevCategories = useRef(categories);
  if (categories && categories.length > 0) prevCategories.current = categories;
  const displayCategories = categories && categories.length > 0 ? categories : prevCategories.current;

  if (!displayListing) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/admin/listings", { scroll: false });
    }
  };

  const formId = "edit-listing-form";

  return (
    <SidePanel
      open={!!listingId}
      onOpenChange={handleOpenChange}
      className="w-[95vw] sm:w-[95vw] sm:max-w-[1600px] data-[side=right]:sm:max-w-[1600px]"
      title={
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold truncate max-w-[500px]" title={displayListing.title}>
            {displayListing.title}
          </h2>
          <Badge variant="secondary" className="capitalize">
            {displayListing.status}
          </Badge>
        </div>
      }
      description="Edit listing information, pricing, and images."
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form={formId}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      }
    >
      <EditListingForm listing={displayListing} categories={displayCategories} formId={formId} />
    </SidePanel>
  );
}
