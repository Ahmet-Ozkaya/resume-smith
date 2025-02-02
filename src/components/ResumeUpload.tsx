import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onResumeContent: (content: string) => void;
}

const ResumeUpload = ({ onResumeContent }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const readFileContent = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      // Validate file type
      const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'));
      
      if (!validTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Word document, or text file",
          variant: "destructive",
        });
        return;
      }

      setFile(uploadedFile);
      try {
        const content = await readFileContent(uploadedFile);
        onResumeContent(content);
        toast({
          title: "Resume uploaded",
          description: `File "${uploadedFile.name}" has been uploaded and processed successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error reading file",
          description: "Failed to read the file content. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Create a new input element
      const input = document.createElement('input');
      input.type = 'file';
      
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      input.files = dataTransfer.files;

      // Create a synthetic change event
      const changeEvent = new Event('change', { bubbles: true });
      Object.defineProperty(changeEvent, 'target', { value: input });

      handleFileUpload(changeEvent as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-200 hover:border-gray-300 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 text-center mb-4">
            {file ? `Selected: ${file.name}` : "Drag and drop your resume here, or click to select"}
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
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