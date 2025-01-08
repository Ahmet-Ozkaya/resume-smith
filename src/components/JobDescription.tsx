import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { callDeepseekApi } from "@/services/deepseekApi";

interface JobDescriptionProps {
  onAnalysisComplete: (resumeContent: string, coverLetter: string) => void;
  uploadedResumeText?: string;
}

const JobDescription = ({ onAnalysisComplete, uploadedResumeText }: JobDescriptionProps) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const apiUrl = "https://api.deepseek.com/v1/chat/completions";

  // Initialize API key from localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem('deepseekApiKey');
    if (!storedApiKey) {
      localStorage.setItem('deepseekApiKey', 'sk-37a9809e7b6043bca05378f0f04e823c');
    }
  }, []);

  const extractKeywords = (text: string | undefined): string[] => {
    if (!text) return [];
    
    const commonWords = new Set(['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'with', 'a', 'an']);
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));
  };

  const generatePrompt = (jobText: string, resumeText: string, missingSkills: string[]) => {
    return `
      Job Description: ${jobText}
      
      Current Resume: ${resumeText}
      
      Missing Skills: ${missingSkills.join(', ')}
      
      Please generate a professional resume that incorporates the job requirements and addresses the missing skills. 
      Format the resume professionally and highlight relevant experience and skills.
      Also, generate a matching cover letter that emphasizes how the candidate's experience aligns with the job requirements.
      
      Return the response in the following format:
      ---RESUME---
      [Resume content here]
      ---COVER_LETTER---
      [Cover letter content here]
    `;
  };

  const analyzeContent = async (jobText: string, resumeText: string = "") => {
    if (!jobText) {
      throw new Error("Job description is required");
    }

    const jobKeywords = new Set(extractKeywords(jobText));
    const resumeKeywords = new Set(extractKeywords(resumeText));
    const missingSkills = Array.from(jobKeywords)
      .filter(keyword => !resumeKeywords.has(keyword));

    const apiKey = localStorage.getItem('deepseekApiKey');
    if (!apiKey) {
      toast({
        title: "API Key Error",
        description: "Could not retrieve API key. Please refresh the page.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const prompt = generatePrompt(jobText, resumeText, missingSkills);
      const response = await callDeepseekApi(prompt, apiKey, apiUrl);
      
      if (!response) {
        throw new Error("No response received from API");
      }

      const parts = response.split('---COVER_LETTER---');
      if (parts.length !== 2) {
        throw new Error("Invalid response format from API");
      }

      const [resume, coverLetter] = parts;
      const cleanedResume = resume.replace('---RESUME---', '').trim();
      const cleanedCoverLetter = coverLetter.trim();

      if (!cleanedResume || !cleanedCoverLetter) {
        throw new Error("Invalid response content from API");
      }

      return {
        enhancedResume: cleanedResume,
        coverLetter: cleanedCoverLetter,
        missingSkills,
      };
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };

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
      toast({
        title: "Analysis started",
        description: "Analyzing job description and comparing with your resume...",
      });

      const jobText = description || url;
      const result = await analyzeContent(jobText, uploadedResumeText || "");
      
      if (result) {
        const { enhancedResume, coverLetter, missingSkills } = result;
        onAnalysisComplete(enhancedResume, coverLetter);

        toast({
          title: "Analysis complete",
          description: missingSkills.length > 0 
            ? `Identified ${missingSkills.length} skills to develop: ${missingSkills.join(', ')}`
            : "Your profile matches well with the job requirements!",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "There was an error analyzing the job description.",
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
