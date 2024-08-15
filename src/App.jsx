import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from './components/ErrorBoundary';
import Onboarding from './components/Onboarding';
import Auth from './pages/Auth';
import { isAuthenticated } from './utils/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
};

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="pb-16 md:pb-0">
              <Routes>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/auth" element={<Auth />} />
                {navItems.map(({ to, page }) => (
                  <Route
                    key={to}
                    path={to}
                    element={
                      <PrivateRoute>{page}</PrivateRoute>
                    }
                  />
                ))}
                <Route path="*" element={<Navigate to="/onboarding" replace />} />
              </Routes>
              {isAuthenticated() && <MobileMenu />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;