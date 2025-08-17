import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Copy, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const codeLanguages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" }
];

export default function CodeGenerator() {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    // Simulate code generation
    setTimeout(() => {
      const sampleCode = `// Generated ${language} code based on: ${description}
${language === 'python' ? 'def example_function():' : 'function exampleFunction() {'}
${language === 'python' ? '    pass  # Your implementation here' : '    // Your implementation here'}
${language === 'python' ? '' : '}'}

// This is demo code. Connect to OpenAI for real code generation.`;
      
      setGeneratedCode(sampleCode);
      setIsGenerating(false);
      toast({ title: "Code generated", description: "Demo code created" });
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: "Copied!", description: "Code copied to clipboard" });
  };

  const downloadCode = () => {
    const extension = language === 'python' ? 'py' : language === 'java' ? 'java' : 'js';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <label className="text-sm font-medium">Programming Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {codeLanguages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Code Description</label>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe what you want the code to do..." 
            rows={4}
          />
        </div>

        <Button 
          onClick={generateCode} 
          disabled={!description.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Code"}
        </Button>

        {generatedCode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Code</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}