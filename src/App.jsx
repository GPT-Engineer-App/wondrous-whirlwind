import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import MobileMenu from "./components/MobileMenu";
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="pb-16 md:pb-0"> {/* Add padding to the bottom for mobile menu */}
              <Routes>
                {navItems.map(({ to, page }) => (
                  <Route key={to} path={to} element={page} />
                ))}
              </Routes>
              <MobileMenu />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;