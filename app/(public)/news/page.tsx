// app/news/page.tsx
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllNews } from "@/lib/api/news";
import NewsCard from "@/components/news/NewsCard";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All News - TopClass",
  description: "Latest government job news, SSC, UPSC, CTET updates and more.",
};

export default async function AllNewsPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const query = searchParams.q || "";
  const { news, totalPages } = await getAllNews({ page, query });

  return (
    <section className="py-16 px-4 md:px-10 bg-muted/50">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">📰 All News & Updates</h1>

        <form className="w-full max-w-md">
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search news..."
            className="shadow-sm"
          />
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No news found.
              </CardContent>
            </Card>
          ) : (
            news.map((item) => <NewsCard key={item.Id} item={item} />)
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link key={i} href={`?page=${i + 1}&q=${query}`}>
                <Button
                  variant={page === i + 1 ? "default" : "outline"}
                  className="w-10 h-10 p-0"
                >
                  {i + 1}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
