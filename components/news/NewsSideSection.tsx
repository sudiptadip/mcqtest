import Link from "next/link";
import Image from "next/image";
import { News, NewsCategory, Exam } from "@/lib/interface/Database";
import { formatSqlDateTime } from "@/lib/dateUtils";
import { ChevronRight } from "lucide-react";

interface SidebarContentProps {
  rNews: News[];
  NewsCategoryList: NewsCategory[];
  ExamList: Exam[];
  categorySlug: string;
  examSlug: string;
}

export default function NewsSideSection({
  rNews,
  NewsCategoryList,
  ExamList,
  categorySlug,
  examSlug,
}: SidebarContentProps) {
  return (
    <div className="space-y-10">
      {/* Latest Post */}
      <div>
        <h3 className="text-lg font-semibold border-l-4 border-red-500 pl-2 mb-4">
          Latest Post
        </h3>

        <div className="space-y-4">
          {rNews?.slice(-3).map((item) => (
            <div key={item.Id} className="flex gap-3 items-start">
              <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden">
                <Link href={`/news/${item.Slug}`}>
                  <Image
                    src={item.ImageUrl ?? "/placeholder.png"}
                    alt={item.Title}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>

              <div className="flex-1">
                <Link
                  href={`/news/${item.Slug}`}
                  className="text-sm font-medium text-black hover:text-red-600 leading-tight line-clamp-2"
                >
                  {item.Title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {formatSqlDateTime(item.PublishDate, "medium")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold border-l-4 border-red-500 pl-2 mb-4">
          All Categories
        </h3>

        <ul className="text-sm">
          <li className="flex justify-between py-2 border-b border-dashed">
            <Link
              href="/news"
              className={`font-medium flex-1 hover:underline ${
                !categorySlug ? "text-red-600" : "text-gray-700"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <ChevronRight size={14} />
                All
              </span>
            </Link>
            <span className={!categorySlug ? "text-red-600" : "text-gray-500"}>
              (10)
            </span>
          </li>
          {NewsCategoryList.map((cat) => (
            <li
              key={cat.Slug}
              className="flex justify-between py-2 border-b border-dashed mt-1"
            >
              <Link
                href={`/news?category=${cat.Slug}`}
                className={`flex-1 text-base hover:text-red-500 ${
                  categorySlug === cat.Slug
                    ? "text-red-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <ChevronRight size={14} />
                  {cat.Name}
                </span>
              </Link>
              <span
                className={
                  categorySlug === cat.Slug ? "text-red-600" : "text-gray-500"
                }
              >
                (13)
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exams */}
      <div>
        <h3 className="text-lg font-semibold border-l-4 border-green-500 pl-2 mb-4">
          All Exams
        </h3>

        <ul className="text-sm">
          <li className="flex justify-between py-2 border-b border-dashed">
            <Link
              href="/news"
              className={`font-medium flex-1 hover:underline ${
                !examSlug ? "text-green-600" : "text-gray-700"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <ChevronRight size={14} />
                All
              </span>
            </Link>
            <span className={!examSlug ? "text-green-600" : "text-gray-500"}>
              (10)
            </span>
          </li>
          {ExamList.map((exam) => (
            <li
              key={exam.Slug}
              className="flex justify-between py-2 border-b border-dashed mt-1"
            >
              <Link
                href={`/news?exam=${exam.Slug}`}
                className={`flex-1 text-base hover:text-green-600 ${
                  examSlug === exam.Slug
                    ? "text-green-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <ChevronRight size={14} />
                  {exam.Name}
                </span>
              </Link>
              <span
                className={
                  examSlug === exam.Slug
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                (13)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}