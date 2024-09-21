import BlurIn from "@/components/magicui/blur-in";
import { HistoryIcon } from "lucide-react";
import HistoryCard from "@/components/historyCard";
export default function Page() {
  return (
    <section>
      <BlurIn
        word="Sync History"
        className="!text-[40px] font-bold text-blue-600"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </div>
    </section>
  );
}
