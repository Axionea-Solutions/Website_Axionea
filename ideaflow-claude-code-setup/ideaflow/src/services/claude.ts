/**
 * IdeaFlow — Claude AI Service
 * ALL Anthropic API calls go through this file.
 * Never call the Anthropic API directly from routes or frontend.
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-6";

// ── Types ──────────────────────────────────────────────────────────────────

export interface IdeaEvaluation {
  title: string;
  score: number; // 1-10
  marketFit: string;
  feasibility: string;
  revenueModel: string;
  nextStep: string;
  tags: string[];
}

export interface RankedIdeas {
  rankedIds: string[]; // idea IDs in ranked order (best first)
  reasoning: string;
}

// ── Core Functions ─────────────────────────────────────────────────────────

/**
 * Evaluate a raw voice transcript and return structured idea analysis.
 */
export async function evaluateIdea(
  transcript: string
): Promise<IdeaEvaluation> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: `You are an expert business idea evaluator specializing in AI, SaaS, and digital products for the DACH market.
Analyze the idea and return ONLY valid JSON — no markdown, no explanation, no code blocks.
Be direct and actionable. Score honestly: most ideas are 4-6, great ideas are 7-8, exceptional is 9-10.`,
    messages: [
      {
        role: "user",
        content: `Evaluate this business idea from a voice note:

"${transcript}"

Return this exact JSON structure:
{
  "title": "Short catchy name for this idea (max 5 words)",
  "score": 7,
  "marketFit": "One sentence on who needs this and why now",
  "feasibility": "One sentence on build complexity and required resources",
  "revenueModel": "Most likely monetization approach",
  "nextStep": "The single most important first action to take",
  "tags": ["tag1", "tag2", "tag3"]
}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return JSON.parse(text) as IdeaEvaluation;
}

/**
 * Re-rank a list of ideas by strategic fit + score.
 * Returns idea IDs in ranked order.
 */
export async function rankIdeas(
  ideas: Array<{ id: string; title: string; score: number; tags: string[] }>
): Promise<RankedIdeas> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    system: `You rank business ideas by combined strategic value.
Consider: score, market timing, dependencies between ideas, and execution order.
Return ONLY valid JSON — no markdown.`,
    messages: [
      {
        role: "user",
        content: `Rank these ideas from most to least strategically important:

${JSON.stringify(ideas, null, 2)}

Return:
{
  "rankedIds": ["id1", "id2", "id3"],
  "reasoning": "One sentence explaining the top choice"
}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return JSON.parse(text) as RankedIdeas;
}

/**
 * Generate a weekly digest of the top ideas.
 */
export async function generateWeeklyDigest(
  ideas: Array<{ title: string; score: number; nextStep: string }>
): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 800,
    system: `You write concise weekly briefings for founders. 
Be motivating but realistic. Markdown output is fine here.`,
    messages: [
      {
        role: "user",
        content: `Write a weekly digest for these ideas. 
Max 200 words. Focus on the top 3 and one clear call to action.

Ideas: ${JSON.stringify(ideas, null, 2)}`,
      },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
