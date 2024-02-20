import { promises as fs } from "fs";
import Avatar from "@/components/Avatar";
export default async function Page({
  params,
}: {
  params: {
    filename: string;
  };
}) {
  const file = await fs.readFile(
    process.cwd() + "/data/speeches/" + decodeURIComponent(params.filename),
    "utf-8"
  );
  const fileParsed = JSON.parse(file);
  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800 mb-6">紀錄</div>
      <div className="flex flex-col gap-4">
        {fileParsed.content.map((item: any, index: number) => {
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
          return fileParsed.content[index - 1]?.speaker !== item.speaker ? (
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
