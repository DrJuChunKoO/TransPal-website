import Avatar from "@/components/Avatar";
import MessageText from "@/components/MessageText";
import Markdown from "react-markdown";
export default function SpeechContent({
  content,
  keywords = [],
  filename,
}: {
  content: {
    id: string;
    speaker: string;
    text: string;
    type: string;
  }[];
  keywords?: string[];
  filename: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((item: any, index: number) => {
        if (item.type === "divider")
          return (
            <div
              key={item.id}
              className="ml-14 flex justify-between gap-4 items-center"
            >
              {item.text ? (
                <>
                  <div className="w-full bg-gray-50 h-1 dark:bg-gray-100/10"></div>
                  <div className="shrink-0 opacity-50">{item.text}</div>
                  <div className="w-full bg-gray-50 h-1 dark:bg-gray-100/10"></div>
                </>
              ) : (
                <div className="w-full bg-gray-50 h-1 dark:bg-gray-100/10"></div>
              )}
            </div>
          );
        if (item.type === "markdown")
          return (
            <div key={item.id} className="ml-14">
              <Markdown className="prose prose-sm w-full dark:prose-invert my-6 break-all">
                {item.text}
              </Markdown>
            </div>
          );

        const text = (
          <MessageText
            item={item}
            keywords={keywords}
            filename={filename}
            key={item.id}
          />
        );
        const avatar = (
          <div
            className="flex items-start justify-start gap-2 -mb-6"
            key={`avatar-${index}`}
          >
            <Avatar name={item.speaker} />
            <div>
              <div className="font-bold text-gray-800 dark:text-slate-400">
                {item.speaker}
              </div>
            </div>
          </div>
        );
        return content[index - 1]?.speaker !== item.speaker ? (
          <div key={item.id}>
            {avatar}
            {text}
          </div>
        ) : (
          text
        );
      })}
    </div>
  );
}
