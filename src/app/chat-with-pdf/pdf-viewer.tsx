"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef, useEffect } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import ReactLoading from "react-loading";
import { motion } from "framer-motion";

interface AIResponse {
  id: number;
  improvedText: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [rubricFile, setRubricFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [reportBuffer, setReportBuffer] = useState<Buffer | null>(null);
  const [rubricBuffer, setRubricBuffer] = useState<Buffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reportInput = document.getElementById("report") as HTMLInputElement;
    const rubricInput = document.getElementById("rubric") as HTMLInputElement;
    if (reportInput.files) {
      setReportFile(reportInput.files[0]);
      const reportBytes = await reportInput.files[0].arrayBuffer();
      const reportBuffer = Buffer.from(reportBytes);
      setReportBuffer(reportBuffer);
    }
    if (rubricInput.files) {
      setRubricFile(rubricInput.files[0]);
      const rubricBytes = await rubricInput.files[0].arrayBuffer();
      const rubricBuffer = Buffer.from(rubricBytes);
      setRubricBuffer(rubricBuffer);
    }
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

  const handleImproveWithAI = async () => {
    setIsLoading(true);
    const response = await fetch("/api/improveText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalText: selectedText,
        criterion: rubricBuffer,
      }),
    });

    const data = await response.json();
    setAiResponses([
      ...aiResponses,
      {
        id: aiResponses.length + 1,
        improvedText: data,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold text-blue-800 mb-10 flex items-center"
        >
          <DocumentIcon className="h-14 w-14 mr-5 text-blue-700" />
          <span className="text-blue-700">Chat with PDF</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[60%]"
          >
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-stone-300 hover:shadow-2xl transition-all duration-300">
              {reportFile ? (
                <div className="p-6">
                  <Document
                    file={reportFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="mb-6"
                  >
                    <div onMouseUp={handleTextSelection}>
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={false}
                        className="w-full h-auto"
                      />
                    </div>
                  </Document>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="h-5 w-5 mr-2" />
                      Previous
                    </button>
                    <p className="text-sm text-stone-600">
                      Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                      {numPages || "--"}
                    </p>
                    <button
                      type="button"
                      disabled={pageNumber >= (numPages ? numPages : 0)}
                      onClick={nextPage}
                      className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                    >
                      Next
                      <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="report"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Upload Report (PDF)
                      </label>
                      <input
                        id="report"
                        type="file"
                        accept="application/pdf"
                        className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rubric"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Upload Rubric (PDF)
                      </label>
                      <input
                        id="rubric"
                        type="file"
                        accept="application/pdf"
                        className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                      Upload Files
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-[40%] flex flex-col h-[calc(100vh-2rem)]"
          >
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-stone-300 hover:shadow-2xl transition-all duration-300 flex-grow flex flex-col">
              <div className="p-8 flex-shrink-0 bg-blue-200 border-b border-blue-300">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center">
                  <SparklesIcon className="h-8 w-8 mr-4 text-blue-700" />
                  AI Improvements
                </h2>
              </div>
              <div className="flex-grow mt-4 justify-center items-center overflow-y-auto px-6 pb-6">
                {isLoading ? (
                  <ReactLoading type={"bars"} color="#000" />
                ) : aiResponses.length === 0 ? (
                  <div className="text-center py-8">
                    <SparklesIcon className="h-12 w-12 mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-600 text-lg">
                      No improvements yet. Select text and click "Improve with
                      AI" to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {aiResponses.map((response, index) => (
                      <div
                        key={response.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-stone-300"
                      >
                        <h3 className="text-sm font-medium text-stone-700 mb-2 flex items-center">
                          <SparklesIcon className="h-4 w-4 mr-2 text-stone-600" />
                          Improvement {index + 1}
                        </h3>
                        <p className="text-sm text-stone-700">
                          {response.improvedText}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {selectedText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          ref={tooltipRef}
          className="fixed bg-white shadow-xl rounded-lg p-3 z-10"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <button
            onClick={handleImproveWithAI}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-stone-700 to-stone-600 hover:from-stone-800 hover:to-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-all duration-300"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Improve with AI
          </button>
        </motion.div>
      )}
    </div>
  );
}
