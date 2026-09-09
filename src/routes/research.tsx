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
  component: Research,
});

const findings = [
  {
    title: "Scheduling is the top switching trigger",
    body: "Teams evaluating productivity suites cite calendar coordination and meeting overhead as the first pain point, ahead of document search.",
  },
  {
    title: "Summarisation drives daily usage",
    body: "Products that summarise meetings see roughly twice the weekly active usage of products offering drafting alone.",
  },
  {
    title: "Buyers expect workspace-level controls",
    body: "Admin controls, retention settings and audit logs appear in most mid-market procurement checklists.",
  },
];

const sources = [
  { name: "Workplace Productivity Benchmark 2026", type: "Report" },
  { name: "Team collaboration tooling landscape", type: "Analyst note" },
  { name: "Customer interviews #8–#12", type: "Internal" },
  { name: "Competitor pricing pages review", type: "Desk research" },
];

const history = ["Churn drivers in SaaS onboarding", "Async meeting best practices", "AI note-taking tools comparison"];

function Research() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Research Assistant"
        description="Ask a question in plain language and get a structured brief you can paste into a doc — with sources attached."
        actions={
          <Button>
            <Sparkles className="size-4" /> Run research
          </Button>
        }
      />

      <Card className="shadow-card">
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor="question">Research question</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="question"
                className="pl-9"
                defaultValue="What matters most to mid-market teams choosing a productivity suite?"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button className="w-full md:w-auto">Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Research brief</CardTitle>
            <CardDescription>Sample output · generated from 4 sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Mid-market buyers judge productivity suites on how much meeting and coordination
              overhead they remove in the first two weeks. Drafting features win demos; summarisation
              and planning features keep teams active after onboarding.
            </p>
            <Separator />
            {findings.map((f) => (
              <div key={f.title} className="space-y-1">
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sources.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 rounded-xl border border-border p-3"
                >
                  <BookOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.type}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Recent searches</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {history.map((h) => (
                <Badge key={h} variant="secondary" className="cursor-pointer px-3 py-1.5">
                  {h}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
