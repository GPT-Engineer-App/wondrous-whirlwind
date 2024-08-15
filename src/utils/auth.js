// Simulated authentication
const adminUser = {
  id: 1,
  username: 'admin',
  password: 'admin123',
};

export const login = (username, password) => {
  if (username === adminUser.username && password === adminUser.password) {
    localStorage.setItem('user', JSON.stringify(adminUser));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};