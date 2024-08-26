import { toast } from 'sonner';

export const handleError = (error) => {
  console.error('Error:', error);
  let errorMessage = 'An unknown error occurred';
  let errorDetails = '';
  
  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object') {
    errorMessage = error.message || JSON.stringify(error);
    errorDetails = JSON.stringify(error, null, 2);
  }
  
  toast.error(`Error: ${errorMessage}`);
  console.log('Error details:', errorDetails);
};

export const setupErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    handleError(event.reason);
  });

  window.addEventListener('error', (event) => {
    event.preventDefault();
    handleError(event.error);
  });
};

export const wrapPromise = (promise) => {
  return promise.catch((error) => {
    handleError(error);
    throw error;
  });
};