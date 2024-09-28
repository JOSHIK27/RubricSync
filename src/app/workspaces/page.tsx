"use client";
import BlurIn from "@/components/magicui/blur-in";
import HistoryCard from "@/components/historyCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { workspaceContext } from "@/app/context/AppContext";

export default function Page() {
  const { workspaceCount } = useContext(workspaceContext);

  return (
    <section>
      <div className="flex px-4 justify-between items-center">
        <BlurIn
          word="Sync History"
          className="!text-[40px] font-bold text-blue-600"
        />
        <Button
          variant={`${workspaceCount > 0 ? "default" : "outline"}`}
          className="text-blue-600 border-blue-300"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create Dashboard
        </Button>
      </div>
      <Separator className="mb-4 px-4" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
        <HistoryCard time={0.5} />
        <HistoryCard time={0.75} />
        <HistoryCard time={1} />
        <HistoryCard time={1.25} />
        <HistoryCard time={1.5} />
        <HistoryCard time={1.75} />
        <HistoryCard time={2} />
      </div>
    </section>
  );
}
