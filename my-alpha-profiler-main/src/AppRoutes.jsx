import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import RegisterPage from './pages/RegisterPage';

import { AuthProvider, AuthContext } from './context/auth';
import { RegisterProvider } from './context/register';
import { EditProvider } from './context/edit';

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to={'/login'} />;
    }

    return children;
  };

  const LoginPrivate = ({ children }) => {
    const { authenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    if (authenticated) {
      return <Navigate to={'/'} />;
    }

    return children;
  };
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <LoginPrivate>
                  <LoginPage />
                </LoginPrivate>
              }
            />

            <Route
              exact
              path="/register"
              element={
                <RegisterProvider>
                  <LoginPrivate>
                    <RegisterPage />
                  </LoginPrivate>
                </RegisterProvider>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <EditProvider>
                  <Private>
                    <EditProfilePage />
                  </Private>
                </EditProvider>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default AppRoutes;
