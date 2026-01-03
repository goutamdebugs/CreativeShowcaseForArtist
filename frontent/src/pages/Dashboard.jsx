import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn, HoverCard, LoadingSpinner } from '../components/AnimatedComponent';
import ImageUpload from '../components/ImageUpload';
import MasonryGrid from '../components/MasonryGrid';
import { imageService } from '../services/imageService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gallery');
  const [stats, setStats] = useState({
    totalImages: 0,
    totalLikes: 0,
    totalViews: 0,
  });

  useEffect(() => {
    // ইউজার এবং ইউজারের আইডি থাকলে ইমেজ লোড হবে
    if (user && user._id) {
      fetchUserImages();
    }
  }, [user]);

  const fetchUserImages = async () => {
    try {
      setLoading(true);
      // imageService.getUserImages ফাংশনটি ইউজারের আইডি দিয়ে কল করা হচ্ছে
      const data = await imageService.getUserImages(user._id);
      
      // ব্যাকএন্ড থেকে আসা ডেটা যদি সরাসরি অ্যারে না হয়, তবে সঠিক প্রপার্টি চেক করা
      const finalImages = Array.isArray(data) ? data : (data.images || []);
      setImages(finalImages);
      calculateStats(finalImages);
    } catch (error) {
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (imagesList) => {
    // ইমেজ লিস্ট থেকে লাইক সংখ্যা বের করা
    const totalLikes = imagesList.reduce((sum, img) => sum + (img.likes?.length || 0), 0);
    const totalViews = imagesList.length * 150; // Mock calculation
    
    setStats({
      totalImages: imagesList.length,
      totalLikes,
      totalViews,
    });
  };

  const handleUploadSuccess = (newImage) => {
    // নতুন ইমেজ লিস্টের শুরুতে যোগ করা হচ্ছে
    setImages(prev => [newImage, ...prev]);
    setStats(prev => ({
      ...prev,
      totalImages: prev.totalImages + 1,
    }));
    setActiveTab('gallery'); // আপলোড সফল হলে গ্যালারিতে নিয়ে যাবে
    toast.success('Image uploaded successfully!');
  };

  if (!user) {
    return (
      <div className="loading-page flex items-center justify-center min-h-screen">
        <div className="loading-content text-center">
          <LoadingSpinner size="large" />
          <p className="loading-text mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard pb-20">
      {/* Dashboard Header */}
      <div className="dashboard-header bg-white border-b py-10 mb-8">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="header-content flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="dashboard-title text-3xl font-bold">Dashboard</h1>
                <p className="dashboard-subtitle text-gray-500">Welcome back, {user.username}! 👋</p>
              </div>
              
              <div className="header-actions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('upload')}
                  className="btn btn-light bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload New
                </motion.button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Stats Section */}
      <div className="dashboard-stats mb-12">
        <div className="container mx-auto px-4">
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Artworks', value: stats.totalImages, icon: '🎨' },
              { label: 'Total Likes', value: stats.totalLikes, icon: '❤️' },
              { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: '👁️' },
            ].map((stat, index) => (
              <HoverCard key={index} className="stat-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="stat-icon-wrapper text-3xl mb-2">{stat.icon}</div>
                <h3 className="stat-number text-2xl font-bold">{stat.value}</h3>
                <p className="stat-label text-gray-500">{stat.label}</p>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="dashboard-content">
        <div className="container mx-auto px-4">
          <div className="tabs flex gap-6 border-b mb-8 overflow-x-auto">
            {['gallery', 'upload', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab pb-4 px-2 capitalize font-medium transition-all ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tab-content min-h-[400px]">
            {activeTab === 'gallery' && (
              <FadeIn>
                <div className="gallery-tab">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Your Artworks</h2>
                    <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">{images.length} items</span>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-20"><LoadingSpinner size="large" /></div>
                  ) : images.length > 0 ? (
                    <MasonryGrid images={images} />
                  ) : (
                    <div className="empty-gallery text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                      <h3 className="text-lg font-semibold text-gray-700">No artworks yet</h3>
                      <p className="text-gray-500 mb-6">Start uploading your first artwork!</p>
                      <button onClick={() => setActiveTab('upload')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Upload First Artwork</button>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {activeTab === 'upload' && (
              <SlideIn direction="left">
                <div className="upload-tab max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
                  <h2 className="text-xl font-bold mb-6">Upload New Artwork</h2>
                  <ImageUpload onUploadSuccess={handleUploadSuccess} />
                </div>
              </SlideIn>
            )}

            {activeTab === 'analytics' && (
              <FadeIn>
                <div className="analytics-tab grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h3 className="font-bold mb-4">Recent Activity (Mock)</h3>
                    <div className="space-y-4">
                      {[{ a: 'Image uploaded', t: 'Sunset', time: '2 hours ago' }].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center p-3 hover:bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">{item.a.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-medium">{item.a} <span className="text-blue-600">{item.t}</span></p>
                            <p className="text-xs text-gray-400">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;