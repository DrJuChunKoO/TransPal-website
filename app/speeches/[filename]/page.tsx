import type { Metadata, ResolvingMetadata } from "next";
import { getSpeech, getSpeeches } from "@/utils/speeches";
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
    description: `日期：${speech.info.date}\n與會人士：${speakers}`,
    openGraph: {
      images: [
        {
          url: `/api/og/speech?data=${encodeURIComponent(
            JSON.stringify({
              title: speech.info.name,
              speakers,
              date: speech.info.date,
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
  const date = speech.info.date;
  const description = speech.info?.description;
  return (
    <div className="container my-10">
      <div className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
        {name}
      </div>
      <div className="text-gray-500 dark:text-gray-200 mb-6 md:text-xl md:mt-1">
        {date}
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
