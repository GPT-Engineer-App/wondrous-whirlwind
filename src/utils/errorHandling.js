export const handleAsyncOperation = async (operation, errorMessage) => {
  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw error; // Re-throw the error for the component to handle
  }
};