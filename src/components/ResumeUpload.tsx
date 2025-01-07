import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const ResumeUpload = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-200 hover:border-gray-300 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 text-center mb-4">
            Drag and drop your resume here, or click to select
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="resume-upload"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("resume-upload")?.click()}
            className="w-full max-w-xs"
          >
            Select File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;