"use client";
import { useContext, useMemo } from "react";
import { feedbackContext } from "@/app/context/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadarChartComponent } from "@/components/charts/radarChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const ref = useRef(null);
  const { toast } = useToast();
  const { feedback } = useContext(feedbackContext);

  if (!feedback) {
    router.push("/");
  }

  const chartData = useMemo(() => {
    if (!feedback) return [];

    return Object.entries(feedback).map(([criterion, score]: any) => ({
      criterion: criterion.split(".")[0], // Take first sentence for shorter labels
      score: Math.round(score * 100), // Convert to percentage
    }));
  }, [feedback]);

  const averageScore = useMemo(() => {
    if (!feedback) return 0;
    const scores: any = Object.values(feedback);
    return Math.round(
      (scores.reduce((a: any, b: any) => a + b, 0) / scores.length) * 100
    );
  }, [feedback]);

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
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
              <CardDescription>Average across all criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2 text-blue-700">
                {averageScore}%
              </div>
              <Progress value={averageScore} className="h-2" />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Criteria Breakdown</CardTitle>
              <CardDescription>
                Score distribution across different criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChartComponent data={chartData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Feedback</CardTitle>
            <CardDescription>
              Review feedback for each criterion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {chartData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{item.criterion}</div>
                    <div className="text-sm text-blue-700 font-semibold">
                      {item.score}%
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
