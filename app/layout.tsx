import "./globals.css";

import { Suspense } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Scrayz - Professional Data Intelligence",
  description:
    "Actionable LinkedIn intelligence via one clean API. Profiles, companies, and jobs with enterprise-grade reliability.",
  generator: "v0.app",
  openGraph: {
    title: "Scrayz - Professional Data Intelligence",
    description:
      "Actionable LinkedIn intelligence via one clean API. Profiles, companies, and jobs with enterprise-grade reliability.",
    type: "website",
    url: "https://scrayz.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrayz - Professional Data Intelligence",
    description:
      "Actionable LinkedIn intelligence via one clean API. Profiles, companies, and jobs with enterprise-grade reliability.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
    </ClerkProvider>
  );
}
import Link from 'next/link'
import './globals.css'


// export default function RootLayout({
//   children,
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" >
//         <body className="font-sans antialiased">
//           <header className="flex justify-between items-center p-4 bg-gray-100 gap-4">
//             <Link href="/" className="text-xl font-bold">MyApp</Link>
            
//             <nav className="flex gap-4">
              // <SignedOut>
              //   <SignUpButton mode="modal">
              //     <button className="bg-blue-600 text-white px-4 py-2 rounded">
              //       Sign Up
              //     </button>
              //   </SignUpButton>
              //   <SignInButton mode="modal">
              //     <button className="bg-gray-600 text-white px-4 py-2 rounded">
              //       Sign In
              //     </button>
              //   </SignInButton>
              // </SignedOut>
              
//               <SignedIn>
//                 <Link href="/dashboard" className="text-blue-600 hover:underline">
//                   Dashboard
//                 </Link>
//                 <Link href="/profile" className="text-blue-600 hover:underline">
//                   Profile
//                 </Link>
//                 <UserButton />
//               </SignedIn>
//             </nav>
//           </header>
          
//           <main className="min-h-screen">
//             {children}
//           </main>
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }