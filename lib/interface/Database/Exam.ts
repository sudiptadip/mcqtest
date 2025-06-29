import CommonDatabaseFields from "./CommonDatabaseFields";

export default interface Exam extends CommonDatabaseFields {
  Id?: number;
  Name: string;
  Slug: string;
  Description?: string | null;
  OrganizationId: number;
}
