import { toast } from 'sonner';

export const handlePromiseRejection = (error) => {
  console.error('Unhandled Promise Rejection:', error);
  let errorMessage = 'An unknown error occurred';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message;
  }
  
  toast.error(`Error: ${errorMessage}`);
};

export const setupErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    handlePromiseRejection(event.reason);
  });

  window.addEventListener('error', (event) => {
    event.preventDefault();
    handlePromiseRejection(event.error);
  });
};

export const wrapPromise = (promise) => {
  return promise.catch((error) => {
    handlePromiseRejection(error);
    throw error;
  });
};