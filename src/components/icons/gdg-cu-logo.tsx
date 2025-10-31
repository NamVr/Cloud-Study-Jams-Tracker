"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function GdgCuLogo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a static placeholder on the server and initial client render
    // to prevent hydration mismatch.
    return <div style={{ width: 225, height: 40 }} className={cn("h-10 w-auto", className)} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <Image
        src="https://cloud.namanvrati.me/images/gdg-footer-light.png"
        alt="GDG CU Logo"
        width={225}
        height={40}
        className={cn("h-10 w-auto", isDark ? "hidden" : "block", className)}
        priority
      />
      <Image
        src="https://cloud.namanvrati.me/images/gdg-footer-dark.png"
        alt="GDG CU Logo"
        width={225}
        height={40}
        className={cn("h-10 w-auto", isDark ? "block" : "hidden", className)}
        priority
      />
    </>
  );
}
