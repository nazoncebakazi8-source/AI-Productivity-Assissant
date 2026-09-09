import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — WorkMate AI" },
      {
        name: "description",
        content: "Chat with WorkMate about your projects, tasks and documents in one place.",
      },
      { property: "og:title", content: "AI Chatbot — WorkMate AI" },
      {
        property: "og:description",
        content: "Chat with WorkMate about your projects, tasks and documents in one place.",
      },
    ],
  }),
  component: Chatbot,
});

const messages = [
  { from: "user", text: "What's left before the Northwind pilot starts?" },
  {
    from: "ai",
    text: "Three things: Sipho's onboarding checklist (due Friday), your pilot invites (Monday) and the seat list approval. Everything else on the pilot plan is complete.",
  },
  { from: "user", text: "Draft a short nudge to Sipho about the checklist." },
  {
    from: "ai",
    text: "Here's a draft: “Hi Sipho — quick nudge on the onboarding checklist for Northwind. Friday still works? Happy to review a rough version today if that helps.” Want me to send it from the Email Generator?",
  },
];

const suggestions = [
  "Summarize today's meetings",
  "What should I focus on next?",
  "Turn this thread into tasks",
  "Draft a status update",
];

const threads = [
  { title: "Northwind pilot", when: "Active now" },
  { title: "Launch week comms", when: "Yesterday" },
  { title: "Q3 roadmap questions", when: "Mon" },
];

function Chatbot() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Chatbot"
        description="Ask WorkMate anything about your projects — it keeps the context of your tasks, notes and drafts."
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="order-2 shadow-card lg:order-1">
          <CardHeader>
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {threads.map((t) => (
              <button
                key={t.title}
                type="button"
                className="w-full rounded-xl border border-border p-3 text-left transition-colors hover:bg-muted/60"
              >
                <span className="block text-sm font-medium">{t.title}</span>
                <span className="block text-xs text-muted-foreground">{t.when}</span>
              </button>
            ))}
            <Button variant="outline" className="w-full">
              <Sparkles className="size-4" /> New chat
            </Button>
          </CardContent>
        </Card>

        <Card className="order-1 flex flex-col shadow-card lg:order-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Northwind pilot</CardTitle>
            <CardDescription>Demo conversation — no AI connected yet</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <div className="flex-1 space-y-4 overflow-y-auto pr-1" role="log" aria-label="Conversation">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex gap-3", m.from === "user" && "flex-row-reverse")}
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback
                      className={cn(
                        "text-xs font-semibold",
                        m.from === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground",
                      )}
                    >
                      {m.from === "user" ? "NN" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%]",
                      m.from === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Badge key={s} variant="secondary" className="cursor-pointer px-3 py-1.5">
                  {s}
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="sr-only">
                Message WorkMate
              </Label>
              <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2">
                <Textarea
                  id="message"
                  rows={2}
                  placeholder="Ask WorkMate anything…"
                  className="min-h-0 resize-none border-0 shadow-none focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon" aria-label="Attach file">
                  <Paperclip className="size-4" />
                </Button>
                <Button size="icon" aria-label="Send message">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
