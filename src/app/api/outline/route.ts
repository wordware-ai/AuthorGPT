export const runtime = "edge";

export async function POST(request: Request) {
  const { prompt, genre, style } = await request.json();

  const part1PromptId = "de751411-e0f5-47e5-b478-96762a1ef29a";

  // Proxy the request
  return await fetch(`https://app.wordware.ai/api/released-app/${part1PromptId}/run`, {
    method: "post",
    body: JSON.stringify({
      inputs: {
        story_idea: prompt,
        writing_style: style,
        genre: genre,
      },
      version: "^2.0",
    }),
    headers: {
      Authorization: `Bearer ${process.env.WORDWARE_API_KEY}`,
    },
  });
}
