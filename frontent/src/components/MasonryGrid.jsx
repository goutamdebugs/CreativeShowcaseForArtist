import { motion } from "framer-motion";
import ImageCard from "./ImageCard";

const MasonryGrid = ({ images = [], loading = false }) => {
  /* -------------------- Loading State -------------------- */
  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-6 text-gray-400 font-medium text-lg">
          Loading creative artworks...
        </p>
      </div>
    );
  }

  /* -------------------- Empty State -------------------- */
  if (images.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mb-8"
        >
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-700 flex items-center justify-center relative shadow-xl">
            <span className="text-5xl">📷</span>
            <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              ✨
            </span>
          </div>
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2">
          Gallery Awaits Your Art
        </h3>
        <p className="text-gray-400 max-w-md">
          No images found yet. Be the first to share your creativity!
        </p>
      </div>
    );
  }

  /* -------------------- Main Grid -------------------- */
  return (
    <div className="w-full">
      {/* Header / Stats */}
      <div className="mb-8 p-6 bg-gray-900 border border-white/10 rounded-2xl shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-yellow-400">✨</span> Creative Gallery
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Discover amazing artworks from our community
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-black text-white">
                {images.length}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">
                Artworks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry using CSS columns (BEST & STABLE) */}
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          gap-6
        "
      >
        {images.map((image, index) => (
          <motion.div
            key={image._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6 break-inside-avoid"
          >
            <ImageCard image={image} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          Showing{" "}
          <span className="text-white font-semibold">
            {images.length}
          </span>{" "}
          artworks • Scroll to explore more
        </p>
      </div>
    </div>
  );
};

export default MasonryGrid;
