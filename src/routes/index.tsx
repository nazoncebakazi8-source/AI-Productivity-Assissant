import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  NotebookPen,
  Search,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — WorkMate AI" },
      {
        name: "description",
        content:
          "Your WorkMate AI dashboard: productivity stats, quick actions, upcoming tasks and recent activity.",
      },
      { property: "og:title", content: "Dashboard — WorkMate AI" },
      {
        property: "og:description",
        content: "Productivity stats, quick actions, upcoming tasks and recent activity.",
      },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  {
    to: "/email-generator",
    icon: Mail,
    title: "Draft an email",
    body: "Client follow-ups, updates and replies in your tone.",
  },
  {
    to: "/meeting-notes",
    icon: NotebookPen,
    title: "Summarize a meeting",
    body: "Paste notes, get decisions and action items.",
  },
  {
    to: "/task-planner",
    icon: Sparkles,
    title: "Plan my week",
    body: "Turn goals into a prioritised schedule.",
  },
  {
    to: "/research",
    icon: Search,
    title: "Research a topic",
    body: "Concise briefs with sources attached.",
  },
];

const tasks = [
  { title: "Send Q3 roadmap recap to Thandi", due: "Today · 14:00", tag: "Email", done: false },
  { title: "Review onboarding copy v3", due: "Today · 16:30", tag: "Review", done: false },
  { title: "Prep pricing workshop agenda", due: "Tomorrow · 09:00", tag: "Planning", done: false },
  { title: "Summarize customer interview #12", due: "Thu · 11:00", tag: "Notes", done: true },
  { title: "Competitor scan: scheduling tools", due: "Fri · 13:00", tag: "Research", done: false },
];

const activity = [
  {
    who: "You",
    initials: "NN",
    what: "generated a follow-up email for Northwind Ltd.",
    when: "12 min ago",
  },
  {
    who: "WorkMate",
    initials: "AI",
    what: "summarized “Weekly Product Sync” into 6 action items.",
    when: "1 hr ago",
  },
  { who: "Sipho M.", initials: "SM", what: "shared a research brief on churn.", when: "3 hrs ago" },
  { who: "You", initials: "NN", what: "created a task plan for launch week.", when: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-brand-gradient p-6 text-primary-foreground shadow-float sm:p-8">
        <Badge variant="secondary" className="mb-3">
          Wednesday, 9 September
        </Badge>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Good morning, Ncebakazi 👋
        </h1>
        <p className="mt-2 max-w-xl text-sm opacity-90">
          You have 4 tasks due today and 2 meetings to summarize. WorkMate saved you 3.2 hours this
          week.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link to="/task-planner">
              Plan my day <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20">
            <Link to="/chatbot">Ask WorkMate</Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="stats-heading" className="space-y-3">
        <h2 id="stats-heading" className="text-lg font-semibold">
          Productivity this week
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Hours saved" value="3.2 h" change="+18% vs last week" icon={Timer} />
          <StatCard label="Tasks completed" value="27" change="+6 tasks" icon={CheckCircle2} />
          <StatCard label="Emails drafted" value="14" change="+4 drafts" icon={Mail} />
          <StatCard
            label="Avg. response time"
            value="42 min"
            change="-11 min"
            trend="down"
            icon={Clock}
          />
        </div>
      </section>

      <section aria-labelledby="quick-heading" className="space-y-3">
        <h2 id="quick-heading" className="text-lg font-semibold">
          Quick actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((a) => (
            <Link key={a.to} to={a.to} className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Card className="h-full shadow-card transition-shadow group-hover:shadow-float">
                <CardContent className="space-y-3 p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <a.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Upcoming tasks</CardTitle>
              <CardDescription>5 tasks across today and this week</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/task-planner">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((t) => (
              <label
                key={t.title}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/60"
              >
                <Checkbox defaultChecked={t.done} aria-label={`Mark ${t.title} complete`} />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-medium ${t.done ? "text-muted-foreground line-through" : ""}`}
                  >
                    {t.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t.due}</span>
                </span>
                <Badge variant="secondary">{t.tag}</Badge>
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Weekly goal</CardTitle>
              <CardDescription>27 of 35 tasks completed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={77} aria-label="Weekly goal progress" />
              <p className="text-sm text-muted-foreground">
                You're ahead of pace — 8 tasks left before Friday.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activity.map((a) => (
                <div key={a.what} className="flex gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                      {a.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{a.who}</span> {a.what}
                    <span className="mt-0.5 block text-xs">{a.when}</span>
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="flex items-start gap-3 p-5">
              <Zap className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Tip: keep a chat open while you work —{" "}
                <Link to="/chatbot" className="font-medium text-primary underline-offset-4 hover:underline">
                  WorkMate Chat
                </Link>{" "}
                remembers your current project context.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="sr-only">
        <MessageSquare aria-hidden="true" />
      </p>
    </div>
  );
}
