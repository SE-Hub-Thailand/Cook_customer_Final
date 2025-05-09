// test.js
const axios = require('axios');

// Define the authenticateUser function
const authenticateUser = async (identifier, password) => {
    const API_URL = 'http://localhost:1337';  // Replace with your Strapi server URL
    try {
        const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Test the authenticateUser function
const runTest = async () => {
    const identifier = 'hideoaki@gmail.com';  // Replace with your test email
    const password = 'ooaakk';  // Replace with your test password

    try {
        const data = await authenticateUser(identifier, password);
        console.log('Authentication successful:', data);
    } catch (error) {
        console.error('Authentication failed:', error.message);
    }
};

// Run the test
runTest();
