"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Buffer } from "buffer";

export default function FileUpload() {
  const handleSubmit = async () => {
    const reportFileInput = document.getElementById(
      "report"
    ) as HTMLInputElement;
    if (!reportFileInput.files) return;
    const reportBytes = await reportFileInput.files[0].arrayBuffer();
    const reportDataBuffer = Buffer.from(reportBytes);
    const rubricFileInput = document.getElementById(
      "report"
    ) as HTMLInputElement;
    if (!rubricFileInput.files) return;
    const rubricBytes = await rubricFileInput.files[0].arrayBuffer();
    const rubricDataBuffer = Buffer.from(rubricBytes);

    try {
      fetch("api/pdf", {
        method: "POST",
        body: JSON.stringify({
          reportDataBuffer,
          rubricDataBuffer,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Some Error");
          return response.json();
        })
        .then((message) => {
          console.log(message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="Report">Report</Label>
      <Input id="report" type="file" className="mb-2" />
      <Label htmlFor="Rubric">Rubric</Label>
      <Input id="rubric" type="file" />
      <Button type="submit" className="mt-4 w-full">
        Generate Report
      </Button>
    </form>
  );
}
