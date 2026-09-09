import { createFileRoute } from "@tanstack/react-router";
import { Copy, RefreshCw, Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkMate AI" },
      {
        name: "description",
        content: "Draft professional emails with the right tone, length and call to action.",
      },
      { property: "og:title", content: "Smart Email Generator — WorkMate AI" },
      {
        property: "og:description",
        content: "Draft professional emails with the right tone, length and call to action.",
      },
    ],
  }),
  component: EmailGenerator,
});

const templates = ["Client follow-up", "Project update", "Meeting request", "Polite decline"];

const sample = `Hi Thandi,

Thank you for making time yesterday. Here's a short recap of what we agreed:

• Pilot starts 22 September with the operations team (12 seats)
• We'll share the onboarding checklist by Friday
• Pricing review moves to the first week of October

If anything above looks off, just reply and I'll update it. Otherwise I'll send the pilot invites Monday morning.

Kind regards,
Ncebakazi Nazo
Product Lead, WorkMate AI`;

function EmailGenerator() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Email Generator"
        description="Describe the message and WorkMate drafts a clear, professional email you can send in one edit."
        actions={
          <>
            <Button variant="outline">
              <RefreshCw className="size-4" /> New draft
            </Button>
            <Button>
              <Sparkles className="size-4" /> Generate email
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Brief</CardTitle>
            <CardDescription>The more context, the better the draft.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" placeholder="Thandi Mokoena, Northwind Ltd." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">What is the email about?</Label>
              <Textarea
                id="purpose"
                rows={5}
                defaultValue="Recap yesterday's pilot call, confirm the start date and next steps."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select defaultValue="professional">
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Select defaultValue="short">
                  <SelectTrigger id="length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Start from a template</Label>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <Badge key={t} variant="secondary" className="cursor-pointer px-3 py-1.5">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-3">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Draft preview</CardTitle>
              <CardDescription>Sample output · edit before sending</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="size-4" /> Copy
              </Button>
              <Button size="sm">
                <Send className="size-4" /> Send
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" defaultValue="Pilot recap and next steps — Northwind x WorkMate" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Email body</Label>
              <Textarea id="body" rows={16} defaultValue={sample} className="leading-relaxed" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
