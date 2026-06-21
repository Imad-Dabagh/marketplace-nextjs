import { NextResponse as Response } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRepository } from "@/lib/repositories/user.repository";
import bcrypt from "bcryptjs";

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
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return Response.json({ error: "Current and new passwords are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
    }

    const user = await UserRepository.findById(userId);

    if (!user || !user.password) {
      return Response.json({ error: "User not found or has no password set" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return Response.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await UserRepository.updatePassword(userId, hashedNewPassword);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Password update error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
