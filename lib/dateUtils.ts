import { format } from "date-fns";

/**
 * Converts JS Date to SQL datetime string in format: yyyy-MM-dd HH:mm:ss
 * Example: 2025-07-20 14:30:00
 */
export function toSqlDateTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Converts SQL datetime string to local JS Date
 * Assumes input is in UTC and converts to local time
 */
export function fromSqlDateTime(dateString: string): Date {
  return new Date(dateString); // auto-converts to local time
}

/**
 * Formats a SQL datetime string using a preset or custom format
 * @param sqlDateTime SQL datetime string (e.g. "2025-07-20 14:30:00")
 * @param formatType "long" | "short" | "medium" | "date" | "time" | custom format string
 * @returns Formatted string
 */
export function formatSqlDateTime(
  sqlDateTime: string,
  formatType: "long" | "short" | "medium" | "date" | "time" | string = "PPP p"
): string {
  const date = new Date(sqlDateTime);
  if (isNaN(date.getTime())) return ""; // Handle invalid date

  // Preset mappings
  const presets: Record<string, string> = {
    long: "PPPPpp",    // Sunday, July 20th, 2025 at 2:30 PM
    medium: "PPP p",   // Jul 20, 2025 at 2:30 PM
    short: "P p",      // 7/20/2025, 2:30 PM
    date: "PPP",       // Jul 20, 2025
    time: "p",         // 2:30 PM
  };

  const fmt = presets[formatType] || formatType;
  return format(date, fmt);
}