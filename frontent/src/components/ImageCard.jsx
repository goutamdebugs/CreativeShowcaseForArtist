import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ImageCard = ({ image }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl w-full max-w-sm mx-auto"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        {/* Image */}
        <img
          src={image.imageUrl || "https://via.placeholder.com/400x400/1f2937/4b5563?text=Creative+Image"}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400/1f2937/4b5563?text=Image+Error";
          }}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm line-clamp-2">
              {image.description || "No description available"}
            </p>
          </div>
        </div>

        {/* Like Button */}
        <button 
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-200 z-10"
          aria-label="Like"
        >
          <svg 
            className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            fill={isLiked ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={isLiked ? "3" : "2"} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg mb-2 truncate">
          {image.title}
        </h3>

        {/* User Info and Like Count */}
        <div className="flex items-center justify-between mb-3">
          {/* User */}
          <Link 
            to={`/profile/${image.username}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {image.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <span className="text-gray-300 text-sm font-medium truncate max-w-[100px]">
              @{image.username || 'user'}
            </span>
          </Link>

          {/* Likes */}
          <div className="flex items-center gap-1">
            <svg 
              className="w-4 h-4 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 text-sm font-medium">
              {likeCount}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {image.tags?.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md truncate max-w-[100px]"
            >
              #{tag}
            </span>
          ))}
          {(!image.tags || image.tags.length === 0) && (
            <span className="px-2 py-1 bg-gray-800 text-gray-500 text-xs rounded-md">
              No tags
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCard;