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
            httpOnly: false, // Allow JavaScript access for testing
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
        // Clear the cookie
        res.clearCookie('username', {
            httpOnly: false,
            sameSite: 'lax',
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
        console.log('Cookies received:', req.cookies); // Debug log
        const username = req.cookies.username;

        if (!username) {
            return res.status(401).send({ msg: "Not authenticated" });
        }

        res.status(200).send({
            msg: "User retrieved successfully",
            user: { username }
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
            <title>Login</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; }
                input { width: 100%; padding: 8px; box-sizing: border-box; }
                button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
                .actions { margin-top: 20px; }
                .actions button { margin-right: 10px; }
                #status { margin-top: 20px; padding: 10px; border-radius: 4px; }
                .success { background-color: #dff0d8; color: #3c763d; }
                .error { background-color: #f2dede; color: #a94442; }
            </style>
        </head>
        <body>
            <h1>Login</h1>
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
                            credentials: 'include'
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
                            credentials: 'include'
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
                            credentials: 'include'
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
