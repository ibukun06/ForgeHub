"use server";

import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function sendChatMessage(projectId: string, message: string, history: { role: string; content: string }[]) {
  const supabase = await createClient();

  // 1. Fetch Project Context (Documents, Decisions, Sections)
  const [{ data: documents }, { data: decisions }, { data: sections }] = await Promise.all([
    supabase.from("documents").select("id, title, document_type").eq("project_id", projectId),
    supabase.from("decisions").select("decision, rationale").eq("project_id", projectId),
    supabase.from("sections").select("prompt, status, documents!inner(project_id)").eq("documents.project_id", projectId),
  ]);

  const docContext = (documents || []).map(d => `- ${d.title || 'Untitled'} (${d.document_type})`).join("\n");
  const decContext = (decisions || []).map(d => `- ${d.decision}: ${d.rationale}`).join("\n");
  const secContext = (sections || []).map(s => `- ${s.prompt} [Status: ${s.status}]`).join("\n");

  const systemInstruction = `You are the ForgeHub Agentic Copilot. You assist engineering teams in planning, documenting, and executing their projects. 
You are currently helping with a specific project. Use the following context to ground your answers:

Current Documents:
${docContext || "No documents yet."}

Project Sections (Milestones & Tasks):
${secContext || "No sections/tasks yet."}

Key Decisions:
${decContext || "No decisions yet."}

Keep your responses concise, actionable, and formatted in markdown.`;

  try {
    const formattedHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Add system instruction as the first message or configure it in the model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.5,
      }
    });

    return { success: true, text: response.text };
  } catch (error: any) {
    console.error("AI Error:", error);
    // Offline fallback for development
    return { success: true, text: "I'm currently operating in offline mode. Here is a simulated response: Your project is looking good! Try updating the roadmap." };
  }
}
