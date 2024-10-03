"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import LineChartComponent from "@/components/charts/lineChart";

export default function Page() {
  const feedbackList = useSelector(
    (state: RootState) => state.feedback.feedbackArray
  );
  console.log(feedbackList);
  return <LineChartComponent />;
}
