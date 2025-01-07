import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const JobDescription = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url && !description) {
      toast({
        title: "Missing input",
        description: "Please provide either a job posting URL or description",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically make an API call to analyze the job description
      // For now, we'll just show a success toast
      toast({
        title: "Analysis started",
        description: "Your job description is being analyzed...",
      });

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Analysis complete",
        description: "Job description has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the job description.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Job Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="Paste job posting URL"
            className="w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <Textarea
            placeholder="Paste job description here..."
            className="min-h-[200px] w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button 
          className="w-full"
          onClick={handleAnalyze}
        >
          Analyze
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobDescription;