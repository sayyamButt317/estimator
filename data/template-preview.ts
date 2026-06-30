import type { TemplatePreviewRow } from "@/types/template";

export const defaultTemplatePreviewRows: TemplatePreviewRow[] = [
  {
    id: "g1",
    name: "Project Management",
    hours: 40,
    rate: 120,
    amount: 4800,
    isGroup: true,
    children: [
      {
        id: "g1-1",
        name: "Project Planning & Kickoff",
        hours: 16,
        rate: 120,
        amount: 1920,
      },
      {
        id: "g1-2",
        name: "Sprint Planning & Tracking",
        hours: 24,
        rate: 120,
        amount: 2880,
      },
    ],
  },
  {
    id: "g2",
    name: "UI/UX Design",
    hours: 60,
    rate: 130,
    amount: 7800,
    isGroup: true,
    children: [
      {
        id: "g2-1",
        name: "User Research & Wireframes",
        hours: 24,
        rate: 130,
        amount: 3120,
      },
      {
        id: "g2-2",
        name: "Visual Design & Prototypes",
        hours: 36,
        rate: 130,
        amount: 4680,
      },
    ],
  },
  {
    id: "g3",
    name: "Frontend Development",
    hours: 120,
    rate: 150,
    amount: 18000,
    isGroup: true,
    children: [
      {
        id: "g3-1",
        name: "Project Setup & Architecture",
        hours: 16,
        rate: 150,
        amount: 2400,
      },
      {
        id: "g3-2",
        name: "Product Catalog Pages",
        hours: 40,
        rate: 150,
        amount: 6000,
      },
      {
        id: "g3-3",
        name: "Cart & Checkout Flow",
        hours: 48,
        rate: 150,
        amount: 7200,
      },
      {
        id: "g3-4",
        name: "Admin Dashboard",
        hours: 16,
        rate: 150,
        amount: 2400,
      },
    ],
  },
  {
    id: "g4",
    name: "Backend Development",
    hours: 100,
    rate: 160,
    amount: 16000,
    isGroup: true,
    children: [],
  },
];

export const templateCategories = [
  "Web Application",
  "Mobile App",
  "SaaS Platform",
  "Enterprise",
  "AI Product",
  "Website",
];

export const projectTypes = [
  "Fixed Price",
  "Time & Materials",
  "Retainer",
  "Milestone-based",
];

export const clientOptions = [
  "TechRetail Inc.",
  "FinSecure Ltd.",
  "MediCare Solutions",
  "SupportFlow",
  "BrandVision Co.",
  "New Client",
];
