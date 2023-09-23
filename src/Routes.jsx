// Routes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import HomePage from './pages/Home/home';
import { AuthContext } from './config/Auth';
import { useContext } from 'react';

// Rotas restritas a usuários autenticados
const Private = ({Component}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

// Rotas públicas
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Private Component={HomePage} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
