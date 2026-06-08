import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Headphones, HelpCircle, PhoneCall, ShieldCheck, Sparkles, Ticket, Volume2 } from "lucide-react";
import FloatingAiAssistant from "../../components/FloatingAiAssistant";

const DashboardAiSupport = () => {
  const [query, setQuery] = useState("");
  const suggestions = useMemo(
    () => [
      "How do I increase coverage without increasing premium too much?",
      "What documents are needed for cashless claims?",
      "How does EMI work for yearly plans?",
      "Show me the best claim ratio plans in my category.",
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
              AI support assistant • Smart FAQ • Ticketing (demo)
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white">AI Support</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Chat with Agile AI or raise a support ticket.</p>
          </div>
          <button
            onClick={() => window.alert("Emergency assistance is mocked in this frontend-only demo.")}
            className="rounded-2xl bg-rose-600 px-7 py-4 text-sm font-black text-white shadow-sm hover:opacity-95"
          >
            Emergency assistance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2.6rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100">
            <HelpCircle size={18} className="text-blue-600 dark:text-blue-400" />
            Smart FAQ suggestions
          </div>
          <div className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Click a suggestion to send it to the AI assistant.
          </div>
          <div className="mt-6 space-y-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-700 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 text-white shadow-[0_40px_120px_rgba(2,6,23,0.35)] dark:border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white/70">Support channels</div>
              <div className="mt-2 text-2xl font-black tracking-tight">Enterprise-grade assistance</div>
              <div className="mt-2 text-sm font-semibold text-white/70">
                Voice support, WhatsApp, tickets and live agent handoff are represented as premium UI.
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-xs font-black">
              <Sparkles size={16} />
              Premium
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { t: "Voice support", icon: Volume2 },
              { t: "WhatsApp support", icon: PhoneCall },
              { t: "Live agent", icon: Headphones },
              { t: "Raise ticket", icon: Ticket },
            ].map((x) => {
              const Icon = x.icon;
              return (
                <button
                  key={x.t}
                  onClick={() => window.alert(`${x.t} is mocked in this frontend-only demo.`)}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                      <Icon size={18} />
                    </span>
                    <div className="text-sm font-black">{x.t}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-sm font-black">
              <Bot size={18} />
              AI quick prompt
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a question to ask Agile AI…"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-white/50"
              />
              <button
                onClick={() => window.alert("Use the floating assistant to send messages in this demo.")}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-black text-white hover:opacity-95"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <FloatingAiAssistant contextLabel="Agile AI Support" />
      </motion.div>
    </div>
  );
};

export default DashboardAiSupport;

