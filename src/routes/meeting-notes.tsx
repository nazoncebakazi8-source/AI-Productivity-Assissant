import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Sparkles, Upload } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkMate AI" },
      {
        name: "description",
        content: "Turn long meeting transcripts into summaries, decisions and action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkMate AI" },
      {
        property: "og:description",
        content: "Turn long meeting transcripts into summaries, decisions and action items.",
      },
    ],
  }),
  component: MeetingNotes,
});

const recent = [
  { title: "Weekly Product Sync", when: "Today · 09:00", mins: 45, items: 6 },
  { title: "Northwind pilot call", when: "Yesterday · 15:30", mins: 30, items: 4 },
  { title: "Design critique — onboarding", when: "Mon · 11:00", mins: 60, items: 8 },
];

const summary = [
  "Pilot with Northwind confirmed for 22 September, starting with 12 operations seats.",
  "Onboarding checklist owner is Sipho; first draft due Friday.",
  "Pricing review postponed to the first week of October.",
];

const actions = [
  { task: "Share onboarding checklist", owner: "Sipho M.", due: "Fri 11 Sep" },
  { task: "Send pilot invites", owner: "Ncebakazi N.", due: "Mon 14 Sep" },
  { task: "Draft pricing options", owner: "Lerato K.", due: "Wed 30 Sep" },
];

function MeetingNotes() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Paste a transcript or upload notes — WorkMate returns a summary, decisions and owner-tagged action items."
        actions={
          <>
            <Button variant="outline">
              <Upload className="size-4" /> Upload notes
            </Button>
            <Button>
              <Sparkles className="size-4" /> Summarize
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>Weekly Product Sync · 45 min · 5 participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transcript">Meeting text</Label>
              <Textarea
                id="transcript"
                rows={16}
                className="leading-relaxed"
                defaultValue={`[09:02] Ncebakazi: Let's confirm the Northwind pilot date...
[09:07] Sipho: Operations can take 12 seats from the 22nd.
[09:15] Lerato: Pricing review isn't ready — can we push to October?
[09:28] Ncebakazi: Agreed. Sipho owns the onboarding checklist for Friday.`}
              />
            </div>
            <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              Drag and drop a .txt or .docx file, or use “Upload notes”.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Summary</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="size-4" /> Export
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger value="summary">Key points</TabsTrigger>
                  <TabsTrigger value="actions">Action items</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4 space-y-3">
                  {summary.map((s) => (
                    <p key={s} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {s}
                    </p>
                  ))}
                </TabsContent>
                <TabsContent value="actions" className="mt-4 space-y-2">
                  {actions.map((a) => (
                    <div
                      key={a.task}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{a.task}</p>
                        <p className="text-xs text-muted-foreground">{a.owner}</p>
                      </div>
                      <Badge variant="secondary">{a.due}</Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Recent summaries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recent.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center gap-3 rounded-xl border border-border p-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <FileText className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.when} · {r.mins} min · {r.items} action items
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
