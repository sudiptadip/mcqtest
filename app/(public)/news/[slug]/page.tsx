import { getNewsBySlug, getSuggestedNews } from "@/lib/api/news";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { News } from "@/lib/interface/Database";

// ✅ Fix: Use inline type for params
export default async function NewsDetailsPage({params}: any) {
  const news = await getNewsBySlug(params?.slug ?? "");

  if (!news) return notFound();

  const suggested = await getSuggestedNews({
    categoryId: news.Category?.[0]?.Id,
    examId: news.Exam?.[0]?.Id,
    excludeId: news.Id,
    limit: 4,
  });

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-6">
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
        <div className="lg:w-1/3 space-y-6">
          <div className="text-xl font-bold border-b pb-2 text-blue-900">
            Related News
          </div>

          {suggested.map((item: News) => (
            <Card key={item.Id} className="overflow-hidden">
              <div className="flex gap-4">
                <div className="w-24 h-24 relative shrink-0 rounded overflow-hidden">
                  <Link href={`/news/${item.Slug}`}>
                    <Image
                      src={item.ImageUrl ?? "/placeholder.png"}
                      alt={item.Title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>
                <div className="flex-1 py-2 pr-2">
                  <Link
                    href={`/news/${item.Slug}`}
                    className="font-medium text-gray-800 hover:text-blue-600 text-sm line-clamp-2"
                  >
                    {item.Title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(item.PublishDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
