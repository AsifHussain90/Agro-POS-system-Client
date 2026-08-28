import { Eye, TrendingUp, Sprout } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Clear Transparency",
    description:
      "Track every commodity easily from seed to shelf. Know exactly where your products come from and ensure quality every step of the way.",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description:
      "Access real-time market data and pricing trends in an easy-to-understand format to make the best decisions for your farm or business.",
    iconBg: "bg-secondary-container/20",
    iconColor: "text-secondary",
  },
  {
    icon: Sprout,
    title: "Sustainable Growth",
    description:
      "Connect with certified sustainable farms and support practices that are better for the earth and better for your bottom line.",
    iconBg: "bg-tertiary-container/10",
    iconColor: "text-tertiary",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-5xl bg-surface">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-4xl">
          <h2 className="text-headline-lg-mobile md:text-display-lg text-primary mb-md font-bold">
            Why Choose Agro?
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            We provide the tools and transparency you need to grow your agricultural business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl lg:gap-2xl">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface-container-lowest rounded-3xl p-xl shadow-soft border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 flex flex-col items-start gap-md group"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center ${feature.iconColor}`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md text-primary font-semibold">
                {feature.title}
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
