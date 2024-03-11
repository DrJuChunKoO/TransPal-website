import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { promises as fs } from "fs";
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, filename, prompt } = await req.json();
  try {
    await fs.access(`./public/speeches/${decodeURIComponent(filename)}.json`);
  } catch (e) {
    console.error(e);
    return new Response("File not found", { status: 404 });
  }
  try {
    let speechData = JSON.parse(
      await fs.readFile(
        `./public/speeches/${decodeURIComponent(filename)}.json`,
        "utf-8"
      )
    );
    let speechMessages = speechData.content.map(
      ({ speaker, text }: { speaker: string; text: string }) => ({
        speaker,
        text,
      })
    );
    console.log(JSON.stringify(speechMessages));
    const systemPrompt = `你是會議逐字稿的 AI 助手，下列是會議逐字稿的一部分。
---------------------
${speechMessages
  .map((x: { speaker: string; text: string }, i: number) => {
    if (speechMessages[i - 1]?.speaker === x.speaker) {
      return x.text;
    }
    return `\n${x.speaker}：${x.text}`;
  })
  .join("")}
---------------------
請根據上述內容回答使用者的問題，若無法回答請告知使用者「無法回答」。
請不要回答與上述內容無關的問題。`;

    console.log(systemPrompt);
    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      stream: true,
      temperature: 0.6,
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
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
