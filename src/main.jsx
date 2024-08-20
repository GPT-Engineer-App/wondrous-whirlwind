import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { setupErrorHandlers } from "./utils/errorHandling";
import { SupabaseProvider } from './integrations/supabase/index.js';

setupErrorHandlers();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);