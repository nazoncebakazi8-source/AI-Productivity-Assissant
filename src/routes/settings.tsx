import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WorkMate AI" },
      {
        name: "description",
        content: "Manage your WorkMate AI profile, workspace, notifications and assistant tone.",
      },
      { property: "og:title", content: "Settings — WorkMate AI" },
      {
        property: "og:description",
        content: "Manage your profile, workspace, notifications and assistant preferences.",
      },
    ],
  }),
  component: Settings,
});

const toggles = [
  { id: "daily", label: "Daily plan email", desc: "A summary of your day at 07:30." },
  { id: "mentions", label: "Mentions and comments", desc: "When a teammate tags you." },
  { id: "summaries", label: "Meeting summaries", desc: "As soon as a summary is ready." },
  { id: "product", label: "Product updates", desc: "Occasional news about new features." },
];

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, workspace and how the assistant behaves."
        actions={<Button>Save changes</Button>}
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="assistant">Assistant</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your profile</CardTitle>
              <CardDescription>This is how teammates see you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-accent text-accent-foreground text-lg font-semibold">
                    NN
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline">Upload photo</Button>
                  <Button variant="ghost">Remove</Button>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue="Ncebakazi Nazo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ncebakazi@workmate.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Product Lead" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time zone</Label>
                  <Select defaultValue="jhb">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jhb">Africa/Johannesburg (UTC+2)</SelectItem>
                      <SelectItem value="lon">Europe/London (UTC+1)</SelectItem>
                      <SelectItem value="nyc">America/New_York (UTC-4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  defaultValue="Product lead focused on onboarding and customer research."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>Shared settings for everyone on your plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="workspace">Workspace name</Label>
                  <Input id="workspace" defaultValue="WorkMate — Product Team" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lang">Default language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="af">Afrikaans</SelectItem>
                      <SelectItem value="xh">isiXhosa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Allow teammates to reuse my templates</p>
                  <p className="text-sm text-muted-foreground">
                    Email and summary templates become visible to the workspace.
                  </p>
                </div>
                <Switch defaultChecked aria-label="Allow template sharing" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Keep drafts for 90 days</p>
                  <p className="text-sm text-muted-foreground">
                    Older drafts are deleted automatically.
                  </p>
                </div>
                <Switch aria-label="Keep drafts for 90 days" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Assistant preferences</CardTitle>
              <CardDescription>How WorkMate writes and plans for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tone">Default writing tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="focus">Preferred focus block</Label>
                  <Select defaultValue="morning">
                    <SelectTrigger id="focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Mornings</SelectItem>
                      <SelectItem value="afternoon">Afternoons</SelectItem>
                      <SelectItem value="split">Split day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Email signature</Label>
                <Textarea
                  id="signature"
                  rows={3}
                  defaultValue={"Kind regards,\nNcebakazi Nazo\nProduct Lead, WorkMate AI"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what reaches your inbox.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {toggles.map((t, i) => (
                <div key={t.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 3} aria-label={t.label} />
                  </div>
                  {i < toggles.length - 1 ? <Separator className="mt-4" /> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
