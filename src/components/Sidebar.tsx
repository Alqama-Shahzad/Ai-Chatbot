import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedContainer } from "./AnimatedWrapper";
import { X, Sun, Moon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onThemeToggle: () => void;
  isDarkTheme: boolean;
}

export function Sidebar({ isOpen, isMobile, onToggle, onThemeToggle, isDarkTheme }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <AnimatedContainer
      className={`
        fixed inset-y-0 left-0 z-50 w-[300px] bg-background/80 backdrop-blur-xl border-r border-border/50
        ${isMobile ? 'shadow-lg' : ''}
      `}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold">ZXbot</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDarkTheme ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Welcome to ZXbot!</p>
              <p>This is a modern chatbot powered by Google's Gemini API.</p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border/50">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-xs text-center text-muted-foreground">
              Version 1.0.0
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Made by Alqama
            </p>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
} 