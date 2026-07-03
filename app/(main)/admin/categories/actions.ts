"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CategoryService } from "@/lib/services/category.service";
import { revalidatePath } from "next/cache";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  return user?.role === "admin";
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
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await CategoryService.deleteCategory(id);
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
}
