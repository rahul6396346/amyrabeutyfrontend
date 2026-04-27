import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { RouteGuard } from "@/components/RouteGuard";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// Layouts
import DashboardLayout from "@/pages/dashboard/DashboardLayout";

// Modules
import Dashboard from "@/pages/dashboard/Dashboard";
import CustomerList from "@/pages/customers/CustomerList";
import CustomerCreate from "@/pages/customers/CustomerCreate";
import CustomerEdit from "@/pages/customers/CustomerEdit";
import CustomerDetails from "@/pages/customers/CustomerDetails";

// Appointments
import AppointmentList from "@/pages/appointments/AppointmentList";
import AppointmentCreate from "@/pages/appointments/AppointmentCreate";
import AppointmentDetails from "@/pages/appointments/AppointmentDetails";
import AppointmentEdit from "@/pages/appointments/AppointmentEdit";

// Billing
import InvoiceList from "@/pages/billing/InvoiceList";
import InvoiceDetails from "@/pages/billing/InvoiceDetails";

// Services
import ServiceList from "@/pages/services/ServiceList";
import ServiceCreate from "@/pages/services/ServiceCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RouteGuard />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

            {/* Owner Routes */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute requireOwner>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/new" element={<CustomerCreate />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
              <Route path="customers/:id/edit" element={<CustomerEdit />} />
              <Route path="appointments" element={<AppointmentList />} />
              <Route path="appointments/new" element={<AppointmentCreate />} />
              <Route path="appointments/:id" element={<AppointmentDetails />} />
              <Route path="appointments/:id/edit" element={<AppointmentEdit />} />
              <Route path="services" element={<ServiceList />} />
              <Route path="services/new" element={<ServiceCreate />} />
              <Route path="billing" element={<InvoiceList />} />
              <Route path="billing/:id" element={<InvoiceDetails />} />
              <Route path="inventory" element={<div>Inventory (Coming Soon)</div>} />
              <Route path="staff" element={<div>Staff Management (Coming Soon)</div>} />
              <Route path="reports" element={<div>Reports (Coming Soon)</div>} />
              <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
            </Route>

            {/* Manager Routes */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute requireManager>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="customers/new" element={<CustomerCreate />} />
            </Route>

            {/* Staff Routes */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute requireStaff>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="customers/new" element={<CustomerCreate />} />
            </Route>

            {/* Default Redirect based on role logic could be added in Dashboard component or here */}
            <Route path="/dashboard" element={<Navigate to="/owner/dashboard" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
