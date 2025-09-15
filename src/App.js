import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DiagnosisProvider } from './context/DiagnosisContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Dashboard from './components/Dashboard';
import FarmerDashboard from './components/FarmerDashboard';
import CropRecommendationInput from './components/CropRecommendationInput';
import RecommendationResult from './components/RecommendationResult';
import CropDetail from './components/CropDetail';
import AlertsReminders from './components/AlertsReminders';
import ProfileSettings from './components/ProfileSettings';
import CropDiagnosis from './components/CropDiagnosis';
import Login from './pages/Login';
import Register from './pages/Register';

// Layout Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Dashboard Layout Component
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex pt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          user={user}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="fields">
            <Route index element={<div>Fields List</div>} />
            <Route path="add" element={<div>Add Field</div>} />
            <Route path=":id" element={<div>Field Details</div>} />
          </Route>
          
          <Route path="diagnose" element={<CropDiagnosis />} />
          <Route path="history" element={<div>Diagnosis History</div>} />
          
          <Route path="recommendations">
            <Route index element={<CropRecommendationInput />} />
            <Route path="result" element={<RecommendationResult />} />
          </Route>
          
          <Route path="crops/:id" element={<CropDetail />} />
          <Route path="alerts" element={<AlertsReminders />} />
          <Route path="profile" element={<ProfileSettings />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

// App Wrapper with Providers
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <DiagnosisProvider>
            <AppContent />
            <ToastContainer position="top-right" autoClose={3000} />
          </DiagnosisProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
