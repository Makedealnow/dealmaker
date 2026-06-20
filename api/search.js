import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body || {};

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Search query is required." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "AI search is not active yet. Please enter your email below to receive supplier and purchase information when available."
      });
    }

    const prompt = `
You are the MakeDealNow AI Buying Assistant.

A visitor searched for: "${query}"

Return helpful buyer-focused results.

Rules:
- Do not provide supplier contact details.
- Show product/service options, estimated price ranges, and buying considerations.
- Keep results concise and consumer-friendly.
- Include a reminder that supplier/contact details require email unlock.
- Do not make unsupported claims.
- If exact pricing is unavailable, give estimated ranges and say pricing varies.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You help consumers compare buying options, prices, and considerations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4
    });

    const answer = completion.choices?.[0]?.message?.content || "No results returned.";

    return res.status(200).json({ result: answer });
  } catch (error) {
    console.error(error);

    return res.status(503).json({
      error: "AI search is not active yet. Please enter your email below to receive supplier and purchase information when available."
    });
  }
}
