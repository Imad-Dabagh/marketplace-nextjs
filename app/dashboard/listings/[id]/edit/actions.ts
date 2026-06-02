"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ListingService } from "@/lib/services/listing.service";
import { ListingSchema } from "@/lib/validations/schemas";

const listingStatuses = ["active", "sold", "draft"] as const;

function getSessionUserId(sessionUser: unknown) {
  const user = sessionUser as { id?: string; email?: string | null } | undefined;
  return user?.id || user?.email || "";
}

export async function updateSellerListing(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const sellerId = getSessionUserId(session.user);
  const listing = await ListingService.getListingById(id);

  if (!listing || listing.sellerId !== sellerId) {
    throw new Error("You can only edit your own listings.");
  }

  const status = String(formData.get("status") || "active");

  if (!listingStatuses.includes(status as (typeof listingStatuses)[number])) {
    throw new Error("Invalid listing status");
  }

  const rawData = {
    title: String(formData.get("title") || ""),
    price: Number(formData.get("price") || 0),
    categoryId: String(formData.get("categoryId") || ""),
    location: String(formData.get("location") || ""),
    condition: String(formData.get("condition") || "good"),
    description: String(formData.get("description") || ""),
    status: status as (typeof listingStatuses)[number],
  };

  const validatedData = ListingSchema.parse(rawData);
  const imageFiles = formData.getAll("images") as File[];
  const removeImages = formData.get("removeImages") === "on";

  await ListingService.updateListing(
    id,
    { ...validatedData, status: rawData.status },
    imageFiles,
    removeImages
  );

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/listings/${id}/edit`);
  revalidatePath("/listings");
  revalidatePath(`/listings/${id}`);

  redirect("/dashboard");
}
