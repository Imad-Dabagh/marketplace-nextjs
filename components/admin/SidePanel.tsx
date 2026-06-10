"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface SidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function SidePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: SidePanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn("flex flex-col p-0 sm:max-w-md", className)}>
        <div className="border-b px-6 py-4">
          <SheetHeader className="p-0 gap-1">
            <SheetTitle asChild>
              {typeof title === "string" ? <h2 className="text-xl font-bold">{title}</h2> : title}
            </SheetTitle>
            {description && <SheetDescription className="text-xs">{description}</SheetDescription>}
          </SheetHeader>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/50">
          {children}
        </div>
        
        {footer && (
          <div className="border-t bg-white p-6 shadow-sm">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
