import Search from "@/components/Search";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800 dark:text-white">
        搜尋
      </div>
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
