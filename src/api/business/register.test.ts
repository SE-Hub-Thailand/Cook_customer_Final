// src/api/business/register.test.ts
import { describe, it, expect } from 'vitest';
import { registerUserWithImage } from './register';
import path from 'path';
import fs from 'fs';

function generateRandomString(length: number = 5): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


describe('registerUserWithImage', () => {
    it('should successfully upload an image and register a user', async () => {
        // Test data
        const randomString = generateRandomString();
        const username = randomString;
        const lineId = randomString;
        const fullName = 'Test Usesr';
        const telNumber = '1234567890';
        const gender = 'Male';
        const address = '123 Test St, Test City, TC';
        const cardID = '1234567890123';

        // Load a real image file from the file system for testing
        const photoImagePath = path.resolve(__dirname, 'test-image.png'); // Ensure this file exists for testing
        // const imageBuffer = fs.readFileSync(photoImagePath);

        // // Convert image buffer to a File object
        // const file = new File([imageBuffer], 'test-image.png', { type: 'image/png' });

        // Run the registration function
        const result = await registerUserWithImage(
            username,
            lineId,
            fullName,
            telNumber,
            gender,
            address,
            cardID,
            photoImagePath
        );

        // Assertions
        expect(result).toHaveProperty('jwt');
        expect(result).toHaveProperty('user');
        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username', username);
        expect(result.user).toHaveProperty('lineId', lineId);
        console.log('User registered successfully:', result);
    }, 30000);

    // it('should fail to register user if the image upload fails', async () => {
    //     // Test data with an invalid image path
    //     const username = 'testuser';
    //     const lineId = 'testlineid';
    //     const fullName = 'Test User';
    //     const telNumber = '1234567890';
    //     const gender = 'Male';
    //     const address = '123 Test St, Test City, TC';
    //     const cardID = '1234567890123';
    //     const invalidPhotoImagePath = 'invalid-path/to-image.jpg';

    //     // Attempt to register the user
    //     await expect(
    //         registerUserWithImage(
    //             username,
    //             lineId,
    //             fullName,
    //             telNumber,
    //             gender,
    //             address,
    //             cardID,
    //             invalidPhotoImagePath
    //         )
    //     ).rejects.toThrow('Registration failed');
    // });
});
