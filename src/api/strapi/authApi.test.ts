// src/api/strapi/authApi.test.ts
import { describe, it, expect, vi , beforeEach, afterEach} from 'vitest';
import axios from 'axios';
import { authenticateUser } from './authApi';

// Mock axios
// vi.mock('axios');

// describe('authenticateUser', () => {
//   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

//   // Reset mocks before each test
//   beforeEach(() => {
//     vi.clearAllMocks(); // or vi.resetAllMocks();
//     vi.resetAllMocks()
//   });

//   it('should successfully authenticate a user', async () => {
//     const mockResponse = {
//       data: {
//         jwt: 'fake-jwt-token',
//         user: {
//           id: 1,
//           username: 'testuser',
//           email: 'testuser@example.com',
//         },
//       },
//     };

//     // Mock axios POST request
//     (axios.post as jest.Mock).mockResolvedValue(mockResponse);

//     const data = await authenticateUser('testuser@example.com', 'password');

//     expect(data).toEqual(mockResponse.data);
//     expect(data.jwt).toBe('fake-jwt-token');
//     expect(data.user.username).toBe('testuser');
//   });
  

// });

describe('authenticateUser Real API', () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
    // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks(); // or vi.resetAllMocks();
    vi.resetAllMocks()
  });
    it('should successfully authenticate a user', async () => {
      const identifier = 'hideoaki@gmail.com';  // Replace with real credentials
      const password = 'ooaakk';               // Replace with real credentials
  
      try {
        const data = await authenticateUser(identifier, password);
        console.log("data");
        console.log(data);
        // Check if the authentication was successful
        expect(data).toHaveProperty('jwt');
        expect(data).toHaveProperty('user');
        expect(data.user.email).toBe(identifier);
        console.log('Authentication successful:', data);
      } catch (error) {
        console.error('Authentication failed:', error.message);
        throw error;  // Re-throw the error to fail the test if authentication fails
      }
    });
  
    it('should fail to authenticate with wrong credentials', async () => {
      const identifier = 'wronguser@example.com';
      const password = 'wrongpassword';
  
      await expect(authenticateUser(identifier, password)).rejects.toThrow();
    });
  });