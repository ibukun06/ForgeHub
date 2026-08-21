import { GoogleGenAI } from "@google/genai";

// Initialize the SDK. It automatically picks up GEMINI_API_KEY from the environment.
// If the key is not present, we will handle it gracefully in the helper functions.
let ai: GoogleGenAI | null = null;

try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({});
  }
} catch (error) {
  console.warn("Failed to initialize GoogleGenAI client:", error);
}

/**
 * Generates an AI Brief for the Project Cockpit based on raw project data.
 */
export async function generateProjectBrief(
  projectName: string,
  documents: { title: string; kind: string }[],
  decisions: { decision: string; rationale: string }[],
  tasks: { title: string; status: string }[]
): Promise<string[]> {
  if (!ai) {
    return [
      `[AI Offline] Project "${projectName}" has ${tasks.length} active tasks.`,
      `[AI Offline] ${documents.length} documents and ${decisions.length} decisions logged.`,
      `Please add GEMINI_API_KEY to .env.local to enable real AI briefs.`,
    ];
  }

  const prompt = `
    You are an AI assistant for a project management tool called ForgeHub.
    Analyze the following project data for "${projectName}" and generate exactly 3 concise, highly actionable bullet points summarizing the project's health, current focus, and next likely leadership action.
    Do not use markdown lists or bullet characters in your response, just return 3 sentences separated by newlines.
    
    Data:
    - Documents: ${documents.map(d => `${d.title} (${d.kind})`).join(", ")}
    - Decisions: ${decisions.map(d => d.decision).join(", ")}
    - Tasks: ${tasks.map(t => `${t.title} [${t.status}]`).join(", ")}
  `;

  try {
    const response = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    const text = response.output_text || "";
    // Split by newline and clean up any accidental bullets
    const lines = text.split("\n").filter(line => line.trim().length > 0).map(line => line.replace(/^[-*•]\s*/, '').trim());
    return lines.slice(0, 3);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["Failed to generate project brief due to an AI service error."];
  }
}

/**
 * Generates a summary for an inbox notification thread.
 */
export async function generateInboxSummary(notificationTitle: string, source: string): Promise<string> {
  if (!ai) {
    return `[AI Offline] This is a mock summary for "${notificationTitle}" from ${source}. Add GEMINI_API_KEY to enable real summarization.`;
  }

  const prompt = `
    Summarize this inbox notification in exactly one short, actionable sentence.
    Notification: ${notificationTitle}
    Source Context: ${source}
  `;

  try {
    const response = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });
    return response.output_text || "No summary available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate inbox summary.";
  }
}
