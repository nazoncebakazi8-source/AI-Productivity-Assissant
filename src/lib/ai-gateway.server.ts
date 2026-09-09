import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Shared Lovable AI Gateway provider helper.
 * Server-only: always created inside a request/server-function boundary
 * with LOVABLE_API_KEY read from the environment.
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
