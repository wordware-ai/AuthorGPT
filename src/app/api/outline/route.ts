export const runtime = "edge";

export async function POST(request: Request) {
  const { prompt, genre, style } = await request.json();

  const part1PromptId = "24508db5-815a-42a0-90d0-9493df9b3ef2";

  // Proxy the request
  return await fetch(`https://app.wordware.ai/api/prompt/${part1PromptId}/run`, {
    method: "post",
    body: JSON.stringify({
      inputs: {
        prompt: prompt,
        writing_style: `A ${genre} story. ${style}`,
      },
    }),
    headers: {
      Authorization: `Bearer ${process.env.WORDWARE_API_KEY}`,
    },
  });
}
