import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Your day at a glance",
  },
  {
    to: "/email-generator",
    label: "Smart Email Generator",
    icon: Mail,
    description: "Draft polished emails in seconds",
  },
  {
    to: "/meeting-notes",
    label: "Meeting Notes Summarizer",
    icon: NotebookPen,
    description: "Turn transcripts into decisions",
  },
  {
    to: "/task-planner",
    label: "AI Task Planner",
    icon: ListChecks,
    description: "Plan and prioritise your week",
  },
  {
    to: "/research",
    label: "AI Research Assistant",
    icon: Search,
    description: "Briefs with sources you can trust",
  },
  {
    to: "/chatbot",
    label: "AI Chatbot",
    icon: MessageSquare,
    description: "Ask anything about your work",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Workspace and account preferences",
  },
];
