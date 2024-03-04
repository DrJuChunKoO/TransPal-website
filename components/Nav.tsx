"use client";
import Link from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  Bars2Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import useDarkMode from "@/utils/useDarkMode";
function NavButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "p-2 rounded hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/5 dark:active:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DarkModeButton() {
  const { theme, setTheme } = useDarkMode();

  function handleThemeChange() {
    if (theme === "dark") {
      return setTheme("light");
    }
    setTheme("dark");
  }
  return (
    <NavButton onClick={handleThemeChange}>
      {theme === "dark" && (
        <MoonIcon className="size-6 text-gray-800 dark:text-gray-200" />
      )}

      {theme === "light" && (
        <SunIcon className="size-6 text-gray-800 dark:text-gray-200" />
      )}
    </NavButton>
  );
}

function NavLink({
  href,
  children,
  className,
  ...props
}: {
  href: string;
} & LinkHTMLAttributes<HTMLAnchorElement>) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      className={twMerge(
        "text-gray-400 px-4 py-1 rounded transition-all relative",
        isActive ? "text-gray-700" : "hover:text-gray-600 hover:bg-gray-100",
        isActive
          ? "text-slate-500 dark:text-[#6ECC93]"
          : "dark:hover:text-white/50 dark:hover:bg-white/5",
        className
      )}
      {...props}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-2 w-[75%] left-0 right-0 m-auto bg-slate-500 dark:bg-[#6ECC93] h-1 rounded-t-full"
            layoutId="underline"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
function NavLinkMobile({
  href,
  children,
  className,
  ...props
}: {
  href: string;
} & LinkHTMLAttributes<HTMLAnchorElement>) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      className={twMerge(
        "text-gray-500 px-4 py-2 rounded transition-all",
        isActive
          ? "bg-gray-200 text-gray-700 shadow-inner"
          : "hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:shadow-inner",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  const isIndex = usePathname() === "/";
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMessage = usePathname().match(/\/speeches\/[^/]+\/[^/]+/) !== null;
  const router = useRouter();
  return (
    <div>
      <nav className="border-b border-gray-50 sticky top-0 bg-gray-50/50 backdrop-blur-xl dark:bg-[#232323]/90 dark:border-white/5">
        <div className="container py-2 flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 justify-between h-8">
            <div className="flex">
              <AnimatePresence>
                {!isIndex && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {isMessage ? (
                      <NavButton
                        onClick={() =>
                          router.push(
                            currentPath.split("/").slice(0, -1).join("/") +
                              `/#${currentPath.split("/").at(-1)}`
                          )
                        }
                        className="mr-2"
                      >
                        <ArrowLeft className="size-6" />
                      </NavButton>
                    ) : (
                      <NavButton
                        onClick={() => router.push("/")}
                        className="mr-2"
                      >
                        <ArrowLeft className="size-6" />
                      </NavButton>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href="/" className="flex items-center gap-2">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  TransPal
                </div>
                <div className="text-gray-500 dark:text-gray-300">
                  會議記錄網站
                </div>
              </Link>
            </div>
            <div>
              <DarkModeButton />
              <NavButton
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden"
              >
                {isOpen ? (
                  <XMarkIcon className="size-6 text-gray-800 dark:text-gray-200" />
                ) : (
                  <Bars2Icon className="size-6 text-gray-800 dark:text-gray-200" />
                )}
              </NavButton>
            </div>
          </div>
          <div className="items-center gap-1 hidden md:flex">
            <NavLink href="/">首頁</NavLink>{" "}
            <NavLink href="/search">搜尋</NavLink>
            <NavLink href="/about">關於</NavLink>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
              className="overflow-hidden"
            >
              <motion.div
                className="container flex flex-col gap-2 pb-2"
                onClick={() => setIsOpen(false)}
              >
                <NavLinkMobile href="/">首頁</NavLinkMobile>
                <NavLinkMobile href="/search">搜尋</NavLinkMobile>
                <NavLinkMobile href="/about">關於</NavLinkMobile>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
