import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-slate-50 px-6">
      <div className="max-w-xl rounded-[2.4rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-6xl font-black text-slate-900">403</div>
        <h1 className="mt-4 text-2xl font-black text-slate-900">Access denied</h1>
        <p className="mt-2 text-sm text-slate-600">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
