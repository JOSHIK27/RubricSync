"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicPDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <Skeleton className="w-[100px] h-[20px] rounded-full" />,
});

export default function ChatWithPDFPage() {
  return (
    <Suspense
      fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
    >
      <DynamicPDFViewer />
    </Suspense>
  );
}

// https://github.com/wojtekmaj/react-pdf/issues/1811#issuecomment-2151416080
