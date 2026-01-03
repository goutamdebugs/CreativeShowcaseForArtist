import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ImageCard = ({ image }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 w-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-800">
        <img
          src={
            image.imageUrl ||
            'https://via.placeholder.com/400x500/1f2937/4b5563?text=Creative+Art'
          }
          alt={image.title || 'Artwork'}
          className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x500/1f2937/4b5563?text=Image+Error';
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 md:hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4">
            <p className="text-white text-sm line-clamp-2">
              {image.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          aria-label="Like"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition"
        >
          <svg
            className={`w-6 h-6 ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-white'
            }`}
            viewBox="0 0 24 24"
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isLiked ? 3 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg truncate mb-2">
          {image.title || 'Untitled Art'}
        </h3>

        {/* User + Likes */}
        <div className="flex items-center justify-between mb-3">
          <Link
            to={`/profile/${image.username}`}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {image.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="text-gray-300 text-sm truncate max-w-[120px]">
              @{image.username || 'user'}
            </span>
          </Link>

          <div className="flex items-center gap-1 text-gray-300 text-sm">
            ❤️ {likeCount}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {image.tags?.length > 0 ? (
            image.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md truncate max-w-[100px]"
              >
                #{tag}
              </span>
            ))
          ) : (
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
