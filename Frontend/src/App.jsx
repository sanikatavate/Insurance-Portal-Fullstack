import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PublicLayout from "./layouts/PublicLayout";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import PolicyDetailsPage from "./pages/PolicyDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardPolicies from "./pages/dashboard/DashboardPolicies";
import DashboardClaims from "./pages/dashboard/DashboardClaims";
import DashboardPayments from "./pages/dashboard/DashboardPayments";
import DashboardRenewals from "./pages/dashboard/DashboardRenewals";
import DashboardDocuments from "./pages/dashboard/DashboardDocuments";
import DashboardAiSupport from "./pages/dashboard/DashboardAiSupport";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardSecurity from "./pages/dashboard/DashboardSecurity";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AgentDashboardPage from "./pages/agent/AgentDashboardPage";
import ForbiddenPage from "./pages/ForbiddenPage";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:categorySlug" element={<CategoryPage />} />
        <Route path="/policies/:policyId" element={<PolicyDetailsPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route
          path="/checkout/:policyId"
          element={
            <ProtectedRoute allowedRoles={["user", "agent", "admin"]}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute allowedRoles={["user", "agent", "admin"]}>
              <PaymentSuccessPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]} />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="policies" element={<DashboardPolicies />} />
          <Route path="claims" element={<DashboardClaims />} />
          <Route path="payments" element={<DashboardPayments />} />
          <Route path="renewals" element={<DashboardRenewals />} />
          <Route path="documents" element={<DashboardDocuments />} />
          <Route path="ai-support" element={<DashboardAiSupport />} />
          <Route path="notifications" element={<DashboardNotifications />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="security" element={<DashboardSecurity />} />
        </Route>
      </Route>

      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
