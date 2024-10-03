"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workspaceContext } from "@/app/context/AppContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  id?: number;
}
import { RootState } from "@/lib/store";
import { updateFilteredFeedbackList } from "@/lib/features/dashboards/FilteredFeedbackSlice";

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
  id,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);
  const { setWorkspaceCount } = useContext(workspaceContext);
  const filteredFeedbackList = useSelector(
    (state: RootState) => state.filteredFeedback.filteredFeedbackArray
  );
  const feedbackList = useSelector(
    (state: RootState) => state.feedback.feedbackArray
  );

  console.log(filteredFeedbackList, feedbackList);

  const dispatch = useDispatch();

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative flex w-full items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
          onClick={() => {
            setIsSubscribed(false);
            setWorkspaceCount((prevCount: number) => prevCount - 1);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-full cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={() => {
            setIsSubscribed(true);
            setWorkspaceCount((prevCount: number) => prevCount + 1);
            dispatch(
              updateFilteredFeedbackList([
                ...filteredFeedbackList,
                feedbackList[id! - 1],
              ])
            );
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
