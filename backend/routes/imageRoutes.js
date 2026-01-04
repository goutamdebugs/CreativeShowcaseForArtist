const express = require('express');
const router = express.Router();
const { 
    uploadImage, 
    getAllImages, 
    getUserImages, 
    getImagesByUsername,
    getImage,     
    deleteImage,
    likeImage   
} = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


router.post('/upload', protect, upload.single('image'), uploadImage);

router.get('/', getAllImages);


router.get('/:id', getImage); 

router.get('/user/:userId', getUserImages);
router.get('/username/:username', getImagesByUsername);

router.delete('/:id', protect, deleteImage);

router.post('/:id/like', protect, likeImage);

module.exports = router;
