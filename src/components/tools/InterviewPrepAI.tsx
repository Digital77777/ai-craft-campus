import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Play, RotateCcw, Mic, MicOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const interviewTypes = [
  { id: "technical", name: "Technical Interview", description: "Coding & problem-solving" },
  { id: "behavioral", name: "Behavioral Interview", description: "Soft skills & experience" },
  { id: "system-design", name: "System Design", description: "Architecture & scaling" },
  { id: "frontend", name: "Frontend Specific", description: "React, JS, CSS focused" },
  { id: "backend", name: "Backend Specific", description: "APIs, databases, servers" }
];

const sampleQuestions = {
  technical: [
    "Implement a function to reverse a linked list",
    "Find the first non-repeating character in a string",
    "Design a LRU cache with O(1) operations"
  ],
  behavioral: [
    "Tell me about a time you faced a difficult challenge",
    "How do you handle working with difficult team members?",
    "Describe a project you're most proud of"
  ],
  "system-design": [
    "Design a URL shortener like bit.ly",
    "How would you design a chat application?",
    "Design a distributed cache system"
  ]
};

export default function InterviewPrepAI() {
  const [selectedType, setSelectedType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const startSession = () => {
    if (!selectedType) {
      toast({ title: "Error", description: "Please select an interview type", variant: "destructive" });
      return;
    }
    
    setSessionStarted(true);
    setQuestionIndex(0);
    const questions = sampleQuestions[selectedType as keyof typeof sampleQuestions] || sampleQuestions.technical;
    setCurrentQuestion(questions[0]);
    setScore(0);
    setAnswer("");
    setFeedback("");
    toast({ title: "Session started", description: "Good luck with your interview prep!" });
  };

  const nextQuestion = () => {
    if (!answer.trim()) {
      toast({ title: "Error", description: "Please provide an answer first", variant: "destructive" });
      return;
    }

    // Simulate AI feedback
    const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const mockFeedback = `Good answer! Your response demonstrates ${selectedType === 'technical' ? 'solid problem-solving skills' : 'strong communication abilities'}. Consider elaborating more on specific examples.`;
    
    setScore(prev => prev + mockScore);
    setFeedback(mockFeedback);
    
    setTimeout(() => {
      const questions = sampleQuestions[selectedType as keyof typeof sampleQuestions] || sampleQuestions.technical;
      const nextIndex = questionIndex + 1;
      
      if (nextIndex < questions.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setAnswer("");
        setFeedback("");
      } else {
        finishSession();
      }
    }, 3000);
  };

  const finishSession = () => {
    const avgScore = Math.round(score / (questionIndex + 1));
    toast({ 
      title: "Session complete!", 
      description: `Average score: ${avgScore}%. Great job!` 
    });
    setSessionStarted(false);
  };

  const restartSession = () => {
    setSessionStarted(false);
    setQuestionIndex(0);
    setScore(0);
    setAnswer("");
    setFeedback("");
    setCurrentQuestion("");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({ 
      title: isRecording ? "Recording stopped" : "Recording started", 
      description: "Demo mode - voice recognition not implemented" 
    });
  };

  if (!sessionStarted) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Interview Prep AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-3 block">Select Interview Type</label>
            <div className="grid gap-3">
              {interviewTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedType === type.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    {selectedType === type.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <Button onClick={startSession} className="w-full" disabled={!selectedType}>
            <Play className="h-4 w-4 mr-2" />
            Start Interview Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Interview Session
          </div>
          <Badge variant="secondary">
            Question {questionIndex + 1} / {sampleQuestions[selectedType as keyof typeof sampleQuestions]?.length || 3}
          </Badge>
        </CardTitle>
        <Progress value={((questionIndex + 1) / (sampleQuestions[selectedType as keyof typeof sampleQuestions]?.length || 3)) * 100} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <h3 className="font-medium mb-2">Question:</h3>
          <p>{currentQuestion}</p>
        </div>

        {feedback && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-primary mb-2">AI Feedback:</h4>
            <p className="text-sm">{feedback}</p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Your Answer</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleRecording}
              className={isRecording ? "bg-red-500/10 border-red-500" : ""}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isRecording ? "Stop Recording" : "Voice Answer"}
            </Button>
          </div>
          <Textarea 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here or use voice recording..."
            rows={6}
            disabled={!feedback && questionIndex > 0 && feedback !== ""}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={nextQuestion} 
            disabled={!answer.trim() || feedback !== ""}
            className="flex-1"
          >
            {questionIndex === (sampleQuestions[selectedType as keyof typeof sampleQuestions]?.length || 3) - 1 
              ? "Finish Session" 
              : "Next Question"
            }
          </Button>
          <Button variant="outline" onClick={restartSession}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
        </div>

        {score > 0 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Current Average: <span className="font-medium">{Math.round(score / (questionIndex + 1))}%</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}