"use client";

import FileUpload from "@/components/fileUpload";
import Context from "@/components/ui/context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Pricing from "./pricing";
import Footer from "./footer";
import Features from "./features";
import Faqs from "./faqs";

export default function Landing({ userId }: { userId: any }) {
  return (
    <>
      <section className="flex items-center justify-center mb-32">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-inter text-center font-black tracking-tight leading-0 bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent"
          >
            Rubric Sync
          </motion.div>
          <h3 className="mt-8 text-lg sm:text-xl md:text-2xl text-center text-zinc-700 font-sans mx-20 font-light leading-relaxed">
            This is an AI tool which scans your research report and compares
            with the rubric to generate a comprehensive report with suggestions
          </h3>

          <div className="flex justify-center mt-10">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white border-0 hover:text-white hover:from-zinc-800 hover:to-zinc-950 px-8 py-6 text-lg font-medium rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Sync Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 animate-spin"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.01 4V1l-4 4l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20.01 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.25 7.74A7.93 7.93 0 0 0 4.01 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"
                    />
                  </svg>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <Card className={`mx-auto md:w-[500px] p-8 mb-12 mt-4`}>
                  <Context />
                  <FileUpload />
                </Card>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </section>
      <Features />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  );
}
