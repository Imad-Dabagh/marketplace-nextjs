"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(callbackUrl);
      }
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="name@example.com" 
          required 
          className="h-11 rounded-lg border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          required 
          className="h-11 rounded-lg border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      <Button 
        type="submit" 
        className="mt-2 h-11 w-full rounded-lg font-medium shadow-sm transition-all" 
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
