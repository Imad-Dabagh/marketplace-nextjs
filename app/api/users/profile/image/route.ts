import { NextResponse as Response } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CloudinaryService } from "@/lib/services/cloudinary.service";
import { UserRepository } from "@/lib/repositories/user.repository";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = session.user as { id?: string; email?: string };
    const userId = sessionUser.id;

    if (!userId) {
      return Response.json({ error: "User ID not found in session" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return Response.json({ error: "No image file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const imageUrl = await CloudinaryService.uploadImage(file);

    if (!imageUrl) {
      return Response.json({ error: "Failed to upload image" }, { status: 500 });
    }

    // Update the database
    await UserRepository.updateImage(userId, imageUrl);

    return Response.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Profile image upload error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
