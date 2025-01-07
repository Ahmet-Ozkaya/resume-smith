import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ModelSelector = () => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <Select defaultValue="default">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default AI Model</SelectItem>
          <SelectItem value="gpt4">GPT-4</SelectItem>
          <SelectItem value="claude">Claude</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;