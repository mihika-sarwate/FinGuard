import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyEmail } from './pages/auth/VerifyEmail';

import { DashboardLayout } from './layouts/DashboardLayout';
import { UserDashboard } from './pages/dashboard/UserDashboard';
import { Accounts } from './pages/dashboard/Accounts';
import { Payments } from './pages/dashboard/Payments';
import { Transactions } from './pages/dashboard/Transactions';
import { Security } from './pages/dashboard/Security';
import { AiAssistant } from './pages/dashboard/AiAssistant';
import { AttackDemo } from './pages/dashboard/AttackDemo';
import { Settings } from './pages/dashboard/Settings';

import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { SecurityDashboard } from './pages/admin/SecurityDashboard';
import { AttackLab } from './pages/admin/AttackLab';
import { ContentInspector } from './pages/admin/ContentInspector';
import { SystemAnalytics } from './pages/admin/SystemAnalytics';
import { SystemAccounts } from './pages/admin/SystemAccounts';
import { GlobalTransactions } from './pages/admin/GlobalTransactions';
import { BillingEngine } from './pages/admin/BillingEngine';
import { SessionReplay } from './pages/admin/SessionReplay';
import { SystemMonitoring } from './pages/admin/SystemMonitoring';
import { PlatformSettings } from './pages/admin/PlatformSettings';

// Helper component to redirect authenticated users away from auth pages
const AuthRouteRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, role, isLoading } = useAuth();
  if (!isLoading && session) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }
  return <>{children}</>;
};

// Root route handler
const RootRedirect: React.FC = () => {
  const { session, role, isLoading } = useAuth();
  
  if (isLoading) return null;

  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthRouteRedirect><Login /></AuthRouteRedirect>} />
        <Route path="/signup" element={<AuthRouteRedirect><SignUp /></AuthRouteRedirect>} />
        <Route path="/forgot-password" element={<AuthRouteRedirect><ForgotPassword /></AuthRouteRedirect>} />
        <Route path="/reset-password" element={<AuthRouteRedirect><ResetPassword /></AuthRouteRedirect>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* Protected Dashboard Routes for Users */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/accounts" element={<Accounts />} />
        <Route path="/dashboard/payments" element={<Payments />} />
        <Route path="/dashboard/transactions" element={<Transactions />} />
        <Route path="/dashboard/security" element={<Security />} />
        <Route path="/dashboard/assistant" element={<AiAssistant />} />
        <Route path="/dashboard/attack-demo" element={<AttackDemo />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="accounts" element={<SystemAccounts />} />
        <Route path="transactions" element={<GlobalTransactions />} />
        <Route path="bills" element={<BillingEngine />} />
        <Route path="security" element={<SecurityDashboard />} />
        <Route path="attack-lab" element={<AttackLab />} />
        <Route path="content" element={<ContentInspector />} />
        <Route path="analytics" element={<SystemAnalytics />} />
        <Route path="sessions" element={<SessionReplay />} />
        <Route path="monitoring" element={<SystemMonitoring />} />
        <Route path="settings" element={<PlatformSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
