"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Copy, Check, ArrowRight, Shield, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// Animated counter component
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number): string => {
    if (suffix === "ms") return `~${Math.round(latest)}ms`;
    if (suffix === "%") return `${latest.toFixed(1)}%`;
    if (suffix === "M+") return `${Math.round(latest)}M+`;
    return `${Math.round(latest)}`;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

const stats = [
  { value: 200, suffix: "ms", label: "Response time" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 100, suffix: "M+", label: "Profiles served" },
];

const highlights = [
  { icon: Shield, text: "No cookies required" },
  { icon: Zap, text: "No account bans" },
  { icon: Clock, text: "Pay as you go" },
];

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  // Tilt effect for code card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (relY - 0.5) * 4, y: (0.5 - relX) * 4 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const curl = `curl -X POST "https://api.scrayz.com/profile/full" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
  "api_key": "your_api_key",
  "username": "sundarpichai",
}'`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-8 lg:pt-0">
      {/* Background */}
      <div className="absolute inset-0 bg-white">
        {/* Gradient accent at top */}

        {/* Subtle gradient orbs - Responsive sizes */}
        <div
          className="absolute top-20 right-0 w-75 h-75 sm:w-100 sm:h-100 lg:w-150 lg:h-150 rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(172,224,249,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-50 h-50 sm:w-75 sm:h-75 lg:w-100 lg:h-100 rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,241,235,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Floating Animated Orbs */}
        <motion.div
          className="absolute top-32 left-20 w-4 h-4 rounded-full bg-[#ace0f9]/40 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-48 left-32 w-6 h-6 rounded-full bg-[#fff1eb]/60 hidden lg:block"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-[#87ceeb]/50 hidden lg:block"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-60 right-40 w-5 h-5 rounded-full bg-[#ace0f9]/30 hidden lg:block"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-60 left-40 w-2 h-2 rounded-full bg-[#0ea5e9]/40 hidden lg:block"
          animate={{
            y: [0, -25, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full py-8 sm:py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
              style={{ background: "rgba(172,224,249,0.2)" }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-[#1a1a2e]">
                API Status: All systems operational
              </span>
            </motion.div>

            {/* Headline - Responsive font sizes */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-[#1a1a2e] mb-4 sm:mb-6"
            >
              LinkedIn scraper at scale with no cookies and no risk of account
              bans.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-[#666677] max-w-xl mb-6 sm:mb-8 leading-relaxed"
            >
              The LinkedIn API built for developers. Extract profiles,
              companies, jobs, and posts with a simple REST API. No session
              cookies, no account management, no risk.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-xs sm:text-sm text-[#1a1a2e]"
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(172,224,249,0.3)" }}
                  >
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0ea5e9]" />
                  </div>
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* CTAs - Stack on mobile, row on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl text-[#1a1a2e] text-sm sm:text-base"
                style={{
                  background:
                    "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
                }}
              >
                Get started free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#playground"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#1a1a2e] font-medium rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:bg-[#fff1eb] hover:border-[#ace0f9] text-sm sm:text-base"
              >
                Open Playground
              </a>
            </motion.div>

            {/* Stats - Responsive spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-[#666677]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="group relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              {/* Code Block */}
              <div
                className="p-4 sm:p-5 shadow-xl rounded-2xl border border-gray-200"
                style={{
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #fff1eb 100%)",
                }}
              >
                {/* Window Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                  <span className="ml-auto rounded-full bg-[#ace0f9]/30 px-2 sm:px-2.5 py-0.5 text-[8px] sm:text-[10px] font-medium text-[#1a1a2e]">
                    Quick Start
                  </span>
                </div>

                {/* Code Content - Responsive text size */}
                <div className="rounded-lg bg-[#383838] p-3 sm:p-4">
                  <pre className="text-[10px] sm:text-[11px] md:text-[13px] leading-relaxed font-mono text-gray-300 overflow-x-auto pb-3 sm:pb-5">
                    <code>
                      <span className="text-[#ace0f9]">{"// Request"}</span>
                      {"\n"}
                      <span className="text-[#87ceeb]">POST</span>{" "}
                      <span className="text-[#fff1eb] break-all">
                        https://api.scrayz.com/profile/full
                      </span>
                      {"\n\n"}
                      <span className="text-[#ace0f9]">{"// Response"}</span>
                      {"\n"}
                      {"{ "} <br />
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;scrapingDate&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;1773650462940&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;memberIdentity&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;sundarpichai&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;profileLink&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400 break-all">
                        &quot;https://www.linkedin.com/in/sundarpichai&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;profileUrn&quot;
                      </span>
                      : {/* Show truncated on mobile */}
                      <span className="text-green-400 hidden sm:inline">
                        &quot;ACoAAE6FVtYBAW4bP82g1IhIHxzu_1J010WU3CQ&quot;
                      </span>
                      <span className="text-green-400 sm:hidden">
                        &quot;ACoAAE6FVtY...&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;linkedinId&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;1317361366&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;fullName&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;Sundar Pichai&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;headline&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;CEO at Google&quot;
                      </span>
                      ,{"\n"}
                      {/* Hide profile_about on mobile */}
                      <span className="hidden sm:inline">
                        {"  "}
                        <span className="text-[#fff1eb]">
                          &quot;profile_about&quot;
                        </span>
                        :{" "}
                        <span className="text-green-400">
                          &quot;CEO of Google and Alphabet...&quot;
                        </span>
                        ,{"\n"}
                      </span>
                      {"  "}
                      <span className="text-[#fff1eb]">
                        &quot;fullLocation&quot;
                      </span>
                      : {/* Truncate location on mobile */}
                      <span className="text-green-400 hidden sm:inline">
                        &quot;Mountain View, California, United States&quot;
                      </span>
                      <span className="text-green-400 sm:hidden">
                        &quot;Mountain View, CA&quot;
                      </span>
                      ,{"\n"}
                      {"  "}
                      ... ... ...
                      {"\n}"}
                    </code>
                  </pre>
                </div>

                {/* Copy Bar */}
                <div className="mt-3 sm:mt-4 flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#666677]">
                    Copy cURL Command
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-[#1a1a2e] transition-all duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
                    }}
                  >
                    {copied ? (
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Floating Feature Pills - Hidden on mobile, visible on md+ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="absolute -top-4 -right-4 lg:-right-12 hidden md:flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-lg border border-gray-100">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0ea5e9]" />
                  <span className="text-xs sm:text-sm font-medium text-[#1a1a2e]">
                    Fast
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-lg border border-gray-100">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0ea5e9]" />
                  <span className="text-xs sm:text-sm font-medium text-[#1a1a2e]">
                    Safe
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-lg border border-gray-100">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0ea5e9]" />
                  <span className="text-xs sm:text-sm font-medium text-[#1a1a2e]">
                    99.9%
                  </span>
                </div>
              </motion.div>

              {/* Glow effect on hover */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(172,224,249,0.3), 0 24px 80px -24px rgba(172,224,249,0.5)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
