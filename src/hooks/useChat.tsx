import { useState, useCallback } from "react";
import { ChatMessage, sendMessageToGemini } from "../services/geminiService";
import { useToast } from "@/components/ui/use-toast";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addMessage = useCallback((content: string, role: "user" | "assistant") => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    try {
      const userMessage = addMessage(content, "user");
      setIsLoading(true);
      
      const currentMessages = [...messages, userMessage];
      const response = await sendMessageToGemini(currentMessages);
      
      addMessage(response, "assistant");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage, toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
