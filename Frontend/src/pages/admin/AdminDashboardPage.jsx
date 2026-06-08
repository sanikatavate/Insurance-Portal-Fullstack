import { useEffect, useState } from "react";
import { LayoutDashboard, Users, BadgeCheck, FileText, CreditCard, ShieldAlert, Settings } from "lucide-react";
import { dashboardService } from "../../services/dashboard.service";
import { Link } from "react-router-dom";

const cards = [
  { label: "Total Users", key: "totalUsers", icon: Users },
  { label: "Total Agents", key: "totalAgents", icon: BadgeCheck },
  { label: "Active Policies", key: "activePolicies", icon: FileText },
  { label: "Pending Claims", key: "pendingClaims", icon: ShieldAlert },
  { label: "Total Revenue", key: "totalRevenue", icon: CreditCard },
  { label: "Pending KYC", key: "pendingKycRequests", icon: Settings },
];

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    dashboardService.getAdminDashboard().then(setData).catch(() => setData(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white font-black">A</div>
            <div>
              <div className="text-sm font-black text-slate-900">Admin Panel</div>
              <div className="text-xs text-slate-500">Agile Insurance</div>
            </div>
          </div>
          <nav className="space-y-2 text-sm font-semibold text-slate-700">
            {["Dashboard", "Users", "Agents", "Policies", "Claims", "Payments", "KYC Requests", "Reports", "Settings"].map((item) => (
              <button key={item} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-slate-100">
                <LayoutDashboard size={16} />
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">Overview of users, agents, policies, claims, payments and KYC.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ label, key, icon: Icon }) => (
              <div key={label} className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-500">{label}</div>
                  <Icon size={18} className="text-blue-600" />
                </div>
                <div className="mt-4 text-3xl font-black text-slate-900">{data?.widgets?.[key] ?? 0}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-lg font-black text-slate-900">Recent Users</div>
              <div className="space-y-3">
                {(data?.recentUsers || []).map((user) => (
                  <div key={user._id} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <div className="font-semibold text-slate-900">{user.full_name}</div>
                    <div className="text-slate-500">{user.email} • {user.role}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-lg font-black text-slate-900">Recent Claims</div>
              <div className="space-y-3">
                {(data?.recentClaims || []).map((claim) => (
                  <div key={claim._id} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <div className="font-semibold text-slate-900">{claim.claim_number}</div>
                    <div className="text-slate-500">{claim.status} • {claim.user?.full_name || "Unknown user"}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-lg font-black text-slate-900">Analytics</div>
              <Link to="/admin/dashboard" className="text-sm font-semibold text-blue-600">Refresh</Link>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs text-slate-500">User Distribution</div>
                <div className="mt-3 h-36 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300" />
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs text-slate-500">Policy Statistics</div>
                <div className="mt-3 h-36 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-300" />
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-xs text-slate-500">Activity</div>
                <div className="mt-3 h-36 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-300" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
