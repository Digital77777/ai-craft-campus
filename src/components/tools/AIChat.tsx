import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUsageTracking } from "@/hooks/useUsageTracking";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const { canUseAi, incrementAiRequests } = useUsageTracking();

  const handleSend = () => {
    if (!prompt.trim() || !canUseAi) return;
    
    const success = incrementAiRequests();
    if (success) {
      setConversation(prev => [...prev, { role: 'user', content: prompt }]);
      // Simulate AI response
      setTimeout(() => {
        setConversation(prev => [...prev, { 
          role: 'ai', 
          content: "This is a demo response. Connect to OpenAI for real responses." 
        }]);
      }, 1000);
      setPrompt("");
      toast({ title: "Message sent", description: "Demo mode - connect AI for real responses" });
    }
  };

  const clearChat = () => {
    setConversation([]);
    setPrompt("");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Chat Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex-1 min-h-[200px] max-h-[400px] overflow-y-auto bg-muted/30 rounded-lg p-4 space-y-3">
          {conversation.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Start a conversation with AI
            </div>
          ) : (
            conversation.map((message, idx) => (
              <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border'
                }`}>
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex-shrink-0 space-y-3">
          <Textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Ask anything or paste your prompt..." 
            rows={3}
            disabled={!canUseAi}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={handleSend} 
              disabled={!canUseAi || !prompt.trim()}
              className="flex-1 sm:flex-none"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button variant="outline" onClick={clearChat} disabled={conversation.length === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}