"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import searchResult from "../public/searchResult.json";
import { parseAsString, useQueryState } from "nuqs";

function HighlightText({
  text,
  keywords,
}: {
  text: string;
  keywords: string[];
}) {
  if (!text) return null;
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          return (
            <span
              key={index}
              className="bg-yellow-200 dark:bg-yellow-500 text-yellow-950 rounded px-0.5"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export default function Search() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [searchLength, setSearchLength] = useState(50);
  useEffect(() => {
    setSearchLength(50);
  }, [search]);
  useEffect(() => {
    // if user scroll to bottom, load more
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setSearchLength((searchLength) => searchLength + 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const splitedSearch = search
    .trim()
    .split(" ")
    .map((x) => x.toLowerCase());
  const filteredSearch = searchResult
    .map((item) => {
      return item.content.map((x) => ({
        name: item.name,
        date: item.date,
        url: item.url,
        ...x,
      }));
    })
    .flat()
    .map((item) => {
      let score = 0;
      for (let keyword of splitedSearch) {
        if (item.name?.toLowerCase().includes(keyword)) score += 1;
        if (item.speaker?.toLowerCase().includes(keyword)) score += 3;
        if (item.text?.toLowerCase().includes(keyword)) score += 10;
      }
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b?.score - a?.score)
    .slice(0, searchLength);
  return (
    <div>
      <input
        type="text"
        value={search}
        className="w-full p-2 border border-gray-300 rounded-md my-4 bg-transparent outline-none focus:border-gray-500 dark:border-white/5 dark:bg-white/5 dark:focus:border-white/10"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="在這裡輸入人名或對話內容來搜尋，像是「葛如鈞」、「電子簽章」等等"
      />
      <div className="-mx-4">
        {search.length >= 1 &&
          filteredSearch.map((item: any) => (
            <Link
              key={item.id}
              href={`${item.url}#${item.id}`}
              className="py-2 px-4 rounded hover:bg-slate-50 dark:hover:bg-white/5 block"
            >
              <div className="font-bold">
                <HighlightText text={item.name} keywords={splitedSearch} />{" "}
                <span className="text-gray-500 dark:text-white/50 font-normal">
                  {item.date}
                </span>
              </div>

              <div>
                {item.speaker && (
                  <span className="text-gray-500 dark:text-white/50 font-normal bg-slate-50 dark:bg-white/5 text-sm border border-gray-200 dark:border-white/5 rounded px-1 py-0.5 mr-1 tracking-wide">
                    <HighlightText
                      text={item.speaker}
                      keywords={splitedSearch}
                    />
                  </span>
                )}
                <HighlightText text={item.text} keywords={splitedSearch} />
              </div>
            </Link>
          ))}
        {search.length > 1 && filteredSearch.length === 0 && (
          <div className="text-gray-500 dark:text-white/50 text-center my-12">
            無法找到符合的結果，請嘗試其他關鍵字
          </div>
        )}

        {search.length >= 1 && filteredSearch.length !== 0 && (
          <div className="text-gray-500 dark:text-white/50 text-center my-12">
            <span className="opacity-50">-</span> 以上是所有結果{" "}
            <span className="opacity-50">-</span>
          </div>
        )}
      </div>
    </div>
  );
}
