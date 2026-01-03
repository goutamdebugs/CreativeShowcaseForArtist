import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './index.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-md)',
              border: '1px solid var(--border-color)',
            },
            success: {
              iconTheme: {
                primary: 'var(--accent-color)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'white',
              },
            },
          }}
        />
        <div className="app">
          <Navbar />
          <main className="main-content animate-fade-in">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;