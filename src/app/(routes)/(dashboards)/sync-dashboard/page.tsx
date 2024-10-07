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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const ref = useRef(null);
  const { toast } = useToast();
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

  const exportToPDF = async () => {
    if (!ref.current) return;

    try {
      // Create canvas from the content
      const canvas = await html2canvas(ref.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // If content is longer than one page, add new pages
      let heightLeft = imgHeight - pageHeight;
      let position = -pageHeight;

      while (heightLeft >= 0) {
        position = position - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("page-export.pdf");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error generating PDF",
        variant: "destructive",
      });
    }
  };

  const scores = {
    criteria1: 60,
    criteria2: 70,
    criteria3: 80,
    criteria4: 90,
    criteria5: 100,
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Feedback Dashboard</h1>
        <Button
          onClick={exportToPDF}
          className="bg-blue-700 text-white hover:bg-blue-800"
        >
          Export
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div ref={ref}>
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
                  <TabsTrigger key={key} value={key}>
                    {key}
                  </TabsTrigger>
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
    </div>
  );
}
