"use client";

import FileUpload from "@/components/fileUpload";
import Context from "@/components/ui/context";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Pricing from "./pricing";
import Footer from "./footer";
import Features from "./features";
import Faqs from "./faqs";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import ShimmerButton from "@/components/magicui/shimmer-button";
import BlurIn from "@/components/magicui/blur-in";

export default function Landing() {
  return (
    <>
      <section className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-white py-24">
        <div className="max-w-6xl mx-auto">
          <BlurIn
            word="Rubric Sync"
            duration={0.75}
            className="text-6xl sm:text-[80px] md:text-8xl lg:text-9xl font-inter text-center font-black tracking-tighter leading-none text-blue-600"
          />

          {/* <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.2 }}
            className="mt-8 text-xl sm:text-2xl text-center text-gray-700 font-sans mx-auto max-w-3xl font-light leading-relaxed"
          >
            Never loose marks because of poor rubric interpretation. Rubric Sync
            will help you get the most out of your assignments.
          </motion.h3> */}
          <BlurIn
            word="Never loose marks because of poor rubric interpretation. Rubric Sync
            will help you get the most out of your assignments."
            duration={1}
            className="mt-8 !text-xl sm:!text-2xl text-center text-gray-700 font-sans mx-auto max-w-3xl font-[300] leading-relaxed"
          />

          <motion.div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ ease: "easeOut", duration: 1, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <Drawer>
              <DrawerTrigger asChild>
                {/* <ShinyButton className="px-8 py-6 bg-blue-600 text-white text-xl font-semibold rounded-full transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg flex items-center">
                  Start Syncing
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </ShinyButton> */}

                <ShimmerButton background="#2463EB" className="shadow-2xl">
                  <span className="text-xl font-semibold">Start Syncing</span>
                </ShimmerButton>
              </DrawerTrigger>
              <DrawerContent>
                <Card
                  className={`mx-auto md:w-[600px] p-10 mb-12 mt-4 shadow-2xl rounded-2xl`}
                >
                  <Context />
                  <FileUpload />
                </Card>
              </DrawerContent>
            </Drawer>
          </motion.div>
        </div>
      </section>
      <Features />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  );
}
