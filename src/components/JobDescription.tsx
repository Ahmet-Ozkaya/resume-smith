import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface JobDescriptionProps {
  onAnalysisComplete: (resumeContent: string, coverLetter: string) => void;
  uploadedResumeText?: string;
}

const JobDescription = ({ onAnalysisComplete, uploadedResumeText }: JobDescriptionProps) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const extractKeywords = (text: string): string[] => {
    // Simple keyword extraction (could be enhanced with NLP libraries)
    const commonWords = new Set(['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'with', 'a', 'an']);
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));
  };

  const analyzeContent = (jobText: string, resumeText: string = "") => {
    const jobKeywords = new Set(extractKeywords(jobText));
    const resumeKeywords = new Set(extractKeywords(resumeText));

    // Find missing skills/keywords
    const missingSkills = Array.from(jobKeywords)
      .filter(keyword => !resumeKeywords.has(keyword));

    // Generate enhanced resume content
    const enhancedResume = generateEnhancedResume(resumeText, jobText, missingSkills);
    const coverLetter = generateCoverLetter(jobText, missingSkills);

    return { enhancedResume, coverLetter, missingSkills };
  };

  const generateEnhancedResume = (originalResume: string, jobDescription: string, missingSkills: string[]) => {
    const relevantExperience = originalResume || "Previous work experience";
    
    return `ENHANCED RESUME
-----------------
[Tailored for position based on job description${url ? ' from URL' : ''}: ${url || description}]

Professional Summary:
- Experienced professional with demonstrated expertise in required skills
- Actively developing competency in: ${missingSkills.join(', ')}
- Strong foundation in existing skills with quick learning capabilities

Key Skills:
${Array.from(new Set(extractKeywords(jobDescription)))
  .map(skill => `- ${skill}`)
  .join('\n')}

Relevant Experience:
${relevantExperience}

Additional Skills Development:
- Currently enhancing expertise in: ${missingSkills.join(', ')}
- Actively pursuing professional development in identified areas
`;
  };

  const generateCoverLetter = (jobDescription: string, missingSkills: string[]) => {
    return `Dear Hiring Manager,

I am writing to express my strong interest in the position at your company. After carefully reviewing the job description${url ? ' from URL' : ''}: ${url || description}, I am confident in my ability to contribute effectively to your team.

While I have extensive experience in many of the required areas, I am particularly excited about the opportunity to develop my skills further in ${missingSkills.join(', ')}. I am a quick learner and have a proven track record of rapidly acquiring new competencies.

My background includes relevant experience in ${extractKeywords(jobDescription).slice(0, 3).join(', ')}, and I am actively expanding my expertise to encompass all aspects of the role.

I look forward to discussing how my skills and enthusiasm align with your team's needs.

Best regards,
[Your name]`;
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

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const jobText = description || url;
      const { enhancedResume, coverLetter, missingSkills } = analyzeContent(jobText, uploadedResumeText);

      onAnalysisComplete(enhancedResume, coverLetter);

      toast({
        title: "Analysis complete",
        description: missingSkills.length > 0 
          ? `Identified ${missingSkills.length} skills to develop: ${missingSkills.join(', ')}`
          : "Your profile matches well with the job requirements!",
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