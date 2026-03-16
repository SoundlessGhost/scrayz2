"use client";

import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white">
      {/* soft top glow like your hero */}
      <div className="h-2 w-full bg-gradient-to-r from-transparent via-teal-100/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand / short pitch */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-grid h-9 w-9 place-items-center rounded-full ring-2 ring-[#164e63] overflow-hidden">
                <span className="h-full w-full bg-gradient-to-br from-[#164e63] to-[#0f3a4a]" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-[#164e63]">
                Scrayz
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Scrayz is the one-stop solution for every LinkedIn scraping
              problem.
            </p>

            {/* Newsletter */}
            <form
              className="mt-5 flex max-w-md gap-2"
              onSubmit={(e: React.FormEvent) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Your email
              </label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#164e63]/30 focus:border-[#164e63]"
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#164e63] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Columns */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Solutions
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Ready To Use
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Changelog
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="#">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Scrayz, Inc. All rights reserved.
            <span className="mx-2">•</span>
            <Link href="/privacy" className="hover:text-slate-700">
              Privacy
            </Link>
            <span className="mx-2">•</span>
            <Link href="/toc" className="hover:text-slate-700">
              Terms
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Link
              aria-label="Twitter"
              href="#"
              className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
            >
              <Twitter className="h-4 w-4 text-slate-600" />
            </Link>
            <Link
              aria-label="GitHub"
              href="#"
              className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
            >
              <Github className="h-4 w-4 text-slate-600" />
            </Link>
            <Link
              aria-label="LinkedIn"
              href="#"
              className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"
            >
              <Linkedin className="h-4 w-4 text-slate-600" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
