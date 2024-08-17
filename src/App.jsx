import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from './components/ErrorBoundary';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import { isAuthenticated } from './utils/auth';
import { ThemeProvider } from './components/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Query error:", error);
      },
    },
  },
});

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
};

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router>
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
            </Router>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;