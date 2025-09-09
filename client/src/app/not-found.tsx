"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-[var(--color-bg-element-main)]">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Page Not Fpund.
      </p>

      <Link href="/">
        <Button className="bg-[var(--color-bg-element-main)]">Home</Button>
      </Link>
    </div>
  );
}
