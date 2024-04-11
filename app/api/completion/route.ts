import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { promises as fs } from "fs";
import path from "path";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/3f1f83a939b2fc99ca45fd8987962514/open-ai/openai",
});

export async function POST(req: Request) {
  const { messages, filename, prompt } = await req.json();
  const filePath = path.join(
    process.cwd(),
    `./public/speeches/${decodeURIComponent(filename)}.json`
  );
  try {
    await fs.access(filePath);
  } catch (e) {
    console.error(e);
    return new Response("File not found", { status: 404 });
  }
  try {
    let speechData = JSON.parse(await fs.readFile(filePath, "utf-8"));
    let speechMessages = speechData.content.map(
      ({ speaker, text }: { speaker: string; text: string }) => ({
        speaker,
        text,
      })
    );
    const systemPrompt = `你是會議逐字稿的 AI 助手
1. 請根據對話內容回答使用者的問題，若無法回答請告知使用者「無法回答」。
2. 請不要回答與對話內容無關的問題
3. 請不要根據對話中沒有的資訊回答問題
4. 簡短回答`;

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      stream: true,
      temperature: 0.6,
      max_tokens: 6000,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: speechMessages
            .map((x: { speaker: string; text: string }, i: number) => {
              if (speechMessages[i - 1]?.speaker === x.speaker) {
                return x.text;
              }
              return `\n${x.speaker}：${x.text}`;
            })
            .join(""),
        },
        ...messages,
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error(e);
    return new Response("Unexpected error", { status: 500 });
  }
}
