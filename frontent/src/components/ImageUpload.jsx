import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, Loader, Image as ImageIcon, Tag, Type, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { imageService } from '../services/imageService';
import { useAuth } from '../context/AuthContext';

const ImageUpload = ({ onUploadSuccess }) => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: acceptedFiles => {
      setIsDragging(false);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => {
      setIsDragging(false);
      toast.error('File must be an image and less than 5MB');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error('Please select an image to upload');
      return;
    }

    if (!user) {
      toast.error('Please login to upload images');
      return;
    }

    if (!title.trim()) {
      toast.error('Please add a title for your artwork');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', files[0]);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('tags', tags.trim());
      formData.append('userId', user._id);
      formData.append('username', user.username);

      const response = await imageService.uploadImage(formData);
      toast.success('🎨 Image uploaded successfully!');
      
      // Reset form
      setFiles([]);
      setTitle('');
      setDescription('');
      setTags('');
      
      onUploadSuccess && onUploadSuccess(response);
    } catch (error) {
      toast.error(error.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    if (files[0]?.preview) {
      URL.revokeObjectURL(files[0].preview);
    }
    setFiles([]);
  };

  // Cleanup preview URL on unmount
  useState(() => {
    return () => {
      if (files[0]?.preview) {
        URL.revokeObjectURL(files[0].preview);
      }
    };
  }, [files]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto p-4 sm:p-6"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Upload Your Artwork
            </h2>
          </div>
          <p className="text-gray-400">
            Share your creativity with the world. Supported formats: JPG, PNG, GIF, WEBP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
          {/* Dropzone Area */}
          <div className="mb-8">
            <label className="block text-white font-medium mb-3 text-lg">
              Image Upload *
            </label>
            
            <div
              {...getRootProps()}
              className={`
                relative border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer
                transition-all duration-300 ease-out
                ${isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/30'}
                ${files.length > 0 ? 'hidden' : 'block'}
              `}
            >
              <input {...getInputProps()} />
              
              <motion.div
                animate={isDragging ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="inline-flex flex-col items-center justify-center"
              >
                <div className={`p-5 rounded-full mb-4 transition-all duration-300 ${isDragging ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                  <ImageIcon className={`w-12 h-12 ${isDragging ? 'text-blue-400' : 'text-gray-400'}`} />
                </div>
                
                <p className={`text-xl font-medium mb-2 ${isDragging ? 'text-blue-400' : 'text-white'}`}>
                  {isDragging ? '📥 Drop it like it\'s hot!' : 'Drag & drop your image here'}
                </p>
                
                <p className="text-gray-400 mb-6">
                  or <span className="text-blue-400 font-medium">browse files</span>
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
                  <span className="text-gray-300 text-sm">Max size: 5MB</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300 text-sm">PNG, JPG, GIF, WEBP</span>
                </div>
              </motion.div>
            </div>

            {/* Preview */}
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800">
                  <img
                    src={files[0].preview}
                    alt="Preview"
                    className="w-full h-64 sm:h-80 object-contain bg-gradient-to-br from-gray-900 to-black"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-3 right-3 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">
                        {files[0].name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {(files[0].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <Type className="w-5 h-5 text-blue-400" />
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="Give your artwork a catchy title..."
                required
              />
              <p className="mt-2 text-gray-400 text-sm">
                A great title helps others discover your work
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 sm:h-40 px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none"
                placeholder="Tell the story behind your artwork... (Optional)"
                maxLength={500}
              />
              <div className="flex justify-between mt-2">
                <p className="text-gray-400 text-sm">
                  Share the inspiration behind your creation
                </p>
                <span className={`text-sm ${description.length >= 450 ? 'text-red-400' : 'text-gray-500'}`}>
                  {description.length}/500
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <Tag className="w-5 h-5 text-green-400" />
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                placeholder="art, digital, painting, photography, landscape..."
              />
              <p className="mt-2 text-gray-400 text-sm">
                Separate tags with commas. Helps others find your work
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              type="submit"
              disabled={uploading || files.length === 0}
              whileTap={{ scale: uploading ? 1 : 0.98 }}
              whileHover={{ scale: uploading ? 1 : 1.02 }}
              className={`
                flex-1 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg
                flex items-center justify-center gap-3
                transition-all duration-300
                ${uploading || files.length === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Artwork</span>
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={() => {
                removeFile();
                setTitle('');
                setDescription('');
                setTags('');
              }}
              className="px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Requirements Info */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <h4 className="text-white font-medium mb-2">📋 Upload Requirements</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>File size limit: 5MB</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Supported formats: JPG, PNG, GIF, WEBP, SVG</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Title is required for all uploads</span>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ImageUpload;