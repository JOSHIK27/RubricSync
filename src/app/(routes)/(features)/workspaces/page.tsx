"use client";
import BlurIn from "@/components/magicui/blur-in";
import HistoryCard from "@/components/historyCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedbackList } from "@/lib/features/dashboards/FeedbackSlice";
import { RootState } from "@/lib/store";

export default function Page() {
  const [feedbacksList, setFeedbacksList] = useState<any[]>([]);
  const feedback = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { data, error, loading } = useQuery({
    url: "/api/feedback",
    method: "GET",
    body: null,
  });
  useEffect(() => {
    if (data) {
      setFeedbacksList(data.data);
      dispatch(updateFeedbackList(data.data));
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ReactLoading type={"bars"} color="#4299e1" />
      </div>
    );
  return (
    <section>
      <div className="flex px-4 justify-between items-center">
        <BlurIn
          word="Sync History"
          className="!text-[40px] font-bold text-blue-600"
        />
        <Button variant="outline" className="text-blue-600 border-blue-300">
          <PlusIcon className="mr-2 h-4 w-4" /> Create Dashboard
        </Button>
      </div>
      <Separator className="mb-4 px-4" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {feedbacksList &&
          feedbacksList.map((feedback, index) => (
            <HistoryCard
              key={feedback.id}
              id={index + 1}
              time={100 * index}
              score={feedback.avgScore}
            />
          ))}
      </div>
    </section>
  );
}
