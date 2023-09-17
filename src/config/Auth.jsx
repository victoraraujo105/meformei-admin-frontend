import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Defina sua lógica para verificar se o usuário está autenticado aqui
  // Por exemplo, verifique se o token do usuário existe no armazenamento local
  // const checkAuthenticated = () => {
  //   if (localStorage.getItem('token')) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
