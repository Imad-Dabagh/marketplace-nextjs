import AuthTabs from "@/components/auth/AuthTabs";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <AuthTabs defaultTab="register" />
    </main>
  );
}
