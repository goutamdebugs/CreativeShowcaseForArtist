const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Untitled'
    },
    description: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);