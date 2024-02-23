"use client";
import Link from "next/link";
import { LinkHTMLAttributes } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const isMessage = usePathname().match(/\/speeches\/[^/]+\/[^/]+/) !== null;
  const router = useRouter();
  return (
    <div>
      <nav className="border-b border-gray-50 sticky top-0 bg-white/90 backdrop-blur-xl">
        <div className="container py-2 flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 justify-between">
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
                      <button
                        onClick={() => router.back()}
                        className="p-2 rounded hover:bg-gray-100 active:bg-gray-200 mr-2 block"
                      >
                        <ArrowLeft className="size-6" />
                      </button>
                    ) : (
                      <Link
                        href="/"
                        className="p-2 rounded hover:bg-gray-100 active:bg-gray-200 mr-2 block"
                      >
                        <ArrowLeft className="size-6" />
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href="/" className="flex items-center gap-2">
                <div className="text-xl font-bold text-gray-800">TransPal</div>
                <div className="text-gray-500">會議記錄網站</div>
              </Link>
            </div>
            <div className="items-center gap-1 hidden md:flex">
              <NavLink href="/">首頁</NavLink>
              <NavLink href="/about">關於</NavLink>
            </div>
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 active:bg-gray-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="size-6 text-gray-800" />
              ) : (
                <Bars2Icon className="size-6 text-gray-800" />
              )}
            </button>
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
                <NavLink href="/">首頁</NavLink>
                <NavLink href="/about">關於</NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
