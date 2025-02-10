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
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 text-sm p-2 sm:px-3"
    >
      <ShareIcon size={16} />
      <span className="hidden sm:inline">分享</span>
    </button>
  );
}
