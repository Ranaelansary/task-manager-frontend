import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import TaskDashboardPage from './pages/TaskDashboardPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
