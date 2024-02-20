import { promises as fs } from "fs";
import Link from "next/link";
export default async function Page() {
  const files = await fs.readdir(process.cwd() + "/data/speeches");

  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800">紀錄</div>
      <div>
        {files.map((file) => (
          <div key={file}>
            <Link href={"/records/" + file}>{file}</Link>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(files, null, 2)}</pre>
    </div>
  );
}
