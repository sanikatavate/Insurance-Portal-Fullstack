import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Agile Insurance • Navigation
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
            Page not found
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            The page you’re looking for doesn’t exist. Head back to the homepage or
            jump into your dashboard.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Home size={18} />
              Go to Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
              Open Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

