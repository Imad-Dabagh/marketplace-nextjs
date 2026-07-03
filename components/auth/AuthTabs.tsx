"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthTabsProps = {
  defaultTab?: "login" | "register";
  onSuccess?: () => void;
};

export default function AuthTabs({ defaultTab = "login", onSuccess }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.replaceState(null, "", `/${value}`);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col items-center">
      {/* Brand & Heading */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Store className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {activeTab === "login" 
            ? "Enter your details to access your account." 
            : "Sign up to start buying and selling."}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-11 p-1 bg-zinc-100/80 dark:bg-zinc-900 rounded-xl">
          <TabsTrigger 
            value="login" 
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm text-sm font-medium transition-all"
          >
            Log in
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm text-sm font-medium transition-all"
          >
            Sign up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="m-0 border-none p-0 outline-none animate-in fade-in-50 zoom-in-95 duration-200">
          <LoginForm onSuccess={onSuccess} />
        </TabsContent>
        
        <TabsContent value="register" className="m-0 border-none p-0 outline-none animate-in fade-in-50 zoom-in-95 duration-200">
          <RegisterForm onSuccess={onSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
