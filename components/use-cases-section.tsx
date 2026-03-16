"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Search,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const useCases = [
  {
    id: "recruiting",
    title: "Recruiting",
    icon: Users,
    color: "sky",
    description: "Find and evaluate candidates with comprehensive profile data",
    workflow: [
      "Search for candidates by skills and experience",
      "Enrich profiles with detailed work history",
      "Analyze candidate fit and qualifications",
      "Build talent pipelines with automated updates",
    ],
    example: `// Find senior engineers in SF
const candidates = await scrayz.searchProfiles({
  keywords: 'senior software engineer',
  location: 'San Francisco',
  experience: '5+'
});

console.log(candidates.data);
// Returns: 250+ matching profiles`,
  },
  {
    id: "sales",
    title: "Sales Intelligence",
    icon: TrendingUp,
    color: "purple",
    description: "Identify prospects and build targeted outreach campaigns",
    workflow: [
      "Research prospects and their companies",
      "Gather contact information and insights",
      "Personalize outreach with profile data",
      "Track engagement and follow-ups",
    ],
    example: `// Get company decision makers
const prospects = await scrayz.getCompanyEmployees({
  company: 'techcorp-inc',
  roles: ['VP', 'Director', 'Manager'],
  department: 'engineering'
});

// Returns: Key decision makers with emails`,
  },
  {
    id: "research",
    title: "Market Research",
    icon: Search,
    color: "green",
    description: "Analyze market trends and competitive intelligence",
    workflow: [
      "Monitor industry trends and movements",
      "Track competitor hiring patterns",
      "Analyze skill demand and supply",
      "Generate market intelligence reports",
    ],
    example: `// Track AI talent movement
const trends = await scrayz.analyzeTrends({
  skills: ['machine learning', 'AI'],
  timeframe: '6months',
  industry: 'technology'
});

// Returns: Hiring trends & insights`,
  },
];

const getGradient = (color: string) => {
  switch (color) {
    case "sky":
      return "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)";
    case "purple":
      return "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)";
    case "green":
      return "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)";
    default:
      return "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)";
  }
};

const getIconColor = (color: string) => {
  switch (color) {
    case "sky":
      return "#0c4a6e";
    case "purple":
      return "#4c1d95";
    case "green":
      return "#065f46";
    default:
      return "#0c4a6e";
  }
};

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState("recruiting");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeCase = useCases.find((uc) => uc.id === activeTab)!;

  const copyExample = useCallback(async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success("Copied to clipboard", {
        description: "Code snippet copied successfully.",
      });
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Copy failed", {
        description: "Please select and copy manually.",
      });
    }
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #ace0f9 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #fff1eb 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-[#1a1a2e] mb-4"
            style={{ background: "rgba(172,224,249,0.2)" }}
          >
            <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
            Use Cases
          </motion.span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
            Built for every workflow
          </h2>
          <p className="text-base sm:text-lg text-[#666677] max-w-2xl mx-auto">
            Whether you&apos;re recruiting talent, generating leads, or
            conducting market research — our API adapts to your needs.
          </p>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {useCases.map((uc) => {
            const Icon = uc.icon;
            const isActive = activeTab === uc.id;

            return (
              <motion.button
                key={uc.id}
                onClick={() => setActiveTab(uc.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base
                  transition-all duration-300 flex items-center gap-2
                  ${
                    isActive
                      ? "text-[#1a1a2e] shadow-lg"
                      : "text-[#666677] bg-white border border-gray-200 hover:border-[#ace0f9] hover:bg-[#fff1eb]/30"
                  }
                `}
                style={isActive ? { background: getGradient(uc.color) } : {}}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{uc.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {/* Workflow Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#ace0f9]/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: getGradient(activeCase.color) }}
                >
                  <activeCase.icon
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    style={{ color: getIconColor(activeCase.color) }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-1">
                    {activeCase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666677]">
                    {activeCase.description}
                  </p>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#1a1a2e] mb-4 uppercase tracking-wide">
                  Typical Workflow
                </h4>
                <ol className="space-y-3">
                  {activeCase.workflow.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold"
                        style={{
                          background: getGradient(activeCase.color),
                          color: getIconColor(activeCase.color),
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm sm:text-base text-[#666677]">
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* CTA Button */}
              <a
                href="/docs"
                className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#1a1a2e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: getGradient(activeCase.color) }}
              >
                View Documentation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Code Example Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#ace0f9]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a1a2e]">
                  Code Example
                </h3>
                <span
                  className="px-2 py-1 rounded-md text-xs font-mono"
                  style={{
                    background: getGradient(activeCase.color),
                    color: getIconColor(activeCase.color),
                  }}
                >
                  JavaScript
                </span>
              </div>
              <p className="text-sm text-[#666677] mb-4">
                See how easy it is to integrate with your existing workflow
              </p>

              {/* Code Block */}
              <div className="relative">
                <div className="bg-[#fafafa] rounded-xl p-4 sm:p-5 border border-gray-100 overflow-x-auto">
                  <pre className="text-sm font-mono text-[#1a1a2e] leading-relaxed whitespace-pre">
                    <code>{activeCase.example}</code>
                  </pre>
                </div>

                {/* Copy Button */}
                <motion.button
                  onClick={() => copyExample(activeCase.example, activeCase.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-gray-200 hover:border-[#ace0f9] hover:bg-[#fff1eb] transition-all duration-200"
                >
                  {copiedId === activeCase.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#666677]" />
                  )}
                </motion.button>
              </div>

              {/* Full Copy Button */}
              <motion.button
                onClick={() => copyExample(activeCase.example, activeCase.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#666677] hover:border-[#ace0f9] hover:bg-[#fff1eb]/30 hover:text-[#1a1a2e] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copiedId === activeCase.id ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { label: "Companies using our API", value: "500+" },
            { label: "Profiles processed daily", value: "1M+" },
            { label: "Average response time", value: "~200ms" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
                {stat.value}
              </div>
              <div className="text-sm text-[#666677]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
