import React, { useState, createContext } from 'react';

import { useNavigate } from 'react-router-dom';
import registerValidate from '../modules/inputValidation';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (username, password, confirmPassword, email, confirmEmail, birthdate) => {
    const validation = registerValidate(
      username,
      password,
      confirmPassword,
      email,
      confirmEmail,
      birthdate
    );
    if (!!validation.isValid) {
      setIsLoading(true);
      setError(null);
      const api = 'http://localhost:3001/';
      try {
        const response = await fetch(`${api}register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            data: {
              username,
              password,
              email,
              birthdate,
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
      setError(validation.error);
    }
  };

  return (
    <RegisterContext.Provider value={{ register, user, error, setError, isLoading }}>
      {children}
    </RegisterContext.Provider>
  );
};
