import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkMate AI" },
      {
        name: "description",
        content: "Turn goals into a prioritised plan with focus blocks, owners and due dates.",
      },
      { property: "og:title", content: "AI Task Planner — WorkMate AI" },
      {
        property: "og:description",
        content: "Turn goals into a prioritised plan with focus blocks, owners and due dates.",
      },
    ],
  }),
  component: TaskPlanner,
});

const columns = [
  {
    name: "Today",
    tone: "High focus",
    tasks: [
      { title: "Send Q3 roadmap recap", priority: "High", time: "30 min" },
      { title: "Review onboarding copy v3", priority: "Medium", time: "45 min" },
      { title: "Approve pilot invite list", priority: "High", time: "15 min" },
    ],
  },
  {
    name: "Tomorrow",
    tone: "Deep work",
    tasks: [
      { title: "Prep pricing workshop agenda", priority: "High", time: "1 h" },
      { title: "Interview debrief with Sipho", priority: "Low", time: "30 min" },
    ],
  },
  {
    name: "This week",
    tone: "Scheduled",
    tasks: [
      { title: "Competitor scan: scheduling tools", priority: "Medium", time: "2 h" },
      { title: "Draft launch-week comms", priority: "Medium", time: "1.5 h" },
      { title: "Close out design critique notes", priority: "Low", time: "20 min" },
    ],
  },
];

const priorityVariant: Record<string, "default" | "secondary" | "outline"> = {
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

function TaskPlanner() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Task Planner"
        description="Describe your goals for the week and WorkMate builds a realistic plan around your calendar."
        actions={
          <>
            <Button variant="outline">
              <Plus className="size-4" /> Add task
            </Button>
            <Button>
              <Sparkles className="size-4" /> Generate plan
            </Button>
          </>
        }
      />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Plan a new block of work</CardTitle>
          <CardDescription>Sample inputs shown below.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="goal">Goal</Label>
            <Input id="goal" defaultValue="Ship launch-week comms and close the Northwind pilot" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" defaultValue="2026-09-18" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Daily capacity</Label>
            <Select defaultValue="4">
              <SelectTrigger id="capacity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 focus hours</SelectItem>
                <SelectItem value="4">4 focus hours</SelectItem>
                <SelectItem value="6">6 focus hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <Card key={col.name} className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{col.name}</CardTitle>
                <CardDescription>{col.tone}</CardDescription>
              </div>
              <Badge variant="secondary">{col.tasks.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              {col.tasks.map((t) => (
                <label
                  key={t.title}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/60"
                >
                  <Checkbox className="mt-0.5" aria-label={`Mark ${t.title} complete`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{t.title}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" aria-hidden="true" /> {t.time}
                    </span>
                  </span>
                  <Badge variant={priorityVariant[t.priority]}>{t.priority}</Badge>
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Week completion</CardTitle>
          <CardDescription>27 of 35 tasks done</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={77} aria-label="Week completion" />
        </CardContent>
      </Card>
    </div>
  );
}
