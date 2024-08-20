import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import MobileMenu from "./components/MobileMenu";
import WebNavigation from "./components/WebNavigation";
import ErrorBoundary from './components/ErrorBoundary';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import { isAuthenticated } from './utils/auth';
import { ThemeProvider } from './components/ThemeProvider';
import CommunityPage from './components/CommunityPage';
import FirstTime from './components/FirstTime';
import { setupErrorHandlers, wrapPromise } from './utils/errorHandling';
import { SupabaseAuthProvider } from './integrations/supabase/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      queryFn: (context) => wrapPromise(context.queryFn(context)),
    },
  },
});

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
};

const App = () => {
  React.useEffect(() => {
    setupErrorHandlers();
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
              <TooltipProvider>
                <Toaster />
                <Router>
                  <div className="flex flex-col min-h-screen">
                    {isAuthenticated() && <WebNavigation />}
                    <div className="flex-1 pb-16 md:pb-0">
                      <Routes>
                        <Route path="/first-time" element={<FirstTime />} />
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
                        <Route
                          path="/community/:id"
                          element={
                            <PrivateRoute>
                              <CommunityPage />
                            </PrivateRoute>
                          }
                        />
                        <Route path="*" element={<Navigate to="/first-time" replace />} />
                      </Routes>
                    </div>
                    {isAuthenticated() && <MobileMenu />}
                  </div>
                </Router>
              </TooltipProvider>
            </SupabaseAuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;