import React, { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescription from "@/components/JobDescription";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [previewContent, setPreviewContent] = useState<string>("");
  const [coverLetterContent, setCoverLetterContent] = useState<string>("");
  const [resumeContent, setResumeContent] = useState<string>("");
  const { toast } = useToast();

  const handleAnalysisComplete = (resumeContent: string, coverLetter: string) => {
    setPreviewContent(resumeContent);
    setCoverLetterContent(coverLetter);
  };

  const handleResumeContent = (content: string) => {
    setResumeContent(content);
  };

  const handleDownload = (type: 'resume' | 'cover-letter') => {
    const content = type === 'resume' ? previewContent : coverLetterContent;
    const filename = type === 'resume' ? 'tailored-resume.txt' : 'cover-letter.txt';

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `Your ${type === 'resume' ? 'resume' : 'cover letter'} is being downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-900">Resume Maker</h1>
          <p className="text-center text-gray-600 mt-2">Create tailored resumes for your dream job</p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ResumeUpload onResumeContent={handleResumeContent} />
              <JobDescription 
                onAnalysisComplete={handleAnalysisComplete}
                uploadedResumeText={resumeContent}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
              <h2 className="text-2xl font-semibold mb-4">Preview</h2>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg mb-4 p-4 overflow-auto">
                {previewContent ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {previewContent}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Preview will appear here after analysis
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => handleDownload('resume')}
                  disabled={!previewContent}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDownload('cover-letter')}
                  disabled={!coverLetterContent}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cover Letter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;