"use client";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const newsItems = [
  {
    Id: 1,
    Title: "SSC CGL 2025 Notification Released",
    Slug: "ssc-cgl-2025-notification",
    ShortDescription:
      "The official SSC CGL 2025 notification is out. Check eligibility, dates, and syllabus overview.",
    Content: "<p>Full article content here...</p>",
    ImageUrl: "/assets/images/temp/SSC-CGL2.jpeg",
    SourceUrl: "https://ssc.nic.in",
    PublishDate: "2025-06-05T00:00:00Z",
    IsPublished: true,
    Category: {
      Id: 1,
      Name: "SSC",
      Slug: "ssc",
    },
    Exam: {
      Id: 2,
      Name: "SSC CGL",
      Slug: "ssc-cgl",
    },
    Tags: [
      { Id: 1, Name: "SSC" },
      { Id: 3, Name: "Government Job" },
    ],
  },
  {
    Id: 2,
    Title: "UPSC Prelims 2025 Admit Card Released",
    Slug: "upsc-prelims-2025-admit-card",
    ShortDescription:
      "Download your admit card now. Prelims to be held on June 16. Read official guidelines.",
    Content: "<p>Full article content here...</p>",
    ImageUrl: "/assets/images/temp/Upsc.png",
    SourceUrl: "https://upsc.gov.in",
    PublishDate: "2025-06-03T00:00:00Z",
    IsPublished: true,
    Category: {
      Id: 2,
      Name: "UPSC",
      Slug: "upsc",
    },
    Exam: {
      Id: 3,
      Name: "UPSC Prelims",
      Slug: "upsc-prelims",
    },
    Tags: [
      { Id: 2, Name: "UPSC" },
      { Id: 4, Name: "Civil Services" },
    ],
  },
  {
    Id: 3,
    Title: "CTET 2025 Application Form Released",
    Slug: "ctet-2025-application-form",
    ShortDescription:
      "CBSE has released the CTET 2025 application form. Check the eligibility criteria and important dates.",
    Content:
      "<p>The Central Board of Secondary Education (CBSE) has released the application form for CTET 2025. The exam will be conducted in offline mode across the country. <a href='https://ctet.nic.in'>Apply now</a>.</p>",
    ImageUrl: "/assets/images/temp/CTET.jpg",
    SourceUrl: "https://ctet.nic.in",
    PublishDate: "2025-06-01T00:00:00Z",
    IsPublished: true,
    Category: {
      Id: 3,
      Name: "CTET",
      Slug: "ctet",
    },
    Exam: {
      Id: 4,
      Name: "CTET",
      Slug: "ctet",
    },
    Tags: [
      { Id: 5, Name: "CTET" },
      { Id: 6, Name: "Teaching" },
    ],
  },
];

export default function LatestNews() {
  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          📰 Latest News & Updates
        </h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Stay up-to-date with real-time news, notifications, and exam alerts
          from trusted sources.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {newsItems.map((item) => (
            <div
              key={item.Id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.ImageUrl}
                  alt={item.Title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.Tags.map((tag) => (
                    <span
                      key={tag.Id}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag.Name}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.Title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {format(new Date(item.PublishDate), "MMMM d, yyyy")}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.ShortDescription}
                </p>

                <Link
                  href={`/news/${item.Slug}`}
                  className="text-blue-600 text-sm font-medium inline-flex items-center hover:underline"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
