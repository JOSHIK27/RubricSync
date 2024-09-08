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

export default function Landing() {
  return (
    <>
      <section className="flex items-center justify-center mb-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-inter text-center font-black tracking-tighter leading-none bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 bg-clip-text text-transparent"
          >
            Rubric Sync
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.2 }}
            className="mt-8 text-xl sm:text-2xl md:text-3xl text-center text-zinc-700 font-sans mx-auto max-w-3xl font-light leading-relaxed"
          >
            Revolutionize your research with AI-powered analysis. Seamlessly
            compare your reports to rubrics, unlocking unparalleled insights and
            suggestions.
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white border-0 hover:text-white hover:from-zinc-900 hover:to-black px-10 py-7 text-xl font-semibold rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  Start Syncing
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 animate-spin"
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
