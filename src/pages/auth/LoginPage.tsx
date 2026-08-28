import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/constants";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "@/assets/auth-images/login.png";

export function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const role = data.user?.role;
          if (role === "ADMIN") void navigate("/admin");
          else if (role === "FARMER") void navigate("/farmer");
          else void navigate("/products");
        },
        onError: () => {
          toast.error("Invalid email or password. Please try again.");
        },
      },
    );
  };

  return (

    <main className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left: Image & Branding */}
      <div
        className="hidden md:flex md:w-5/12 lg:w-1/2 relative flex-col justify-between"
        style={{
          backgroundImage: `url("${loginBg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

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

        <div className="relative z-10 p-margin-desktop mb-xl">
          <h2 className="font-display-lg text-display-lg text-on-primary mb-md leading-tight max-w-lg">
            Cultivating the Future of Commerce.
          </h2>
          <p className="font-body-lg text-body-lg text-surface-container-low max-w-md">
            Empowering agricultural enterprises with precision tools and direct market access.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
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
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to your Agro account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-md">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  className="block font-label-md text-label-md text-on-surface font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  to="/change-password"
                  className="text-xs font-label-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              disabled={loginMutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-[#012d1d] hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012d1d] transition-colors mt-lg disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">

            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-label-md text-primary hover:text-primary-container font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
