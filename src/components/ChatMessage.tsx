import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/services/geminiService";
import { motion } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      toast({
        description: "Message copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        description: "Failed to copy message",
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] md:max-w-[70%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full shrink-0 mt-1",
            isUser ? "ml-3 bg-chat-user text-chat-user-foreground" : "mr-3 bg-chat-ai text-chat-ai-foreground"
          )}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        
        <div
          className={cn(
            "group relative px-4 py-3 rounded-2xl glass-card",
            isUser ? "rounded-tr-sm" : "rounded-tl-sm",
            isUser 
              ? "bg-chat-user/10 dark:bg-chat-user/20 border-chat-user/20" 
              : "bg-chat-ai/5 dark:bg-chat-ai/10 border-chat-ai/20"
          )}
        >
          <p className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={copyToClipboard}
            className={cn(
              "absolute -right-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity",
              isUser && "right-auto -left-12"
            )}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ChatMessageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full mb-6 justify-start"
    >
      <div className="flex max-w-[80%] md:max-w-[70%] flex-row">
        <div className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 mt-1 mr-3 bg-chat-ai/70 text-chat-ai-foreground">
          <Bot size={18} />
        </div>
        
        <div className="px-4 py-3 rounded-2xl glass-card rounded-tl-sm bg-chat-ai/5 dark:bg-chat-ai/10 border-chat-ai/20 min-w-[160px]">
          <div className="h-4 w-full shimmer rounded-full"></div>
          <div className="h-4 w-3/4 shimmer rounded-full mt-2"></div>
          <div className="h-4 w-1/2 shimmer rounded-full mt-2"></div>
        </div>
      </div>
    </motion.div>
  );
}
