// Simulated authentication
const specialAccount = {
  id: 1,
  username: 'special_user',
  password: 'special_password_123',
  role: 'admin'
};

const regularUsers = [
  {
    id: 2,
    username: 'regular_user',
    password: 'regular_password_123',
    role: 'user'
  }
];

export const login = (username, password) => {
  if (username === specialAccount.username && password === specialAccount.password) {
    localStorage.setItem('user', JSON.stringify(specialAccount));
    return true;
  }

  const user = regularUsers.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
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

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};