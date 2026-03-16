"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Database, Zap } from "lucide-react";

export default function ServicePage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          LinkedIn & Sales Navigator Scraping <br />
          <span className="text-sky-600">No Cookies. No Ban Risks.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Scale your lead generation with zero account risks. Our scraper lets
          you extract profiles, companies, and job data—without cookies or login
          dependencies.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button className="px-6 py-3 text-lg rounded-xl">Get Started</Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg rounded-xl border-sky-600 text-sky-600"
          >
            See Demo
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Why Choose <span className="text-sky-600">Scrayz</span>?
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            Built for developers, trusted by enterprises. Extract LinkedIn data
            at scale—securely and reliably—with advanced filters and automation.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-sky-50 rounded-2xl shadow-sm">
            <ShieldCheck className="h-10 w-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-lg">No Ban Risks</h3>
            <p className="mt-2 text-gray-600">
              No cookies, no logins, no accounts at risk. 100% safe scraping at
              scale.
            </p>
          </div>

          <div className="p-6 bg-sky-50 rounded-2xl shadow-sm">
            <Database className="h-10 w-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-lg">Massive Scale</h3>
            <p className="mt-2 text-gray-600">
              Extract millions of profiles, jobs, and companies daily with ease.
            </p>
          </div>

          <div className="p-6 bg-sky-50 rounded-2xl shadow-sm">
            <CheckCircle className="h-10 w-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-lg">Advanced Filters</h3>
            <p className="mt-2 text-gray-600">
              Target by location, title, seniority, industry, decision makers,
              C-suite executives, and many more parameters
            </p>
          </div>

          <div className="p-6 bg-sky-50 rounded-2xl shadow-sm">
            <Zap className="h-10 w-10 text-sky-600 mb-4" />
            <h3 className="font-semibold text-lg">
              Real-Time API, Built for Scale
            </h3>
            <p className="mt-2 text-gray-600">
              Empower your business with a real-time, data-ready API that’s
              seamless, scalable, and easy to use.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-sky-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Powerful Use Cases
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            From startups to large enterprises, our scraper powers growth across
            industries.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg">Lead Generation</h3>
            <p className="mt-2 text-gray-600">
              Capture the right leads, at the right time.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg">Recruitment</h3>
            <p className="mt-2 text-gray-600">
              From entry-level to C-suite executives—hire with confidence.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg">Market Research</h3>
            <p className="mt-2 text-gray-600">
              Turn raw LinkedIn data into actionable business insights.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-600 text-white">
        {" "}
        <h2 className="text-3xl md:text-5xl font-bold">
          Start Scraping LinkedIn Safely—at Scale
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-sky-100">
          No more bans. No more cookie headaches. Just fast, reliable,
          large-scale data you can trust.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button className="px-6 py-3 text-lg rounded-xl bg-white text-sky-700 hover:bg-sky-100">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg rounded-xl border-white text-black"
          >
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
}
