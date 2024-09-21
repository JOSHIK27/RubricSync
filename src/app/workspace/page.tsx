import BlurIn from "@/components/magicui/blur-in";
import HistoryCard from "@/components/historyCard";

export default function Page() {
  return (
    <section>
      <BlurIn
        word="Sync History"
        className="!text-[40px] font-bold text-blue-600"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HistoryCard time={0.5} />
        <HistoryCard time={0.75} />
        <HistoryCard time={1} />
        <HistoryCard time={1.25} />
        <HistoryCard time={1.5} />
        <HistoryCard time={1.75} />
        <HistoryCard time={2} />
      </div>
    </section>
  );
}
