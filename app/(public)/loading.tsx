import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px] bg-white border border-gray-200 shadow-lg p-6 space-y-6 rounded-xl">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
          <p className="text-lg font-medium text-gray-800">Loading…</p>
        </div>

        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-5/6 bg-gray-200" />
          <Skeleton className="h-4 w-2/3 bg-gray-200" />
        </CardContent>

        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-2/3 animate-pulse bg-gray-400 rounded-full" />
        </div>
      </Card>
    </div>
  );
}