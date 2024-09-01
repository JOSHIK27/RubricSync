import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Is it free?",
    answer: "Yes, absolutely. Our service is completely free to use.",
  },
  {
    question: "Do you use AI APIs?",
    answer:
      "Yes, this application utilizes AI API endpoints to provide intelligent responses.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take data security seriously. All user data is encrypted and stored securely.",
  },
];

export default function Faqs() {
  return (
    <section className="max-w-3xl mx-auto mb-20 px-4">
      <h2 className="text-center text-4xl text-gray-800 font-bold mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem key={`faq-${index}`} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
