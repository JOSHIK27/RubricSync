"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef, useEffect } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useAuth } from "@clerk/nextjs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface AIResponse {
  id: number;
  originalText: string;
  improvedText: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Test() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setSelectedText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (!isLoaded) return;
  //   if (!userId) {
  //     router.push("/sign-in");
  //   }
  // }, [isLoaded, userId, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = document.getElementById("sample") as HTMLInputElement;
    if (!fileInput.files) return;
    const selectedFile = fileInput.files[0];
    setFile(selectedFile);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      setSelectedText(selection.toString().trim());
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY,
      });
    } else {
      setSelectedText("");
    }
  };

  const handleImproveWithAI = () => {
    const newResponse: AIResponse = {
      id: Date.now(),
      originalText: selectedText,
      improvedText: `Improved: ${selectedText}`,
    };
    setAiResponses((prev) => [...prev, newResponse]);
    setSelectedText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3f2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-5xl font-bold text-[#484642] mb-8 flex items-center">
          <DocumentIcon className="h-12 w-12 mr-4 text-[#484642]" />
          Chat with PDF
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border-3 border-[#d3d1ce] hover:shadow-2xl transition-all duration-300">
              {file ? (
                <div className="p-6">
                  <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="mb-6"
                  >
                    <div onMouseUp={handleTextSelection}>
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={false}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </Document>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      className="inline-flex items-center px-4 py-2 border border-[#d3d1ce] text-sm font-medium rounded-md text-[#484642] bg-white hover:bg-[#f5f3f2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#282624] disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="h-5 w-5 mr-2" />
                      Previous
                    </button>
                    <p className="text-sm text-[#6b6967]">
                      Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                      {numPages || "--"}
                    </p>
                    <button
                      type="button"
                      disabled={pageNumber >= (numPages ? numPages : 0)}
                      onClick={nextPage}
                      className="inline-flex items-center px-4 py-2 border border-[#d3d1ce] text-sm font-medium rounded-md text-[#484642] bg-white hover:bg-[#f5f3f2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#282624] disabled:opacity-50"
                    >
                      Next
                      <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      id="sample"
                      type="file"
                      accept="application/pdf"
                      className="block w-full text-sm text-[#6b6967] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f5f3f2] file:text-[#484642] hover:file:bg-[#e5e3e2]"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#282624] hover:bg-[#3f3e3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#282624]"
                    >
                      <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                      Upload PDF
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border-3 border-[#d3d1ce] hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#484642] mb-4 flex items-center">
                  <SparklesIcon className="h-6 w-6 mr-2 text-[#484642]" />
                  AI Improvements
                </h2>
                {aiResponses.length === 0 ? (
                  <p className="text-[#6b6967]">
                    No improvements yet. Select text and click "Improve with AI"
                    to get started.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {aiResponses.map((response) => (
                      <div
                        key={response.id}
                        className="border-b border-[#d3d1ce] pb-4 last:border-b-0 last:pb-0"
                      >
                        <h3 className="text-sm font-medium text-[#484642] mb-2">
                          Original Text:
                        </h3>
                        <p className="text-sm text-[#6b6967] mb-4">
                          {response.originalText}
                        </p>
                        <h3 className="text-sm font-medium text-[#484642] mb-2">
                          Improved Text:
                        </h3>
                        <p className="text-sm text-[#6b6967]">
                          {response.improvedText}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedText && (
        <div
          ref={tooltipRef}
          className="fixed bg-white shadow-lg rounded-lg p-2 z-10"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <button
            onClick={handleImproveWithAI}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#282624] hover:bg-[#3f3e3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#282624]"
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            Improve with AI
          </button>
        </div>
      )}
    </div>
  );
}
