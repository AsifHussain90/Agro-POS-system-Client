import { Wheat, Truck, Store, Check } from "lucide-react";

const solutions = [
  {
    icon: Wheat,
    title: "Farmers",
    benefits: [
      "Reliable buyers",
      "Fair market prices",
      "Helpful resources",
    ],
  },
  {
    icon: Truck,
    title: "Distributors",
    benefits: [
      "Easy routing",
      "Clear documentation",
      "Better storage management",
    ],
  },
  {
    icon: Store,
    title: "Retailers",
    benefits: [
      "Steady supply",
      "Product history",
      "Simple system integration",
    ],
  },
];

export default function SolutionsSection() {
  return (
    <section className="py-5xl bg-primary text-on-primary relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container rounded-full opacity-20 translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4xl">
          <h2 className="text-headline-lg-mobile md:text-display-lg text-on-primary mb-md font-bold">
            Solutions for Everyone
          </h2>
          <p className="text-body-lg text-on-primary-container">
            A unified platform connecting the entire agricultural journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg lg:gap-xl">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="bg-surface-container-lowest/5 backdrop-blur-sm border border-surface-container-lowest/10 p-xl rounded-3xl hover:bg-surface-container-lowest/10 transition-colors"
            >
              <solution.icon className="w-10 h-10 text-primary-fixed mb-md" />
              <h3 className="text-[24px] font-bold mb-md text-on-primary">
                {solution.title}
              </h3>
              <ul className="flex flex-col gap-3 text-body-md text-on-primary-container">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary-fixed flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
