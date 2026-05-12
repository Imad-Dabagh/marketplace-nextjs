"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryService } from "@/lib/services/category.service";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user && (session.user as any).role === "admin";
}

export async function createCategory(formData: FormData) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const name = String(formData.get("name") || "");
  if (!name) {
    throw new Error("Category name is required");
  }

  await CategoryService.createCategory(name);
}

export async function deleteCategory(id: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await CategoryService.deleteCategory(id);
}
