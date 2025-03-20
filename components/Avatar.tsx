"use client";
import { twMerge } from "tailwind-merge";
import { UserIcon } from "@heroicons/react/24/solid";
import avatars from "@/public/avatars.json";

function genColor(name: string) {
  let randomSeed = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  let color = Math.floor(Math.abs(Math.sin(randomSeed) * 16777215));
  let resultColor = color.toString(16);
  while (color.toString().length < 6) {
    resultColor = "0" + color;
  }
  return "#" + resultColor;
}

export default function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  // 檢查是否有有效的頭貼
  const hasAvatar = name in avatars;

  if (hasAvatar) {
    return (
      <div
        className={twMerge(
          "size-12 rounded-full overflow-hidden flex items-center justify-center text-white bg-white",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/avatars/${name}.jpg`}
          width={48}
          height={48}
          className="size-12 object-cover object-center"
          alt={`Picture of ${name}`}
        />
      </div>
    );
  }

  const bgColor = genColor(name);
  return (
    <div
      className={twMerge(
        "size-12 rounded-full overflow-hidden flex items-center justify-center text-white",
        className
      )}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <UserIcon className="size-8" />
    </div>
  );
}
