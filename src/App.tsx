
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/employee-signup" element={<EmployeeLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
