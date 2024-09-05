import { auth } from "@clerk/nextjs/server";
import Landing from "@/components/landing";
import ChartUI from "@/components/chartui";

export default async function Home() {
  const { userId } = auth();

  return (
    <main>
      <Landing userId={userId} />
    </main>
  );
}
