import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
export default function SpeechesList({ Speeches }: { Speeches: any[] }) {
  return (
    <div>
      {Speeches.map((speech) => (
        <Link
          href={"/speeches/" + speech.filename}
          key={speech.filename}
          className="flex gap-2 items-center hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-white/5 dark:active:bg-white/10 rounded p-2"
        >
          <DocumentTextIcon className="size-6" />
          <div className="flex flex-wrap">
            <span className="text-gray-500 dark:text-gray-300 tabular-nums tracking-tight mr-2">
              {speech.date}
            </span>
            <span>{speech.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
