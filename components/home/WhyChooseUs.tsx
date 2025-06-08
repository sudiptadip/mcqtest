import { Sparkles, Clock, BookOpenCheck, LineChart } from "lucide-react"

const features = [
  {
    title: "Curated Practice Sets",
    description: "Get topic-wise MCQs created by experts with detailed explanations.",
    icon: <BookOpenCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Live Updates & Notifications",
    description: "Stay updated with real-time exam alerts and news across India.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your performance with reports, accuracy charts, and time spent.",
    icon: <LineChart className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Smart Recommendations",
    description: "AI suggests practice areas based on your strengths and weaknesses.",
    icon: <Sparkles className="w-6 h-6 text-blue-600" />,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">💡 Why Choose Us</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Everything you need to prepare smarter — not harder. Built for serious aspirants.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 p-6 rounded-xl shadow-sm hover:shadow-md text-left"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}