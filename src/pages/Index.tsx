import React from "react";
import ResumeUpload from "@/components/ResumeUpload";
import JobDescription from "@/components/JobDescription";
import ModelSelector from "@/components/ModelSelector";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Index = () => {
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
          <div className="mb-8">
            <ModelSelector />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ResumeUpload />
              <JobDescription />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
              <h2 className="text-2xl font-semibold mb-4">Preview</h2>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg mb-4">
                {/* Preview content will go here */}
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline">
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