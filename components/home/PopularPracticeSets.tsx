import Link from "next/link"
import { CheckCircle, Flame, BarChart } from "lucide-react"

const practiceSets = [
  {
    name: "SSC CGL Tier-1",
    questions: 100,
    attempts: "15.2K+",
    difficulty: "Medium",
    link: "/practice/ssc-cgl-tier1",
  },
  {
    name: "UPSC GS Prelims",
    questions: 150,
    attempts: "22.4K+",
    difficulty: "Hard",
    link: "/practice/upsc-prelims",
  },
  {
    name: "Bank PO Reasoning",
    questions: 75,
    attempts: "10.8K+",
    difficulty: "Easy",
    link: "/practice/bank-po-reasoning",
  },
  {
    name: "Railway Group D",
    questions: 50,
    attempts: "8.6K+",
    difficulty: "Easy",
    link: "/practice/railway-group-d",
  },
]

export default function PopularPracticeSets() {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🔥 Popular Practice Sets</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Start practicing the most attempted and top-rated sets picked by thousands of aspirants.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {practiceSets.map((set, i) => (
            <Link
              key={i}
              href={set.link}
              className="group bg-blue-50 hover:bg-blue-100 border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
                  {set.name}
                </h3>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {set.questions} Questions
                </li>
                <li className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-purple-500" />
                  {set.attempts} Attempts
                </li>
              </ul>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                Difficulty: {set.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}