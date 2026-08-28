import { Link } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { HERO_IMAGE } from "./images";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-surface-container-lowest">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:right-0 lg:left-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent lg:hidden z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/50 to-transparent hidden lg:block z-10 w-[40%]" />
        <img
          src={HERO_IMAGE}
          onError={(e) => {
            // Fallback to Unsplash if local image not found
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80";
          }}
          alt="Expansive green farm at sunrise"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl lg:py-0">
        <div className="max-w-2xl lg:w-[55%] flex flex-col gap-lg lg:pr-2xl bg-surface-container-lowest/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-lg lg:p-0 rounded-3xl lg:rounded-none">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary-container/30 text-secondary px-4 py-1.5 rounded-full font-label-sm w-fit mb-2">
            <Sparkles className="w-4 h-4" />
            Welcome to the future of farming
          </div>

          <h1 className="text-display-lg md:text-[56px] lg:text-display-xl text-primary leading-[1.1] tracking-tight font-bold">
            Connecting Earth to Enterprise.
          </h1>

          <p className="text-body-lg text-on-surface-variant md:text-[20px] leading-relaxed max-w-xl">
            Discover quality agricultural products from trusted farmers. We make
            sourcing simple, transparent, and sustainable for everyone involved.
          </p>

          <div className="flex flex-col sm:flex-row gap-md mt-md">
            <Link
              to="/products"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-center hover:bg-primary-container transition-all flex items-center justify-center gap-sm shadow-button"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="bg-surface-container-lowest border-2 border-surface-container-high text-primary px-8 py-4 rounded-full font-label-md text-center hover:bg-surface-container-low transition-all hover:border-outline-variant"
            >
              Join as Farmer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
