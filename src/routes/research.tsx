import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Search, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkMate AI" },
      {
        name: "description",
        content: "Ask a question and get a structured brief with key findings and sources.",
      },
      { property: "og:title", content: "AI Research Assistant — WorkMate AI" },
      {
        property: "og:description",
        content: "Ask a question and get a structured brief with key findings and sources.",
      },
    ],
  }),
  component: Research;
});

function Research() {
  return null;
}
