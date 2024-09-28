"use client";
import { feedbackContext, workspaceContext } from "./context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<any>(null);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  return (
    <ClerkProvider>
      <feedbackContext.Provider value={{ feedback, setFeedback }}>
        <workspaceContext.Provider
          value={{ workspaceCount, setWorkspaceCount }}
        >
          {children}
        </workspaceContext.Provider>
      </feedbackContext.Provider>
    </ClerkProvider>
  );
}
