import type { Metadata, ResolvingMetadata } from "next";
import { getSpeech, getSpeeches } from "@/utils/speeches";
import { Pen, Clock } from "lucide-react";
import ShareButton from "./share";
import Markdown from "react-markdown";
import SpeechContent from "@/components/SpeechContent";
import SpeechAI from "@/components/SpeechAI";
type Props = {
  params: {
    filename: string;
  };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { filename } = params;

  // fetch data
  const speech = await getSpeech(filename);
  const speakers = [
    // @ts-ignore
    ...new Set(speech.content.map((item: any) => item.speaker)),
  ].join("、");
  return {
    title: speech.info.name,
    description: `時間：${speech.info.date}${
      speech.info.time ? " " + speech.info.time : ""
    }\n與會人士：${speakers}`,
    openGraph: {
      images: [
        {
          url: `/api/og/speech?data=${encodeURIComponent(
            JSON.stringify({
              title: speech.info.name,
              speakers,
              date:
                speech.info.date +
                (speech.info.time ? " " + speech.info.time : ""),
            })
          )}`,
        },
      ],
    },
  } as Metadata;
}
export async function generateStaticParams() {
  const speeches = await getSpeeches();

  return speeches.map((speech) => ({
    filename: speech.filename,
  }));
}
export default async function Page({ params }: Props) {
  const speech = await getSpeech(params.filename);
  const name =
    speech.info.name ||
    decodeURIComponent(params.filename).split(".").slice(0, -1).join(".");
  const date =
    speech.info.date + (speech.info.time ? " " + speech.info.time : "");
  const description = speech.info?.description;
  return (
    <div className="container my-10">
      <div className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
        {name}
      </div>
      <div className="flex justify-between gap-2 flex-wrap items-center mt-1">
        <div className="text-gray-500 dark:text-gray-200 flex gap-2 items-center">
          <Clock size={16} />
          {date}
        </div>
        <div className="flex gap-2 self-end">
          <ShareButton />
          <a
            href={`https://transpal-editor.juchunko.com/?file=${params.filename}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 text-sm p-2 sm:px-3"
          >
            <Pen size={16} />
            <span className="hidden sm:inline">編輯</span>
          </a>
        </div>
      </div>
      {description && (
        <div className="prose prose-sm w-full dark:prose-invert my-6">
          <div className="h-[2px] bg-current rounded-full w-full opacity-10" />
          <Markdown className="prose prose-sm w-full dark:prose-invert my-6 break-all">
            {description || ""}
          </Markdown>
          <div className="h-[2px] bg-current rounded-full w-full opacity-10" />
        </div>
      )}
      <SpeechContent content={speech.content} filename={params.filename} />
      <SpeechAI filename={params.filename} />
    </div>
  );
}
