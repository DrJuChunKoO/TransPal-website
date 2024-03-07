"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, Minus } from "lucide-react";
export default function SpeechAI() {
  const [active, setActive] = useState(false);
  return (
    <>
      {active ? (
        <motion.div
          className="fixed bottom-4 right-4 w-[min(400px,calc(100vw-32px))] bg-white"
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
          <motion.div className="bg-white overflow-y-scroll h-[400px] shadow-lg rounded-b-lg">
            Hello
          </motion.div>
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
