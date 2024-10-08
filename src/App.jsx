import React, { createContext, useState } from "react";
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
import { setupErrorHandlers, wrapPromise, handleError } from './utils/errorHandling';
import { SupabaseAuthProvider } from './integrations/supabase/auth';
import trTranslations from './locales/tr.json';

export const LanguageContext = createContext();

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
  const [language, setLanguage] = useState('en');
  const translations = language === 'tr' ? trTranslations : {};

  React.useEffect(() => {
    setupErrorHandlers();
    
    // Add a global error handler for any uncaught errors
    window.onerror = (message, source, lineno, colno, error) => {
      handleError(error || new Error(message));
      return true; // Prevent the default error handling
    };

    // Add a global unhandled promise rejection handler
    window.onunhandledrejection = (event) => {
      event.preventDefault();
      handleError(event.reason);
    };
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
              <LanguageContext.Provider value={{ language, setLanguage, translations }}>
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
              </LanguageContext.Provider>
            </SupabaseAuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
