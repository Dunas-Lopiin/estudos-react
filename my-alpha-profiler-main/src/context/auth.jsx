import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    if (password.length > 0) {
      setIsLoading(true);
      setError(null);

      const api = 'http://localhost:3001/';
      try {
        const response = await fetch(`${api}auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            data: {
              username,
              password,
            },
          }),
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        } else {
          localStorage.setItem('user', JSON.stringify(data));
          console.log(data);
          setUser(data);
          console.log(user);
          setIsLoading(false);
          navigate('/');
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Password is required');
    }
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        isLoading,
        setIsLoading,
        error,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
