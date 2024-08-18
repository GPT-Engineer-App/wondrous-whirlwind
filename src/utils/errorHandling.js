export const handlePromiseRejection = (error) => {
  console.error('Unhandled Promise Rejection:', error);
  // You can add additional error handling logic here, such as sending error reports to a server
};

export const setupErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    handlePromiseRejection(event.reason);
  });
};