import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

const JobDescription = () => {
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
          />
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <Textarea
            placeholder="Paste job description here..."
            className="min-h-[200px] w-full"
          />
        </div>
        <Button className="w-full">
          Analyze
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobDescription;