"use client";
import { Document, Page } from "react-pdf";
import { useState, useCallback, useRef, useEffect } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useAuth } from "@clerk/nextjs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface AIResponse {
  id: number;
  originalText: string;
  improvedText: string;
}

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
  if (!isLoaded) {
    return <></>;
  } else if (!userId) {
    router.push("/sign-in");
  }

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

  return (
    <div className="min-h-screen bg-stone-100 mx-12 rounded-lg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">
          PDF Viewer with AI Improvement
        </h1>

        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 sm:pr-4 mb-8 sm:mb-0">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex items-center">
                <input
                  id="sample"
                  type="file"
                  accept="application/pdf"
                  className="block w-full text-sm text-stone-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-stone-50 file:text-stone-700
                    hover:file:bg-stone-100"
                />
                <button
                  type="submit"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                >
                  Upload
                </button>
              </div>
            </form>

            {file && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="mb-4"
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

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      className="inline-flex items-center px-3 py-2 border border-stone-300 shadow-sm text-sm leading-4 font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="h-5 w-5 mr-2" />
                      Previous
                    </button>
                    <p className="text-sm text-stone-700">
                      Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                      {numPages || "--"}
                    </p>
                    <button
                      type="button"
                      disabled={pageNumber >= (numPages ? numPages : 0)}
                      onClick={nextPage}
                      className="inline-flex items-center px-3 py-2 border border-stone-300 shadow-sm text-sm leading-4 font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                    >
                      Next
                      <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>

                  {selectedText && (
                    <div
                      ref={tooltipRef}
                      className="absolute bg-white shadow-lg rounded-lg p-2 z-10"
                      style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                      }}
                    >
                      <button
                        onClick={handleImproveWithAI}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                      >
                        Improve with AI
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block w-px bg-stone-300 self-stretch mx-4"></div>
          <div className="w-full sm:w-1/2 sm:pl-4 border-t sm:border-t-0 pt-8 sm:pt-0 mt-8 sm:mt-0">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              AI Improvements
            </h2>
            {aiResponses.length === 0 ? (
              <p className="text-stone-600">
                No improvements yet. Select text and click "Improve with AI" to
                get started.
              </p>
            ) : (
              <div className="space-y-4">
                {aiResponses.map((response) => (
                  <div
                    key={response.id}
                    className="bg-white shadow overflow-hidden sm:rounded-lg p-4"
                  >
                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      Original Text:
                    </h3>
                    <p className="text-stone-600 mb-4">
                      {response.originalText}
                    </p>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      Improved Text:
                    </h3>
                    <p className="text-stone-600">{response.improvedText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
