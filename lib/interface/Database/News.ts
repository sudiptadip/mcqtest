import CommonDatabaseFields from "./CommonDatabaseFields";

export default interface News extends CommonDatabaseFields {
  Id: number;
  Title: string;
  Slug: string;
  SourceUrl?: string | null;
  Content: string;
  ShortDescription?: string | null;
  CategoryId: number;
  ExamId?: number | null;
  PublishDate: string;
  IsPublished: boolean;
  DocumentImageId: number;
  ExpiredPostDate?: string | null;
}
