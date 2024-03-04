import { promises as fs } from "fs";
import { cache } from "react";
export const getSpeeches = cache(async () => {
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
  return speeches.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
export const getSpeech = cache(async (filename: string) => {
  const file = await fs.readFile(
    process.cwd() +
      "/public/speeches/" +
      decodeURIComponent(filename) +
      ".json",
    "utf-8"
  );
  const fileParsed: {
    info: { name: string; date: string; description?: string };
    content: {
      id: string;
      speaker: string;
      text: string;
      type: string;
    }[];
  } = JSON.parse(file);
  return fileParsed;
});
