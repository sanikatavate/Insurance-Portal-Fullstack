import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, SendHorizonal, Sparkles, X } from "lucide-react";

const demoReplies = [
  "Based on your filters, this plan offers the best claim confidence for the premium.",
  "Tip: Choose yearly billing to unlock an AI-optimized discount in this demo.",
  "You can compare up to 3 plans — open comparison for faster decision-making.",
  "For smoother claims, keep KYC docs ready (PAN/Aadhaar) and hospital bills.",
];

const FloatingAiAssistant = ({ contextLabel = "Agile AI" }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: "m1",
      role: "ai",
      text: `Hi! I'm ${contextLabel}. Ask me anything — plans, claims, payments, or comparisons.`,
    },
  ]);

  const send = () => {
    const value = text.trim();
    if (!value) return;
    const userMsg = { id: `u_${messages.length + 1}`, role: "user", text: value };
    const aiText = demoReplies[(messages.length + 1) % demoReplies.length] || demoReplies[0];
    const aiMsg = { id: `a_${messages.length + 2}`, role: "ai", text: aiText };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setText("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-sm font-black text-white shadow-[0_22px_90px_rgba(37,99,235,0.35)] hover:opacity-95"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15">
            <Bot size={18} />
          </span>
          <span className="hidden sm:inline">AI Support</span>
          <span className="hidden sm:inline text-white/80">•</span>
          <span className="hidden sm:inline text-xs font-semibold text-white/85">Instant answers</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(2,6,23,0.22)]"
          >
            <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
                  <Sparkles size={18} />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-black">Agile AI Assistant</div>
                  <div className="truncate text-xs text-white/70">Demo responses • Premium UX</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-xl bg-white/10 p-2 hover:bg-white/15">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-auto p-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={[
                    "rounded-2xl px-4 py-3 text-sm font-semibold",
                    m.role === "user" ? "ml-10 bg-blue-600 text-white" : "mr-10 bg-slate-50 text-slate-800",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="Ask about coverage, EMI, claims…"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                />
                <button
                  onClick={send}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white shadow-sm hover:opacity-95"
                >
                  <SendHorizonal size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default FloatingAiAssistant;
