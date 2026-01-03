import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navStyles = {
    navbar: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#111827',
      borderBottom: '1px solid #374151',
      padding: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      width: '100%'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      zIndex: 101
    },
    logoIcon: {
      width: '36px',
      height: '36px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'none'
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    navLink: {
      color: '#d1d5db',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      fontSize: '16px',
      fontWeight: '500'
    },
    signupButton: {
      padding: '10px 20px',
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      display: 'inline-block'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      position: 'relative'
    },
    userButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: '#d1d5db',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      fontSize: '16px'
    },
    userAvatar: {
      width: '36px',
      height: '36px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    dropdownMenu: {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: 0,
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      minWidth: '180px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      border: '1px solid #374151',
      overflow: 'hidden',
      zIndex: 102,
      opacity: isDropdownOpen ? 1 : 0,
      visibility: isDropdownOpen ? 'visible' : 'hidden',
      transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'all 0.2s ease'
    },
    dropdownItem: {
      display: 'block',
      padding: '12px 16px',
      color: '#d1d5db',
      textDecoration: 'none',
      borderBottom: '1px solid #374151',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '15px',
      transition: 'all 0.2s ease'
    },
    mobileMenuButton: {
      display: 'block',
      background: 'none',
      border: 'none',
      color: '#d1d5db',
      cursor: 'pointer',
      padding: '8px',
      fontSize: '24px',
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      zIndex: 101
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: isMenuOpen ? 1 : 0,
      visibility: isMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    },
    mobileMenuContent: {
      backgroundColor: '#1f2937',
      width: '90%',
      maxWidth: '400px',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      color: '#d1d5db',
      fontSize: '28px',
      cursor: 'pointer',
      padding: '5px'
    },
    mobileLink: {
      display: 'block',
      padding: '16px',
      color: '#d1d5db',
      textDecoration: 'none',
      borderRadius: '8px',
      marginBottom: '8px',
      fontSize: '18px',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      border: '1px solid transparent'
    }
  };

  // Media query for responsive design
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <nav style={navStyles.navbar}>
        <div style={navStyles.container}>
          {/* Logo */}
          <Link to="/" style={navStyles.logo}>
            <div style={navStyles.logoIcon}>CS</div>
            <span style={{...navStyles.logoText, display: isMobile ? 'none' : 'inline'}}>
              CreativeShowcase
            </span>
          </Link>

          {/* Desktop Navigation - Show on larger screens */}
          <div style={{...navStyles.desktopNav, display: isMobile ? 'none' : 'flex'}}>
            {/* Always visible links */}
            <Link 
              to="/" 
              style={navStyles.navLink}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#374151';
                e.target.style.color = '#60a5fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#d1d5db';
              }}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  style={navStyles.navLink}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#d1d5db';
                  }}
                >
                  Dashboard
                </Link>

                {/* User dropdown */}
                <div style={navStyles.userSection} ref={dropdownRef}>
                  <button 
                    style={navStyles.userButton}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
                    onMouseLeave={() => !isMobile && setTimeout(() => setIsDropdownOpen(false), 300)}
                  >
                    <div style={navStyles.userAvatar}>
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{user?.username || 'User'}</span>
                    <span style={{marginLeft: '5px', fontSize: '12px'}}>
                      {isDropdownOpen ? '▲' : '▼'}
                    </span>
                  </button>
                  
                  <div style={navStyles.dropdownMenu}>
                    <Link 
                      to={`/profile/${user?.username}`}
                      style={navStyles.dropdownItem}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.color = '#60a5fa';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d1d5db';
                      }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      style={navStyles.dropdownItem}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.color = '#ef4444';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#ef4444';
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={navStyles.navLink}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#d1d5db';
                  }}
                >
                  Login
                </Link>
                <Link to="/register" style={navStyles.signupButton}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Show on small screens */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={navStyles.mobileMenuButton}
            aria-label="Toggle menu"
            onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          style={navStyles.mobileMenu} 
          ref={mobileMenuRef}
          onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
        >
          <div style={navStyles.mobileMenuContent}>
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={navStyles.closeButton}
              aria-label="Close menu"
            >
              ✕
            </button>
            
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
              <div style={{
                ...navStyles.logoIcon, 
                margin: '0 auto 10px',
                width: '50px',
                height: '50px',
                fontSize: '20px'
              }}>
                CS
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px'
              }}>
                CreativeShowcase
              </div>
            </div>

            <Link 
              to="/" 
              style={navStyles.mobileLink}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#374151';
                e.target.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
              }}
            >
              🏠 Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  style={navStyles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  📊 Dashboard
                </Link>
                <Link 
                  to={`/profile/${user?.username}`}
                  style={navStyles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  👤 Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{
                    ...navStyles.mobileLink,
                    background: 'none',
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={navStyles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  🔑 Login
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    ...navStyles.mobileLink,
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;