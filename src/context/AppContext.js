import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState([]);

  // Load saved data from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedLanguage = localStorage.getItem('language');
    const savedHistory = localStorage.getItem('diagnosisHistory');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedHistory) setDiagnosisHistory(JSON.parse(savedHistory));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('diagnosisHistory', JSON.stringify(diagnosisHistory));
  }, [diagnosisHistory]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addDiagnosis = (diagnosis) => {
    const newDiagnosis = {
      ...diagnosis,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setDiagnosisHistory(prev => [newDiagnosis, ...prev]);
    return newDiagnosis;
  };

  const updateUserProfile = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        diagnosisHistory,
        recommendations,
        notifications,
        setLanguage,
        login,
        logout,
        addDiagnosis,
        updateUserProfile,
        addNotification,
        markNotificationAsRead,
        setRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
