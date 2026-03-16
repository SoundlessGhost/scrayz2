"use client";

import {
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const usageData = [
  {
    endpoint: "/v1/profile",
    calls: 1247,
    percentage: 43.8,
    trend: "up",
    trendValue: 12,
  },
  {
    endpoint: "/v1/company",
    calls: 892,
    percentage: 31.3,
    trend: "up",
    trendValue: 8,
  },
  {
    endpoint: "/v1/jobs",
    calls: 456,
    percentage: 16.0,
    trend: "down",
    trendValue: 3,
  },
  {
    endpoint: "/v1/bulk-profiles",
    calls: 252,
    percentage: 8.9,
    trend: "up",
    trendValue: 15,
  },
];

const recentActivity = [
  {
    time: "2 minutes ago",
    action: "Profile enrichment completed",
    status: "success",
    details: "linkedin.com/in/sarah-johnson",
  },
  {
    time: "5 minutes ago",
    action: "Company data retrieved",
    status: "success",
    details: "TechCorp Inc.",
  },
  {
    time: "8 minutes ago",
    action: "Rate limit warning",
    status: "warning",
    details: "Approaching hourly limit (850/1000)",
  },
  {
    time: "12 minutes ago",
    action: "Bulk operation started",
    status: "info",
    details: "Processing 50 profiles",
  },
];

export function UsageAnalytics() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Endpoint Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Endpoint Usage</span>
          </CardTitle>
          <CardDescription>API calls by endpoint this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {usageData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {item.endpoint}
                  </code>
                  <Badge
                    variant={item.trend === "up" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {item.trendValue}%
                  </Badge>
                </div>
                <span className="text-sm font-medium">
                  {item.calls.toLocaleString()}
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Latest API calls and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.status === "success" && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {activity.status === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                  {activity.status === "info" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.details}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
