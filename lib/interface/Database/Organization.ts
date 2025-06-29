import CommonDatabaseFields from "./CommonDatabaseFields";

export default interface Organization extends CommonDatabaseFields {
  Id: number;
  Name: string;
  Slug: string;
  WebsiteUrl?: string | null;
}
