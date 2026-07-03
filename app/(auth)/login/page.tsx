import AuthTabs from "@/components/auth/AuthTabs";

export default function LoginPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <AuthTabs defaultTab="login" />
    </main>
  );
}
