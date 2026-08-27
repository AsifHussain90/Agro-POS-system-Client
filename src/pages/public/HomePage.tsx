import { Link } from "react-router";
import { useProducts } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function HomePage() {
  const { data } = useProducts();
  const { addProduct } = useCart();
  const dynamicProducts = data?.data ?? [];

  return (
    <div className="flex-1 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-surface-container-lowest">
        <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:right-0 lg:left-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent lg:hidden z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/50 to-transparent hidden lg:block z-10 w-[40%]"></div>
          <img
            className="w-full h-full object-cover object-center"
            alt="Expansive green farm at sunrise"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UBEKzSkptAI-oHnkxffyNHrzQ49WzKgZYTnSMQTMQRI_Gn6L01Uvbwv-lR-7XO_v-AzD7aksmj1i98YSDX-mEclqDuGe6XnFs0p0eYt0Urnyk3OZosKZe16eeAls_4GbFUfOVHxktCmTcyvHZlH44mUSfP70blohtzOgshyWoorPSNQDhW_UF-RQWulFshUGipCcn_2wXhflDdpijShTaYN6Tjnyvi_amPttVGNjpZn0VtGjjgKoLWfJy6"
          />
        </div>
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl lg:py-0">
          <div className="max-w-2xl lg:w-[55%] flex flex-col gap-lg lg:pr-2xl bg-surface-container-lowest/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-lg lg:p-0 rounded-3xl lg:rounded-none">
            <div className="inline-flex items-center gap-2 bg-secondary-container/30 text-secondary px-4 py-1.5 rounded-full font-label-sm w-fit mb-2">
              <span className="material-symbols-outlined text-[16px]">celebration</span> Welcome
              to the future of farming
            </div>
            <h1 className="font-display-lg md:text-[56px] lg:text-display-xl text-primary leading-[1.1] tracking-tight font-bold">
              Connecting Earth to Enterprise.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant md:text-[20px] leading-relaxed max-w-xl text-on-surface">
              Discover quality agricultural products from trusted farmers. We make sourcing simple,
              transparent, and sustainable for everyone involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-md mt-md">
              <Link
                to="/products"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md text-center hover:bg-primary-container transition-all flex items-center justify-center gap-sm shadow-sm"
              >
                Explore Products
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link
                to="/register"
                className="bg-surface-container-lowest border-2 border-surface-container-high text-primary px-8 py-4 rounded-full font-label-md text-label-md text-center hover:bg-surface-container-low transition-all hover:border-outline-variant"
              >
                Join as Farmer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="bg-surface-container-low py-3xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-md text-label-md text-on-surface-variant mb-xl uppercase tracking-wider">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-3xl gap-y-xl opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              AgriCorp
            </div>
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              FreshMarket
            </div>
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              GlobalFoods
            </div>
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              NatureSource
            </div>
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              EcoHarvest
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Agro? */}
      <section className="py-5xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-4xl">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-md">
              Why Choose Agro?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-on-surface">
              We provide the tools and transparency you need to grow your agricultural business with
              confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl lg:gap-2xl">
            <div className="bg-surface-container-lowest rounded-3xl p-xl shadow-soft border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 flex flex-col items-start gap-md group">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]">visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Clear Transparency</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Track every commodity easily from seed to shelf. Know exactly where your products
                come from and ensure quality every step of the way.
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-3xl p-xl shadow-soft border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 flex flex-col items-start gap-md group">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">trending_up</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Smart Insights</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Access real-time market data and pricing trends in an easy-to-understand format to
                make the best decisions for your farm or business.
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-3xl p-xl shadow-soft border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 flex flex-col items-start gap-md group">
              <div className="w-16 h-16 rounded-2xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[32px]">spa</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">
                Sustainable Growth
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Connect with certified sustainable farms and support practices that are better for
                the earth and better for your bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Marketplace */}
      <section className="bg-surface-container-low py-5xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-2xl gap-lg">
            <div className="max-w-2xl">
              <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-sm">
                Explore Our Marketplace
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-on-surface">
                Discover fresh, high-quality products ready for your business.
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-sm text-primary font-label-md text-label-md hover:text-secondary transition-colors group px-6 py-3 rounded-full border border-primary/20 bg-surface-container-lowest hover:bg-surface"
            >
              View All Products{" "}
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {dynamicProducts.length > 0
              ? dynamicProducts.slice(0, 3).map((product, idx) => {
                  const tag = idx === 0 ? "Grade A" : idx === 1 ? "Export" : "Bulk";
                  const badgeType = idx === 1 ? "Organic" : "Verified";
                  return (
                    <article
                      key={product.id}
                      className="bg-surface-container-lowest rounded-3xl p-md flex flex-col gap-md shadow-soft hover:shadow-card-hover transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/10"
                    >
                      <Link to={`/products/${product.id}`} className="relative w-full h-64 rounded-2xl overflow-hidden block">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          alt={product.name}
                          src={product.images[0]}
                        />
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <span
                            className={
                              badgeType === "Organic"
                                ? "bg-secondary/95 backdrop-blur-md text-on-secondary font-label-sm text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
                                : "bg-surface-container-lowest/95 backdrop-blur-md text-primary font-label-sm text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
                            }
                          >
                            {badgeType}
                          </span>
                        </div>
                      </Link>
                      <div className="flex flex-col gap-sm px-sm pb-sm flex-1 justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <Link to={`/products/${product.id}`}>
                                <h3 className="font-headline-md text-headline-md text-primary mb-1 hover:text-secondary transition-colors">
                                  {product.name}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>{" "}
                                {product.farmerName}
                              </div>
                            </div>
                            <span className="bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          </div>
                          <div className="w-full h-px bg-surface-container-highest my-sm"></div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">
                              Price
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-headline-md text-[20px] font-bold text-primary">
                                {formatCurrency(product.price)}
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                / {product.unit}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => addProduct(product, 1)}
                            className="bg-primary/5 text-primary px-5 py-2.5 rounded-full flex items-center gap-sm hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md"
                          >
                            Request Quote
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              : null}
          </div>
        </div>
      </section>

      {/* Solutions for Everyone */}
      <section className="py-5xl bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container rounded-full opacity-20 translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-4xl">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-primary mb-md">
              Solutions for Everyone
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary-container text-on-primary">
              A unified platform connecting the entire agricultural journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg lg:gap-xl">
            <div className="bg-surface-container-lowest/5 backdrop-blur-sm border border-surface-container-lowest/10 p-xl rounded-3xl hover:bg-surface-container-lowest/10 transition-colors">
              <span className="material-symbols-outlined text-[40px] text-primary-fixed mb-md">
                agriculture
              </span>
              <h3 className="font-headline-md text-[24px] font-bold mb-md">Farmers</h3>
              <ul className="flex flex-col gap-3 font-body-md text-on-primary-container">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Reliable buyers
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Fair market prices
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Helpful resources
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest/5 backdrop-blur-sm border border-surface-container-lowest/10 p-xl rounded-3xl hover:bg-surface-container-lowest/10 transition-colors">
              <span className="material-symbols-outlined text-[40px] text-primary-fixed mb-md">
                local_shipping
              </span>
              <h3 className="font-headline-md text-[24px] font-bold mb-md">Distributors</h3>
              <ul className="flex flex-col gap-3 font-body-md text-on-primary-container">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Easy routing
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Clear documentation
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Better storage management
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest/5 backdrop-blur-sm border border-surface-container-lowest/10 p-xl rounded-3xl hover:bg-surface-container-lowest/10 transition-colors">
              <span className="material-symbols-outlined text-[40px] text-primary-fixed mb-md">
                storefront
              </span>
              <h3 className="font-headline-md text-[24px] font-bold mb-md">Retailers</h3>
              <ul className="flex flex-col gap-3 font-body-md text-on-primary-container">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Steady supply
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Product history
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    done
                  </span>{" "}
                  Simple system integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
