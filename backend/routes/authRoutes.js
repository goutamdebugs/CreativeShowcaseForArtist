const express = require('express');
const router = express.Router();
const { 
    registerUser, loginUser, getUserProfile, getAllUsers, 
    updateUserProfile, getUserByUsername, searchUsers 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers); 
router.get('/search', searchUsers);
router.get('/username/:username', getUserByUsername);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;