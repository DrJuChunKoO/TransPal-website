import type { Metadata, ResolvingMetadata } from "next";
import { getSpeech, getSpeeches } from "@/utils/speeches";
import Avatar from "@/components/Avatar";
import { Quote, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Share from "./share";
type Props = {
  params: {
    filename: string;
    messageId: string;
  };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { filename, messageId } = params;

  // fetch data
  const speech = await getSpeech(filename);
  const message = speech.content.find((item: any) => item.id === messageId)!;
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
          url: `/api/og/message?data=${encodeURIComponent(
            JSON.stringify({
              title: speech.info.name,
              date: speech.info.date,
              speaker: message.speaker,
              message: message.text,
            })
          )}`,
        },
      ],
    },
  } as Metadata;
}

export default async function Page({ params }: Props) {
  const speech = await getSpeech(params.filename);
  const name =
    speech.info.name ||
    decodeURIComponent(params.filename).split(".").slice(0, -1).join(".");
  const date = speech.info.date;
  const messageId = params.messageId;
  const message = speech.content.find((item: any) => item.id === messageId)!;

  return (
    <div className="container my-10">
      <div className="flex w-[512px] max-w-full mx-auto mb-2 justify-between items-center">
        <Link
          href={`/speeches/${params.filename}#${messageId}`}
          className="px-4 text-gray-800 dark:text-white flex gap-1 items-center flex-col"
        >
          <div className="rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-white/10 dark:active:bg-white/15 p-2">
            <ArrowLeft />
          </div>
          <div className="text-sm opacity-50">返回</div>
        </Link>
        <Share />
      </div>
      <div className="flex w-[512px] max-w-full mx-auto bg-slate-50 dark:bg-[#232323] relative rounded-xl overflow-hidden shadow-sm">
        <div className="grow p-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <Avatar name={message.speaker} />
            </div>
            <div>
              <div className="text-xl text-gray-800 dark:text-white font-bold">
                {message.speaker}
              </div>
              <div className="text-gray-700 dark:text-white/90 mt-2">
                {message.text}
              </div>
            </div>
          </div>
          <div className="bg-current h-0.5 rounded-full w-full my-3 opacity-10 max-md:hidden"></div>
          <div className="justify-between items-end w-full hidden md:flex text-gray-500 dark:text-white/80 text-sm">
            <div className=" flex-1">
              <Link
                href={`/speeches/${params.filename}#${messageId}`}
                className="underline hover:text-gray-600 dark:hover:text-white/80 underline-offset-2"
              >
                {name}
              </Link>
            </div>
            <div className="text-right">{date}</div>
          </div>
        </div>
        <div className="hidden sm:flex bg-[#6ECC93] p-5">
          <Quote className="size-8 text-white/50" />
        </div>
      </div>
      <div className="w-[512px] max-w-full mx-auto mt-2 text-right px-4 text-gray-500 dark:text-white/80 text-sm md:hidden">
        <Link
          href={`/speeches/${params.filename}#${messageId}`}
          className="underline hover:text-gray-600 dark:hover:text-white/80 underline-offset-2"
        >
          {name}
        </Link>{" "}
        · {date}
      </div>
    </div>
  );
}
