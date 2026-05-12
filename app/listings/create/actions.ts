"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ListingService } from "@/lib/services/listing.service";
import { ListingSchema } from "@/lib/validations/schemas";

export async function createListing(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("You must be logged in to create a listing");
  }

  const rawData = {
    title: String(formData.get("title") || ""),
    price: Number(formData.get("price") || 0),
    categoryId: String(formData.get("categoryId") || ""),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description") || ""),
  };

  const imageFiles = formData.getAll("images") as File[];

  // Validate with Zod
  const validatedData = ListingSchema.parse(rawData);

  const sellerId = (session.user as any).id || session.user.email;
  
  const listing = await ListingService.createListing(
    validatedData,
    imageFiles,
    sellerId
  );

  revalidatePath("/listings");
  revalidatePath("/dashboard");

  redirect(`/listings/${listing.id}`);
}