// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    axios.get('/api/auth', { withCredentials: true })
      .then(response => {setUser(response.data);console.log(user)})
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post('/api/login', { email, password }, { withCredentials: true });
      const response = await axios.get('/api/auth', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
