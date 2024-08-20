import { toast } from 'sonner';

export const handlePromiseRejection = (error) => {
  console.error('Unhandled Promise Rejection:', error);
  
  // Log additional details if available
  if (error && error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error && error.request) {
    console.error('Request:', error.request);
  } else {
    console.error('Error message:', error.message);
  }

  // Display a user-friendly error message
  toast.error('An unexpected error occurred. Please try again later.');

  // You can add additional error handling logic here, such as sending error reports to a server
};

export const setupErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    handlePromiseRejection(event.reason);
  });

  // Add a global error boundary
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, colno, error });
    toast.error('An unexpected error occurred. Please try again later.');
    return true; // Prevents the firing of the default event handler
  };
};

export const wrapPromise = (promise) => {
  return promise.catch((error) => {
    handlePromiseRejection(error);
    throw error;
  });
};

export const asyncErrorBoundary = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      handlePromiseRejection(error);
      throw error;
    }
  };
};