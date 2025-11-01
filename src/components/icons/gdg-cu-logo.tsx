"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function GdgCuLogo({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <>
      <Image
        src="https://cloud.namanvrati.me/images/gdg-footer-light.png"
        alt="GDG CU Logo"
        width={225}
        height={40}
        className={cn("h-10 w-auto dark:hidden", className)}
        priority
      />
      <Image
        src="https://cloud.namanvrati.me/images/gdg-footer-dark.png"
        alt="GDG CU Logo"
        width={225}
        height={40}
        className={cn("h-10 w-auto hidden dark:block", className)}
        priority
      />
    </>
  );
}
