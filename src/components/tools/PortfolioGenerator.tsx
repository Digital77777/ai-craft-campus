import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Download, Eye, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const portfolioTemplates = [
  { id: "developer", name: "Software Developer", description: "Clean, code-focused design" },
  { id: "designer", name: "UI/UX Designer", description: "Visual, portfolio-heavy layout" },
  { id: "manager", name: "Project Manager", description: "Professional, achievement-focused" },
  { id: "analyst", name: "Data Analyst", description: "Data-driven, analytical style" }
];

export default function PortfolioGenerator() {
  const [activeTab, setActiveTab] = useState("details");
  const [template, setTemplate] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });
  const [projects, setProjects] = useState([
    { name: "", description: "", tech: "", link: "" }
  ]);
  const [experience, setExperience] = useState([
    { company: "", role: "", duration: "", description: "" }
  ]);
  const [skills, setSkills] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", tech: "", link: "" }]);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index][field as keyof typeof newProjects[0]] = value;
    setProjects(newProjects);
  };

  const addExperience = () => {
    setExperience([...experience, { company: "", role: "", duration: "", description: "" }]);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...experience];
    newExperience[index][field as keyof typeof newExperience[0]] = value;
    setExperience(newExperience);
  };

  const generatePortfolio = () => {
    if (!personalInfo.name || !template) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({ 
        title: "Portfolio generated!", 
        description: "Your AI-powered portfolio is ready for download" 
      });
    }, 3000);
  };

  const previewPortfolio = () => {
    toast({ title: "Preview", description: "Opening portfolio preview (demo mode)" });
  };

  const downloadPortfolio = () => {
    toast({ title: "Download", description: "Portfolio files downloaded (demo mode)" });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Portfolio Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-3">
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose portfolio template" />
                </SelectTrigger>
                <SelectContent>
                  {portfolioTemplates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} - {t.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input 
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Professional Title</label>
                  <Input 
                    value={personalInfo.title}
                    onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                    placeholder="Software Developer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    placeholder="New York, NY"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Professional Bio</label>
                <Textarea 
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                  placeholder="Brief description of your professional background..."
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            {projects.map((project, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Project Name</label>
                      <Input 
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Technologies</label>
                      <Input 
                        value={project.tech}
                        onChange={(e) => updateProject(index, 'tech', e.target.value)}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Describe what this project does..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Link</label>
                    <Input 
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={addProject}>Add Project</Button>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-4">
            {experience.map((exp, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <Input 
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Input 
                        value={exp.role}
                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration</label>
                    <Input 
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Key responsibilities and achievements..."
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={addExperience}>Add Experience</Button>
          </TabsContent>
          
          <TabsContent value="generate" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Skills (comma-separated)</label>
              <Textarea 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, Python, SQL..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={generatePortfolio} 
                disabled={isGenerating || !personalInfo.name || !template}
                className="flex-1 sm:flex-none"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Portfolio"}
              </Button>
              <Button variant="outline" onClick={previewPortfolio}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={downloadPortfolio}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}