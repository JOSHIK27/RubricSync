import { RadarChartComponent } from "@/components/charts/radarChart";
import BarChartComponent from "@/components/charts/barChart";
import AreaChartComponent from "@/components/charts/areaChart";

export default function Page() {
  const data = [
    { month: "1", score: 10 },
    { month: "2", score: 20 },
    { month: "3", score: 30 },
    { month: "4", score: 40 },
    { month: "5", score: 50 },
    { month: "6", score: 60 },
    { month: "7", score: 70 },
    { month: "8", score: 80 },
    { month: "9", score: 90 },
    { month: "10", score: 100 },
    { month: "11", score: 110 },
    { month: "12", score: 120 },
  ];
  return (
    <section>
      <AreaChartComponent />
      <div className="flex gap-4">
        <RadarChartComponent data={data} />
        <BarChartComponent />
      </div>
    </section>
  );
}
