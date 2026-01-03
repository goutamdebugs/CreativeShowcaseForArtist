const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
        if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

        const user = await User.create({ username, email: email.toLowerCase(), password });
        res.status(201).json({
            success: true,
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

// @desc    Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};

// @desc    Get user profile (Self)
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
};

// @desc    Get user by username (Public Profile)
exports.getUserByUsername = async (req, res) => {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
};

// @desc    Get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json({ success: true, users });
};

// @desc    Update profile
exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.bio = req.body.bio || user.bio;
        if (req.body.password) user.password = req.body.password;
        const updatedUser = await user.save();
        res.json({ success: true, username: updatedUser.username, token: generateToken(updatedUser._id) });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Search users
exports.searchUsers = async (req, res) => {
    const query = req.query.q;
    const users = await User.find({ username: { $regex: query, $options: 'i' } }).select('-password');
    res.json({ success: true, users });
};