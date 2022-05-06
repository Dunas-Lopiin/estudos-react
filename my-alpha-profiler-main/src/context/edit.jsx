import React, { useState, useEffect, createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { editValidate } from '../modules/inputValidation';
import { AuthContext } from '../context/auth';

export const EditContext = createContext();
export const EditProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  // const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      setIsLoading(false);
    }
  }, [setUser]);

  const deleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    const api = 'http://localhost:3001/';
    try {
      const response = await fetch(`${api}delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: {
            username: user.username,
          },
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoading(false);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const editProfile = async (photo, email, confirmEmail, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);
    const api = 'http://localhost:3001/';
    const validation = editValidate(photo, email, confirmEmail, password, confirmPassword);
    if (!!validation.isValid) {
      try {
        const response = await fetch(`${api}edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            data: {
              username: user.username,
              photo,
              email,
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
    <EditContext.Provider value={{ editProfile, deleteAccount, user, error, isLoading }}>
      {children}
    </EditContext.Provider>
  );
};
