import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/useAuth";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
const roleHome = {
  user: "/dashboard",
  agent: "/agent/dashboard",
  admin: "/admin/dashboard",
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, login, user, isAuthenticated, isLoading } = useAuth();

  const returnTo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("returnTo") || "";
  }, [location.search]);

  const [mode, setMode] = useState("register");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "male",
    address: "",
    profile_image: "",
    role: "user",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(returnTo || roleHome[user.role] || "/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate, returnTo]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onImageChange = async (file) => {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    setField("profile_image", dataUrl);
    setImagePreview(dataUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
      dob: form.dob || undefined,
      gender: form.gender,
      address: form.address.trim(),
      profile_image: form.profile_image,
      role: form.role,
    };

    if (!payload.email || !validateEmail(payload.email)) return setError("Enter a valid email address.");
    if (!payload.full_name) return setError("Full name is required.");
    if (!/^[0-9]{10,15}$/.test(payload.phone)) return setError("Enter a valid phone number.");
    if (payload.password.length < 8) return setError("Password must be at least 8 characters.");

    if (mode === "register") {
      if (payload.password !== form.confirmPassword) {
        return setError("Passwords do not match.");
      }

      setBusy(true);
      try {
        const createdUser = await register(payload);
        setSuccess("Account created successfully.");
        navigate(returnTo || roleHome[createdUser.role] || "/dashboard", { replace: true });
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Registration failed.");
      } finally {
        setBusy(false);
      }
      return;
    }

    setBusy(true);
    try {
      const loggedInUser = await login({
        email: payload.email,
        password: payload.password,
      });
      setSuccess("Login successful.");
      navigate(returnTo || roleHome[loggedInUser.role] || "/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] items-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-[2.8rem] border border-white/60 bg-white/70 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
                <ShieldCheck size={16} />
                Secure authentication
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
                {mode === "register" ? "Create your Agile Insurance account" : "Welcome back"}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Register with full profile details or sign in with email and password.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {mode === "register" && (
              <div className="grid gap-5 lg:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Full Name</span>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      value={form.full_name}
                      onChange={(e) => setField("full_name", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                      placeholder="Aarav Sharma"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone Number</span>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value.replace(/[^\d]/g, "").slice(0, 15))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                      placeholder="9876543210"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Date of Birth</span>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setField("dob", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Gender</span>
                  <select
                    value={form.gender}
                    onChange={(e) => setField("gender", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="space-y-2 lg:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Address</span>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                    <textarea
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                      placeholder="House no, street, city, state..."
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Profile Image</span>
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                      onChange={(e) => onImageChange(e.target.files?.[0])}
                    />
                    <p className="mt-2 text-xs text-slate-500">PNG/JPG image stored as a data URL.</p>
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Role</span>
                  <select
                    value={form.role}
                    onChange={(e) => setField("role", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Email</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                    placeholder="you@company.com"
                  />
                </div>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Password</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 pr-14 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {mode === "register" ? (
                <label className="space-y-2 lg:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Confirm Password</span>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => setField("confirmPassword", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 pr-14 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500"
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>
              ) : null}
            </div>

            {imagePreview ? (
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Profile preview</div>
                  <div className="text-xs text-slate-500">Image ready to send with registration.</div>
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy || isLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_50px_rgba(37,99,235,0.25)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? (
                <>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/80" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{mode === "register" ? "Create Account" : "Login"}</span>
              )}
            </button>

            <div className="flex items-center justify-between gap-4 text-sm">
              <button
                type="button"
                onClick={() => {
                  setMode((m) => (m === "register" ? "login" : "register"));
                  setError("");
                  setSuccess("");
                }}
                className="font-semibold text-blue-700"
              >
                {mode === "register" ? "Already have an account? Login" : "New user? Create account"}
              </button>
              <Link to="/" className="font-semibold text-slate-500 hover:text-slate-900">
                Back to home
              </Link>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default AuthPage;
