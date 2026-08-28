import { Link } from "react-router";
import { MapPin, ArrowRight } from "lucide-react";
import {
  PRODUCT_TOMATOES,
  PRODUCT_SPINACH,
  PRODUCT_POTATOES,
} from "./images";


const products = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    farm: "Ahmed's Farm",
    price: 120,
    unit: "kg",
    grade: "Grade A",
    badge: "Verified",
    badgeColor: "bg-surface-container-lowest/95 text-primary",
    image: PRODUCT_TOMATOES,
    fallback:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
  },
  {
    id: "2",
    name: "Organic Spinach",
    farm: "Valley Greens",
    price: 45,
    unit: "bunch",
    grade: "Export",
    badge: "Organic",
    badgeColor: "bg-secondary/95 text-on-secondary",
    image: PRODUCT_SPINACH,
    fallback:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80",
  },
  {
    id: "3",
    name: "Premium Potatoes",
    farm: "Highland Roots Co.",
    price: 35,
    unit: "kg",
    grade: "Bulk",
    badge: "Verified",
    badgeColor: "bg-surface-container-lowest/95 text-primary",
    image: PRODUCT_POTATOES,
    fallback:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80",
  },
];

export function MarketplaceSection() {
  return (
    <section className="bg-surface-container-low py-5xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-2xl gap-lg">
          <div className="max-w-2xl">
            <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary mb-sm font-bold">
              Explore Our Marketplace
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Discover fresh, high-quality products ready for your business.
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-sm text-primary font-label-md hover:text-secondary transition-colors group px-6 py-3 rounded-full border border-primary/20 bg-surface-container-lowest hover:bg-surface"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-surface-container-lowest rounded-3xl p-md flex flex-col gap-md shadow-soft hover:shadow-card-hover transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/10"
            >
              {/* Image */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = product.fallback;
                  }}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span
                    className={`backdrop-blur-md font-label-sm text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm ${product.badgeColor}`}
                  >
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-sm px-sm pb-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-headline-md text-primary mb-1 font-semibold">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-xs text-on-surface-variant font-label-sm">
                      <MapPin className="w-4 h-4" />
                      {product.farm}
                    </div>
                  </div>
                  <span className="bg-tertiary-container/10 text-tertiary font-label-sm px-3 py-1 rounded-full">
                    {product.grade}
                  </span>
                </div>

                <div className="w-full h-px bg-surface-container-highest my-sm" />

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-on-surface-variant mb-0.5">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[20px] font-bold text-primary">
                        Rs. {product.price}
                      </span>
                      <span className="font-label-sm text-on-surface-variant">
                        / {product.unit}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-primary/5 text-primary px-5 py-2.5 rounded-full flex items-center gap-sm hover:bg-primary hover:text-on-primary transition-all font-label-md"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketplaceSection;

