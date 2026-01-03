const Image = require('../models/Image');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

// @desc    Upload image
// @route   POST /api/images/upload
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'creative-showcase',
            use_filename: true,
            unique_filename: false
        });

        const image = await Image.create({
            title: req.body.title || 'Untitled',
            description: req.body.description || '',
            imageUrl: result.secure_url,
            publicId: result.public_id,
            user: req.user._id,
            username: req.user.username,
            tags: req.body.tags ? req.body.tags.split(',') : []
        });

        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image upload failed' });
    }
};

// @desc    Get all images
// @route   GET /api/images
const getAllImages = async (req, res) => {
    try {
        const images = await Image.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .populate('user', 'username profileImage');
        
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single image details
// @route   GET /api/images/:id
const getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id).populate('user', 'username profileImage');
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's images
const getUserImages = async (req, res) => {
    try {
        const images = await Image.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get images by username
const getImagesByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const images = await Image.find({ user: user._id }).sort({ createdAt: -1 });
        res.json({
            user: {
                _id: user._id,
                username: user.username,
                profileImage: user.profileImage,
                bio: user.bio
            },
            images
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like/Unlike image
// @route   POST /api/images/:id/like
const likeImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        // Toggle Like (যদি আগে লাইক দেওয়া থাকে তবে রিমুভ হবে, না থাকলে অ্যাড হবে)
        if (image.likes.includes(req.user._id)) {
            image.likes = image.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            image.likes.push(req.user._id);
        }

        await image.save();
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete image
const deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        if (image.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await cloudinary.uploader.destroy(image.publicId);
        await Image.findByIdAndDelete(req.params.id); // Optimized delete

        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage,
    getAllImages,
    getImage,           // ✅ নতুন যোগ করা হয়েছে
    getUserImages,
    getImagesByUsername,
    likeImage,          // ✅ নতুন যোগ করা হয়েছে
    deleteImage
};