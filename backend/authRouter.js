const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const router = express.Router();

// JWT Secret key - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({ msg: "No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user info to request
        next();
    } catch (error) {
        return res.status(401).send({ msg: "Invalid token", error: error.message });
    }
};

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
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set cookie with the JWT token
        res.cookie('token', token, {
            httpOnly: true, // For security, don't allow JavaScript access
            maxAge: 3600000, // 1 hour
            sameSite: 'lax', // Less restrictive SameSite policy
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
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        });

        res.status(200).send({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).send({ msg: "Logout failed", error: error.message });
    }
});

// Get current user - using the verifyToken middleware
router.get('/me', verifyToken, (req, res) => {
    try {
        // User info is already verified and available in req.user from the middleware
        res.status(200).send({
            msg: "User retrieved successfully",
            user: {
                userId: req.user.userId,
                username: req.user.username
            }
        });
    } catch (error) {
        console.error('Error in /me endpoint:', error);
        res.status(500).send({ msg: "Failed to get user", error: error.message });
    }
});

// Add a simple login form for browser testing
router.get('/login-form', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>JWT Authentication</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; }
                input { width: 100%; padding: 8px; box-sizing: border-box; }
                button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
                .actions { margin-top: 20px; }
                .actions button { margin-right: 10px; }
                #status { margin-top: 20px; padding: 10px; border-radius: 4px; white-space: pre-wrap; }
                .success { background-color: #dff0d8; color: #3c763d; }
                .error { background-color: #f2dede; color: #a94442; }
                h1 { color: #333; }
                .info { margin-top: 20px; padding: 10px; background-color: #d9edf7; color: #31708f; border-radius: 4px; }
            </style>
        </head>
        <body>
            <h1>JWT Authentication Demo</h1>
            <div class="info">
                This form demonstrates JWT token-based authentication. The token is stored in an HTTP-only cookie.
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="testuser">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="password123">
            </div>
            <div class="actions">
                <button onclick="login()">Login</button>
                <button onclick="logout()">Logout</button>
                <button onclick="checkAuth()">Check Auth</button>
            </div>
            <div id="status"></div>

            <script>
                async function login() {
                    try {
                        const response = await fetch('/auth/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: document.getElementById('username').value,
                                password: document.getElementById('password').value
                            }),
                            credentials: 'include' // Important for cookies
                        });

                        const data = await response.json();
                        const statusDiv = document.getElementById('status');
                        statusDiv.textContent = JSON.stringify(data, null, 2);
                        statusDiv.className = response.ok ? 'success' : 'error';
                    } catch (error) {
                        document.getElementById('status').textContent = 'Error: ' + error.message;
                        document.getElementById('status').className = 'error';
                    }
                }

                async function logout() {
                    try {
                        const response = await fetch('/auth/logout', {
                            method: 'POST',
                            credentials: 'include' // Important for cookies
                        });

                        const data = await response.json();
                        const statusDiv = document.getElementById('status');
                        statusDiv.textContent = JSON.stringify(data, null, 2);
                        statusDiv.className = response.ok ? 'success' : 'error';
                    } catch (error) {
                        document.getElementById('status').textContent = 'Error: ' + error.message;
                        document.getElementById('status').className = 'error';
                    }
                }

                async function checkAuth() {
                    try {
                        const response = await fetch('/auth/me', {
                            credentials: 'include' // Important for cookies
                        });

                        const data = await response.json();
                        const statusDiv = document.getElementById('status');
                        statusDiv.textContent = JSON.stringify(data, null, 2);
                        statusDiv.className = response.ok ? 'success' : 'error';
                    } catch (error) {
                        document.getElementById('status').textContent = 'Error: ' + error.message;
                        document.getElementById('status').className = 'error';
                    }
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = router;
