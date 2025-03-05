
interface GeminiMessage {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
}

interface GeminiRequestContent {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
}

interface GeminiRequest {
  contents: GeminiRequestContent[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
    stopSequences?: string[];
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

interface GeminiResponseCandidate {
  content: {
    parts: {
      text: string;
    }[];
    role: string;
  };
  finishReason: string;
  safetyRatings: {
    category: string;
    probability: string;
  }[];
}

interface GeminiResponse {
  candidates: GeminiResponseCandidate[];
  promptFeedback: {
    safetyRatings: {
      category: string;
      probability: string;
    }[];
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

// Updated with provided API key and using the correct Gemini model name
const API_KEY = "AIzaSyDW_P2N-NwNdV3mw4e6xuDXvhqFY6n4nQg"; 
// Updated model name - Gemini 1.5 Flash is the current model available
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function sendMessageToGemini(messages: ChatMessage[]): Promise<string> {
  try {
    // Convert our chat messages to Gemini format
    const geminiMessages: GeminiRequestContent[] = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const requestBody: GeminiRequest = {
      contents: geminiMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Add API key to URL
    const urlWithKey = `${API_URL}?key=${API_KEY}`;
    
    const response = await fetch(urlWithKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const responseText = data.candidates[0].content.parts
        .map(part => part.text)
        .join("");
      
      return responseText;
    } else {
      console.error("No response from Gemini:", data);
      throw new Error("No valid response from Gemini");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble connecting to my systems. Please try again in a moment.";
  }
}
