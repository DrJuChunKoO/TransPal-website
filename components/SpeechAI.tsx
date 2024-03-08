"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, Minus, Bot, User } from "lucide-react";
import { twMerge } from "tailwind-merge";
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

export default function SpeechAI() {
  const [active, setActive] = useState(false);
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
                onClick={() => setActive(false)}
              >
                <Minus size={24} />
              </button>
            </div>
          </motion.div>
          <motion.div className="bg-white/90 dark:bg-[#232323]/90 backdrop-blur-xl overflow-y-scroll h-[400px] shadow-lg p-2">
            <Message
              from="ai"
              content="嗨，我是 TransPal AI！有什麼可以幫助你的？"
            />
            <Message from="me" content="這場會議聊了什麼？" />
            <Message from="ai" content="正在思考⋯" />
          </motion.div>
          <div className="bg-slate-100/90 text-slate-800 dark:text-slate-100 dark:bg-[#252525]/90 backdrop-blur-xl rounded-b-lg p-2 shadow-lg flex gap-2">
            <input
              className="w-full p-2 rounded-lg bg-white/90 dark:bg-white/10 outline-none"
              placeholder="在此輸入文字⋯⋯"
            />
            <button className="py-2 px-4 rounded-lg bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white shrink-0">
              送出
            </button>
          </div>
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
