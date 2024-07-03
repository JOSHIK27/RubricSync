"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Buffer } from "buffer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <></>;
  } else if (!userId) {
    router.push("/sign-in");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          setFeedback(message.feedback);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {feedback && (
        <Dialog defaultOpen={true}>
          <DialogContent className="sm:max-w-lg max-h-80 overflow-scroll">
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div>{feedback}</div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  onClick={() => setFeedback("")}
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Label htmlFor="Report">Report</Label>
      <Input id="report" type="file" className="mb-2" />
      <Label htmlFor="Rubric">Rubric</Label>
      <Input id="rubric" type="file" />

      {loading ? (
        <Button disabled className="mt-4 w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Syncing
        </Button>
      ) : (
        <Button type="submit" className="mt-4 w-full">
          Generate Report
        </Button>
      )}
    </form>
  );
}
