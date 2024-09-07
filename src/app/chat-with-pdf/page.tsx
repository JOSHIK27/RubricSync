"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicPDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>,
});

export default function ChatWithPDFPage() {
  return (
    <Suspense fallback={<p>Loading PDF viewer...</p>}>
      <DynamicPDFViewer />
    </Suspense>
  );
}

// https://github.com/wojtekmaj/react-pdf/issues/1811#issuecomment-2151416080
