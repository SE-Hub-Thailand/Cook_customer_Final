import { describe, it, expect } from 'vitest';
import { uploadImage } from './uploadApi';
import fs from 'fs';
import path from 'path';

describe('uploadImage', () => {
    it('should successfully upload an image', async () => {
        // Create a dummy File object for testing
        const imagePath = path.resolve(__dirname, 'test-image.png');  // Replace with your actual image path
        const imageBuffer = fs.readFileSync(imagePath);

        // Create a Blob and File object from the image buffer
        const fileContent = new Blob([imageBuffer], { type: 'image/png' });
        const file = new File([fileContent], 'test-image.png', { type: 'image/png' });
        console.log(imagePath);
        try {
            const data = await uploadImage(file);

            // Check if the upload was successful
            expect(data).toHaveLength(1);
            expect(data[0]).toHaveProperty('id');
            expect(data[0]).toHaveProperty('url');
            console.log('Image uploaded successfully:', data);
        } catch (error) {
            console.error('Image upload failed:', error.message);
            throw error;  // Fail the test if the upload fails
        }
    }, 30000);
});
