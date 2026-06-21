"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center p-8 font-sans bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="mb-6"
        >
          <Compass size={64} strokeWidth={1.5} className="text-muted-foreground" />
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-[clamp(5rem,12vw,8rem)] font-bold m-0 text-foreground tracking-tight leading-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        404
      </motion.h1>
      
      <motion.h2 
        className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold mt-4 mb-4 text-foreground tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        className="text-lg text-muted-foreground max-w-[500px] mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        We couldn't find the page you were looking for. It may have been moved, deleted, or perhaps never existed.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Home className="mr-2 w-4 h-4" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
