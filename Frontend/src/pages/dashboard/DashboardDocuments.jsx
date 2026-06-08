import { useMemo, useState } from "react";
import { FileText, FileUp, ShieldCheck, Sparkles, Download } from "lucide-react";
import { load, save, uid } from "../../utils/storage";

const DashboardDocuments = () => {
  const [purchases, setPurchases] = useState(() => load("purchases", []));
  const [vault, setVault] = useState(() => load("documents", []));

  const kycStatus = useMemo(() => {
    const has = purchases.some((p) => p.kyc?.filename);
    return has ? "Verified (demo)" : "Pending (upload in checkout)";
  }, [purchases]);

  const upload = (file) => {
    if (!file) return;
    const next = [{ id: uid("doc"), name: file.name, createdAt: new Date().toISOString() }, ...vault];
    setVault(next);
    save("documents", next);
    setPurchases(load("purchases", []));
  };

  const docsFromPurchases = useMemo(() => {
    return purchases
      .map((p) => ({ id: p.id, name: `${p.policyNumber} • Policy Document.pdf`, createdAt: p.activatedAt }))
      .slice(0, 10);
  }, [purchases]);

  const allDocs = [...docsFromPurchases, ...vault];

  return (
    <div className="space-y-8">
      <div className="rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
              Documents center • Vault • Digital verification (demo)
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Documents</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">KYC status, policy PDFs, invoices, and uploads.</p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-sm font-black text-white shadow-sm hover:opacity-95">
            <input type="file" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
            <FileUp size={18} />
            Upload document
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-black text-slate-900 dark:text-slate-100">Documents vault</div>
              <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">Download actions are mocked.</div>
            </div>
            <span className="rounded-full bg-blue-600/10 px-4 py-2 text-xs font-black text-blue-700 dark:text-blue-300">
              {allDocs.length} files
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {!allDocs.length ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-600/10 text-blue-700 dark:text-blue-300">
                  <FileText size={26} />
                </div>
                <div className="mt-6 text-xl font-black text-slate-900 dark:text-white">No documents yet</div>
                <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Purchase a policy or upload a document to populate your vault.
                </div>
              </div>
            ) : (
              allDocs.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black text-slate-900 dark:text-white">{d.name}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {d.createdAt ? new Date(d.createdAt).toLocaleString() : "—"}
                    </div>
                  </div>
                  <button
                    onClick={() => window.alert("Download is mocked in this frontend-only demo.")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="text-sm font-black text-slate-900 dark:text-slate-100">KYC verification</div>
            <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Status: <span className="font-black text-slate-900 dark:text-white">{kycStatus}</span>
            </div>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
                AI document scanning
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                Agile AI can scan documents for validity, readability, and mismatch risk (demo).
              </div>
            </div>
          </div>

          <div className="rounded-[2.6rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 text-white shadow-[0_40px_120px_rgba(2,6,23,0.35)] dark:border-white/10">
            <div className="text-sm font-black">Digital signature verification</div>
            <div className="mt-2 text-sm font-semibold text-white/70">
              In a real system, signatures are verified using issuer certificates. Here it’s a premium UI simulation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments;
