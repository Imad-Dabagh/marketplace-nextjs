"use client";

import AuthModal from "@/components/auth/AuthModal";
import AuthTabs from "@/components/auth/AuthTabs";
import { useRouter } from "next/navigation";

export default function LoginIntercept() {
  const router = useRouter();

  return (
    <AuthModal>
      <AuthTabs defaultTab="login" onSuccess={() => {
        router.back();
        router.refresh();
      }} />
    </AuthModal>
  );
}
