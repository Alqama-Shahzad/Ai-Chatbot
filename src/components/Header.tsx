import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Bot, Sparkles } from "lucide-react";

export interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-30 w-full border-b border-border/50 bg-background/90 backdrop-blur-md shadow-soft-sm",
      className
    )}>
      <div className="container flex h-16 items-center justify-between">
        {children}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/5 ring-1 ring-border/50">
            <div className="relative">
              <Bot className="h-5 w-5 text-primary" />
              <Sparkles className="h-2.5 w-2.5 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-lg font-medium bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
              AI Chat
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
