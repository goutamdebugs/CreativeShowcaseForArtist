import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn, HoverCard } from '../components/AnimatedComponent';
import MasonryGrid from '../components/MasonryGrid';
import { imageService } from '../services/imageService';
import { Sparkles, Upload, Users, Heart, Shield, TrendingUp, Palette, Image as ImageIcon, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Auth context import করুন

const HomePage = () => {
  const { user, isAuthenticated } = useAuth(); // Auth context থেকে user এবং isAuthenticated নিন
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats] = useState({
    artworks: 10342,
    artists: 5216,
    likes: 124857,
    visitors: 89231
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await imageService.getAllImages();
      setImages(data);
    } catch (error) {
      setError('Failed to load images');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Hero Section - শুধুমাত্র logged out users দেখবে */}
      {!isAuthenticated && (
        <section style={{
          minHeight: '90vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 0'
        }}>
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1
          }}>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  background: `radial-gradient(circle at center, 
                    rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1}) 0%, 
                    transparent 70%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  borderRadius: '50%'
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <FadeIn>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  marginBottom: '32px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Sparkles style={{ width: '20px', height: '20px', color: '#818cf8' }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#c7d2fe',
                    letterSpacing: '0.05em'
                  }}>
                    WHERE ART MEETS DIGITAL
                  </span>
                </div>
              </FadeIn>

              <FadeIn>
                <h1 style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  fontWeight: '800',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                  background: 'linear-gradient(90deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Showcase Your
                  <br />
                  <span style={{ display: 'block' }}>Creative Vision</span>
                </h1>
              </FadeIn>
              
              <SlideIn direction="up" delay={0.2}>
                <p style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                  color: '#cbd5e1',
                  maxWidth: '700px',
                  margin: '0 auto 48px',
                  lineHeight: 1.7
                }}>
                  Join thousands of artists sharing their digital masterpieces. 
                  From digital paintings to photography, showcase your talent to a global audience.
                </p>
              </SlideIn>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '18px 36px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  <Upload style={{ width: '20px', height: '20px' }} />
                  Start Creating Free
                </Link>
                
                <Link
                  to="#gallery"
                  style={{
                    padding: '18px 36px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* যদি user login থাকে, তাহলে welcome message দেখান */}
      {isAuthenticated && (
        <section style={{
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1
          }}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 150 + 30}px`,
                  height: `${Math.random() * 150 + 30}px`,
                  background: `radial-gradient(circle at center, 
                    rgba(168, 85, 247, ${Math.random() * 0.2 + 0.1}) 0%, 
                    transparent 70%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  borderRadius: '50%'
                }}
                animate={{
                  y: [0, Math.random() * 80 - 40],
                  x: [0, Math.random() * 80 - 40],
                }}
                transition={{
                  duration: Math.random() * 15 + 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <FadeIn>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  marginBottom: '32px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Sparkles style={{ width: '20px', height: '20px', color: '#818cf8' }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#c7d2fe',
                    letterSpacing: '0.05em'
                  }}>
                    WELCOME BACK
                  </span>
                </div>
              </FadeIn>

              <FadeIn>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                  color: '#f8fafc'
                }}>
                  Welcome back, <span style={{
                    background: 'linear-gradient(90deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>{user?.name || user?.username || 'Artist'}</span>!
                </h1>
              </FadeIn>
              
              <SlideIn direction="up" delay={0.2}>
                <p style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  margin: '0 auto 48px',
                  lineHeight: 1.7
                }}>
                  Ready to explore new artworks or share your latest creation with the community?
                </p>
              </SlideIn>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {/* <Link
                  to="/upload"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '18px 36px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  <Upload style={{ width: '20px', height: '20px' }} />
                  Upload New Artwork
                </Link> */}
                
                <Link
                  to="/dashboard"
                  style={{
                    padding: '18px 36px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - সবাই দেখবে */}
      <section style={{
        padding: '80px 0',
        background: '#0f172a',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { 
                number: stats.artworks.toLocaleString(), 
                label: 'Artworks Shared', 
                icon: '🎨',
                color: '#3b82f6'
              },
              { 
                number: stats.artists.toLocaleString(), 
                label: 'Active Artists', 
                icon: '👩‍🎨',
                color: '#8b5cf6'
              },
              { 
                number: stats.likes.toLocaleString(), 
                label: 'Total Likes', 
                icon: '❤️',
                color: '#ef4444'
              },
              { 
                number: stats.visitors.toLocaleString(), 
                label: 'Monthly Visitors', 
                icon: '👁️',
                color: '#10b981'
              },
            ].map((stat, index) => (
              <HoverCard key={index} style={{
                background: 'rgba(30, 41, 59, 0.5)',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  display: 'inline-block',
                  padding: '16px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '12px'
                }}>
                  {stat.icon}
                </div>
                <motion.h3 
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '8px',
                    background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {stat.number}
                </motion.h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {stat.label}
                </p>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - সবাই দেখবে */}
      <section id="gallery" style={{
        padding: '80px 0',
        background: '#111827'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <FadeIn>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '50px',
                marginBottom: '24px'
              }}>
                <TrendingUp style={{ width: '16px', height: '16px', color: '#a855f7' }} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#c7d2fe'
                }}>
                  TRENDING NOW
                </span>
              </div>
            </FadeIn>
            
            <FadeIn>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '800',
                marginBottom: '20px',
                color: '#f8fafc'
              }}>
                Featured <span style={{
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Artworks</span>
              </h2>
            </FadeIn>
            
            <SlideIn direction="up" delay={0.2}>
              <p style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6
              }}>
                Discover stunning creations from our global community of talented artists
              </p>
            </SlideIn>
          </div>

          {loading ? (
            <div style={{
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(59, 130, 246, 0.3)',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  marginBottom: '24px'
                }}
              />
              <p style={{
                color: '#94a3b8',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Loading artworks...
              </p>
            </div>
          ) : error ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0'
            }}>
              <p style={{
                color: '#ef4444',
                fontSize: '18px',
                marginBottom: '24px'
              }}>
                {error}
              </p>
              <button 
                onClick={fetchImages}
                style={{
                  padding: '12px 32px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <MasonryGrid images={images} />
          )}
        </div>
      </section>

      {/* CTA Section - শুধুমাত্র logged out users দেখবে */}
      {!isAuthenticated && (
        <section style={{
          padding: '120px 0',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <FadeIn>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: '800',
                  marginBottom: '24px',
                  color: '#f8fafc',
                  lineHeight: 1.2
                }}>
                  Ready to Showcase Your
                  <br />
                  <span style={{
                    background: 'linear-gradient(90deg, #60a5fa 0%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Creative Talent?
                  </span>
                </h2>
              </FadeIn>
              
              <SlideIn direction="up" delay={0.2}>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#cbd5e1',
                  marginBottom: '48px',
                  lineHeight: 1.7
                }}>
                  Join thousands of artists already sharing their work. Get discovered, 
                  connect with other creatives, and grow your audience.
                </p>
              </SlideIn>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/register"
                  style={{
                    padding: '20px 40px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  Join Free Today
                </Link>
                
                <Link
                  to="/login"
                  style={{
                    padding: '20px 40px',
                    background: 'transparent',
                    color: '#e2e8f0',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Sign In
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
                marginTop: '60px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#94a3b8'
                }}>
                  <Shield style={{ width: '20px', height: '20px' }} />
                  <span>Secure Platform</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#94a3b8'
                }}>
                  <Users style={{ width: '20px', height: '20px' }} />
                  <span>Community Support</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#94a3b8'
                }}>
                  <Heart style={{ width: '20px', height: '20px' }} />
                  <span>Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Logged in users জন্য Quick Actions Section */}
      {isAuthenticated && (
        <section style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `radial-gradient(circle at 2px 2px, #a855f7 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
          
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '64px'
            }}>
              <FadeIn>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: '800',
                  marginBottom: '24px',
                  color: '#f8fafc'
                }}>
                  Quick Actions
                </h2>
              </FadeIn>
              
              <SlideIn direction="up" delay={0.2}>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6
                }}>
                  Continue your creative journey with these quick actions
                </p>
              </SlideIn>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {[
                { 
                  title: 'Upload Artwork', 
                  description: 'Share your latest creation with the community',
                  icon: <Upload style={{ width: '32px', height: '32px', color: '#3b82f6' }} />,
                  link: '/upload',
                  color: '#3b82f6'
                },
                { 
                  title: 'Your Profile', 
                  description: 'View and manage your artist profile',
                  icon: <Palette style={{ width: '32px', height: '32px', color: '#8b5cf6' }} />,
                  link: `/profile/${user?.id || user?.username}`,
                  color: '#8b5cf6'
                },
                { 
                  title: 'Explore Gallery', 
                  description: 'Discover artworks from other artists',
                  icon: <ImageIcon style={{ width: '32px', height: '32px', color: '#ec4899' }} />,
                  link: '/gallery',
                  color: '#ec4899'
                },
              ].map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.borderColor = action.color + '40';
                    e.target.style.boxShadow = `0 20px 40px ${action.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: action.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    border: `1px solid ${action.color}40`
                  }}>
                    {action.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#f8fafc'
                  }}>
                    {action.title}
                  </h3>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                    lineHeight: 1.6
                  }}>
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;