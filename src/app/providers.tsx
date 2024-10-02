"use client";
import { feedbackContext, workspaceContext } from "./context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<any>(null);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ClerkProvider>
        <feedbackContext.Provider value={{ feedback, setFeedback }}>
          <workspaceContext.Provider
            value={{ workspaceCount, setWorkspaceCount }}
          >
            {children}
          </workspaceContext.Provider>
        </feedbackContext.Provider>
      </ClerkProvider>
    </Provider>
  );
}
