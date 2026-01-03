import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';

const AnimatedRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    in: { 
      opacity: 1, 
      y: 0 
    },
    out: { 
      opacity: 0, 
      y: -20 
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4
  };

  const containerStyle = {
    width: '100%',
    minHeight: 'calc(100vh - 160px)', // Adjust based on your navbar/footer height
    padding: '20px 0'
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              key="home"
              style={containerStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <HomePage />
            </motion.div>
          }
        />
        
        <Route
          path="/login"
          element={
            <motion.div
              key="login"
              style={containerStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LoginPage />
            </motion.div>
          }
        />
        
        <Route
          path="/register"
          element={
            <motion.div
              key="register"
              style={containerStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <RegisterPage />
            </motion.div>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <motion.div
              key="dashboard"
              style={containerStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Dashboard />
            </motion.div>
          }
        />
        
        <Route
          path="/profile/:username"
          element={
            <motion.div
              key="profile"
              style={containerStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ProfilePage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;