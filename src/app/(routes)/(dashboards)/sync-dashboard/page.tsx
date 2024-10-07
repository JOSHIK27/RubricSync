"use client";
import { useContext, useMemo } from "react";
import { feedbackContext } from "@/app/context/AppContext";
import BarChartComponent from "@/components/charts/barChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadarChartComponent } from "@/components/charts/radarChart";

export default function Page() {
  const { feedback } = useContext(feedbackContext);
  // const chartData = useMemo(() => {
  //   const data = [];
  //   let index = "1";
  //   for (const [, value] of Object.entries(feedback)) {
  //     data.push({
  //       month: index,
  //       score: value,
  //     });
  //     index = index + "1";
  //   }
  //   return data;
  // }, [feedback]);
  const scores = {
    criteria1: 60,
    criteria2: 70,
    criteria3: 80,
    criteria4: 90,
    criteria5: 100,
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700">Feedback Dashboard</h1>
      <Separator className="my-4" />
      <div className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">70</div>
            <Progress value={scores.criteria1} />
          </CardContent>
        </Card>
        <BarChartComponent data={scores} />
        <RadarChartComponent />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback</CardTitle>
          <CardDescription>
            Review feedback for each section of your report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsList>
              {Object.entries(scores).map(([key, value]) => (
                <TabsTrigger value={key}>{key}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
