"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FileUpload from "@/components/fileUpload";
import Context from "@/components/ui/context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="text-center h-screen flex items-center justify-center">
      <section className="mb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="text-[120px] font-inter font-extrabold bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent"
        >
          Rubric Sync
        </motion.div>
        <h3 className="text-[20px] font-extralight text-[#2d2817] font-inter">
          This is an AI tool which scans your research report and compares with
          the rubric to generate a comprehensive report with suggestions
        </h3>
        <div className="flex justify-center">
          <Sheet>
            <motion.div
              initial={{ x: "-1vw" }}
              animate={{ x: "0vw" }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              <SheetTrigger className="bg-[#4d4d50] shadow-lg  text-[#E6E4E3] hover:bg-[#3f3f4a] mt-8 px-12 py-2 text-[16px] rounded-none font-light">
                Try Now
              </SheetTrigger>
            </motion.div>
            <SheetContent side={"bottom"} className={`min-h-[600px]`}>
              <Card className={`mx-auto md:w-[500px] p-8 mt-4`}>
                <Context />
                <FileUpload />
              </Card>
            </SheetContent>
          </Sheet>
          {!userId ? (
            <motion.div
              initial={{ x: "1vw" }}
              animate={{ x: "0vw" }}
              transition={{ ease: "linear", duration: 0.2 }}
            >
              <Link href={"/sign-in"}>
                <Button className="border-1 border-neutral-600 ml-2 bg-[#F0EBE3] hover:bg-[#cbc6bf] shadow-lg  text-black mt-8 px-12 py-2 text-[16px] rounded-none">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          ) : (
            <SignOutButton>
              <motion.div
                initial={{ x: "1vw" }}
                animate={{ x: "0vw" }}
                transition={{ ease: "linear", duration: 0.2 }}
              >
                <Button className="border-1 border-neutral-600 ml-2 bg-[#F0EBE3] hover:bg-[#cbc6bf] shadow-lg  text-black mt-8 px-12 py-2 text-[16px] rounded-none">
                  Sign Out
                </Button>
              </motion.div>
            </SignOutButton>
          )}
        </div>
      </section>
    </main>
  );
}
