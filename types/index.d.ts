// CareerPilot AI — Global Type Definitions
// Built by Prakash Meena · CSE Student · IIIT Dharwad

interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    jobDescription?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback | string; // string before parsed, Feedback after
    createdAt?: string;
}

// Alias for clarity
type AnalysisReport = Resume;

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
}

interface KVItem {
    key: string;
    value: string;
}

interface FSItem {
    id: string;
    name: string;
    path: string;
    type: "file" | "directory";
    size?: number;
    created?: string;
}

interface PuterUser {
    username: string;
    uuid?: string;
    email?: string;
}

interface ChatMessage {
    role: "user" | "assistant";
    content: string | ChatContent[];
}

interface ChatContent {
    type: "text" | "file" | "image_url";
    text?: string;
    puter_path?: string;
    image_url?: { url: string };
}

interface PuterChatOptions {
    model?: string;
    stream?: boolean;
}

interface AIResponse {
    message: {
        role: string;
        content: string | { type: string; text: string }[];
    };
}
