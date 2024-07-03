import { auth } from "@clerk/nextjs/server";
import { motion } from "framer-motion";
import Landing from "@/components/landing";

export default async function Home() {
  const { userId } = auth();

  return (
    <main className="text-center h-screen flex items-center justify-center">
      <Landing userId={userId} />
    </main>
  );
}
