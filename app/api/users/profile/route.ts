import { NextResponse as Response } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRepository } from "@/lib/repositories/user.repository";

export async function PUT(req: Request) {
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

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedUser = await UserRepository.updateProfile(userId, { name: name.trim() });

    if (!updatedUser) {
      return Response.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return Response.json({ success: true, user: { name: updatedUser.name } }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
