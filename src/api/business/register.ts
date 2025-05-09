// src/api/business/register.ts

import { uploadImage } from '../strapi/uploadApi';
import { registerUser } from '../strapi/authApi';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';  // Import the mime-types library

export const registerUserWithImage = async (
    username: string,
    lineId: string,
    fullName: string,
    telNumber: string,
    gender: string,
    address: string,
    cardID: string,
    photoImage: string,
    photoCardId: string,
    // username: string,
    // email: string,
    // password: string,
    // provider: string,
    // confirmed: boolean,
    // blocked: boolean,
    // lineId: string,
    // // backgroundImage: null,
    // fullName: string,
    // gender: string,
    // address: string,
    // cardID: string,
    // telNumber: string,
    // // photoImage: photoImageId,
    // photoImage: string,
    // photoCardId: string,
    // userType: string,
) => {
    try {
        // Get the absolute path of the image
        // const imagePath = path.resolve(__dirname, photoImagePath);  // Replace with your actual image path
        if (photoImage) {
            const imagePath = `/assets/images/${photoImage}`;
            console.log('imagePath: ', imagePath);
            // Read the image buffer
            // const imageBuffer = fs.readFileSync(imagePath);

            // // Determine the MIME type of the image
            // const mimeType = mime.lookup(imagePath) || 'application/octet-stream';

            // // Create a Blob and File object from the image buffer
            // const fileContent = new Blob([imageBuffer], { type: mimeType });
            // const imageFile = new File([fileContent], path.basename(photoImagePath), { type: mimeType });

            // // Upload the image
            // const uploadResponse = await uploadImage(imageFile);

            // // Extract the id from the upload response
            // const photoImageId = uploadResponse[0].id;
        }

        // Prepare the user data
        const userData = {
            username: username,
            email: `cook${lineId}@cook.com`,
            password: 'cookcook',
            provider: 'local',
            confirmed: true,
            blocked: false,
            lineId: lineId,
            // backgroundImage: null,
            fullName: fullName,
            gender: gender,
            address: address,
            cardID: cardID,
            telNumber: telNumber,
            // photoImage: photoImageId,
            photoImage: '',
            photoCardId: '',
            userType: 'customer',
        };

        console.log('userData', userData);

        // Register the user
        const registerResponse = await registerUser(userData);
        console.log('registerResponse', registerResponse);
        return registerResponse;
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw error;
    }
};
