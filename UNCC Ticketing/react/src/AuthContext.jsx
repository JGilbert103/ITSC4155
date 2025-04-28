import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load authentication state from localStorage on initial render
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  
  // Load user role from localStorage on initial render
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("userRole")) || null
  );
  
  // User email for display purposes
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || null
  );

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Update localStorage when role changes
  useEffect(() => {
    localStorage.setItem("userRole", JSON.stringify(userRole));
  }, [userRole]);

  // Update localStorage when email changes
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

  // Login function
  const login = (email, role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  // Check if user is admin (role 2 or 3)
  const isAdmin = userRole === 2 || userRole === 3;

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole,
        userEmail,
        isAdmin,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}