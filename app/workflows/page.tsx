"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Users,
  MapPin,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";

/* ========== Brand tokens (2nd screenshot hero tone) ========== */
const BRAND = {
  primary: "#164e63", // deep teal
  primarySoft: "rgb(22 78 99 / 0.08)",
  ring: "ring-[#164e63]/20",
};

/* =================== Data (unchanged) =================== */
const cardsByCategory = {
  "scraper-api": [
    {
      id: "linkedIn-profile-scraper",
      title: "LinkedIn Profile Scraper",
      desc: "Extract public LinkedIn profiles with names, titles, skills, and connections.",
    },
    {
      id: "linkedIn-company-scraper",
      title: "LinkedIn Company Scraper",
      desc: "Collect company details including industry, size, location, and overview.",
    },
    {
      id: "linkedIn-post-scraper",
      title: "LinkedIn Post Scraper",
      desc: "Scrape Post directories with roles, departments, and contact info.",
    },
    {
      id: "linkedIn-custom-scraper",
      title: "LinkedIn Custom Scraper",
      desc: "Export job listings from Sales Navigator with roles, skills, and locations.",
    },
    {
      id: "linkedIn-job-scraper",
      title: "LinkedIn Job Scraper",
      desc: "Extract public LinkedIn profiles with names, titles, skills, and connections.",
    },
    {
      id: "linkedIn-comment-scraper",
      title: "LinkedIn Comment Scraper",
      desc: "Collect company details including industry, size, location, and overview.",
    },
    {
      id: "linkedIn-Reaction-Count-Scraper",
      title: "LinkedIn Reaction Count Scraper",
      desc: "Scrape Post directories with roles, departments, and contact info.",
    },
  ],

  "sales-navigator": [
    {
      id: "s1",
      title: "LinkedIn Lead/Profile Scraper",
      desc: "Extract targeted leads from Sales Navigator with filters and enriched data.",
    },
    {
      id: "s2",
      title: "LinkedIn Account/Company Scraper",
      desc: "Scrape SalesNav account results with firmographics, growth, and insights.",
    },
    {
      id: "s3",
      title: "LinkedIn Employee Scraper",
      desc: "Export job listings from Sales Navigator with roles, skills, and locations.",
    },
    {
      id: "s4",
      title: "LinkedIn Custom Scraper",
      desc: "Automate and customize SalesNav queries for large-scale data extraction.",
    },
  ],
  "others-linkedin-api": [
    {
      id: "l1",
      title: "Company Follower Scraper",
      desc: "Fetch store reviews, ratings, and timestamps per location.",
    },
    {
      id: "l2",
      title: "Converted Link Scraper",
      desc: "Collect Yelp reviews & reviewer metadata for sentiment.",
    },
    {
      id: "l3",
      title: "Group Member Lead Scraper",
      desc: "Aggregate recommendations & comments from FB pages.",
    },
    {
      id: "l4",
      title: "School Student Scraper",
      desc: "Discover all branches from brand store-locator pages.",
    },
    {
      id: "l5",
      title: "Open to Work Badge Scraper",
      desc: "Pull address, hours, phone and geo-coords in bulk.",
    },
    {
      id: "l6",
      title: "Company Insight Scraper ",
      desc: "Normalize & merge reviews across platforms into one feed.",
    },
  ],
};

const categories = [
  {
    id: "scraper-api",
    label: "LinkedIn API",
    icon: Globe,
    href: "/workflows?cat=scraper-api",
  },
  {
    id: "sales-navigator",
    label: "Sales Navigator",
    icon: Users,
    href: "/workflows?cat=sales-navigator",
  },
  {
    id: "others-linkedin-api",
    label: "Others Linkedin Api",
    icon: MapPin,
    href: "",
  },
];

/* =================== Page =================== */
export default function WorkflowsPage() {
  const params = useSearchParams();
  const activeCat = params.get("cat") || "scraper-api";
  const cards = cardsByCategory[activeCat as keyof typeof cardsByCategory] ?? [];

  const activeLabel = useMemo(
    () => categories.find((c) => c.id === activeCat)?.label ?? "LinkedIn API",
    [activeCat]
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-white">
      {/* HERO — centered + soft gradient background */}
      <section className="relative isolate overflow-hidden pt-14">
        {/* background gradient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* big center halo */}
          <div
            className="absolute left-1/2 -top-24 h-136 w-136 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(22,78,99,.25), rgba(22,78,99,0))",
            }}
          />
          {/* side glow 1 */}
          <div
            className="absolute left-[15%] top-24 h-88 w-88 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(20,184,166,.20), rgba(20,184,166,0))",
            }}
          />
          {/* side glow 2 */}
          <div
            className="absolute right-[12%] top-20 h-80 w-[20rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(56,189,248,.18), rgba(56,189,248,0))",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center py-10 md:py-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: BRAND.primarySoft,
                color: BRAND.primary,
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Introducing Workflows
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Linkedin Scraper at Scale Without Login
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600">
              LinkedIn API — Access profiles, companies, and posts. <br />
              Sales Navigator — Leads, accounts, and jobs. <br />
              Custom — Anything in linkedin scraping.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#popular"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-95"
                style={{ backgroundColor: BRAND.primary }}
              >
                Try Now <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* horizontal category chips under hero */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = activeCat === c.id; // <-- শুধু এটুকু
                return (
                  <Link
                    key={c.id}
                    href={`/workflows?cat=${c.id}`}
                    scroll={false} // <-- এটাই যোগ করতে হবে
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                      active ? "text-white" : "text-slate-700 hover:bg-slate-50"
                    }`}
                    style={{
                      backgroundColor: active ? BRAND.primary : "white",
                      borderColor: active ? BRAND.primary : "rgb(226 232 240)",
                    }}
                  >
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: active
                          ? "rgb(255 255 255 / .15)"
                          : "rgb(241 245 249)",
                        color: active ? "white" : "rgb(71 85 105)",
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {c.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-20">
        {/* CONTENT — full width like 1st screenshot */}
        <div className="mt-6">
          <h2 id="popular" className="text-xl font-bold text-slate-900">
            Most Popular Linkedin Scraper Api
          </h2>
          <p className="text-slate-600 text-sm">
            Optimize your sales funnel with our ready-to-use solutions.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
            {cards.slice(0, 4).map((card, idx) => (
              <PBCard
                href={card.id}
                key={card.id}
                card={card}
                activeLabel={activeLabel}
                idx={idx}
              />
            ))}
          </div>

          <h3 className="mt-12 text-xl font-bold text-slate-900">All Tools</h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {cards.map((card, idx) => (
              <AllToolCard key={`all-${card.id}`} card={card} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =================== Pieces =================== */
function PBCard({ href, card, activeLabel, idx }: { href: string; card: { id: string; title: string; desc: string }; activeLabel: string; idx: number }) {
  const points = card.desc
    .split(/[.;]\s*/g)
    .filter(Boolean)
    .slice(0, 3);
  const slots = (idx % 3) + 1;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* header strip */}
      <div className="flex items-center justify-between gap-2 rounded-t-3xl border-b border-slate-100 bg-linear-to-r from-slate-50 to-slate-100 px-4 py-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl ring-1"
          style={{
            backgroundColor: "rgb(240 249 255)",
            borderColor: "rgb(191 219 254)",
          }}
        >
          <Image
            src="/linkedin-svgrepo-com.svg"
            alt="LinkedIn"
            width={16}
            height={16}
            className="h-4 w-4"
          />
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            {slots} {slots > 1 ? "slots" : "slot"}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            {activeLabel}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="px-5 pb-5 pt-4">
        <h3 className="text-[20px] font-semibold leading-snug text-slate-900">
          {card.title}
        </h3>

        {points.length > 1 ? (
          <ul className="mt-3 space-y-2">
            {points.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-600"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 leading-relaxed text-slate-600">{card.desc}</p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <Link
            href={`/workflows/${href}`}
            className="inline-flex items-center justify-center rounded-full border px-3 py-1.5  font-semibold text-slate-700 hover:bg-slate-50"
            style={{ borderColor: BRAND.primary }}
          >
            Learn more
          </Link>

          <button
            className="inline-flex items-center justify-center rounded-full px-3 py-1.5  font-semibold text-white shadow-sm hover:brightness-95"
            style={{ backgroundColor: BRAND.primary }}
          >
            Use now <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* corner aura */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-linear-to-br from-emerald-100 to-transparent opacity-70" />
    </article>
  );
}

type CardData = { id: string; title: string; desc: string };

function AllToolCard({ card, idx }: { card: CardData; idx: number }) {
  const slots = (idx % 3) + 1;
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg ring-1"
            style={{
              backgroundColor: "rgb(240 249 255)",
              borderColor: "rgb(191 219 254)",
            }}
          >
            <Image
              src="/linkedin-svgrepo-com.svg"
              alt="LinkedIn"
              width={14}
              height={14}
              className="h-3.5 w-3.5"
            />
          </span>
          <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">
            Scrayz
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">
          {slots} {slots > 1 ? "slots" : "slot"}
        </span>
      </div>

      <h4 className="mt-3 text-[15px] font-semibold leading-snug text-slate-900">
        {card.title}
      </h4>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
        {card.desc}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/workflows/${card.id}`}
          className="inline-flex items-center justify-center rounded-full border px-3 py-1.5  font-semibold text-slate-700 hover:bg-slate-50"
          style={{ borderColor: BRAND.primary }}
        >
          Learn more
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:brightness-95"
          style={{ backgroundColor: BRAND.primary }}
        >
          Use now
        </button>
      </div>
    </article>
  );
}
