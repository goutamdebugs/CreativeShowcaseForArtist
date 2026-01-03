import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FadeIn, SlideIn } from '../components/AnimatedComponent';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      await register(formData);
      toast.success('🎉 Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1
      }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle at center, 
                rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1}) 0%, 
                transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      <FadeIn>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                borderRadius: '16px',
                marginBottom: '24px'
              }}>
                <User style={{ width: '32px', height: '32px', color: 'white' }} />
              </div>
              
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#f8fafc',
                marginBottom: '12px',
                background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Join CreativeShowcase
              </h2>
              
              <p style={{
                color: '#94a3b8',
                fontSize: '16px',
                lineHeight: 1.6
              }}>
                Start your creative journey with us
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <SlideIn direction="left">
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px'
                  }}>
                    Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}>
                      <User style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      style={{
                        width: '100%',
                        padding: '16px 16px 16px 48px',
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: `1px solid ${errors.username ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5cf6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.username ? '#ef4444' : 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.username && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '14px',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ {errors.username}
                    </p>
                  )}
                </div>
              </SlideIn>

              {/* Email */}
              <SlideIn direction="right">
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px'
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}>
                      <Mail style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      style={{
                        width: '100%',
                        padding: '16px 16px 16px 48px',
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5cf6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '14px',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ {errors.email}
                    </p>
                  )}
                </div>
              </SlideIn>

              {/* Password */}
              <SlideIn direction="left">
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px'
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}>
                      <Lock style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '16px 48px 16px 48px',
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5cf6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showPassword ? (
                        <EyeOff style={{ width: '20px', height: '20px' }} />
                      ) : (
                        <Eye style={{ width: '20px', height: '20px' }} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '14px',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ {errors.password}
                    </p>
                  )}
                </div>
              </SlideIn>

              {/* Confirm Password */}
              <SlideIn direction="right">
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px'
                  }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}>
                      <Lock style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '16px 48px 16px 48px',
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5cf6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff style={{ width: '20px', height: '20px' }} />
                      ) : (
                        <Eye style={{ width: '20px', height: '20px' }} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '14px',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⚠️ {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </SlideIn>

              {/* Terms */}
              <div style={{
                marginBottom: '32px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #475569',
                      background: termsAccepted ? '#8b5cf6' : 'transparent',
                      cursor: 'pointer',
                      appearance: 'none',
                      position: 'relative',
                      marginTop: '3px',
                      transition: 'all 0.2s'
                    }}
                  />
                  <span style={{
                    color: '#cbd5e1',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}>
                    I agree to the{' '}
                    <Link 
                      to="/terms"
                      style={{
                        color: '#8b5cf6',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link 
                      to="/privacy"
                      style={{
                        color: '#8b5cf6',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    ⚠️ {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: loading ? 0.8 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader style={{
                      width: '20px',
                      height: '20px',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '32px 0',
              color: '#64748b'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} />
              <span style={{
                padding: '0 16px',
                fontSize: '14px'
              }}>
                Or sign up with
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} />
            </div>

            {/* Social Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="#e2e8f0" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Login Link */}
            <div style={{
              textAlign: 'center',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                color: '#94a3b8',
                fontSize: '14px'
              }}>
                Already have an account?{' '}
                <Link 
                  to="/login"
                  style={{
                    color: '#8b5cf6',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Checkbox tick */
        input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;