export type NewEstimateFlowType = "scratch" | "template" | "ai" | "import";

export interface FromScratchFormValues {
  estimateName: string;
  project: string;
  client: string;
}

export interface AIGenerateFormValues {
  projectDescription: string;
  projectType: string;
  complexity: "low" | "medium" | "high";
}
