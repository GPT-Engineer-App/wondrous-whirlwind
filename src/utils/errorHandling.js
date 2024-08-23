import { toast } from 'sonner';

export const handlePromiseRejection = (error) => {
  console.error('Unhandled Promise Rejection:', error);
  toast.error(`An error occurred: ${error.message || 'Unknown error'}`);
  // You can add additional error handling logic here, such as sending error reports to a server
};

export const setupErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    handlePromiseRejection(event.reason);
  });
};

export const wrapPromise = (promise) => {
  return promise.catch((error) => {
    handlePromiseRejection(error);
    throw error;
  });
};