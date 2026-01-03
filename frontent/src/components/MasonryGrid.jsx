import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard';
import { Image as ImageIcon, Sparkles, Loader } from 'lucide-react';

const MasonryGrid = ({ images = [], loading = false }) => {
  const [columns, setColumns] = useState(4);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute images into columns
  const columnData = Array.from({ length: columns }, () => []);
  images.forEach((image, index) => {
    columnData[index % columns].push(image);
  });

  // Loading state
  if (loading) {
    return (
      <div style={{
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #1f2937',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
        <p style={{
          marginTop: '24px',
          color: '#9ca3af',
          fontWeight: '500',
          fontSize: '18px'
        }}>
          Loading creative artworks...
        </p>
        
        {/* CSS for animation */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Empty state
  if (images.length === 0) {
    return (
      <div style={{
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          style={{ position: 'relative', marginBottom: '32px' }}
        >
          <div style={{
            width: '128px',
            height: '128px',
            background: 'linear-gradient(135deg, #111827, #000000)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #374151',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ width: '64px', height: '64px', color: '#4b5563' }}>
              📷
            </div>
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ color: 'white' }}>✨</div>
            </div>
          </div>
        </motion.div>
        <h3 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '12px'
        }}>
          Gallery Awaits Your Art
        </h3>
        <p style={{
          color: '#9ca3af',
          fontSize: '18px',
          maxWidth: '28rem',
          marginBottom: '24px'
        }}>
          No images found yet. Be the first to share your creativity!
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Stats Bar */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
        background: '#111827',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '900',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#fbbf24' }}>✨</span> Creative Gallery
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              marginTop: '4px'
            }}>
              Discover amazing artworks from our community
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '24px',
                fontWeight: '900',
                color: 'white'
              }}>{images.length}</p>
              <p style={{
                color: '#6b7280',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
              }}>Artworks</p>
            </div>
            <div style={{
              height: '32px',
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}></div>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '24px',
                fontWeight: '900',
                color: '#6366f1'
              }}>{columns}</p>
              <p style={{
                color: '#6b7280',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
              }}>Columns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '1fr'
      }}>
        {/* Responsive grid */}
        {window.innerWidth >= 640 && (
          <style>{`
            @media (min-width: 640px) {
              .masonry-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (min-width: 768px) {
              .masonry-grid { grid-template-columns: repeat(${columns > 2 ? 3 : 2}, 1fr); }
            }
            @media (min-width: 1024px) {
              .masonry-grid { grid-template-columns: repeat(${columns}, 1fr); }
            }
          `}</style>
        )}
        
        <div className="masonry-grid" style={{ gap: '24px' }}>
          {columnData.map((column, colIndex) => (
            <div 
              key={colIndex} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {column.map((image, imgIndex) => (
                <motion.div 
                  key={image.id || `${colIndex}-${imgIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (colIndex * 0.1) + (imgIndex * 0.1) }}
                >
                  <ImageCard image={image} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer count */}
      <div style={{
        marginTop: '64px',
        paddingTop: '32px',
        paddingBottom: '32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#6b7280',
          fontSize: '14px'
        }}>
          Showing <span style={{ color: 'white', fontWeight: 'bold' }}>{images.length}</span> artworks • Scroll to explore more
        </p>
      </div>
    </div>
  );
};

export default MasonryGrid;