"use client";
import { useState, useEffect, use } from "react";
import { useMount } from "react-use";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

export default function MessageText({
  item,
  keywords = [],
  filename,
}: {
  item: {
    id: string;
    speaker: string;
    text: string;
    type: string;
  };
  keywords: string[];
  filename: string;
}) {
  const [active, setActive] = useState(false);
  useMount(() => {
    // check if the hash is the same as the id of the message
    if (window.location.hash === `#${item.id}`) {
      setActive(true);
      // scroll to the message
      document.getElementById(item.id)?.scrollIntoView({
        block: "center",
      });
    }
  });
  return (
    <div
      className={twMerge(
        "ml-12 text-gray-700 dark:text-gray-300 -mt-4 py-1 px-2 rounded flex justify-between items-center gap-4 group",
        active
          ? "bg-gray-200 dark:bg-white/10"
          : "hover:bg-gray-50 dark:hover:bg-white/5"
      )}
      id={item.id}
    >
      <div className="flex-1">{item.text}</div>
      <Link
        href={`/speeches/${filename}/${item.id}`}
        className="opacity-0 group-hover:opacity-100"
      >
        <div className="text-gray-400">
          <LinkIcon className="size-5" />
        </div>
      </Link>
    </div>
  );
}
