export type LayoutPreference = "Varied" | "Text-Heavy" | "Image-Focused";

export type Language = string;

export type Theme = "professional" | "minimal" | "vibrant";

export interface GeneratePPTResponse {
    job_id: string;
    status: "pending" | "processing" | "ready" | "failed";
    message: string;
    filename: string;
    download_url: string | null;
}

export interface PollStatusResponse {
    job_id: string;
    status: "pending" | "processing" | "ready" | "failed";
    message: string;
    filename: string;
    download_url: string | null;
}

export interface GeneratedComponentProps {
    isDownloading: boolean;
    handleDownloadPPT: () => void;
    handleGenerateAgain: () => void;
    pptFile: string;
}

export interface PresentationFormProps {
    topic: string;
    numSlides: number;
    setTopic: (value: string) => void;
    setNumSlides: (value: number) => void;
    loading: boolean;
    handleGeneratePPT: () => void;
    layoutPreference: LayoutPreference;
    setLayoutPreference: (value: LayoutPreference) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
