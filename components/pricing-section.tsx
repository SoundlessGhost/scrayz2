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
import Image from "next/image";

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

const faqs = [
  {
    question: "How does the API pricing work?",
    answer:
      "Our pricing is based on the number of API calls per month. Each successful request counts as one API call. Failed requests due to our service issues don&apos;t count against your quota.",
  },
  {
    question: "What happens if I exceed my monthly quota?",
    answer:
      "If you exceed your monthly quota, additional requests will be charged at $0.05 per call for Starter, $0.03 for Growth, and $0.01 for Scale plans. You can set usage alerts to monitor your consumption.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
  },
  {
    question: "Do you offer custom enterprise plans?",
    answer:
      "Yes, we offer custom enterprise plans for organizations with specific requirements. Contact our sales team to discuss volume discounts and custom features.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required to start. You'll get full access to all features during the trial period.",
  },
  {
    question: "What's your data retention policy?",
    answer:
      "We retain your API request logs and responses for the duration specified in your plan (7-90 days). This helps with debugging and analytics. You can request data deletion at any time.",
  },
];

export function PricingSection() {
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

        <section className="bg-white py-16 px-6 md:px-12 lg:px-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Need a custom plan?
              </h2>

              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✔</span> Custom scraping
                  solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✔</span> Scalable pricing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✔</span> SLAs with guaranteed
                  data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✔</span> Dedicated team of
                  experts
                </li>
              </ul>

              <button className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
                Talk to us →
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center">Competitor Comparison</CardTitle>
            <CardDescription className="text-center">
              Compare all features across our pricing plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Website</th>
                    <th className="text-center py-3 px-4">Starter</th>
                    <th className="text-center py-3 px-4">Growth</th>
                    <th className="text-center py-3 px-4">Scale</th>
                    <th className="text-center py-3 px-4">Cookies</th>
                    <th className="text-center py-3 px-4">Email</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Scrayz</td>
                    <td className="text-center py-3 px-4">1,000</td>
                    <td className="text-center py-3 px-4">10,000</td>
                    <td className="text-center py-3 px-4">100,000</td>
                    <td className="text-center py-3 px-4">No Cookies</td>
                    <td className="text-center py-3 px-4">Coming soon</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Apify Actor</td>
                    <td className="text-center py-3 px-4">$0.05/call</td>
                    <td className="text-center py-3 px-4">$0.03/call</td>
                    <td className="text-center py-3 px-4">$0.01/call</td>
                    <td className="text-center py-3 px-4">No Cookies</td>
                    <td className="text-center py-3 px-4">X</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">PhantomBuster</td>
                    <td className="text-center py-3 px-4">7 days</td>
                    <td className="text-center py-3 px-4">30 days</td>
                    <td className="text-center py-3 px-4">90 days</td>
                    <td className="text-center py-3 px-4"> Cookies</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  {/* <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Webhook delivery</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Bulk operations</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Phone support</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
