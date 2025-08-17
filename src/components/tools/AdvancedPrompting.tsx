import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Save, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const promptTemplates = [
  {
    id: "analysis",
    name: "Content Analysis",
    template: "Analyze the following content and provide insights on:\n1. Main themes\n2. Tone and sentiment\n3. Key takeaways\n4. Recommendations\n\nContent: {content}"
  },
  {
    id: "creative",
    name: "Creative Writing",
    template: "Write a {type} about {topic} that:\n- Has a {tone} tone\n- Is approximately {length} words\n- Includes {elements}\n\nAdditional requirements: {requirements}"
  },
  {
    id: "technical",
    name: "Technical Documentation",
    template: "Create technical documentation for {feature}:\n\n## Overview\n{overview}\n\n## Requirements\n{requirements}\n\n## Implementation\n{implementation}\n\n## Testing\n{testing}"
  }
];

export default function AdvancedPrompting() {
  const [activeTab, setActiveTab] = useState("chain");
  const [prompts, setPrompts] = useState<string[]>([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateVars, setTemplateVars] = useState<Record<string, string>>({});
  const [savedChains, setSavedChains] = useState<Array<{name: string, prompts: string[]}>>([]);

  const addPrompt = () => {
    setPrompts([...prompts, ""]);
  };

  const updatePrompt = (index: number, value: string) => {
    const newPrompts = [...prompts];
    newPrompts[index] = value;
    setPrompts(newPrompts);
  };

  const removePrompt = (index: number) => {
    if (prompts.length > 1) {
      setPrompts(prompts.filter((_, i) => i !== index));
    }
  };

  const runChain = () => {
    const validPrompts = prompts.filter(p => p.trim());
    if (validPrompts.length === 0) return;
    
    toast({ 
      title: "Chain executed", 
      description: `Running ${validPrompts.length} prompts in sequence (demo mode)` 
    });
  };

  const saveChain = () => {
    const name = prompt("Enter a name for this chain:");
    if (name && prompts.some(p => p.trim())) {
      setSavedChains([...savedChains, { name, prompts: prompts.filter(p => p.trim()) }]);
      toast({ title: "Chain saved", description: `Saved as "${name}"` });
    }
  };

  const loadTemplate = (template: any) => {
    setSelectedTemplate(template.template);
    // Extract variables from template
    const variables = template.template.match(/\{([^}]+)\}/g)?.map((v: string) => v.slice(1, -1)) || [];
    const vars: Record<string, string> = {};
    variables.forEach((v: string) => vars[v] = "");
    setTemplateVars(vars);
  };

  const generateFromTemplate = () => {
    let result = selectedTemplate;
    Object.entries(templateVars).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });
    setPrompts([result]);
    setActiveTab("chain");
    toast({ title: "Template applied", description: "Template converted to prompt chain" });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Advanced Prompting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chain">Prompt Chain</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chain" className="space-y-4">
            <div className="space-y-3">
              {prompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Prompt {index + 1}</label>
                    {prompts.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removePrompt(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea 
                    value={prompt}
                    onChange={(e) => updatePrompt(index, e.target.value)}
                    placeholder={`Enter prompt ${index + 1}...`}
                    rows={3}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={addPrompt}>
                Add Prompt
              </Button>
              <Button onClick={runChain} disabled={!prompts.some(p => p.trim())}>
                <Play className="h-4 w-4 mr-2" />
                Run Chain
              </Button>
              <Button variant="outline" onClick={saveChain}>
                <Save className="h-4 w-4 mr-2" />
                Save Chain
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-3">
              {promptTemplates.map((template) => (
                <Card key={template.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Button size="sm" onClick={() => loadTemplate(template)}>
                      Use Template
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {template.template.substring(0, 100)}...
                  </p>
                </Card>
              ))}
            </div>
            
            {selectedTemplate && (
              <div className="space-y-3 border-t pt-4">
                <h4 className="font-medium">Configure Template</h4>
                {Object.keys(templateVars).map((key) => (
                  <div key={key} className="space-y-1">
                    <label className="text-sm">{key}</label>
                    <Textarea 
                      value={templateVars[key]}
                      onChange={(e) => setTemplateVars({...templateVars, [key]: e.target.value})}
                      placeholder={`Enter ${key}...`}
                      rows={2}
                    />
                  </div>
                ))}
                <Button onClick={generateFromTemplate}>
                  Generate Prompt
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4">
            {savedChains.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No saved chains yet
              </div>
            ) : (
              <div className="space-y-3">
                {savedChains.map((chain, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{chain.name}</h4>
                      <Badge variant="secondary">{chain.prompts.length} prompts</Badge>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setPrompts(chain.prompts);
                        setActiveTab("chain");
                      }}
                    >
                      Load Chain
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}