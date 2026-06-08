import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ForbiddenPage = ({ role, allowedRoles }) => (
  <div className="min-h-[60vh] grid place-items-center bg-slate-50 px-6">
    <div className="max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="text-5xl font-black text-slate-900">403</div>
      <h1 className="mt-4 text-2xl font-black text-slate-900">Forbidden</h1>
      <p className="mt-2 text-sm text-slate-600">
        Your current role{role ? ` (${role})` : ""} cannot access this area. Allowed roles: {allowedRoles.join(", ")}.
      </p>
    </div>
  </div>
);

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] grid place-items-center bg-slate-50">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-slate-600 shadow-sm">
          Checking access...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth?returnTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (allowedRoles?.length && user && !allowedRoles.includes(user.role)) {
    return <ForbiddenPage role={user.role} allowedRoles={allowedRoles} />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
