"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BotMessageSquare,
  Minus,
  Bot,
  User,
  RotateCcw,
  MessageCircleQuestion,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useCompletion } from "ai/react";
import { useLocalStorage } from "usehooks-ts";
function Message({ from, content }: { from: "me" | "ai"; content: string }) {
  return (
    <div className="flex w-full gap-2 items-start mb-2">
      <div
        className={twMerge(
          "rounded-full p-2",
          from === "me"
            ? "bg-pink-100 text-pink-500 dark:bg-pink-500 dark:text-pink-100 shadow-inner"
            : "bg-slate-100 text-slate-500 dark:bg-slate-500 dark:text-slate-100 shadow-inner"
        )}
      >
        {from === "me" ? <User /> : <Bot />}
      </div>
      <div
        className={twMerge(
          "p-2 rounded-lg",
          from === "me"
            ? "bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200"
            : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        )}
      >
        {content}
      </div>
    </div>
  );
}

export default function SpeechAI({ filename }: { filename: string }) {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useLocalStorage<
    {
      content: string;
      role: "user" | "assistant";
    }[]
  >(`speech-ai-messages-${filename}`, []);
  const {
    completion,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    body: {
      filename,
      messages,
    },
  });
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setMessages(messages.concat({ role: "user", content: input }));
    setInput("");
    return handleSubmit(e);
  }
  function sendDefaultMessage(message: string) {
    setInput(message);
    setTimeout(() => {
      submitButtonRef.current?.click();
    }, 100);
  }

  useEffect(() => {
    if (completion) {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].role === "assistant"
      ) {
        setMessages([
          ...messages.slice(0, -1),
          { role: "assistant", content: completion },
        ]);
      } else {
        setMessages([...messages, { role: "assistant", content: completion }]);
      }

      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }
  }, [completion]);
  return (
    <>
      {active ? (
        <motion.div
          className="fixed bottom-4 right-4 w-[min(400px,calc(100vw-32px))]"
          key={1}
          layoutId="speech-ai"
        >
          <motion.div
            className="bg-slate-500 text-white flex justify-between items-center p-2 rounded-t-lg"
            layoutId="speech-ai-header"
          >
            <div className="flex gap-2 items-center px-2">
              <motion.div layoutId="speech-ai-header-icon">
                <BotMessageSquare size={24} />
              </motion.div>
              TransPal AI
            </div>
            <div className="flex gap-2 items-center">
              <button
                className="p-2 rounded-lg hover:bg-black/5 active:bg-black/10 text-white"
                onClick={() => setMessages([])}
              >
                <RotateCcw size={24} />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-black/5 active:bg-black/10 text-white"
                onClick={() => setActive(false)}
              >
                <Minus size={24} />
              </button>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/90 dark:bg-[#232323]/90 backdrop-blur-xl overflow-y-scroll h-[400px] shadow-lg p-2"
            ref={messageContainerRef}
          >
            <Message
              from="ai"
              content="嗨，我是 TransPal AI！有什麼可以幫助你的？"
            />

            {messages.map((m, index) => (
              <Message
                from={m.role === "user" ? "me" : "ai"}
                content={m.content}
                key={index}
              />
            ))}
            <AnimatePresence>
              {!messages.length && (
                <motion.div
                  className="flex gap-2 flex-col pl-12 text-pink-800 dark:text-pink-100"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                >
                  {[
                    `對話主題是什麼？`,
                    `對話達成了哪些共識和決策？`,
                    `對話中有哪些重要的討論？`,
                    `總結對話討論的重點`,
                  ].map((message, index) => (
                    <button
                      onClick={() => sendDefaultMessage(message)}
                      className="flex gap-2 hover:opacity-75 active:opacity-50"
                      key={index}
                    >
                      <MessageCircleQuestion />
                      {message}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <form
            className="bg-slate-100/90 text-slate-800 dark:text-slate-100 dark:bg-[#252525]/90 backdrop-blur-xl rounded-b-lg p-2 shadow-lg"
            onSubmit={onSubmit}
          >
            <div className="flex gap-2">
              <input
                className="w-full p-2 rounded-lg bg-white/90 dark:bg-white/10 outline-none"
                placeholder="在此輸入文字⋯⋯"
                value={input}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                ref={submitButtonRef}
                className="py-2 px-4 rounded-lg bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white shrink-0"
              >
                送出
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="fixed bottom-4 right-4"
          key={0}
          layoutId="speech-ai"
        >
          <motion.button
            className="p-4 rounded-lg shadow-lg bg-slate-500 text-white"
            onClick={() => setActive(true)}
            layoutId="speech-ai-header"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div layoutId="speech-ai-header-icon">
              <BotMessageSquare size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
