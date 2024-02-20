"use client";
import Link from "next/link";
import { LinkHTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
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
  return (
    <nav className="border-b border-gray-50 sticky top-0 bg-white/90 backdrop-blur-xl">
      <div className="container py-2 flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-gray-800">TransPal</div>
            <div className="text-gray-500">會議記錄網站</div>
          </Link>
          <div className="flex items-center gap-1">
            <NavLink href="/">首頁</NavLink>
            <NavLink href="/records">紀錄</NavLink>
            <NavLink href="/about">關於</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
