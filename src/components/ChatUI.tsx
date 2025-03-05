import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage, ChatMessageSkeleton } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedContainer } from "./AnimatedWrapper";
import { Send, RefreshCw, Sparkles } from "lucide-react";

export function ChatUI() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto bg-gradient-to-b from-background to-background/80 rounded-xl overflow-hidden border border-border/50 shadow-soft">
      <div className="flex-1 relative overflow-hidden">
        {messages.length === 0 ? (
          <AnimatedContainer 
            className="h-full flex flex-col items-center justify-center p-8 text-center"
            delay={0.2}
          >
            <div className="relative">
              <div className="w-20 h-20 mb-8 rounded-2xl bg-primary/5 flex items-center justify-center ring-1 ring-border/50">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/10 animate-ping" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
              How can I help you today?
            </h3>
            <p className="text-muted-foreground/90 max-w-sm text-lg leading-relaxed">
              Ask me anything - I can help with information, creative tasks, problem-solving, and more.
            </p>
          </AnimatedContainer>
        ) : (
          <ScrollArea 
            className="h-full px-6 py-8"
            ref={scrollAreaRef}
          >
            <div className="flex flex-col space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <ChatMessageSkeleton />}
            </div>
          </ScrollArea>
        )}
      </div>
      
      <AnimatedContainer 
        className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-md"
        delay={0.3}
      >
        <form onSubmit={handleSubmit} className="flex space-x-3 max-w-2xl mx-auto items-center">
          {messages.length > 0 && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={clearMessages}
              className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          
          <div className="flex-1 relative group">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-border/50 focus:border-primary/30 h-12 pl-4 pr-12 text-base transition-all duration-200 rounded-lg"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon"
              variant="ghost"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </AnimatedContainer>
    </div>
  );
}
