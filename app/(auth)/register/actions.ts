"use server";

import { AuthService } from "@/lib/services/auth.service";

export async function registerUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  return AuthService.registerUser(data);
}
