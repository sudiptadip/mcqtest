import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    features: [
      "2 Full Practice Sets",
      "Daily MCQs (Limited)",
      "Basic Analytics",
    ],
    popular: false,
    cta: "Start for Free",
  },
  {
    name: "Pro Plan",
    price: "₹199 / month",
    features: [
      "All Practice Sets",
      "Unlimited MCQs",
      "AI-based Feedback",
      "Advanced Analytics",
      "Bookmark & Review",
    ],
    popular: true,
    cta: "Subscribe Now",
  },
  {
    name: "Annual Plan",
    price: "₹1499 / year",
    features: [
      "All Pro Plan Features",
      "1-on-1 Mentor Session",
      "Exam Strategy PDFs",
      "Priority Support",
    ],
    popular: false,
    cta: "Go Annual",
  },
]

export default function PricingPlans() {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">💸 Affordable Pricing Plans</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Get started for free and upgrade anytime. Choose a plan that fits your learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-gray-50 p-8 rounded-2xl border shadow-sm hover:shadow-md transition ${
                plan.popular ? "border-blue-600" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 inline mr-1" /> Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}