import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "../../services/dashboard.service";
import { Users, FileText, Headphones, IndianRupee, BadgeCheck } from "lucide-react";

const AgentDashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    dashboardService.getAgentDashboard().then(setData).catch(() => setData(null));
  }, []);

  const widgets = [
    { label: "Assigned Customers", value: data?.assignedCustomers?.length ?? 0, icon: Users },
    { label: "Claims Processing", value: data?.claimsProcessing?.length ?? 0, icon: FileText },
    { label: "Policy Management", value: data?.policyManagement?.length ?? 0, icon: BadgeCheck },
    { label: "Revenue Generated", value: data?.salesPerformance?.revenueGenerated ?? 0, icon: IndianRupee },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white font-black">A</div>
            <div>
              <div className="text-sm font-black text-slate-900">Agent Panel</div>
              <div className="text-xs text-slate-500">Agile Insurance</div>
            </div>
          </div>
          <nav className="space-y-2 text-sm font-semibold text-slate-700">
            {["Dashboard", "Customers", "Claims", "Policies", "Support", "Performance"].map((item) => (
              <button key={item} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-slate-100">
                <Headphones size={16} />
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-black text-slate-900">Agent Dashboard</h1>
            <p className="mt-2 text-slate-600">Track assigned customers, claims, policy activity and revenue.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {widgets.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-500">{label}</div>
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div className="mt-4 text-3xl font-black text-slate-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-lg font-black text-slate-900">Assigned Customers</div>
              <div className="space-y-3">
                {(data?.assignedCustomers || []).map((customer) => (
                  <div key={customer._id} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <div className="font-semibold text-slate-900">{customer.full_name}</div>
                    <div className="text-slate-500">{customer.email} • {customer.kyc_status}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-lg font-black text-slate-900">Claims Processing</div>
              <div className="space-y-3">
                {(data?.claimsProcessing || []).map((claim) => (
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
              <div className="text-lg font-black text-slate-900">Sales Performance</div>
              <Link to="/agent/dashboard" className="text-sm font-semibold text-indigo-600">Refresh</Link>
            </div>
            <div className="mt-4 h-56 rounded-3xl bg-gradient-to-br from-indigo-100 via-white to-blue-100" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboardPage;
