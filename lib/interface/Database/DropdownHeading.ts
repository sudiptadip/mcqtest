import CommonDatabaseFields from "./CommonDatabaseFields";

export default interface DropdownHeading extends CommonDatabaseFields {
  Id: number;
  Name: string;
  IsAlwaysVisible: boolean;
}
