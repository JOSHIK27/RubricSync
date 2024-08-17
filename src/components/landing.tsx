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
      <section className="flex items-center justify-center mb-28">
        <div className="pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 0.8 }}
            className="text-[120px] font-inter text-center font-extrabold bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent"
          >
            Rubric Sync
          </motion.div>
          <h3 className="text-[20px] text-center font-extralight text-[#2d2817] font-inter">
            This is an AI tool which scans your research report and compares
            with the rubric to generate a comprehensive report with suggestions
          </h3>

          <div className="flex justify-center">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#4d4d50] shadow-lg  text-[#E6E4E3] border-0 hover:bg-[#3f3f4a] hover:text-white mt-8 px-12 py-2 text-[16px] rounded-none font-light"
                >
                  Sync Now{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
                    width="1.2em"
                    height="1.2em"
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
