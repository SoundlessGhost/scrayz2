"use client";

import { motion } from "framer-motion";
import {
  User,
  Building2,
  Briefcase,
  MessageSquare,
  Compass,
  Shield,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "profiles",
    icon: User,
    title: "LinkedIn Profiles",
    description:
      "Extract names, titles, experience, education, skills, and connections with high accuracy.",
    size: "large",
    badge: "Popular",
    stats: "100M+ profiles",
    color: "sky",
  },
  {
    id: "company",
    icon: Building2,
    title: "Company Data",
    description:
      "Industry, size, location, description, and employee insights.",
    size: "small",
    color: "purple",
  },
  {
    id: "jobs",
    icon: Briefcase,
    title: "Job Listings",
    description: "Title, company, salary, posting date, and requirements.",
    size: "small",
    color: "orange",
  },
  {
    id: "posts",
    icon: MessageSquare,
    title: "Posts & Engagement",
    description: "Content, reactions, comments, shares, and author analytics.",
    size: "small",
    color: "pink",
  },
  {
    id: "sales-nav",
    icon: Compass,
    title: "Sales Navigator",
    description:
      "Lead profiles, filtered search results, company leads, and account insights.",
    size: "large",
    badge: "Pro",
    stats: "Advanced filters",
    color: "green",
  },
];

const bottomFeatures = [
  {
    id: "no-cookie",
    icon: Shield,
    title: "No Cookies Required",
    description: "Zero cookie dependency. No LinkedIn account risk.",
    color: "sky",
  },
  {
    id: "uptime",
    icon: Zap,
    title: "99.9% Uptime",
    description: "Reliable infrastructure with smart retry logic.",
    color: "green",
  },
  {
    id: "gdpr",
    icon: Clock,
    title: "GDPR Compliant",
    description: "Privacy-first data handling and consent management.",
    color: "cream",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function FeaturesGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-100 h-100 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(172,224,249,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-75 h-75 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,241,235,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-[#1a1a2e] mb-4"
            style={{ background: "rgba(172,224,249,0.2)" }}
          >
            <Zap className="w-4 h-4 text-[#0ea5e9]" />
            Powerful APIs
          </motion.span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
            Everything you need to scale LinkedIn data
          </h2>
          <p className="text-base sm:text-lg text-[#666677] max-w-2xl mx-auto">
            Built for developers, trusted by enterprises. Our API handles the
            complexity so you can focus on building great products.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`group relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#ace0f9]/50 ${
                feature.size === "large" ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              {/* Badge */}
              {feature.badge && (
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-[#1a1a2e]"
                  style={{
                    background:
                      feature.badge === "Popular"
                        ? "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)"
                        : "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
                  }}
                >
                  {feature.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    feature.color === "sky"
                      ? "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)"
                      : feature.color === "purple"
                        ? "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)"
                        : feature.color === "orange"
                          ? "linear-gradient(135deg, #fdba74 0%, #fb923c 100%)"
                          : feature.color === "pink"
                            ? "linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%)"
                            : feature.color === "green"
                              ? "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)"
                              : "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)",
                }}
              >
                <feature.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    feature.color === "sky"
                      ? "text-[#0c4a6e]"
                      : feature.color === "purple"
                        ? "text-[#4c1d95]"
                        : feature.color === "orange"
                          ? "text-[#9a3412]"
                          : feature.color === "pink"
                            ? "text-[#9d174d]"
                            : feature.color === "green"
                              ? "text-[#065f46]"
                              : "text-[#0c4a6e]"
                  }`}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold text-[#1a1a2e] mb-2 group-hover:text-[#0ea5e9] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#666677] leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stats for large cards */}
              {feature.stats && (
                <div className="flex items-center gap-2 text-sm font-medium text-[#0ea5e9]">
                  <Zap className="w-4 h-4" />
                  {feature.stats}
                </div>
              )}

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-[#0ea5e9]" />
              </div>

              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(172,224,249,0.3), 0 20px 40px -20px rgba(172,224,249,0.3)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Features - 3 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {bottomFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group relative rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#ace0f9]/50 flex items-start gap-4"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    feature.color === "sky"
                      ? "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)"
                      : feature.color === "green"
                        ? "linear-gradient(135deg, #86efac 0%, #4ade80 100%)"
                        : "linear-gradient(135deg, #fff1eb 0%, #fecaca 100%)",
                }}
              >
                <feature.icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    feature.color === "sky"
                      ? "text-[#1a1a2e]"
                      : feature.color === "green"
                        ? "text-green-800"
                        : "text-[#1a1a2e]"
                  }`}
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1a1a2e] mb-1 group-hover:text-[#0ea5e9] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#666677]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            href="/workflows"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#1a1a2e] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
            }}
          >
            Explore all APIs
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
