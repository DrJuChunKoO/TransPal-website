import SpeechesList from "@/components/SpeechesList";
import { getSpeeches } from "@/utils/speeches";

export default async function Page() {
  const speeches = await getSpeeches();
  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        紀錄
      </div>
      <div>
        <SpeechesList Speeches={speeches} />
      </div>
    </div>
  );
}
