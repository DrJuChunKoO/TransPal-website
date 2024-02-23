import type { Metadata, ResolvingMetadata } from "next";
import { getSpeech, getSpeeches } from "@/utils/speeches";
import Avatar from "@/components/Avatar";

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
      <div className="flex flex-col items-center justify-center w-[512px] max-w-full mx-auto p-6 bg-slate-50">
        <Avatar name={message.speaker} />
        <div className="text-xl text-gray-800 font-bold mt-2">
          {message.speaker}
        </div>
        <div className="text-gray-700 my-4">{message.text}</div>
        <div className="text-gray-500 text-right w-full">{name}</div>
        <div className="text-gray-500 text-right w-full text-sm">{date}</div>
      </div>
    </div>
  );
}
