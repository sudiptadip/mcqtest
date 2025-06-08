import { Quote } from "lucide-react"

const stories = [
  {
    name: "Sakshi Kumar",
    title: "Cleared SSC CGL 2024",
    message: "This platform helped me stay focused. The practice sets were exactly like the real exam!",
    image: "/assets/images/profile3.jpeg",
  },
  {
    name: "Akash Singh",
    title: "Cleared UPSC Prelims 2024",
    message: "The daily news section and MCQ tests made all the difference. I’m grateful!",
    image: "/assets/images/profile1.jpeg",
  },
  {
    name: "Anannya Patel",
    title: "Cleared Bank PO 2024",
    message: "Consistent mock tests boosted my confidence. The dashboard analytics are amazing!",
    image: "/assets/images/profile2.jpeg",
  },
]

export default function SuccessStories() {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎉 Success Stories</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Thousands of aspirants have cracked their dream exams using our platform. Here’s what they say:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{story.name}</h4>
                  <p className="text-sm text-blue-600">{story.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic flex gap-2">
                <Quote className="w-4 h-4 text-blue-400" />
                {story.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
