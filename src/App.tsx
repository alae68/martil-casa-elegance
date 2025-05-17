
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingsProvider } from "./contexts/BookingsContext";
import Index from "./pages/Index";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/properties" element={<AdminProperties />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BookingsProvider>
  </QueryClientProvider>
);

export default App;
