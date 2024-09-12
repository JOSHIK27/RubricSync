"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonClass: string;
  highlight?: string;
}

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started with key features",
      features: [
        "Upload up to 50 pages",
        "Basic AI analysis",
        "Standard report",
        "Email support",
      ],
      buttonText: "Get Started",
      buttonClass: "bg-[#282624] hover:bg-[#3f3e3a]",
    },
    {
      name: "Premium",
      price: "$XX",
      period: "/month",
      description: "Advanced features for serious academic writers",
      features: [
        "Unlimited page uploads",
        "Advanced AI analysis",
        "Comprehensive reports",
        "Priority support",
        "Plagiarism checker",
      ],
      buttonText: "Join Waitlist",
      buttonClass: "bg-[#ffd700] text-[#484642] hover:bg-[#ffed4a]",
      highlight: "SOON",
    },
  ];

  return (
    <section className="mb-20 py-24 bg-gradient-to-b from-[#f5f3f2] to-white">
      <div className="my-16 text-center">
        <h1 className="text-5xl text-[#484642] font-bold mb-6">
          Simple, Transparent Pricing
        </h1>
        <h2 className="text-2xl text-[#6b6967] font-medium max-w-3xl mx-auto">
          Choose the perfect plan to elevate your academic writing experience
        </h2>
      </div>
      <div className="flex justify-center flex-wrap gap-6">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({ plan, delay }: { plan: Plan; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="flex max-w-xl"
    >
      <Card
        className={`p-8 m-2 h-full border-3 transition-all duration-300 ease-in-out hover:shadow-2xl ${
          plan.highlight ? "border-[#ffd700]" : "border-[#d3d1ce]"
        } bg-white relative overflow-hidden`}
      >
        {plan.highlight && (
          <div className="absolute -top-1 -right-8 w-40 text-center bg-[#ffd700] text-[#484642] pl-10 py-1 transform rotate-45 text-sm font-bold shadow-md">
            <span className="block w-full px-4">{plan.highlight}</span>
          </div>
        )}
        <div className="flex flex-col h-full">
          <h3 className="text-3xl font-bold text-[#484642] mb-4">
            {plan.name}
          </h3>
          <div className="mb-6">
            <span className="text-5xl font-extrabold text-[#484642]">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-xl text-[#6b6967]">{plan.period}</span>
            )}
          </div>
          <p className="text-lg text-[#6b6967] font-medium mb-8">
            {plan.description}
          </p>
          <ul className="space-y-2 mb-6 flex-grow">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-base text-[#484642]">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className={`w-full py-6 text-lg font-semibold ${plan.buttonClass} transition-colors duration-300`}
            onClick={() => {
              if (plan.buttonText === "Join Waitlist") {
                window.open("https://buy.stripe.com/test_eVa8xfa4Ug6bbL2fYY");
              }
            }}
          >
            {plan.buttonText}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
