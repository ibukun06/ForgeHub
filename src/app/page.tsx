import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { BuiltFor } from "@/components/landing/BuiltFor";
import { WhatIsForgeHub } from "@/components/landing/WhatIsForgeHub";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedProjects } from "@/components/landing/FeaturedProjects";
import { Categories } from "@/components/landing/Categories";
import { WhyForgeHub } from "@/components/landing/WhyForgeHub";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuiltFor />
        <WhatIsForgeHub />
        <FeatureGrid />
        <HowItWorks />
        <FeaturedProjects />
        <Categories />
        <WhyForgeHub />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
