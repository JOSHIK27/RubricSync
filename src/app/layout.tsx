import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
const inter = Inter({ subsets: ["latin"] });
import { auth } from "@clerk/nextjs/server";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Rubric sync",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Nav userid={userId} />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
