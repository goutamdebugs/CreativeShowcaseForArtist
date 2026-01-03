import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn } from '../components/AnimatedComponent';
import MasonryGrid from '../components/MasonryGrid';
import { userService } from '../services/userService';
import { imageService } from '../services/imageService';
import toast from 'react-hot-toast';
import { Calendar, Image, Heart, Share2, Settings, Grid, List } from 'lucide-react';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    if (username) {
      fetchProfileData();
    }
  }, [username]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await userService.getUserByUsername(username);
      setProfile(userData.user || userData);
      
      const imagesData = await imageService.getImagesByUsername(username);
      setImages(imagesData.images || imagesData || []);

    } catch (error) {
      setError('Failed to load profile');
      toast.error(error.message || 'Profile not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(59, 130, 246, 0.3)',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            marginBottom: '20px'
          }}
        />
        <p style={{ color: '#cbd5e1', fontSize: '18px' }}>
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '20px'
        }}>
          😔
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#f8fafc',
          marginBottom: '12px'
        }}>
          Profile Not Found
        </h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '18px',
          maxWidth: '400px',
          marginBottom: '30px'
        }}>
          {error || 'The user you are looking for does not exist.'}
        </p>
        <Link
          to="/"
          style={{
            padding: '14px 32px',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.3s'
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
          Go Home
        </Link>
      </div>
    );
  }

  const joinDate = profile.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Recently';

  return (
    <div style={{
      background: '#0f172a',
      minHeight: '100vh'
    }}>
      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <FadeIn>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px'
            }}>
              {/* Avatar */}
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #3b82f6',
                position: 'relative'
              }}>
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.username}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '48px',
                    fontWeight: 'bold'
                  }}>
                    {profile.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div style={{
                textAlign: 'center'
              }}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#f8fafc',
                  marginBottom: '8px'
                }}>
                  @{profile.username}
                </h1>
                
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '18px',
                  maxWidth: '600px',
                  marginBottom: '24px',
                  lineHeight: 1.6
                }}>
                  {profile.bio || 'Creative artist sharing amazing artworks'}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '40px',
                  flexWrap: 'wrap',
                  marginBottom: '30px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <Image style={{ width: '20px', height: '20px', color: '#60a5fa' }} />
                      <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#f8fafc'
                      }}>
                        {images.length}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#94a3b8'
                    }}>
                      Artworks
                    </span>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <Calendar style={{ width: '20px', height: '20px', color: '#60a5fa' }} />
                      <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#f8fafc'
                      }}>
                        {joinDate}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#94a3b8'
                    }}>
                      Joined
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button style={{
                    padding: '12px 24px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    color: '#60a5fa',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                  }}>
                    <Heart style={{ width: '18px', height: '18px' }} />
                    Follow
                  </button>
                  
                  <button style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#e2e8f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}>
                    <Share2 style={{ width: '18px', height: '18px' }} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'gallery' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'gallery' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'gallery' ? '#60a5fa' : '#94a3b8',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'gallery') {
                e.target.style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'gallery') {
                e.target.style.color = '#94a3b8';
              }
            }}
          >
            <Grid style={{ width: '20px', height: '20px' }} />
            Gallery
          </button>
          
          <button
            onClick={() => setActiveTab('about')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'about' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'about' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'about' ? '#60a5fa' : '#94a3b8',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'about') {
                e.target.style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'about') {
                e.target.style.color = '#94a3b8';
              }
            }}
          >
            <List style={{ width: '20px', height: '20px' }} />
            About
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'gallery' ? (
          <SlideIn>
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#f8fafc',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span>Artworks</span>
                <span style={{
                  fontSize: '16px',
                  color: '#94a3b8',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {images.length}
                </span>
              </h2>

              {images.length > 0 ? (
                <MasonryGrid images={images} />
              ) : (
                <div style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '16px',
                  padding: '80px 40px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    fontSize: '60px',
                    marginBottom: '20px',
                    opacity: 0.5
                  }}>
                    🎨
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#f8fafc',
                    marginBottom: '12px'
                  }}>
                    No Artworks Yet
                  </h3>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '16px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    lineHeight: 1.6
                  }}>
                    {profile.username} hasn't uploaded any artworks yet.
                  </p>
                </div>
              )}
            </div>
          </SlideIn>
        ) : (
          <SlideIn>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              padding: '40px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#f8fafc',
                marginBottom: '24px'
              }}>
                About @{profile.username}
              </h3>
              
              <div style={{
                display: 'grid',
                gap: '24px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Bio
                  </h4>
                  <p style={{
                    color: '#e2e8f0',
                    fontSize: '16px',
                    lineHeight: 1.7
                  }}>
                    {profile.bio || 'No bio available'}
                  </p>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Member Since
                  </h4>
                  <p style={{
                    color: '#e2e8f0',
                    fontSize: '16px'
                  }}>
                    {joinDate}
                  </p>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Creative Stats
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '32px',
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#3b82f6',
                        marginBottom: '4px'
                      }}>
                        {images.length}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#94a3b8'
                      }}>
                        Artworks Shared
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#8b5cf6',
                        marginBottom: '4px'
                      }}>
                        {images.length * 15} {/* Example calculation */}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#94a3b8'
                      }}>
                        Total Likes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;