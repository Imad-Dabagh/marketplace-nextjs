"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ListingService } from "@/lib/services/listing.service";
import { ListingSchema } from "@/lib/validations/schemas";
import { redirect } from "next/navigation";

const listingStatuses = ["active", "sold", "draft"] as const;

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;

  if (user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function updateListingStatus(id: string, formData: FormData) {
  await assertAdmin();

  const status = String(formData.get("status") || "");

  if (!listingStatuses.includes(status as (typeof listingStatuses)[number])) {
    throw new Error("Invalid listing status");
  }

  await ListingService.updateListingStatus(
    id,
    status as (typeof listingStatuses)[number]
  );
  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
}

export async function deleteListing(id: string) {
  await assertAdmin();

  await ListingService.deleteListing(id);
  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
}

export async function updateListing(id: string, formData: FormData) {
  await assertAdmin();

  const status = String(formData.get("status") || "");

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

  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath(`/admin/listings/${id}/edit`);
  revalidatePath("/listings");
  revalidatePath(`/listings/${id}`);

  redirect("/admin/listings");
}
