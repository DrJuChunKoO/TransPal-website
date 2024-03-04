"use client";
import { ShareIcon } from "lucide-react";
export default function Share() {
  async function handleShare() {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("已複製連結");
    }
  }
  return (
    <button
      className="px-4 text-gray-800 dark:text-white flex gap-1 items-center flex-col"
      onClick={handleShare}
    >
      <div className="rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-white/10 dark:active:bg-white/15 p-2">
        <ShareIcon />
      </div>
      <div className="text-sm opacity-50">分享</div>
    </button>
  );
}
