import { promises as fs } from "fs";
import Avatar from "@/components/Avatar";
import { cache } from "react";

const getSpeech = cache(async (filename: string) => {
  const file = await fs.readFile(
    process.cwd() +
      "/public/speeches/" +
      decodeURIComponent(filename) +
      ".json",
    "utf-8"
  );
  const fileParsed = JSON.parse(file);
  return fileParsed;
});

export default async function Page({
  params,
}: {
  params: {
    filename: string;
  };
}) {
  const speech = await getSpeech(params.filename);
  const name =
    speech.info.name ||
    decodeURIComponent(params.filename).split(".").slice(0, -1).join(".");
  const date = speech.info.date;
  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800">{name}</div>
      <div className="text-gray-500 mb-6">{date}</div>
      <div className="flex flex-col gap-4">
        {speech.content.map((item: any, index: number) => {
          const text = (
            <div
              className="ml-12 text-gray-700 -mt-4 py-1 px-2 hover:bg-gray-50 rounded"
              key={`text-${index}`}
            >
              {item.text}
            </div>
          );
          const avatar = (
            <div
              className="flex items-start justify-start gap-2 -mb-6"
              key={`avatar-${index}`}
            >
              <Avatar name={item.speaker} />
              <div>
                <div className="font-bold text-gray-800">{item.speaker}</div>
              </div>
            </div>
          );
          return speech.content[index - 1]?.speaker !== item.speaker ? (
            <>
              {avatar}
              {text}
            </>
          ) : (
            text
          );
        })}
      </div>
    </div>
  );
}
