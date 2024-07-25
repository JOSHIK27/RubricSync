import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <section className="mb-20">
      <h1 className="text-center text-[36px] text-[#484642] font-[900]">
        FAQs
      </h1>
      <Accordion
        type="single"
        collapsible
        color="black"
        className="w-3/4 mx-auto "
      >
        <AccordionItem color="black" className="" value="item-1">
          <AccordionTrigger className="">Is it Free?</AccordionTrigger>
          <AccordionContent>Yes, Absolutely.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="">Do we use AI api's</AccordionTrigger>
          <AccordionContent>
            Yes. This application use's AI api endpoints.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
