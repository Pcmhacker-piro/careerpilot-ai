// CareerPilot AI — Site Configuration & AI Prompts
// Built by Prakash Meena · CSE Student · IIIT Dharwad

export const SITE_CONFIG = {
  name: "CareerPilot AI",
  tagline: "Navigate your career with AI precision.",
  author: "Prakash Meena",
  authorRole: "CSE Student, IIIT Dharwad",
  version: "1.0.0",
};

export const AIResponseFormat = `{"overallScore":number,"ATS":{"score":number,"tips":[{"type":"good"|"improve","tip":string}]},"toneAndStyle":{"score":number,"tips":[{"type":"good"|"improve","tip":string,"explanation":string}]},"content":{"score":number,"tips":[{"type":"good"|"improve","tip":string,"explanation":string}]},"structure":{"score":number,"tips":[{"type":"good"|"improve","tip":string,"explanation":string}]},"skills":{"score":number,"tips":[{"type":"good"|"improve","tip":string,"explanation":string}]}}`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `You are an ATS resume expert. Analyze the resume and return ONLY a raw JSON object (no markdown, no backticks).

Job Title: ${jobTitle || "Not specified"}
Job Description: ${jobDescription || "Use general best practices"}

JSON format (exactly 3 tips per section, scores 0-100):
${AIResponseFormat}

Return ONLY the JSON. Nothing else.`;
