export type LeadStatus = "new" | "contacted" | "in-progress" | "converted" | "rejected";

export interface TimelineEvent {
  id: string;
  type: "call" | "whatsapp" | "email" | "note" | "status" | "system";
  message: string;
  timestamp: string;
  actor?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: LeadStatus;
  premium: number;
  notes: string;
  createdAt: string;
  assignedAdvisor?: string;
  followUpDate?: string;
  source?: string;
  timeline?: TimelineEvent[];
}

export interface AdvisorToast {
  id: string;
  message: string;
  leadName: string;
  interest: string;
}
