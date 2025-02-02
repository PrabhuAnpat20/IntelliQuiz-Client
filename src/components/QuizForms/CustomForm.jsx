"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomForm() {
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating custom quiz:", { topic, subtopic, numQuestions });
  };

  return (
    <form onSubmit={handleSubmit} className=" dark:bg-slate-800">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label>Topic</Label>
          <Select onValueChange={setTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Subtopic</Label>
          <Select onValueChange={setSubtopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subtopic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="algebra">Algebra</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="world-history">World History</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Number of Questions</Label>
          <Input
            type="number"
            min="1"
            max="50"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            placeholder="Enter number of questions"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" className="dark:bg-gray-600">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="bg-[#4173F2] text-white dark:bg-[#315BB0]"
        >
          Generate Quiz
        </Button>
      </div>
    </form>
  );
}
