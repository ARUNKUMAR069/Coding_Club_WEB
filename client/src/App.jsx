import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games'; // New games page
import AdminDashboard from './pages/admin/Dashboard';
import MembersPage from './pages/admin/Members';
import MemberDetailPage from './pages/admin/MemberDetail';
import NewMemberPage from './pages/admin/NewMember';
import EventsAdminPage from './pages/admin/Events';
import NewEventPage from './pages/admin/NewEvent';
import EditEventPage from './pages/admin/EditEvent';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized'; // Add import

// Game pages
import CodeQuiz from './pages/games/CodeQuiz';
import BugHunter from './pages/games/BugHunter';
import SyntaxScramble from './pages/games/SyntaxScramble';
import AlgorithmChallenge from './pages/games/AlgorithmChallenge';

// Components
import Layout from './components/common/Layout';
import AdminLayout from './components/admin/Layout';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page, but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is specified, check user role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/login" element={<Login />} />
        
        {/* Member routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Games routes - protected for members */}
        <Route path="/games" element={
          <ProtectedRoute>
            <Layout>
              <Games />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/games/code-quiz" element={
          <ProtectedRoute>
            <Layout>
              <CodeQuiz />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/games/bug-hunter" element={
          <ProtectedRoute>
            <Layout>
              <BugHunter />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/games/syntax-scramble" element={
          <ProtectedRoute>
            <Layout>
              <SyntaxScramble />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/games/algorithm-challenge" element={
          <ProtectedRoute>
            <Layout>
              <AlgorithmChallenge />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/members" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <MembersPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/members/new" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <NewMemberPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/members/:id" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <MemberDetailPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/events" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <EventsAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/events/new" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <NewEventPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/events/:id/edit" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <EditEventPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} /> {/* Add route in AppContent */}
        
        {/* Catch all route */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;