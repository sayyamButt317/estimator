import type { User, Workspace } from "@/types";

export const currentUser: User = {
  id: "user-1",
  name: "Sarah Johnson",
  email: "sarah@acmecorp.com",
  avatar: "SJ",
  role: "Project Manager",
};

export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Alex Chen",
    email: "alex@acmecorp.com",
    avatar: "AC",
    role: "Senior Developer",
  },
  {
    id: "user-3",
    name: "Maria Garcia",
    email: "maria@acmecorp.com",
    avatar: "MG",
    role: "UX Designer",
  },
  {
    id: "user-4",
    name: "James Wilson",
    email: "james@acmecorp.com",
    avatar: "JW",
    role: "Tech Lead",
  },
];

export const workspaces: Workspace[] = [
  { id: "ws-1", name: "Acme Corp", plan: "Enterprise" },
  { id: "ws-2", name: "Side Projects", plan: "Pro" },
];
