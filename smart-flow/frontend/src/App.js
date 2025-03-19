import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import WaterSchedule from './components/WaterSchedule';
import PlantKnowledge from './components/PlantKnowledge';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={
            <Login setIsAuthenticated={setIsAuthenticated} />
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/schedule" element={
            <ProtectedRoute>
              <WaterSchedule />
            </ProtectedRoute>
          } />
          
          <Route path="/plants" element={
            <ProtectedRoute>
              <PlantKnowledge />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
