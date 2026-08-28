import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAdminRegister } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/constants";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import registerBg from "@/assets/auth-images/register-bg.jpg";
import loginBg from "@/assets/auth-images/login.png";

export function AdminSetupPage() {
  const adminRegisterMutation = useAdminRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const images = [registerBg, loginBg];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminRegisterMutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
      secretKey: form.secretKey,
    });
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left: Image Carousel & Branding */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative flex-col justify-between overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-10" />
        <div className="relative z-10 p-margin-desktop">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-on-primary text-headline-lg icon-fill">eco</span>
            <h1 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">{APP_NAME}</h1>
          </div>
        </div>
        <div className="relative z-10 p-margin-desktop mb-xl space-y-4">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-primary mb-md leading-tight max-w-lg">
              Admin Control Center.
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-low max-w-md">
              Set up the administrator account to manage the platform, users, and operations.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImg(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeImg ? "w-8 bg-secondary-container" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Admin Setup Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface relative">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-container rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse pointer-events-none z-0" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary-container rounded-full mix-blend-multiply filter blur-[60px] opacity-20 pointer-events-none z-0" />

        <div className="w-full max-w-[480px] bg-surface-container-lowest border border-[#D8F3DC] rounded-xl p-lg md:p-xl shadow-lg relative z-20">
          {/* Mobile Branding */}
          <div className="md:hidden flex items-center justify-center gap-xs mb-lg">
            <span className="material-symbols-outlined text-primary text-headline-lg-mobile icon-fill">eco</span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{APP_NAME}</span>
          </div>

          {/* Form Header */}
          <div className="mb-lg text-center md:text-left border-b border-surface-container-highest pb-md">
            <div className="flex items-center gap-2 mb-xs justify-center md:justify-start">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Admin Setup
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Create the platform administrator account. A valid secret key is required.
            </p>
          </div>

          {/* Warning banner */}
          <div className="flex items-start gap-3 rounded-lg bg-error/10 border border-error/20 px-4 py-3 mb-md">
            <ShieldCheck className="w-5 h-5 text-error mt-0.5 shrink-0" />
            <p className="text-sm text-on-surface-variant leading-snug">
              This page is for{" "}
              <span className="font-semibold text-on-surface">authorized personnel only</span>. The backend will
              reject this request if an admin already exists or the secret key is invalid.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-md">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">person</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="name" name="name" placeholder="Administrator" required type="text"
                  value={form.name} onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">mail</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="email" name="email" placeholder="admin@agro.com" required type="email"
                  value={form.email} onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">lock</span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="password" name="password" placeholder="••••••••" required
                  type={showPassword ? "text" : "password"}
                  value={form.password} onChange={handleChange}
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

            {/* Secret Key */}
            <div className="space-y-1">
              <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="secretKey">
                Admin Secret Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">key</span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-[#64b68e]/20 focus:border-[#64b68e] transition-shadow"
                  id="secretKey" name="secretKey" placeholder="Enter the admin secret key" required
                  type={showSecretKey ? "text" : "password"}
                  value={form.secretKey} onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowSecretKey((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors"
                  aria-label={showSecretKey ? "Hide secret key" : "Show secret key"}
                >
                  {showSecretKey ? (
                    <EyeOff className="w-5 h-5 text-on-surface-variant/70 hover:text-on-surface" />
                  ) : (
                    <Eye className="w-5 h-5 text-on-surface-variant/70 hover:text-on-surface" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={adminRegisterMutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-[#012d1d] hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012d1d] transition-colors mt-lg disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              {adminRegisterMutation.isPending ? "Creating Admin Account..." : "Create Admin Account"}
            </button>
          </form>

          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link to="/login" className="font-label-md text-primary hover:text-primary-container font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default AdminSetupPage;
