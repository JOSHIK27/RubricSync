"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart";

const chartData = [
  { month: "1", desktop: 186 },
  { month: "2", desktop: 305 },
  { month: "3", desktop: 237 },
  { month: "4", desktop: 273 },
  { month: "5", desktop: 209 },
  { month: "6", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function RadarChartComponent({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar dataKey="score" fill="#2563eb" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
