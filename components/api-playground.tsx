"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Play,
  Copy,
  Check,
  Terminal,
  Zap,
  Shield,
  Clock,
  Users,
  Building2,
  Briefcase,
  Search,
} from "lucide-react";
import Link from "next/link";

// Endpoints from Screenshots
const endpoints = [
  {
    id: "profile",
    label: "Profile",
    icon: Users,
    method: "POST",
    path: "/profile/full",
    color: "sky",
  },
  {
    id: "company",
    label: "Company",
    icon: Building2,
    method: "GET",
    path: "/company/10000022",
    color: "purple",
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: Briefcase,
    method: "GET",
    path: "/linkedin/jobs/4386305245",
    color: "orange",
  },
  {
    id: "job-search",
    label: "Job Search",
    icon: Search,
    method: "POST",
    path: "/linkedin/jobs/search",
    color: "green",
  },
];

// Mock responses based on Screenshots
const mockResponses: Record<string, object> = {
  profile: {
    scrapingDate: "1773658655224",
    memberIdentity: "sundarpichai",
    profileLink: "https://www.linkedin.com/in/sundarpichai",
    linkedinId: "1317361366",
    fullName: "Sundar Pichai",
    firstName: "Sundar",
    lastName: "Pichai",
    headline: "CEO at Google",
    city: "Mountain View",
    state: "California",
    country: "United States",
    industryName: "Computer Software",
    "...": "...",
  },
  company: {
    date_processed: "2026-03-16 10:59:31",
    urn: "10000022",
    url: "https://www.linkedin.com/company/ex2-technology/",
    name: "ex2 Technology, a Vivacity Company",
    website: "http://www.ex2technology.com/",
    size_range: "11-50 employees",
    employees: 57,
    followers: 2258,
    industry: "Telecommunications",
    headquarters: "Omaha, NE",
    founded: 2015,
    specialties: "Broadband Networks, Critical Infrastructure...",
    "...": "...",
  },
  jobs: {
    job_id: "4386305245",
    job_title: "Ruby on Rails developer (Remote)",
    role_type: "Contract",
    role_seniority: null,
    location: "APAC",
    date_posted: "2026-03-16",
    work_type: "Remote",
    company_name: "Get Offers",
    company_url: "https://www.linkedin.com/company/112025412",
    max_salary: null,
    min_salary: null,
    "...": "...",
  },
  "job-search": {
    status: "success",
    total_results: 5777,
    page: 1,
    max_pages: 40,
    jobs_count: 25,
    job_ids: [
      "4384038386",
      "4381886788",
      "4386064413",
      "4381339671",
      "4378364965",
      "...",
    ],
    "...": "...",
  },
};

// FIX 1: Typing animation hook - fixed to preserve text after completion
function useTypingEffect(
  text: string,
  speed: number = 30,
  shouldAnimate: boolean = true,
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // If not animating, show full text immediately
    if (!shouldAnimate) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Reset and start animation when text changes
    let index = 0;
    setDisplayedText("");
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, shouldAnimate]);

  return { displayedText, isComplete };
}

// JSON Syntax Highlighter for Light Theme
function JsonHighlightLight({ data }: { data: object }) {
  const jsonString = JSON.stringify(data, null, 2);

  const highlightJson = (json: string) => {
    return json
      .replace(/"([^"]+)":/g, '<span class="text-[#0ea5e9]">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-[#16a34a]">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-[#ea580c]">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-[#db2777]">$1</span>')
      .replace(/: (null)/g, ': <span class="text-gray-400">$1</span>');
  };

  return (
    <pre
      className="text-xs sm:text-sm font-mono leading-relaxed text-[#1a1a2e] whitespace-pre"
      dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }}
    />
  );
}

export function ApiPlayground() {
  const [activeEndpoint, setActiveEndpoint] = useState("profile");
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [copied, setCopied] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const currentEndpoint = endpoints.find((e) => e.id === activeEndpoint)!;

  // Generate cURL command based on endpoint
  const getCurlCommand = (endpoint: typeof currentEndpoint) => {
    const baseUrl = "https://api.scrayz.com";

    switch (endpoint.id) {
      case "profile":
        return `curl -X 'POST' \\
  '${baseUrl}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "api_key": "your_api_key",
    "username": "sundarpichai"
  }'`;

      case "company":
        return `curl -X 'GET' \\
  '${baseUrl}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'X-API-Key: your_api_key'`;

      case "jobs":
        return `curl -X 'GET' \\
  '${baseUrl}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'X-API-Key: your_api_key'`;

      case "job-search":
        return `curl -X 'POST' \\
  '${baseUrl}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'X-API-Key: your_api_key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "url": "https://www.linkedin.com/jobs/search/?keywords=developer&geoId=103644278&f_WT=2",
    "page": 1
  }'`;

      default:
        return `curl -X '${endpoint.method}' \\
  '${baseUrl}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'X-API-Key: your_api_key'`;
    }
  };

  const curlCommand = getCurlCommand(currentEndpoint);

  // FIX 1: Only animate on initial load or endpoint change, not on response
  const { displayedText, isComplete } = useTypingEffect(
    curlCommand,
    15,
    !showResponse && !isRunning, // Only animate when not showing response and not running
  );

  // Determine what text to show in request panel
  const requestText = showResponse || isRunning ? curlCommand : displayedText;

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setShowResponse(false);
    setResponseTime(null);

    // Simulate API call
    const startTime = Date.now();
    await new Promise((resolve) =>
      setTimeout(resolve, 1200 + Math.random() * 800),
    );
    setResponseTime(Date.now() - startTime);

    setIsRunning(false);
    setShowResponse(true);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [curlCommand]);

  const handleEndpointChange = useCallback((id: string) => {
    setActiveEndpoint(id);
    setShowResponse(false);
    setIsRunning(false);
    setResponseTime(null);
  }, []);

  const getTabGradient = (color: string) => {
    switch (color) {
      case "sky":
        return "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)";
      case "purple":
        return "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)";
      case "orange":
        return "linear-gradient(135deg, #fdba74 0%, #fb923c 100%)";
      case "green":
        return "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)";
      default:
        return "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)";
    }
  };

  return (
    <section
      id="playground"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #ace0f9 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
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
            <Terminal className="w-4 h-4 text-[#0ea5e9]" />
            Live API Playground
          </motion.span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">
            Try it — See it in action
          </h2>
          <p className="text-base sm:text-lg text-[#666677] max-w-2xl mx-auto">
            Test LinkedIn data extraction in real-time. No setup required.
          </p>
        </motion.div>

        {/* Endpoint Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {endpoints.map((endpoint) => {
            const Icon = endpoint.icon;
            const isActive = activeEndpoint === endpoint.id;

            return (
              <motion.button
                key={endpoint.id}
                onClick={() => handleEndpointChange(endpoint.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-4 sm:px-5 py-2.5 rounded-xl font-medium text-sm sm:text-base
                  transition-all duration-300 flex items-center gap-2
                  ${
                    isActive
                      ? "text-[#1a1a2e] shadow-lg"
                      : "text-[#666677] bg-white border border-gray-200 hover:border-[#ace0f9] hover:bg-[#fff1eb]/30"
                  }
                `}
                style={
                  isActive ? { background: getTabGradient(endpoint.color) } : {}
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{endpoint.label}</span>
                <span className="sm:hidden">{endpoint.label.slice(0, 4)}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect */}
          <div
            className="absolute -inset-1 rounded-2xl blur-xl opacity-40"
            style={{
              background:
                "linear-gradient(135deg, #ace0f9 0%, #fff1eb 50%, #ace0f9 100%)",
            }}
          />

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Terminal Header */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100"
              style={{
                background: "linear-gradient(135deg, #fff1eb 0%, #ffffff 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#666677]">
                <span className="hidden sm:inline">api.scrayz.com</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{
                    background: getTabGradient(currentEndpoint.color),
                    color: "#1a1a2e",
                  }}
                >
                  {currentEndpoint.method}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-[#fff1eb] transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#666677]" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* Request Panel */}
              <div className="p-4 sm:p-6 bg-linear-to-br from-white to-[#fff1eb]/30 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#0ea5e9] text-sm font-medium">
                    REQUEST
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* FIX 2: Added overflow-x-auto and proper scrolling */}
                <div className="font-mono text-xs sm:text-sm leading-relaxed min-h-50 sm:min-h-60 bg-[#fafafa] rounded-xl p-4 border border-gray-100 overflow-x-auto">
                  <div className="min-w-max">
                    <span className="text-[#0ea5e9]">$</span>{" "}
                    <span className="text-[#1a1a2e] whitespace-pre">
                      {requestText}
                      {!isComplete && !showResponse && !isRunning && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-2 h-4 bg-[#0ea5e9] ml-0.5 align-middle"
                        />
                      )}
                    </span>
                  </div>
                </div>

                {/* FIX 2: Run Button - ensure text doesn't overflow */}
                <motion.button
                  onClick={handleRun}
                  disabled={isRunning}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full mt-4 py-3 rounded-xl font-semibold text-[#1a1a2e]
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${isRunning ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}
                  `}
                  style={{ background: getTabGradient(currentEndpoint.color) }}
                >
                  {isRunning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-[#1a1a2e] border-t-transparent rounded-full shrink-0"
                      />
                      <span className="truncate">Fetching...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 shrink-0" />
                      <span className="truncate">Run Request</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Response Panel */}
              <div className="p-4 sm:p-6 bg-linear-to-bl from-white to-[#ace0f9]/10 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[#0ea5e9] text-sm font-medium shrink-0">
                      RESPONSE
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <AnimatePresence>
                    {showResponse && responseTime && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 shrink-0 ml-2"
                      >
                        <span className="px-2 py-0.5 rounded bg-green-100 text-green-600 text-xs font-mono">
                          200
                        </span>
                        <span className="text-[#666677] text-xs font-mono hidden sm:inline">
                          {responseTime}ms
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* FIX 2: Added overflow-x-auto for JSON response */}
                <div className="min-h-50 sm:min-h-60 overflow-x-auto overflow-y-auto bg-[#fafafa] rounded-xl p-4 border border-gray-100">
                  <AnimatePresence mode="wait">
                    {isRunning ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-48 text-[#666677]"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-12 h-12 rounded-full mb-4"
                          style={{
                            background: getTabGradient(currentEndpoint.color),
                            opacity: 0.5,
                          }}
                        />
                        <span className="text-sm">Processing...</span>
                      </motion.div>
                    ) : showResponse ? (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[#1a1a2e] min-w-max"
                      >
                        <JsonHighlightLight
                          data={mockResponses[activeEndpoint]}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-48 text-[#666677]"
                      >
                        <Terminal className="w-10 h-10 mb-3 opacity-30" />
                        <span className="text-sm text-center px-2">
                          Click &quot;Run Request&quot; to see the response
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar - FIX 2: Better mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            {
              icon: Zap,
              label: "Response",
              value: "~200ms",
              color: "#0ea5e9",
            },
            {
              icon: Shield,
              label: "No Cookies",
              value: "Zero Risk",
              color: "#22c55e",
            },
            { icon: Clock, label: "Uptime", value: "99.9%", color: "#f59e0b" },
            {
              icon: Users,
              label: "Profiles",
              value: "100M+",
              color: "#8b5cf6",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-[#ace0f9]/50 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-lg font-bold text-[#1a1a2e] truncate">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#666677] truncate">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#1a1a2e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
            }}
          >
            <Zap className="w-5 h-5" />
            Get your API key free
          </Link>
          <p className="mt-3 text-sm text-[#666677]">
            20 free API calls/day • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
