"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { theme = "system" } = useTheme();

  // Let sonner handle theme; no children, no extra props that could be objects.
  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      richColors // nicer default colors
      closeButton
      duration={3000}
      // use classNames to style, not inline style with CSS variables
      toastOptions={{
        classNames: {
          toast: "bg-popover text-popover-foreground border",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton: "bg-foreground text-background",
          cancelButton: "bg-muted",
        },
      }}
    />
  );
}
