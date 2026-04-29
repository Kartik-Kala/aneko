import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface CartItem {
  name: string
  quantity: number
  estimatedPrice: number
  category: string
  notes?: string
}

export interface AggregatedCart {
  items: CartItem[]
  totalEstimate: number
  budgetStatus: "under" | "over" | "within"
  suggestions: string[]
  summary: string
}

export async function aggregatePreferences(
  messages: { role: string; content: string; participantName: string }[],
  budget: number,
  headcount: number,
  occasion: string
): Promise<AggregatedCart> {
  const conversationText = messages
    .map((m) => `${m.participantName}: ${m.content}`)
    .join("\n")

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: `You are Aneko, an AI ordering agent for corporate group orders on Swiggy India.
Your job is to aggregate food and drink preferences from multiple people and build a smart, consolidated order.

Rules:
- Consolidate similar items (e.g. 4 people want biryani → 1 large party portion)
- Respect dietary restrictions strictly (vegetarian, vegan, no onion, etc.)
- Stay within the budget of ₹${budget} for ${headcount} people
- For drinks, calculate quantities for the group (e.g. 2 cases beer for 10 people at a party)
- Be smart about quantities — party portions, family packs, etc.
- Always respond in JSON only, no markdown, no explanation outside JSON

Occasion: ${occasion}
Budget: ₹${budget}
Headcount: ${headcount}`,
    messages: [
      {
        role: "user",
        content: `Here are the preferences from the group:\n\n${conversationText}\n\nBuild the optimal consolidated order. Respond ONLY with this JSON structure:
{
  "items": [
    {
      "name": "item name",
      "quantity": 1,
      "estimatedPrice": 500,
      "category": "food|drink|snack",
      "notes": "optional notes"
    }
  ],
  "totalEstimate": 2500,
  "budgetStatus": "under|over|within",
  "suggestions": ["suggestion 1", "suggestion 2"],
  "summary": "One line summary of the order"
}`,
      },
    ],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""

  try {
    const clean = text.replace(/```json|```/g, "").trim()
    return JSON.parse(clean)
  } catch {
    return {
      items: [],
      totalEstimate: 0,
      budgetStatus: "under",
      suggestions: ["Could not parse preferences. Please try again."],
      summary: "Error aggregating preferences",
    }
  }
}

export async function chatWithAneko(
  sessionMessages: { role: "user" | "assistant"; content: string }[],
  budget: number,
  headcount: number,
  occasion: string,
  participantName: string
): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: `You are Aneko, a friendly AI ordering agent for a ${occasion} group order.
Budget: ₹${budget} for ${headcount} people.
You are talking to ${participantName}.

Your job: collect their food/drink preferences in a conversational way.
- Ask about dietary restrictions if not mentioned
- Ask about quantities if relevant (e.g. how many drinks)
- Keep responses short and friendly
- Confirm their order back to them
- Do NOT place orders yourself — just collect preferences
- Speak naturally, like a helpful office assistant`,
    messages: sessionMessages,
  })

  return response.content[0].type === "text" ? response.content[0].text : ""
}