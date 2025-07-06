import { getAllNews, getCategoryAndExamList } from "@/lib/api/news";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Exam, News, NewsCategory } from "@/lib/interface/Database";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    category?: string;
    exam?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const categorySlug = searchParams?.category || "";
  const examSlug = searchParams?.exam || "";

  const { news, total, pageSize } = await getAllNews({
    page,
    categorySlug,
    examSlug,
  });

  const { NewsCategoryList, ExamList } = await getCategoryAndExamList();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      {/* FILTERS */}
      {/* FILTERS + RESET BUTTON */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {NewsCategoryList.map((cat: NewsCategory) => (
            <Link
              key={cat.Slug}
              href={`/news?category=${cat.Slug}`}
              className={`text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
                categorySlug === cat.Slug
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {cat.Name}
            </Link>
          ))}
        </div>
        {(categorySlug || examSlug) && (
          <Link
            href="/news"
            className="text-sm text-red-600 border border-red-300 hover:bg-red-50 px-3 py-1 rounded-full transition"
          >
            Reset Filters
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-b pb-4 mb-6">
        {ExamList.map((exam: Exam) => (
          <Link
            key={exam.Slug}
            href={`/news?exam=${exam.Slug}`}
            className={`text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
              examSlug === exam.Slug
                ? "bg-green-600 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {exam.Name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main News List */}
        <div className="lg:col-span-3 space-y-8">
          {news.map((item: News) => (
            <Card
              key={item.Id}
              className="overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Content */}
                <CardContent className="p-5 space-y-3 md:w-2/3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(item.PublishDate), "MMMM dd, yyyy")}
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">
                      {item.Category?.[0]?.Name}
                    </Badge>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    <Link href={`/news/${item.Slug}`}>{item.Title}</Link>
                  </h2>

                  <p className="text-sm text-gray-700 line-clamp-3">
                    {item.ShortDescription}
                  </p>

                  {item.Exam?.[0]?.Name && (
                    <p className="text-xs text-gray-500">
                      Related Exam:{" "}
                      <span className="font-medium text-blue-700">
                        {item.Exam[0].Name}
                      </span>
                    </p>
                  )}
                </CardContent>

                {/* Right: Image */}
                <div className="relative h-52 md:w-1/3 md:h-auto">
                  <Link href={`/news/${item.Slug}`}>
                    <Image
                      src={item.ImageUrl ?? "/placeholder.png"}
                      alt={item.Title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center flex-wrap gap-2 pt-6">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                const params = new URLSearchParams();
                if (categorySlug) params.append("category", categorySlug);
                if (examSlug) params.append("exam", examSlug);
                params.append("page", pageNumber.toString());

                return (
                  <Link
                    key={i}
                    href={`/news?${params.toString()}`}
                    className={`px-4 py-1.5 text-sm rounded-full border transition ${
                      page === pageNumber
                        ? "bg-blue-600 text-white"
                        : "text-blue-700 border-blue-200 hover:bg-blue-100"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar (optional) */}
        <div className="hidden lg:block space-y-6">
          <div className="text-xl font-bold border-b pb-2 text-blue-900">
            OPINION
          </div>

          {news.slice(-5).map((item: News) => (
            <div key={item.Id} className="flex items-start gap-3">
              <div className="flex-1">
                <Link
                  href={`/news/${item.Slug}`}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2"
                >
                  {item.Title}
                </Link>
                <p className="text-xs text-gray-500">
                  {format(new Date(item.PublishDate), "MMM dd, yyyy")}
                </p>
              </div>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}