"use client";
import { feedbackContext } from "./context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<any>(null);
  return (
    <ClerkProvider>
      <feedbackContext.Provider value={{ feedback, setFeedback }}>
        {children}
      </feedbackContext.Provider>
    </ClerkProvider>
  );
}
