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

          <BlurIn
            word="Never loose marks because of poor rubric interpretation. Rubric Sync
            will help you get the most out of your assignments."
            duration={1}
            className="mt-8 !text-xl sm:!text-2xl text-center text-gray-700 font-sans mx-auto max-w-3xl font-[300] leading-relaxed"
          />

          <div className="flex justify-center mt-12">
            <Drawer>
              <DrawerTrigger asChild>
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
