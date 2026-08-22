"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { sendChatMessage } from "@/app/(app)/w/[workspaceSlug]/p/[projectSlug]/ai/actions";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AIChat({ projectId }: { projectId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm the ForgeHub Copilot. How can I help you with this project today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Filter history for the API
    const history = messages
      .filter(m => m.id !== "welcome")
      .map(m => ({ role: m.role, content: m.content }));

    const res = await sendChatMessage(projectId, userMessage.content, history);
    
    if (res.success && res.text) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.text as string
      }]);
    } else {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request."
      }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface-muted border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="bg-surface border-b border-border p-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-text-primary">Agentic Copilot</h2>
          <p className="text-xs text-text-muted">Context-aware project assistant</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 flex flex-col">
          {messages.length === 0 ? (
            <div className="m-auto text-center">
              <Sparkles className="h-10 w-10 text-primary mb-4 mx-auto opacity-50" />
              <h3 className="text-lg font-medium text-text-primary mb-1">Project Copilot</h3>
              <p className="text-sm text-text-muted max-w-[200px] mx-auto mb-6">
                I can help you review documents, summarize requirements, or draft architecture decisions.
              </p>
              <div className="flex flex-col gap-2 max-w-[250px] mx-auto">
                <button onClick={() => setInput("Summarize the current milestone status.")} className="text-left text-xs bg-surface-muted hover:bg-surface border border-border rounded-md px-3 py-2 text-text-primary transition-colors">
                  Summarize Milestone
                </button>
                <button onClick={() => setInput("Draft a decision log based on our requirements.")} className="text-left text-xs bg-surface-muted hover:bg-surface border border-border rounded-md px-3 py-2 text-text-primary transition-colors">
                  Draft Decision from Requirements
                </button>
                <button onClick={() => setInput("What tests are we missing based on the current docs?")} className="text-left text-xs bg-surface-muted hover:bg-surface border border-border rounded-md px-3 py-2 text-text-primary transition-colors">
                  Find Missing Tests
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground ml-4" 
                      : "bg-surface border border-border text-text-primary mr-4"
                  }`}
                ><div className="prose prose-sm dark:prose-invert max-w-none">
                {/* Basic markdown rendering can be added here, using raw text for now */}
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className="my-1">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm flex items-center gap-2 text-text-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-surface border-t border-border">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about project decisions, ask for a summary, or draft a new section..."
            className="w-full bg-input-bg border border-border rounded-full pl-5 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-bg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
