import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-[420px] bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <p className="text-lg font-semibold text-gray-800">Loading, please wait…</p>
        </div>

        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-3/4 rounded-md bg-gray-300" />
          <Skeleton className="h-5 w-full rounded-md bg-gray-300" />
          <Skeleton className="h-5 w-5/6 rounded-md bg-gray-300" />
          <Skeleton className="h-5 w-2/3 rounded-md bg-gray-300" />
        </CardContent>

        <div className="mt-6 h-2.5 w-full bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full w-1/2 animate-pulse bg-blue-500 rounded-full transition-all duration-500 ease-in-out" />
        </div>
      </Card>
    </div>
  );
}