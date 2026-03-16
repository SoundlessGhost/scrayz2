import HeroSection from "@/components/hero-section";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DocsSection } from "@/components/docs-section";
import { FeaturesGrid } from "@/components/features-grid";
import { ApiPlayground } from "@/components/api-playground";
import { PricingSection } from "@/components/pricing-section";
import { UseCasesSection } from "@/components/use-cases-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesGrid />
      <ApiPlayground />
      <UseCasesSection />
      <PricingSection />
      <DocsSection />
      <Footer />
    </main>
  );
}
