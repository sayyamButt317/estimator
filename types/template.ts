export type DifficultyLevel = "easy" | "medium" | "hard" | "complex";

export interface CreateTemplateFormValues {
  name: string;
  description: string;
  category: string;
  projectType: string;
  estimatedHours: number;
  difficulty: DifficultyLevel;
  tags: string[];
  allowCustomization: boolean;
  includeSampleData: boolean;
  shareWithTeam: boolean;
}

export interface UseTemplateFormValues {
  mode: "create" | "draft";
  estimateName: string;
  client: string;
}

export interface TemplatePreviewRow {
  id: string;
  name: string;
  hours: number;
  rate: number;
  amount: number;
  isGroup?: boolean;
  children?: TemplatePreviewRow[];
}
