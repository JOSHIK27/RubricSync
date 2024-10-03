"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import LineChartComponent from "@/components/charts/lineChart";

export default function Page() {
  const filteredFeedbackList = useSelector(
    (state: RootState) => state.filteredFeedback.filteredFeedbackArray
  );
  console.log(filteredFeedbackList);
  return <LineChartComponent />;
}
