// components/news/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { News } from "@/lib/interface/Database";

export default function NewsCard({ item }: { item: News }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="rounded-md overflow-hidden mb-4">
          <Image
            src={item.ImageUrl ?? ""}
            alt={item.Title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        </div>

        {item.Category?.[0]?.Name && (
          <p className="text-sm font-medium text-primary mb-2">
            {item.Category?.[0]?.Name}
          </p>
        )}

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {item.Title}
        </h3>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarDays className="w-4 h-4 mr-2" />
          {new Date(item.PublishDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {item.ShortDescription}
        </p>

        <Link
          href={`/news/${item.Slug}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </CardContent>
    </Card>
  );
}