const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    profileImage: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: '',
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ **Mongoose v7 FIX: Remove 'next' parameter**
userSchema.pre('save', async function() {
    // Only hash the password if it has been modified
    if (!this.isModified('password')) {
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;