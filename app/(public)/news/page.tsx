export const dynamic = "force-dynamic";
import { getAllNews, getCategoryAndExamList } from "@/lib/api/news";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Exam, News, NewsCategory } from "@/lib/interface/Database";
import { type NextPage } from "next";
import NewsPostCard from "@/components/news/NewsPostCard";
import { formatSqlDateTime } from "@/lib/dateUtils";
import NewsSideSection from "@/components/news/NewsSideSection";

interface Props {
  searchParams?: any;
}

export default async function NewsPage({ searchParams }: Props) {
  const page = Number(searchParams?.page ?? 1);
  const categorySlug =
    typeof searchParams?.category === "string" ? searchParams?.category : "";
  const examSlug =
    typeof searchParams?.exam === "string" ? searchParams?.exam : "";

  const { news, total, pageSize } = await getAllNews({
    page,
    categorySlug,
    examSlug,
  });

  const { news: rNews } = await getAllNews({
    page,
  });

  const { NewsCategoryList, ExamList } = await getCategoryAndExamList();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      {/* FILTERS */}
      {/* FILTERS + RESET BUTTON */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6 block lg:hidden">
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

      <div className="flex flex-wrap gap-2 border-b pb-4 mb-6 block lg:hidden">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main News List */}
        <div className="lg:col-span-8 space-y-8">
          {news?.map((item: News, i: number) => (
            <NewsPostCard
              category={item?.Category?.[0]?.Name ?? ""}
              date={formatSqlDateTime(item.PublishDate, "medium")}
              slug={item.Slug}
              image={item.ImageUrl ?? ""}
              description={item.ShortDescription ?? ""}
              title={item.Title}
              key={i}
            />
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

        <div className="hidden lg:block lg:col-span-4">
          <NewsSideSection
            rNews={rNews}
            NewsCategoryList={NewsCategoryList}
            ExamList={ExamList}
            categorySlug={categorySlug}
            examSlug={examSlug}
          />
        </div>
        
      </div>
    </div>
  );
}