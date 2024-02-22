import { promises as fs } from "fs";
import SpeechesList from "@/components/SpeechesList";
export default async function Page() {
  const speeches = await Promise.all(
    (
      await fs.readdir(process.cwd() + "/public/speeches")
    )
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const fileData = await fs.readFile(
          process.cwd() + "/public/speeches/" + file,
          "utf-8"
        );
        const fileParsed = JSON.parse(fileData);
        let { name, date } = fileParsed.info;
        if (!name) name = file.split(".").slice(0, -1).join(".");
        return {
          filename: file.replace(/\.json$/, ""),
          name,
          date,
        };
      })
  );

  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800 mb-4">紀錄</div>
      <div>
        <SpeechesList Speeches={speeches} />
      </div>
    </div>
  );
}
