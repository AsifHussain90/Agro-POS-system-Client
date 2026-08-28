import HeroSection from "@/components/landing/HeroSection";
import TrustedBySection from "@/components/landing/TrustedBySection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MarketplaceSection from "@/components/landing/MarketplaceSection";
import SolutionsSection from "@/components/landing/SolutionsSection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <MarketplaceSection />
      <SolutionsSection />
    </div>
  );
}

export default HomePage;

