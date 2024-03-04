import Avatar from "@/components/Avatar";
import MessageText from "@/components/MessageText";
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
