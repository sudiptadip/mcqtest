import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6 sm:px-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            📚 Prepare Smarter <br /> for Government Exams
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Get real-time updates, curated MCQs, and mock tests to boost your exam preparation — all in one place.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/practice"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition"
            >
              Start Practicing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <Image
            src="/assets/images/banner-image.png"
            alt="Students preparing for exam"
            width={500}
            height={400}
            className="w-full h-auto mix-blend-multiply"
            priority
          />
        </div>
      </div>

      {/* Decorative SVG/Blob */}
      <div className="absolute top-0 right-0 opacity-10 blur-2xl pointer-events-none select-none z-0">
        <svg viewBox="0 0 200 200" className="w-[300px] h-[300px]">
          <path
            fill="#6366f1"
            d="M44.3,-76.9C55.4,-70.6,61.6,-55.2,66.8,-41C71.9,-26.8,76,-13.4,72.9,-1.7C69.8,10.1,59.6,20.2,52.2,30.6C44.8,41,40.2,51.8,32.4,59.4C24.6,67.1,13.7,71.6,1.7,69.2C-10.2,66.9,-20.4,57.8,-32.5,51.5C-44.6,45.1,-58.6,41.5,-65.7,32.5C-72.7,23.4,-72.8,8.9,-72.3,-6.6C-71.8,-22.2,-70.6,-38.8,-60.9,-47.5C-51.2,-56.1,-32.9,-56.7,-18.3,-60.4C-3.8,-64.1,7.1,-70.8,20.4,-75.6C33.7,-80.4,49.2,-83.2,44.3,-76.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  )
}
