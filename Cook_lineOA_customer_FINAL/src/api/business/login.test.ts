// src/api/business/login.test.ts
import { describe, it, expect } from 'vitest';
import { loginWithLineId } from './login';

describe('loginWithLineId', () => {
    it('should return user data when authentication is successful', async () => {
        const lineId = '1234';  // Replace with a valid LINE ID for testing
        const result = await loginWithLineId(lineId);

        expect(result).toHaveProperty('jwt');
        expect(result).toHaveProperty('user');
        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username');
        expect(result.user.username).equal('cook1234');
        expect(result.user.email).equal('cook1234@cook.com');
        console.log('Login successful:', result);
    });

    it('should return false when authentication fails', async () => {
        const lineId = 'invalid-line-id';  // Replace with an invalid LINE ID for testing
        const result = await loginWithLineId(lineId);

        expect(result).toBe(false);
        console.log('Login failed as expected with invalid LINE ID.');
    });
});
