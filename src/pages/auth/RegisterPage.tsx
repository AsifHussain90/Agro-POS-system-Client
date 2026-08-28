import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/constants";
import type { RegisterPayload } from "@/types/api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import registerBg from "@/assets/auth-images/register-bg.jpg";
import loginBg from "@/assets/auth-images/login.png";

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = useState<Omit<RegisterPayload, "role"> & { terms: boolean }>({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);


  // Carousel state – cycles between the two images every 4 seconds
  const images = [registerBg, loginBg];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms) {
      toast.error("Please accept the Terms of Service");
      return;
    }
    registerMutation.mutate(
      { name: form.name, email: form.email, password: form.password, role: "USER" },
      {
        onSuccess: () => {
          toast.success("Account created! Please log in.");
          void navigate("/login");
        },
      },
    );
  };



  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left: Image Carousel & Branding */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative flex-col justify-between overflow-hidden">
        {/* Crossfade images */}
        {images.map((src, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              opacity: idx === activeImg ? 1 : 0,
            }}
          />
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-10" />


        <div className="relative z-10 p-margin-desktop">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-on-primary text-headline-lg icon-fill">
              eco
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
              {APP_NAME}
            </h1>
          </div>
        </div>

        <div className="relative z-10 p-margin-desktop mb-xl space-y-4">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-primary mb-md leading-tight max-w-lg">
              Cultivating the Future of Commerce.
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-low max-w-md">
              Empowering agricultural enterprises with precision tools and direct market access.
            </p>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 pt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImg(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeImg
                    ? "w-8 bg-secondary-container"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface relative">
        {/* Atmospheric decorations */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-container rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse pointer-events-none z-0"></div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary-container rounded-full mix-blend-multiply filter blur-[60px] opacity-20 pointer-events-none z-0"></div>

        <div className="w-full max-w-[480px] bg-surface-container-lowest border border-[#D8F3DC] rounded-xl p-lg md:p-xl shadow-lg relative z-20">
          {/* Mobile Branding */}
          <div className="md:hidden flex items-center justify-center gap-xs mb-lg">
            <span className="material-symbols-outlined text-primary text-headline-lg-mobile icon-fill">
              eco
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              {APP_NAME}
            </span>
          </div>

          {/* Form Header */}
          <div className="mb-lg text-center md:text-left border-b border-surface-container-highest pb-md">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
              Grow Your Business with Agro
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join the community of trusted farmers and connect directly with buyers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-md">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                className="block font-label-md text-label-md text-on-surface font-semibold"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">person</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  required
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                className="block font-label-md text-label-md text-on-surface font-semibold"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">mail</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="email"
                  name="email"
                  placeholder="jane@farm.com"
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                className="block font-label-md text-label-md text-on-surface font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">lock</span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-on-surface-variant/70 hover:text-on-surface" />
                  ) : (
                    <Eye className="w-5 h-5 text-on-surface-variant/70 hover:text-on-surface" />
                  )}
                </button>
              </div>
            </div>



            {/* Terms */}
            <div className="flex items-start mt-sm">
              <div className="flex items-center h-5">
                <input
                  className="focus:ring-primary h-4 w-4 text-primary border-outline-variant rounded cursor-pointer bg-surface-container-lowest"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  className="font-body-md text-label-sm text-on-surface-variant cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a className="text-primary hover:underline font-label-md" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-primary hover:underline font-label-md" href="#">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            <button
              disabled={registerMutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-[#012d1d] hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012d1d] transition-colors mt-lg disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              {registerMutation.isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-label-md text-primary hover:text-primary-container font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
