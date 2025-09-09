import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const initialLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'hindi') : 'hindi';

  const [user, setUser] = useState({
    name: 'राम कुमार',
    phone: '+91 98765 43210',
    location: 'मध्य प्रदेश, भारत',
    farmSize: '5 एकड़',
    language: initialLang
  });

  const [language, setLanguage] = useState(initialLang);

  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'weather',
      title: 'मौसम चेतावनी',
      message: 'आज शाम को बारिश की संभावना है',
      priority: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'pest',
      title: 'कीट प्रबंधन',
      message: 'गेहूं में रस्ट रोग का खतरा',
      priority: 'medium',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const addRecommendation = (recommendation) => {
    setRecommendations(prev => [recommendation, ...prev]);
  };

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setUser(prev => ({ ...prev, language: newLanguage }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('lang', language);
    } catch (_) {}
  }, [language]);

  const value = {
    user,
    updateUser,
    recommendations,
    addRecommendation,
    alerts,
    addAlert,
    language,
    changeLanguage
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
