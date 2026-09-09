import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

export const emailTones = [
  "formal",
  "friendly",
  "professional",
  "persuasive",
  "apologetic",
  "concise",
] as const;

export type EmailTone = (typeof emailTones)[number];

const GenerateEmailInput = z.object({
  recipient: z.string().min(1, "Please add a recipient or context."),
  purpose: z.string().min(1, "Please describe the purpose of the email."),
  keyPoints: z.string().optional(),
  tone: z.enum(emailTones),
});

export type GenerateEmailInput = z.infer<typeof GenerateEmailInput>;

export type GeneratedEmail = {
  subject: string;
  body: string;
  source: "ai" | "demo";
};

const SYSTEM_PROMPT = `You are a professional workplace communication assistant.
Your job is to draft clear, effective business emails.

Rules you must always follow:
- Preserve the user's intended meaning exactly; never change commitments, dates, names or facts they provided.
- Never invent facts, figures, names, dates or promises that the user did not supply.
- Follow the requested tone precisely.
- Use a clear structure: greeting, body (short paragraphs or bullets where helpful), a clear call to action, and a professional sign-off.
- Return a concise, specific subject line.
- Write only the email — no explanations, no commentary.`;

function buildUserPrompt(input: GenerateEmailInput): string {
  const parts = [
    `Recipient / context: ${input.recipient}`,
    `Purpose of the email: ${input.purpose}`,
  ];
  if (input.keyPoints?.trim()) {
    parts.push(`Key points to include:\n${input.keyPoints.trim()}`);
  }
  parts.push(`Tone: ${input.tone}`);
  return parts.join("\n\n");
}

const EmailOutputSchema = z.object({
  subject: z.string().describe("A concise, specific subject line"),
  body: z.string().describe("The full email body with greeting and sign-off"),
});

/** Deterministic demo draft used when no AI API key is configured. */
function buildDemoEmail(input: GenerateEmailInput): GeneratedEmail {
  const firstName = input.recipient.split(/[,\s]/).filter(Boolean)[0] ?? "there";
  const keyPoints = input.keyPoints
    ?.split("\n")
    .map((line) => line.replace(/^[-•*\s]+/, "").trim())
    .filter(Boolean);

  const bulletBlock =
    keyPoints && keyPoints.length > 0
      ? `\n\n${keyPoints.map((p) => `• ${p}`).join("\n")}\n`
      : "";

  const closings: Record<EmailTone, string> = {
    formal: "Yours sincerely,",
    friendly: "Best,",
    professional: "Kind regards,",
    persuasive: "Looking forward to your thoughts,",
    apologetic: "With sincere apologies,",
    concise: "Regards,",
  };

  const openings: Record<EmailTone, string> = {
    formal: `I hope this message finds you well. I am writing regarding the following: ${input.purpose}`,
    friendly: `Hope you're doing well! Quick note about: ${input.purpose}`,
    professional: `I wanted to reach out regarding ${input.purpose}`,
    persuasive: `I'd love to get your perspective on something that could be valuable for both of us: ${input.purpose}`,
    apologetic: `Please accept my apologies. I'm writing about ${input.purpose}`,
    concise: `Re: ${input.purpose}`,
  };

  return {
    subject: input.purpose.length > 70 ? `${input.purpose.slice(0, 67)}…` : input.purpose,
    body: `Hi ${firstName},\n\n${openings[input.tone]}${bulletBlock}\n\nPlease let me know if you have any questions.\n\n${closings[input.tone]}\n[Your name]`,
    source: "demo",
  };
}

async function callEmailAI(input: GenerateEmailInput): Promise<GeneratedEmail> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) {
    // AI API not configured — clean fallback until the key is provisioned.
    return buildDemoEmail(input);
  }

  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  const gateway = createLovableAiGatewayProvider(key);

  const { output } = await generateText({
    model: gateway("google/gemini-3.8-flash"),
    output: Output.object({ schema: EmailOutputSchema }),
    system: SYSTEM_PROMPT,
    prompt: buildUserPrompt(input),
  });

  if (!output?.subject || !output?.body) {
    throw new Error("The AI returned an incomplete draft. Please try again.");
  }

  return { subject: output.subject, body: output.body, source: "ai" };
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => GenerateEmailInput.parse(data))
  .handler(async ({ data }): Promise<GeneratedEmail> => {
    return callEmailAI(data);
  });
