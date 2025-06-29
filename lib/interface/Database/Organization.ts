import CommonDatabaseFields from "./CommonDatabaseFields";

export default interface Organization  {
  Id?: number;
  Name: string;
  Slug: string;
  WebsiteUrl?: string | null;
}
