import thesis from "../../public/Thesis-bro.svg";
import report from "../../public/Thinking-face-bro.svg";
import Image from "next/image";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-zinc-800 leading-tight">
            Revolutionizing{" "}
            <span className="text-blue-600 relative">Thesis Review</span>
          </h2>
        </FadeIn>

        <div className="space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between items-center gap-12"
          >
            <div className="md:w-1/2">
              <Image
                src={thesis}
                width={500}
                height={500}
                alt="Thesis illustration"
                className="rounded-md shadow-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                Why Use Our Solution?
              </h3>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Masters and PhD students face a significant challenge when
                submitting their thesis or report: comparing it against lengthy
                and complex rubrics. Our AI-powered application streamlines this
                process, syncing your rubric and report to provide
                comprehensive, instant feedback, saving you time and reducing
                stress.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="mt-4 text-blue-600 border-blue-600 bg-white"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col-reverse md:flex-row justify-between items-center gap-12"
          >
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                How It Works
              </h3>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Our innovative AI technology analyzes your thesis or report
                against the provided rubric, offering detailed insights and
                suggestions for improvement. The process is simple: upload your
                document and rubric, and receive a comprehensive analysis within
                minutes. Experience the future of academic review with our
                cutting-edge solution.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-100"
              >
                See Demo
              </Button>
            </div>
            <div className="md:w-1/2 sm:pl-20">
              <Image
                src={report}
                width={400}
                height={300}
                alt="Report analysis illustration"
                className="rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <Card className="p-6 border-[0.75px] border-blue-600  bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.5em"
                height="2.5em"
                viewBox="0 0 24 24"
                className="text-green-600 mb-4"
              >
                <path
                  fill="currentColor"
                  d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2h9m3-4v-2H6v2h12z"
                />
              </svg>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">
                Export Chat
              </h3>
              <p className="text-zinc-600 text-sm">
                Save and share your PDF chat conversations
              </p>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 border-[0.75px] border-blue-600  bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <Link href="/chat-with-pdf">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5em"
                  height="2.5em"
                  viewBox="0 0 24 24"
                  className="text-blue-600 mb-4 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm4-8h8v-2H6zm0-3h12V9H6zm0-3h12V6H6z"
                  />
                </svg>
              </Link>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">
                Chat with PDF
              </h3>
              <p className="text-zinc-600 text-sm">
                Interactive document analysis and feedback
              </p>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 border-[0.75px] border-blue-600  bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.5em"
                height="2.5em"
                viewBox="0 0 24 24"
                className="text-purple-600 mb-4"
              >
                <path
                  fill="currentColor"
                  d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                />
              </svg>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">
                Download Report
              </h3>
              <p className="text-zinc-600 text-sm">
                Easily export and share your analysis results
              </p>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className="p-6 border-[0.75px] border-blue-600  bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.5em"
                height="2.5em"
                viewBox="0 0 24 24"
                className="text-orange-600 mb-4"
              >
                <path
                  fill="currentColor"
                  d="M22.363 1.636H1.635C.732 1.636 0 2.37.001 3.273L0 20.727v.003c0 .903.733 1.634 1.635 1.634h20.73c.904 0 1.635-.734 1.635-1.637V3.273c.016-.89-.76-1.64-1.637-1.637M3.979 2.886c.492-.507 1.279.28.77.772c-.491.508-1.278-.279-.77-.771zM1.8 2.89c.507-.509 1.28.265.772.771c-.493.502-1.274-.28-.772-.771m21.7 17.838c.012.611-.524 1.148-1.137 1.136H1.635A1.137 1.137 0 0 1 .5 20.727L.501 4.91H23.5zM11 16.159l5.946-4.577c.235-.2.576.129.389.372l-.002-.002l-3.936 6.35a1.638 1.638 0 0 1-2.448.405c-.785-.668-.811-1.835.05-2.548zm4.763-.75c.09-.168 2.002-3.181 2.06-3.35c2.056 1.813 3.029 4.382 2.898 7.026h-3.819c.073-1.39-.29-2.678-1.139-3.676m-8.679 3.682H3.278c-.357-7.022 7.148-11.735 13.39-7.92l-3.461 2.618c-3.3-.762-6.364 1.71-6.123 5.302"
                />
              </svg>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">
                Comprehensive Feedback
              </h3>
              <p className="text-zinc-600 text-sm">
                Detailed insights for improvement
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
