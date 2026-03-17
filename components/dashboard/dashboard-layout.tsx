"use client";

import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Key,
  Eye,
  Copy,
  User,
  EyeOff,
  RefreshCw,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsageAnalytics } from "./usage-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export function DashboardLayout() {
  const { user } = useUser();

  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [loadingKey, setLoadingKey] = useState<boolean>(false);

  const fetchKey = async () => {
    try {
      setLoadingKey(true);
      const res = await fetch("/api/keys/stripe", { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load key");
      setApiKey(data.key || "");
      toast("API key loaded", {
        description: "Key loaded securely from server.",
      });
    } catch (e) {
      toast("Couldn’t load key", { description: e instanceof Error ? e.message : String(e) });
    } finally {
      setLoadingKey(false);
    }
  };

  const copyApiKey = () => {
    if (!apiKey)
      return toast("No key loaded", { description: "Click Reveal first." });
    navigator.clipboard.writeText(apiKey);
    toast("API key copied", { description: "Your API key has been copied." });
  };

  const regenerateApiKey = () => {
    // Call your backend to rotate key in Stripe + update env/secret store
    toast("API key regenerated", {
      description: "Rotate on the server, then reload this page.",
    });
  };

  const masked = apiKey
    ? apiKey.slice(0, 8) + "•".repeat(24)
    : "sk_live_" + "•".repeat(32);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.firstName} {user?.lastName}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your API usage and account status.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  API Calls This Month
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Remaining Quota
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,153</div>
                <p className="text-xs text-muted-foreground">
                  Resets in 12 days
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and helpful resources to get you started.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 bg-transparent"
                    >
                      <div className="text-left">
                        <div className="font-medium">View Documentation</div>
                        <div className="text-sm text-muted-foreground">
                          Learn how to integrate our API
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 bg-transparent"
                    >
                      <div className="text-left">
                        <div className="font-medium">API Playground</div>
                        <div className="text-sm text-muted-foreground">
                          Test endpoints in real-time
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 bg-transparent"
                    >
                      <div className="text-left">
                        <div className="font-medium">Usage Analytics</div>
                        <div className="text-sm text-muted-foreground">
                          Monitor your API performance
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 bg-transparent"
                    >
                      <div className="text-left">
                        <div className="font-medium">Support Center</div>
                        <div className="text-sm text-muted-foreground">
                          Get help from our team
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <UsageAnalytics />
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>API Key Management</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your API keys securely. Keys are fetched from the
                    server when you reveal them.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">
                        Production API Key
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 font-mono text-sm bg-muted px-3 py-2 rounded border">
                          {showApiKey && apiKey ? apiKey : masked}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          disabled={loadingKey}
                          onClick={async () => {
                            if (!showApiKey && !apiKey) await fetchKey();
                            setShowApiKey((v) => !v);
                          }}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyApiKey}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Key Status</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">
                          Active
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" onClick={regenerateApiKey}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              {/* Billing Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Current Plan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Pro Plan</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Monthly quota
                        </span>
                        <span>10,000 calls</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Used this month
                        </span>
                        <span>2,847 calls</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Next billing
                        </span>
                        <span>Jan 15, 2024</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Account Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Account created
                        </span>
                        <span>Dec 1, 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total API calls
                        </span>
                        <span>45,231</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Success rate
                        </span>
                        <span>99.2%</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Download Invoice
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
