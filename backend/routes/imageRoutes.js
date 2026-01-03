const express = require('express');
const router = express.Router();
const { 
    uploadImage, 
    getAllImages, 
    getUserImages, 
    getImagesByUsername,
    getImage,      // ✅ নতুন যোগ করা হয়েছে
    deleteImage,
    likeImage      // ✅ নতুন যোগ করা হয়েছে
} = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// ইমেজ আপলোড (টোকেন লাগবে)
router.post('/upload', protect, upload.single('image'), uploadImage);

// সব ইমেজ দেখা (পাবলিক)
router.get('/', getAllImages);

// নির্দিষ্ট একটি ইমেজের ডিটেইলস দেখা (পাবলিক)
router.get('/:id', getImage); // ✅ নতুন রুট

// ইউজারের আইডি বা ইউজারনেম দিয়ে ইমেজ দেখা (পাবলিক)
router.get('/user/:userId', getUserImages);
router.get('/username/:username', getImagesByUsername);

// ইমেজ ডিলিট করা (টোকেন লাগবে)
router.delete('/:id', protect, deleteImage);

// ইমেজে লাইক দেওয়া (টোকেন লাগবে)
router.post('/:id/like', protect, likeImage); // ✅ নতুন রুট

module.exports = router;