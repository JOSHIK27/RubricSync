"use client";
import { useContext, useMemo } from "react";
import { feedbackContext } from "@/app/context/AppContext";
import BarChartComponent from "@/components/charts/barChart";

export default function Page() {
  const { feedback } = useContext(feedbackContext);
  const chartData = useMemo(() => {
    const data = [];
    let index = "1";
    for (const [, value] of Object.entries(feedback)) {
      data.push({
        month: index,
        score: value,
      });
      index = index + "1";
    }
    return data;
  }, [feedback]);
  return <BarChartComponent data={chartData} />;
}
