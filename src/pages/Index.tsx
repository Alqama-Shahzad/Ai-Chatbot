
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChatUI } from "@/components/ChatUI";
import { AnimatedFadeIn } from "@/components/AnimatedWrapper";
import { Sidebar } from "@/components/Sidebar";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Desktop default is sidebar open
    setIsSidebarOpen(!isMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AnimatedFadeIn className="min-h-screen flex flex-col">
      <Sidebar 
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onThemeToggle={toggleTheme}
        isDarkTheme={isDarkTheme}
      />
      
      <Header>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </Header>
      
      <main className={`flex-1 overflow-hidden container py-4 transition-all duration-300 ${!isMobile && isSidebarOpen ? 'lg:pl-[300px]' : ''}`}>
        <ChatUI />
      </main>
      
      <footer className={`text-center py-4 text-xs text-muted-foreground transition-all duration-300 ${!isMobile && isSidebarOpen ? 'lg:pl-[300px]' : ''}`}>
        <p>Modern AI Assistant powered by Google's Gemini API</p>
      </footer>
    </AnimatedFadeIn>
  );
};

export default Index;
