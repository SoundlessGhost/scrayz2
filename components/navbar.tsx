"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  X,
  Menu,
  Compass,
  Linkedin,
  ChevronsLeftRightEllipsis,
  ChevronDown,
} from "lucide-react";

// ==================== TYPES ====================

interface CategoryItem {
  id: CategoryKey;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface Card {
  id: string;
  title: string;
  desc: string;
}

type CategoryKey = "scraper-api" | "sales-navigator" | "others-linkedin-api";

type MenuState = "ready" | null;

// ==================== DATA ====================

const readyToUseLeft: CategoryItem[] = [
  {
    id: "scraper-api",
    title: "Linkedin API",
    desc: "Access LinkedIn data at scale with reliable, structured APIs.",
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    id: "sales-navigator",
    title: "Sales Navigator",
    desc: "Extract targeted leads and accounts directly from Sales Navigator.",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    id: "others-linkedin-api",
    title: "Others Linkedin Api",
    desc: "Collect and analyze customer reviews by branch or location.",
    icon: <ChevronsLeftRightEllipsis className="w-4 h-4" />,
  },
];

const cardsByCategory: Record<CategoryKey, Card[]> = {
  "scraper-api": [
    {
      id: "1",
      title: "LinkedIn Profile Scraper",
      desc: "Extract public LinkedIn profiles with names, titles, skills, and connections.",
    },
    {
      id: "2",
      title: "LinkedIn Company Scraper",
      desc: "Collect company details including industry, size, location, and overview.",
    },
    {
      id: "3",
      title: "LinkedIn Post Scraper",
      desc: "Scrape Post directories with roles, departments, and contact info.",
    },
    {
      id: "4",
      title: "LinkedIn Custom Scraper",
      desc: "Export job listings from Sales Navigator with roles, skills, and locations.",
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

// ==================== COMPONENT ====================

export function Navbar(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<MenuState>(null);
  const [selectedCat, setSelectedCat] = useState<CategoryKey>("scraper-api");
  const [scrolled, setScrolled] = useState(false);

  // Clerk hooks
  const { isSignedIn } = useAuth();

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close "Scraping Api" panel on escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Top gradient accent bar */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ace0f9] via-[#fff1eb] to-[#ace0f9]" /> */}

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="group inline-flex items-center gap-2">
            {/* <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-[#1a1a2e] transition-all group-hover:ring-[#0ea5e9]">
              <div className="absolute inset-0 bg-linear-to-br from-[#1a1a2e] to-[#2d2d44]" />
              <div className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-[#ace0f9]" />
            </div> */}
            <span className="text-lg font-extrabold tracking-tight text-[#0ea5e9]">
              SCRAYZ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/services">Services</NavLink>

            {/* Scraping Api Dropdown */}
            <div
              onMouseEnter={() => setOpenMenu("ready")}
              onMouseLeave={() => setOpenMenu(null)}
              className="relative"
            >
              <button className="group inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-[#1a1a2e] transition hover:bg-[#fff1eb]">
                <span>Scraping Api</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openMenu === "ready" ? "rotate-180" : ""
                  }`}
                />
                <span className="ml-1 block h-0.5 w-0 rounded-full bg-[#0ea5e9] transition-all group-hover:w-4" />
              </button>

              {/* Dropdown Panel */}
              <div
                className={`${
                  openMenu === "ready"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                } absolute left-1/2 top-full w-[min(100vw-2rem,980px)] -translate-x-1/2 rounded-2xl border border-[#ace0f9]/30 bg-white/95 p-4 shadow-xl backdrop-blur-md transition-all duration-200`}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* LEFT: clickable categories */}
                  <div className="rounded-xl bg-linear-to-b from-[#fff1eb] to-white p-4 ring-1 ring-[#ace0f9]/30">
                    <h4 className="mb-3 text-sm font-semibold text-[#1a1a2e]">
                      Explore
                    </h4>
                    <ul className="space-y-2">
                      {readyToUseLeft.map((it: CategoryItem) => {
                        const active: boolean = selectedCat === it.id;
                        return (
                          <li key={it.id}>
                            <Link
                              href={`/workflows?cat=${it.id}`}
                              role="menuitemradio"
                              aria-checked={active}
                              tabIndex={0}
                              onMouseEnter={() => setSelectedCat(it.id)}
                              className={`w-full text-left flex items-start gap-3 rounded-lg p-2.5 transition cursor-pointer
                                ${active ? "bg-white shadow-sm" : "hover:bg-white/70"}`}
                            >
                              <span
                                className="mt-0.5 rounded-md p-1.5 shadow-sm ring-1 ring-[#ace0f9]/30"
                                style={{
                                  background: active
                                    ? "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)"
                                    : "white",
                                }}
                              >
                                <span
                                  className={
                                    active ? "text-[#1a1a2e]" : "text-[#666677]"
                                  }
                                >
                                  {it.icon}
                                </span>
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-[#1a1a2e]">
                                  {it.title}
                                </span>
                                <span className="block text-xs text-[#666677]">
                                  {it.desc}
                                </span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* RIGHT: cards for selected category */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(cardsByCategory[selectedCat] || []).map(
                        (card: Card) => (
                          <Link
                            href={`/workflows/${card.id}`}
                            key={card.id}
                            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#ace0f9]/50"
                          >
                            <div
                              className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-[#ace0f9]/30"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(172,224,249,0.3) 0%, rgba(255,241,235,0.5) 100%)",
                              }}
                            >
                              <Image
                                src="/linkedin-svgrepo-com.svg"
                                alt="LinkedIn"
                                width={16}
                                height={16}
                                className="w-5 h-5"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <h5 className="text-sm font-semibold text-[#1a1a2e] group-hover:text-[#0ea5e9] transition-colors">
                                {card.title}
                              </h5>
                              <p className="text-xs leading-relaxed text-[#666677]">
                                {card.desc}
                              </p>
                            </div>
                            {/* Decorative gradient */}
                            <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-linear-to-br from-[#ace0f9]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        ),
                      )}

                      {/* See more button */}
                      <Link
                        href={`/workflows?cat=${selectedCat}`}
                        className="col-span-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#1a1a2e] transition-all duration-300 hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
                        }}
                      >
                        See more →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavLink href="#">Why Scrayz</NavLink>
            <NavLink href="#">Insights</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/linkedin-scraper">Linkedin</NavLink>

            {/* Sign In / Sign Out Section */}
            {!isSignedIn ? (
              <Link
                href="/sign-up"
                className="ml-3 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-[#1a1a2e] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
                }}
              >
                Sign Up
              </Link>
            ) : (
              <div className="ml-3">
                <UserButton afterSwitchSessionUrl="/" />
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur transition hover:bg-[#fff1eb] hover:border-[#ace0f9]"
            onClick={() => setMobileOpen((s: boolean) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-[#1a1a2e]" />
            ) : (
              <Menu className="h-5 w-5 text-[#1a1a2e]" />
            )}
          </button>
        </div>
      </nav>

      {/* Bottom gradient border */}
      {/* <div className="h-px w-full bg-linear-to-r from-transparent via-[#ace0f9] to-transparent" /> */}

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-[#ace0f9]/30 px-4 py-4 space-y-2">
          <MobileLink href="/services">Services</MobileLink>

          {/* Mobile Scraping Api Accordion */}
          <div className="rounded-xl bg-[#fff1eb]/50 p-3">
            <p className="text-sm font-semibold text-[#1a1a2e] mb-2">
              Scraping Api
            </p>
            <div className="space-y-1">
              {readyToUseLeft.map((item) => (
                <Link
                  key={item.id}
                  href={`/workflows?cat=${item.id}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#1a1a2e] hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className="p-1 rounded-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(172,224,249,0.3) 0%, rgba(255,241,235,0.5) 100%)",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <MobileLink href="#">Why Scrayz</MobileLink>
          <MobileLink href="#">Insights</MobileLink>
          <MobileLink href="/pricing">Pricing</MobileLink>
          <MobileLink href="/linkedin-scraper">Linkedin</MobileLink>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-gray-100">
            {!isSignedIn ? (
              <Link
                href="/sign-up"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #ace0f9 0%, #87ceeb 100%)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            ) : (
              <div className="flex justify-center">
                <UserButton afterSwitchSessionUrl="/" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== HELPER COMPONENTS ====================

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-[#1a1a2e] transition hover:bg-[#fff1eb]"
    >
      <span>{children}</span>
      <span className="ml-1 block h-0.5 w-0 rounded-full bg-[#0ea5e9] transition-all group-hover:w-4" />
    </Link>
  );
}

interface MobileLinkProps {
  href: string;
  children: React.ReactNode;
}

function MobileLink({ href, children }: MobileLinkProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className="block rounded-xl px-4 py-3 text-sm font-medium text-[#1a1a2e] hover:bg-[#fff1eb] transition"
    >
      {children}
    </Link>
  );
}
