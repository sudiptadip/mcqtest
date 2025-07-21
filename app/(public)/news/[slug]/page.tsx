import {
  getCategoryAndExamList,
  getNewsBySlug,
  getSuggestedNews,
} from "@/lib/api/news";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { News } from "@/lib/interface/Database";
import NewsSideSection from "@/components/news/NewsSideSection";

// ✅ Fix: Use inline type for params
export default async function NewsDetailsPage({ params }: any) {
  const news = await getNewsBySlug(params?.slug ?? "");
  const { NewsCategoryList, ExamList } = await getCategoryAndExamList();

  if (!news) return notFound();

  const suggested = await getSuggestedNews({
    categoryId: news.Category?.[0]?.Id,
    examId: news.Exam?.[0]?.Id,
    excludeId: news.Id,
    limit: 4,
  });

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">{news.Title}</h1>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {format(new Date(news.PublishDate), "MMMM dd, yyyy")}
            {news.Category?.[0]?.Name && (
              <Badge className="bg-orange-100 text-orange-700 ml-2">
                {news.Category[0].Name}
              </Badge>
            )}
            {news.Exam?.[0]?.Name && (
              <Badge className="bg-green-100 text-green-700 ml-2">
                {news.Exam[0].Name}
              </Badge>
            )}
          </div>

          {news.ImageUrl && (
            <div className="relative h-[400px] w-full rounded overflow-hidden">
              <Image
                src={news.ImageUrl}
                alt={news.Title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: news.Content }}
          />

          {news.SourceUrl && (
            <p className="text-sm text-gray-500 mt-4">
              Source:{" "}
              <a
                href={news.SourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {news.SourceUrl}
              </a>
            </p>
          )}
        </div>

        {/* Sidebar - Suggestions */}
        <div className="hidden lg:block lg:col-span-4 pt-5">
          <NewsSideSection
            rNews={suggested}
            NewsCategoryList={NewsCategoryList}
            ExamList={ExamList}
            categorySlug={""}
            examSlug={""}
          />
        </div>

      </div>

    </div>
  );
}
