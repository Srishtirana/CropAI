import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import FarmerDashboard from './components/FarmerDashboard';
import CropRecommendationInput from './components/CropRecommendationInput';
import RecommendationResult from './components/RecommendationResult';
import CropDetail from './components/CropDetail';
import AlertsReminders from './components/AlertsReminders';
import AdminDashboard from './components/AdminDashboard';
import { Wireframes } from './components/Wireframes';
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('farmer');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('farmer');
  };

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Routes>
            <Route 
              path="/" 
              element={
                !isAuthenticated ? (
                  <LoginRegister onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  userRole === 'admin' ? (
                    <AdminDashboard onLogout={handleLogout} />
                  ) : (
                    <FarmerDashboard onLogout={handleLogout} />
                  )
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/recommendation-input" 
              element={
                isAuthenticated ? (
                  <CropRecommendationInput />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/recommendation-result" 
              element={
                isAuthenticated ? (
                  <RecommendationResult />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/crop-detail/:cropId" 
              element={
                isAuthenticated ? (
                  <CropDetail />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/alerts-reminders" 
              element={
                isAuthenticated ? (
                  <AlertsReminders />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/wireframes" 
              element={<Wireframes />} 
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
