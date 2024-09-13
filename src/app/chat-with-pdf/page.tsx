"use client";
import ReactLoading from "react-loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicPDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <ReactLoading type={"bars"} color="#000" />
    </div>
  ),
});

export default function ChatWithPDFPage() {
  return <DynamicPDFViewer />;
}

// https://github.com/wojtekmaj/react-pdf/issues/1811#issuecomment-2151416080
