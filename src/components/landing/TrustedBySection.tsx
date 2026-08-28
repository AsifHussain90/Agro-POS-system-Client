export default function TrustedBySection() {
  const brands = ["AgriCorp", "FreshMarket", "GlobalFoods", "NatureSource", "EcoHarvest"];

  return (
    <section className="bg-surface-container-low py-3xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <p className="font-label-md text-label-md text-on-surface-variant mb-xl uppercase tracking-wider">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-3xl gap-y-xl opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div
              key={brand}
              className="font-headline-md text-headline-md font-bold text-on-surface"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
