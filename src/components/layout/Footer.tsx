import { Link } from "react-router";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-highest text-on-surface w-full pt-4xl pb-lg">
      <div className="w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2xl max-w-[1440px] mx-auto mb-3xl">
        <div className="flex flex-col gap-md lg:col-span-2 lg:pr-2xl">
          <Link
            to="/"
            className="text-headline-md font-headline-md text-primary flex items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[32px] icon-fill">eco</span>
            {APP_NAME}
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm text-on-surface">
            Empowering modern agriculture through precise data and reliable marketplace connections.
            Building the resilient supply chains of tomorrow.
          </p>
          <div className="flex gap-4 mt-sm">
            <a
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
              href="#"
              aria-label="Contact Email"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">
            Platform
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                to="/products"
              >
                Marketplace Exchange
              </Link>
            </li>
            <li>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                to="/track-order"
              >
                Traceability Ledger
              </Link>
            </li>
            <li>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                to="/farmer"
              >
                Producer Hub
              </Link>
            </li>
            <li>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                to="/requests"
              >
                Farmer Application
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Press &amp; Media
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Contact Sales
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Security
              </a>
            </li>
            <li>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Compliance
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="w-full border-t border-surface-container-highest pt-lg flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} {APP_NAME} Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm text-on-surface-variant">
            <span>San Francisco</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>Nairobi</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>Multan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
