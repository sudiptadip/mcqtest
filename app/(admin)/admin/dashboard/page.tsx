"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Activity,
  BarChart,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value="1,240"
          color="bg-blue-100 text-blue-800"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value="$18,920"
          color="bg-green-100 text-green-800"
        />
        <StatCard
          icon={Activity}
          title="Engagement"
          value="76%"
          color="bg-pink-100 text-pink-800"
        />
        <StatCard
          icon={BarChart}
          title="Performance"
          value="Good"
          color="bg-yellow-100 text-yellow-800"
        />
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-gray-400">
              {/* Placeholder */}
              Signup Graph Placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-gray-400">
              {/* Placeholder */}
              Traffic Chart Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
};

function StatCard({ icon: Icon, title, value, color }: StatCardProps) {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-full text-lg ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}
