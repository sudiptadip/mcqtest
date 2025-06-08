import Link from "next/link"
import { CalendarDays, ArrowRight } from "lucide-react"

const newsItems = [
  {
    title: "SSC CGL 2025 Notification Released",
    date: "June 5, 2025",
    tag: "SSC",
    excerpt: "The official SSC CGL 2025 notification is out. Check eligibility, dates, and syllabus overview.",
    link: "/news/ssc-cgl-2025",
  },
  {
    title: "UPSC Prelims 2025 Admit Card Released",
    date: "June 3, 2025",
    tag: "UPSC",
    excerpt: "Download your admit card now. Prelims to be held on June 16. Read official guidelines.",
    link: "/news/upsc-prelims-2025",
  },
  {
    title: "Bank PO Vacancies Increased by 20%",
    date: "May 30, 2025",
    tag: "Banking",
    excerpt: "IBPS has increased the PO vacancies for 2025 recruitment. New PDF available.",
    link: "/news/bank-po-increase",
  },
]

export default function LatestNews() {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📰 Latest News & Updates</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Stay up-to-date with real-time news, notifications, and exam alerts from trusted sources.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {newsItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all border border-gray-100"
            >
              <div className="text-sm text-blue-600 font-semibold mb-2">{item.tag}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <CalendarDays className="w-4 h-4 mr-1" />
                {item.date}
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
              <Link
                href={item.link}
                className="text-blue-600 text-sm font-medium inline-flex items-center hover:underline"
              >
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}