"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent 
        showCloseButton={false} 
        className="sm:max-w-[440px] p-8 sm:p-10 rounded-[2rem] border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"
      >
        <DialogClose className="absolute right-6 top-6 rounded-full p-2.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">
          Log in or create an account to continue.
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
