import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  return (
    <main className="text-center h-screen flex items-center justify-center">
      <section className="mb-40">
        <h1 className="text-[120px] font-inter font-extrabold bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">
          Rubric Sync
        </h1>
        <h3 className="text-[20px] font-extralight text-[#2d2817] font-inter">
          This is an AI tool which scans your research report and compares with
          the rubric to generate a comprehensive report with suggestions
        </h3>

        <Sheet>
          <SheetTrigger className="bg-[#4d4d50] shadow-lg  text-[#E6E4E3] hover:bg-[#3f3f4a] mt-8 px-12 py-2 text-[16px] rounded-none font-light">
            Try Now
          </SheetTrigger>
          <SheetContent side={"bottom"} className="min-h-[600px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>
    </main>
  );
}
