import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  image: string;
  date: string;
  category: string;
  slug: string;
  title: string;
  description: string;
}

const NewsPostCard: React.FC<PostCardProps> = ({
  image,
  date,
  category,
  slug,
  title,
  description,
}) => {
  return (
    <div className="w-full mx-auto bg-white rounded shadow-md overflow-hidden mb-6">
      <Link href={`/news/${slug}`}>
        <Image
          src={image}
          alt={title}
          width={600}
          height={500}
          className="w-full h-83 object-cover"
        />
      </Link>
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center text-sm text-gray-500 gap-4 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {date}
          </span>
          <span className="bg-orange-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/news/${slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 py-3">{title}</h2>
        </Link>

        {/* Description */}
        <p className="text-gray-600 mb-5 text-md">{description}</p>

        {/* Button */}
        <Link
          href={`/news/${slug}`}
          className="bg-orange-100 text-red-700 font-semibold px-5 py-2 text-sm rounded-full hover:bg-orange-200 transition mb-6"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsPostCard;