import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Zap, Send, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export default function APIIntegration() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Array<{key: string, value: string}>>([{key: "", value: ""}]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);

  const addHeader = () => {
    setHeaders([...headers, {key: "", value: ""}]);
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
    }
  };

  const sendRequest = async () => {
    if (!url.trim()) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: "OK",
        data: {
          message: "This is a demo response",
          timestamp: new Date().toISOString(),
          method: method,
          url: url
        }
      };
      
      setResponse(JSON.stringify(mockResponse, null, 2));
      setIsLoading(false);
      toast({ title: "Request sent", description: "Demo response received" });
    }, 1500);
  };

  const clearResponse = () => {
    setResponse("");
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          API Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {httpMethods.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="flex-1"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHeaders(!showHeaders)}
            >
              {showHeaders ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              Headers
            </Button>
            <Badge variant="secondary">{headers.filter(h => h.key.trim()).length}</Badge>
          </div>
          
          {showHeaders && (
            <div className="space-y-2 border rounded-lg p-3">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={header.key}
                    onChange={(e) => updateHeader(index, 'key', e.target.value)}
                    placeholder="Header name"
                    className="flex-1"
                  />
                  <Input 
                    value={header.value}
                    onChange={(e) => updateHeader(index, 'value', e.target.value)}
                    placeholder="Header value"
                    className="flex-1"
                  />
                  {headers.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeHeader(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addHeader}>
                Add Header
              </Button>
            </div>
          )}
        </div>

        {(method === "POST" || method === "PUT" || method === "PATCH") && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Request Body (JSON)</label>
            <Textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows={4}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={sendRequest} 
            disabled={!url.trim() || isLoading}
            className="flex-1 sm:flex-none"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
          {response && (
            <Button variant="outline" onClick={clearResponse}>
              Clear Response
            </Button>
          )}
        </div>

        {response && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Response</label>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm max-h-64">
              <code>{response}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}