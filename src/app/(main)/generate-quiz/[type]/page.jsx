"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Youtube } from "lucide-react";
import CustomForm from "@/components/QuizForms/CustomForm";
import PdfForm from "@/components/QuizForms/PdfForm";
import YoutubeForm from "@/components/QuizForms/YoutubeForm";

export default function GenerateQuizForm() {
  const params = useParams();
  const { type } = params;

  const formComponents = {
    custom: {
      title: "Generate Custom Quiz",
      icon: Brain,
      component: CustomForm,
    },
    pdf: {
      title: "Generate Quiz from PDF",
      icon: BookOpen,
      component: PdfForm,
    },
    youtube: {
      title: "Generate Quiz from YouTube",
      icon: Youtube,
      component: YoutubeForm,
    },
  };

  const {
    title,
    icon: Icon,
    component: FormComponent,
  } = formComponents[type] || {};

  if (!FormComponent) {
    return <div>Invalid quiz type</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto dark:bg-slate-800 dark:border-blue-700 border-[0.5px]">
        <CardHeader>
          <CardTitle className="text-[#4173F2] dark:text-[#315BB0] flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormComponent />
        </CardContent>
      </Card>
    </div>
  );
}
