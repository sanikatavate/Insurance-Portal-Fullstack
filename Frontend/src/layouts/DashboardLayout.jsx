import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Bell,
  Bot,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/useAuth";

const STORAGE_THEME = "agile_insurance_theme_v1";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard, to: "/dashboard" },
  { label: "My Policies", icon: BadgeCheck, to: "/dashboard/policies" },
  { label: "Claim Management", icon: Sparkles, to: "/dashboard/claims" },
  { label: "Payment History", icon: CreditCard, to: "/dashboard/payments" },
  { label: "Renew Policies", icon: Settings, to: "/dashboard/renewals" },
  { label: "Documents Center", icon: FileText, to: "/dashboard/documents" },
  { label: "AI Support Assistant", icon: Bot, to: "/dashboard/ai-support" },
  { label: "Notifications", icon: Bell, to: "/dashboard/notifications" },
  { label: "Profile Settings", icon: User, to: "/dashboard/profile" },
  { label: "Security Settings", icon: Shield, to: "/dashboard/security" },
];

const setHtmlTheme = (mode) => {
  const html = document.documentElement;
  html.dataset.theme = mode;
  if (mode === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
};

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_THEME) || "light");

  useEffect(() => {
    setHtmlTheme(theme);
    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  const activeLabel = useMemo(() => {
    const match = navItems.find((i) => i.to === location.pathname);
    return match?.label ?? "Agile Insurance";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-slate-100">
      <div className="mx-auto flex max-w-[1600px]">
        <aside
          className={[
            "sticky top-0 hidden h-screen shrink-0 border-r border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex",
            collapsed ? "w-[88px]" : "w-[300px]",
          ].join(" ")}
        >
          <div className="flex w-full flex-col px-4 py-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left hover:bg-slate-100/70 dark:hover:bg-white/5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white font-bold text-xl">
                A
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="truncate text-base font-black leading-tight">Agile Insurance</div>
                  <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                    AI-powered insurance portal
                  </div>
                </div>
              )}
            </button>

            <div className="mt-6 flex items-center justify-between px-3">
              {!collapsed ? (
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Navigation
                </div>
              ) : (
                <div />
              )}
              <button
                onClick={() => setCollapsed((v) => !v)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {collapsed ? "Expand" : "Collapse"}
              </button>
            </div>

            <nav className="mt-4 flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
                      active
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-white/5",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-10 w-10 place-items-center rounded-2xl transition",
                        active ? "bg-white/15" : "bg-slate-100 dark:bg-white/5",
                      ].join(" ")}
                    >
                      <Icon size={18} className={active ? "text-white" : "text-blue-600 dark:text-blue-400"} />
                    </span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 space-y-2">
              {!collapsed && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{user?.fullName ?? "Premium Member"}</div>
                      <div className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                      <Sparkles size={14} />
                      {user?.membership ?? "Premium AI"}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-white/5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 dark:bg-white/5">
                  <LogOut size={18} className="text-slate-700 dark:text-slate-200" />
                </span>
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {activeLabel}
                </div>
                <div className="truncate text-xl font-black tracking-tight">Agile Insurance Dashboard</div>
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    placeholder="Search policies, claims, invoices…"
                    className="w-[360px] rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                  />
                </div>

                <button
                  onClick={() => navigate("/health-insurance")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                >
                  <BadgeCheck size={18} />
                  Buy Policy
                </button>

                <button
                  onClick={() => navigate("/dashboard/ai-support")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  <Bot size={18} />
                  AI Assistant
                </button>

                <button
                  onClick={() => navigate("/dashboard/notifications")}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </button>

                <button
                  onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>

                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black">
                    {(user?.fullName?.[0] || "A").toUpperCase()}
                  </span>
                  <div className="max-w-[170px] text-left">
                    <div className="truncate text-xs font-black text-slate-900 dark:text-slate-100">{user?.fullName ?? "Member"}</div>
                    <div className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {user?.membership ?? "Premium AI"}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </header>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="px-4 py-8 lg:px-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
