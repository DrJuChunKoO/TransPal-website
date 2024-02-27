import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
export default function useDarkMode() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return { theme, setTheme };
}
