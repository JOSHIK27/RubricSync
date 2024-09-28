"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { ChevronRightIcon, CheckIcon } from "@radix-ui/react-icons";

export default function HistoryCard({
  id,
  time,
  score,
}: {
  id: number;
  time: number;
  score: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: time / 100 }}
    >
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-800">ID: {id}</h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Score: {score}
            </Badge>
          </div>
          <div className="flex items-center text-blue-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(time).toLocaleTimeString()}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-blue-100 p-4">
          <AnimatedSubscribeButton
            buttonColor="#3182ce"
            buttonTextColor="#ffffff"
            subscribeStatus={false}
            initialText={
              <span className="group inline-flex items-center">
                Add to Workspace{" "}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            }
            changeText={
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Added to Workspace{" "}
              </span>
            }
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
