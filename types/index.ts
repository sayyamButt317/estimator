export type EstimateStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "rejected"
  | "archived";

export type Priority = "low" | "medium" | "high" | "critical";

export type Complexity = "low" | "medium" | "high" | "very_high";

export type ConfidenceLevel = "low" | "medium" | "high";

export type RequirementCategory =
  | "functional"
  | "non_functional"
  | "technical"
  | "security"
  | "performance"
  | "business"
  | "acceptance_criteria"
  | "dependencies"
  | "out_of_scope";

export type SheetRowStatus = "pending" | "in_progress" | "completed" | "blocked";

export type ActivityType =
  | "created"
  | "updated"
  | "downloaded"
  | "shared"
  | "comment"
  | "ai_generated"
  | "requirement_updated";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: string;
}

export interface Estimate {
  id: string;
  estimateId: string;
  projectName: string;
  client: string;
  projectType: string;
  priority: Priority;
  status: EstimateStatus;
  complexity: Complexity;
  estimatedHours: number;
  hourlyRate: number;
  totalCost: number;
  timeline: string;
  createdDate: string;
  updatedDate: string;
  confidenceScore: number;
  owner: User;
  version: string;
  teamSize: string;
  profitMargin: number;
  description?: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: Priority;
  difficulty: Complexity;
  storyPoints: number;
  estimatedHours: number;
  assignedRole: string;
  notes?: string;
}

export interface SheetRow {
  id: string;
  epic?: string;
  module?: string;
  feature?: string;
  task: string;
  description: string;
  assignedRole: string;
  developerLevel: string;
  hours: number;
  hourlyRate: number;
  totalCost: number;
  complexity: Complexity;
  risk: Priority;
  priority: Priority;
  dependencies?: string;
  startDate?: string;
  endDate?: string;
  sprint?: string;
  status: SheetRowStatus;
  remarks?: string;
  isGroup?: boolean;
  groupKey?: string;
  children?: SheetRow[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  user: User;
  description: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  replies?: Comment[];
  resolved?: boolean;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: Priority;
  probability: Complexity;
  mitigation: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  assignee: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedHours: number;
  tasks: number;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: "active" | "completed" | "on_hold" | "planning";
  progress: number;
  estimates: number;
  totalBudget: number;
  deadline: string;
  team: User[];
}

export interface DashboardStats {
  totalProjects: number;
  activeEstimates: number;
  averageAccuracy: number;
  hoursEstimated: number;
  revenuePotential: number;
}

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  type: "improvement" | "warning" | "opportunity";
  impact: "low" | "medium" | "high";
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: User;
  uploadedAt: string;
}
