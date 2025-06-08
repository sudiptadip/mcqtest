"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export default function FaqSection() {
  return (
    <section className="py-24 px-6 sm:px-10 md:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            🙋 Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            Got questions? We’ve got answers to help you get started confidently.
          </p>
        </div>

        {/* FAQ Items */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="text-left px-6 py-4 hover:bg-gray-50 transition font-medium text-gray-900">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// FAQ Data
const faqData = [
  {
    question: "How do I start practicing?",
    answer:
      "Just sign up and visit the Practice Sets section. You'll have instant access to free MCQs and full sets.",
  },
  {
    question: "Do you offer free sets?",
    answer:
      "Yes, all new users get access to 2 full-length practice sets for free along with limited daily questions.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription anytime from your dashboard. No hidden charges.",
  },
  {
    question: "Which exams are supported?",
    answer:
      "We cover SSC, UPSC, Bank PO, Railways, State PSCs and more. New exams are added regularly.",
  },
  {
    question: "Do you provide explanations for questions?",
    answer:
      "Every question comes with a detailed solution and reasoning to help you learn effectively.",
  },
]