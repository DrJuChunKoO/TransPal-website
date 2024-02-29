import type { Metadata, ResolvingMetadata } from "next";
import { getSpeech, getSpeeches } from "@/utils/speeches";
import Avatar from "@/components/Avatar";
import { Quote } from "lucide-react";
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
              message: message.text,
              speaker: message.speaker,
            })
          )}`,
        },
      ],
    },
  } as Metadata;
}
export async function generateStaticParams() {
  const speeches = await getSpeeches();
  const speechDatas = await Promise.all(
    speeches.map(async (speech) => ({
      filename: speech.filename,
      ...(await getSpeech(speech.filename)),
    }))
  );

  return speechDatas
    .map((x) =>
      x.content.map((item: any) => ({
        filename: x.filename,
        messageId: item.id,
      }))
    )
    .flat();
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
      <div className="flex w-[512px] max-w-full mx-auto bg-slate-50 dark:bg-[#232323] relative rounded-xl overflow-hidden">
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
          <div className="bg-current h-0.5 rounded-full w-full my-3 opacity-10"></div>
          <div className="flex justify-between items-end w-full">
            <div className="text-gray-500 dark:text-white/80 w-full">
              {name}
            </div>
            <div className="text-gray-500 dark:text-white/80 text-right w-full">
              {date}
            </div>
          </div>
        </div>
        <div className="flex bg-[#6ECC93] p-5 skew-x-6 pr-7 translate-x-2">
          <Quote className="size-8 text-white/50 -skew-x-6" />
        </div>
      </div>
    </div>
  );
}
