import { promises as fs } from "fs";
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

export default async function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  try {
    await fs.access(process.cwd() + "/public/avatars/" + name + ".webp");

    return (
      <div
        className={twMerge(
          "size-12 rounded-full overflow-hidden flex items-center justify-center text-white bg-white",
          className
        )}
      >
        <Image
          src={"/avatars/" + name + ".webp"}
          width={48}
          height={48}
          className="size-12 object-cover object-center"
          alt="Picture of the author"
        />
      </div>
    );
  } catch (e) {
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
}
