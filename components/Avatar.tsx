"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { UserIcon } from "@heroicons/react/24/solid";
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
  const [avatar, setAvatar] = useState<string | null>(null);

  const loadAvatar = async () => {
    try {
      const avatarModule = await import(`../data/avatars/${name}.webp`);
      setAvatar(avatarModule.default);
    } catch (error) {
      console.error("Failed to load avatar:", error);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, [name]);

  if (!avatar) {
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

  return (
    <div
      className={twMerge(
        "size-12 rounded-full overflow-hidden flex items-center justify-center text-white bg-white",
        className
      )}
    >
      <Image
        src={avatar}
        width={48}
        height={48}
        className="size-12 object-cover object-center"
        alt="Picture of the author"
      />
    </div>
  );
}
