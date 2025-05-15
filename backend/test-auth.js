const axios = require('axios');

// Base URL for the API
const API_URL = 'http://localhost:5000';

// Test login endpoint
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: 'testuser',
      password: 'password123'
    }, {
      withCredentials: true
    });
    
    console.log('Login successful:', response.data);
    return response.headers['set-cookie'];
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test get current user endpoint
async function testGetMe(cookies) {
  try {
    console.log('Testing get current user endpoint...');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
    
    console.log('Get current user successful:', response.data);
  } catch (error) {
    console.error('Get current user failed:', error.response ? error.response.data : error.message);
  }
}

// Test logout endpoint
async function testLogout(cookies) {
  try {
    console.log('Testing logout endpoint...');
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
    
    console.log('Logout successful:', response.data);
  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data : error.message);
  }
}

// Run all tests
async function runTests() {
  // Test login
  const cookies = await testLogin();
  
  if (cookies) {
    // Test get current user
    await testGetMe(cookies);
    
    // Test logout
    await testLogout(cookies);
    
    // Verify logout by trying to get current user again
    console.log('\nVerifying logout by trying to get current user again...');
    await testGetMe(cookies);
  }
}

// Run the tests
runTests().catch(console.error);
