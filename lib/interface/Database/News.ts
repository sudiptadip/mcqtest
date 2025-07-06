import CommonDatabaseFields from "./CommonDatabaseFields";
import Exam from "./Exam";
import NewsCategory from "./NewsCategory";
import Tag from "./Tag";

export default interface News extends CommonDatabaseFields {
  Id?: number;
  Title: string;
  Slug: string;
  SourceUrl?: string | null;
  Content: string;
  ShortDescription?: string | null;
  CategoryId?: string;
  ExamId?: string | null;
  PublishDate: string;
  IsPublished: boolean;
  DocumentImageId?: string;
  ExpiredPostDate?: string | null;
  Tags?: Tag[];
  Category?: NewsCategory[];
  Exam?: Exam[];
  ImageUrl?: string;
}