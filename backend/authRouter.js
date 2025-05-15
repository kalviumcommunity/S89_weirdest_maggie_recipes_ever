const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send({ msg: "Username and password are required" });
        }
        
        // Find user by username
        let user = await User.findOne({ username });
        
        // If user doesn't exist, create a new one (for demo purposes)
        // In a real app, you would check password hash and return error if not matched
        if (!user) {
            user = new User({ username, password });
            await user.save();
        } else if (user.password !== password) {
            // Simple password check (not secure for production)
            return res.status(401).send({ msg: "Invalid credentials" });
        }
        
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );
        
        // Set cookie with the token
        res.cookie('username', username, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            sameSite: 'strict',
            path: '/'
        });
        
        res.status(200).send({ 
            msg: "Login successful", 
            user: { 
                id: user._id, 
                username: user.username 
            }
        });
    } catch (error) {
        res.status(500).send({ msg: "Login failed", error: error.message });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('username', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });
        
        res.status(200).send({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).send({ msg: "Logout failed", error: error.message });
    }
});

// Get current user
router.get('/me', (req, res) => {
    try {
        const username = req.cookies.username;
        
        if (!username) {
            return res.status(401).send({ msg: "Not authenticated" });
        }
        
        res.status(200).send({ 
            msg: "User retrieved successfully", 
            user: { username } 
        });
    } catch (error) {
        res.status(500).send({ msg: "Failed to get user", error: error.message });
    }
});

module.exports = router;
