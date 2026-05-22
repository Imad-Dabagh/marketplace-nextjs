"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ListingService } from "@/lib/services/listing.service";

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
