import React from "react";
import Link from "next/link";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap, Building, Rocket } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: 0,
    date: "7days",
    description: "Perfect for small projects and testing",
    features: [
      "20 API calls per day ",
      // "Per day 20 request",
      // "15-day free trail",
      // "Basic rate limiting",
      // "Email support",
      // "Standard SLA",
    ],
    limitations: ["No bulk operations", "No webhooks", "No priority support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Starter",
    icon: Zap,
    price: 29,
    date: "month",
    description: "Perfect for small projects and testing",
    features: [
      "1,000 API calls/month",
      "Per minutes 50 request",
      // "Profile & company data",
      // "Basic rate limiting",
      // "Email support",
      // "7-day data retention",
      // "Standard SLA",
    ],
    limitations: ["No bulk operations", "No webhooks", "No priority support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    icon: Building,
    price: 99,
    date: "month",
    description: "Ideal for growing businesses and teams",
    features: [
      "10,000 API calls/month",
      "Per minutes 50 request",
      "Per hours 3000 request",
      // "All data endpoints",
      // "Smart retry logic",
      // "Webhook delivery",
      "30-day data retention",
      // "Priority email support",
      // "Bulk operations",
      // "Advanced analytics",
    ],
    limitations: ["No phone support", "Standard SLA"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Scale",
    icon: Rocket,
    price: 199,
    date: "month",
    description: "For enterprises with high-volume needs",
    features: [
      "100,000 API calls/month",
      "Per minutes 100 request",
      "Per day 10000 request",
      // "All premium features",
      // "Custom rate limits",
      // "Dedicated webhooks",
      // "90-day data retention",
      // "Phone & email support",
      // "Custom integrations",
      // "99.9% SLA guarantee",
      // "Account manager",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
  {
    name: "Business",
    icon: Rocket,
    price: 999,
    date: "month",
    description: "For enterprises with high-volume needs",
    features: [
      "1M API calls/month",
      "Per minutes 200 request",
      "Per day 100,000 request",
      // "All premium features",
      // "Custom rate limits",
      // "Dedicated webhooks",
      // "90-day data retention",
      // "Phone & email support",
      // "Custom integrations",
      // "99.9% SLA guarantee",
      // "Account manager",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Choose the plan that fits your needs. All plans include our core
            features with no hidden fees or surprise charges.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-5 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "border-accent shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.date}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>

                {/* <div className="text-center text-xs text-muted-foreground">
                  14-day free trial • No credit card required
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
