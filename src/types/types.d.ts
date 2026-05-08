export type LayoutPreference = "Varied" | "Text-Heavy" | "Image-Focused";

export type Language = string;

export type Theme = "professional" | "minimal" | "vibrant";

export type JobStatus = "pending" | "processing" | "ready" | "failed";

export interface PresentationJobResponse {
  job_id: string;
  status: JobStatus;
  message: string;
  filename: string;
  download_url: string | null;
}

export interface PresentationFormValues {
  topic: string;
  numSlides: number;
  language: string;
  theme: Theme;
  layoutPreference: LayoutPreference;
}

export interface PresentationFormProps {
  onSubmit: (values: PresentationFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export interface GeneratedComponentProps {
  isDownloading: boolean;
  handleDownloadPPT: () => Promise<void>;
  handleGenerateAgain: () => void;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
