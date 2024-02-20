import Image from "next/image";
function IndexTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold text-center">{children}</h1>;
}
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-24 container">
      <div>
        <IndexTitle>近期會議紀錄</IndexTitle>
      </div>
    </main>
  );
}
