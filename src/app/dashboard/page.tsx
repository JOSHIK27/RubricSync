"use client";
import { MyResponsiveBar } from "@/components/barChart";
import { data } from "@/components/barChart";
import { MyResponsiveRadar } from "@/components/radarChart";
import { useContext } from "react";
import { feedbackContext } from "@/app/context/AppContext";

export default function Page() {
  const { feedback } = useContext(feedbackContext);
  const data = Object.keys(feedback).map((key) => {
    return {
      taste: key,
      score: feedback[key],
    };
  });
  console.log(data);
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <MyResponsiveBar data={data} /> */}
      <MyResponsiveRadar data={data} />
    </div>
  );
}
