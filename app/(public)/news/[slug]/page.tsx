import { getNewsBySlug, getRecommendedNews } from "@/lib/api/news";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import NewsCard from "@/components/news/NewsCard";

// Replace this with your actual site URL
const siteUrl = "https://govcrack.in";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug);
  const title = news?.Title || "News Details - GOVCRACK";
  const description =
    news?.ShortDescription?.substring(0, 160) ||
    "Latest news and updates from GOVCRACK.";
  const url = `${siteUrl}/news/${params.slug}`;
  const image = news?.ImageUrl
    ? `${siteUrl}${news.ImageUrl}`
    : `${siteUrl}/default-image.jpg`;

  return {
    title,
    description,
    keywords: news?.Tags?.map((tag) => tag.Name),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "GOVCRACK",
      images: [
        {
          url: image,
          width: 800,
          height: 400,
          alt: news?.Title,
        },
      ],
      type: "article",
      publishedTime: news?.PublishDate,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NewsDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getNewsBySlug(params.slug);
  if (!news) return notFound();

  const recommended = await getRecommendedNews(
    (news.Tags || []).map((tag) => tag.Name),
    Number(news.Id)
  );

  return (
    <section className="py-10 px-4 md:px-16 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {news.Title}
        </h1>

        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          {new Date(news.PublishDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {news.Category?.Name && <> | {news.Category.Name}</>}
        </div>

        <Image
          src={news.ImageUrl || "/default-image.jpg"}
          alt={news.Title}
          width={800}
          height={400}
          priority
          className="rounded-lg w-full object-cover"
        />

        <article
          className="prose max-w-none prose-blue"
          dangerouslySetInnerHTML={{ __html: news.Content }}
        />

        {news?.Tags!?.length > 0 && (
          <div className="pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {news.Tags!.map((tag, i) => (
                <span
                  key={i}
                  className="bg-muted text-sm text-muted-foreground px-3 py-1 rounded-full"
                >
                  {tag.Name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Schema.org NewsArticle structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: news.Title,
            description: news.ShortDescription,
            image: [`${siteUrl}${news.ImageUrl || "/default-image.jpg"}`],
            author: {
              "@type": "Organization",
              name: "GOVCRACK",
            },
            publisher: {
              "@type": "Organization",
              name: "GOVCRACK",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
              },
            },
            datePublished: news.PublishDate,
            dateModified: news.ModifiedOn || news.PublishDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteUrl}/news/${news.Slug}`,
            },
          }),
        }}
      />

      {/* ✅ Optional: Breadcrumbs schema for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "News",
                item: `${siteUrl}/news`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: news.Title,
                item: `${siteUrl}/news/${news.Slug}`,
              },
            ],
          }),
        }}
      />

      {/* ✅ Recommended Section */}
      {recommended.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 px-4 md:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🧠 Recommended News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <NewsCard key={item.Id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}