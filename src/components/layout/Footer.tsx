import { Link } from "react-router";
import { Leaf, Globe, Mail } from "lucide-react";

const platformLinks = [
  { label: "Marketplace Exchange", to: "/products" },
  { label: "Yield Analytics", to: "/#features" },
  { label: "Traceability Ledger", to: "/#solutions" },
  { label: "API Documentation", to: "/#" },
];

const companyLinks = [
  { label: "About Us", to: "/#" },
  { label: "Careers", to: "/#" },
  { label: "Press & Media", to: "/#" },
  { label: "Contact Sales", to: "/#" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/#" },
  { label: "Terms of Service", to: "/#" },
  { label: "Security", to: "/#" },
  { label: "Compliance", to: "/#" },
];

export function Footer() {

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-highest text-on-surface w-full pt-4xl pb-lg">
      <div className="w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2xl max-w-[1440px] mx-auto mb-3xl">
        {/* Brand Column */}
        <div className="flex flex-col gap-md lg:col-span-2 lg:pr-2xl">
          <Link
            to="/"
            className="text-headline-md text-primary flex items-center gap-xs"
          >
            <Leaf className="w-8 h-8" />
            Agro
          </Link>
          <p className="text-body-md text-on-surface-variant max-w-sm">
            Empowering modern agriculture through precise data and reliable
            marketplace connections. Building the resilient supply chains of
            tomorrow.
          </p>
          <div className="flex gap-4 mt-sm">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-primary font-bold tracking-wider uppercase">
            Platform
          </h4>
          <ul className="flex flex-col gap-3">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-primary font-bold tracking-wider uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-md">
          <h4 className="font-label-md text-primary font-bold tracking-wider uppercase">
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="w-full border-t border-surface-container-highest pt-lg flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-label-sm text-on-surface-variant">
            © 2024 Agro Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-label-sm text-on-surface-variant">
            <span>San Francisco</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>Nairobi</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

