import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
export default function SpeechesList({ Speeches }: { Speeches: any[] }) {
  return (
    <div>
      {Speeches.map((speech) => (
        <Link
          href={"/speeches/" + speech.filename}
          key={speech.filename}
          className="flex gap-2 items-center hover:bg-gray-50 active:bg-gray-100 rounded p-2"
        >
          <DocumentTextIcon className="size-6" />
          <span className="text-gray-500 tabular-nums tracking-tight">
            {speech.date}
          </span>
          <span>{speech.name}</span>
        </Link>
      ))}
    </div>
  );
}
