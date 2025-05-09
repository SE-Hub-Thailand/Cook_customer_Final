// src/api/strapi/shopApi.test.ts
import { describe, it, expect } from 'vitest';
import { getAllShops,createShop, updateShop   } from './shopApi';
import { uploadImage } from '../strapi/uploadApi';
import { Shop } from './types';
import fs from 'fs';
import path from 'path';
const TOKEN = import.meta.env.VITE_TOKEN_TEST ;

describe('getAllShops', () => {

    it('should successfully fetch all shops and return an array of Shop objects', async () => {
        const shops: Shop[] = await getAllShops(TOKEN);

        // Basic structure checks
        expect(Array.isArray(shops)).toBe(true);
        expect(shops.length).toBeGreaterThan(0);

        // Check if the first shop has the expected structure
        const shop = shops[0];
        expect(shop).toHaveProperty('id');
        expect(shop).toHaveProperty('name');
        expect(shop).toHaveProperty('location');
        expect(shop).toHaveProperty('latitude');
        expect(shop).toHaveProperty('longitude');
        expect(shop).toHaveProperty('createdAt');
        expect(shop).toHaveProperty('updatedAt');
        expect(shop).toHaveProperty('publishedAt');
        expect(shop).toHaveProperty('bookBankNumber');

        console.log('Shops fetched successfully:', shops);
    });

    it('should throw an error if token is invalid', async () => {
        const invalidToken = 'invalid-token';

        await expect(getAllShops(invalidToken)).rejects.toThrow();
    });
});

function generateRandomString(length: number = 5): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Example usage:
const randomString = generateRandomString();


describe('createShop', () => {

    it('should successfully create a new shop with images and bank id', async () => {
        // Prepare shop image
        const shopImagePath =  path.resolve(__dirname, 'test-image.png'); // Replace with your actual image path
        const shopImageBuffer = fs.readFileSync(shopImagePath);
        const shopImageFile = new File([shopImageBuffer], 'test-image.png', { type: 'image/png' });

        // Upload shop image
        const shopImageResponse = await uploadImage(shopImageFile);
        const shopImageId = shopImageResponse[0].id;

        // Prepare book bank image
        const bookBankImagePath = path.resolve(__dirname, 'test-image.png');// Replace with your actual image path
        const bookBankImageBuffer = fs.readFileSync(bookBankImagePath);
        const bookBankImageFile = new File([bookBankImageBuffer], 'test-image.png', { type: 'image/png' });

        // Upload book bank image
        const bookBankImageResponse = await uploadImage(bookBankImageFile);
        const bookBankImageId = bookBankImageResponse[0].id;

        const shopData = {
            name: "ร้านผักคุsssณนายsวิมล22" + generateRandomString(),
            location: "Chaeng Watthana Rd, Tambon Pak Kret, Amphoe Pak Kret, Nonthaburi 11120",
            latitude: 13.90661863070067,
            longitude: 100.52568870594502,
            bookBankNumber: "121121221",
            image: shopImageId,
            bookBankImage: bookBankImageId,
            bankName: "Kbank",  // Assume bank ID 1 exists in your database
            user: 1
        };
        const response = await createShop(TOKEN, shopData);
        console.log("response");
        console.log(response);
        // Check the response structure
        expect(response).toHaveProperty('data');
        expect(response.data).toHaveProperty('id');
        expect(response.data.attributes).toHaveProperty('name', shopData.name);
        expect(response.data.attributes).toHaveProperty('location', shopData.location);
        expect(response.data.attributes).toHaveProperty('latitude', shopData.latitude);
        expect(response.data.attributes).toHaveProperty('longitude', shopData.longitude);
        expect(response.data.attributes).toHaveProperty('bookBankNumber', shopData.bookBankNumber);
        // expect(response.data.attributes).toHaveProperty('image', shopData.image);
        // expect(response.data.attributes).toHaveProperty('bookBankImage', shopData.bookBankImage);
        // expect(response.data.attributes.bank).toHaveProperty('id', shopData.bank);

        console.log('Shop created successfully:', response);
    }, 30000);
    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';
        const shopData = {
            name: "ร้านผักคุsssณนายsวิมล22",
            location: "Chaeng Watthana Rd, Tambon Pak Kret, Amphoe Pak Kret, Nonthaburi 11120",
            latitude: 13.90661863070067,
            longitude: 100.52568870594502,
            bookBankNumber: "121121221",
        };

        await expect(createShop(invalidToken, shopData)).rejects.toThrow();
    });
});

describe('updateShop', () => {
    it('should successfully update an existing shop with images and bank name', async () => {
        const shopId = 1;  // Replace with the ID of the shop you want to update

        // Prepare updated shop image
        const shopImagePath = path.resolve(__dirname, 'test-image.png'); // Replace with your actual image path
        const shopImageBuffer = fs.readFileSync(shopImagePath);
        const shopImageFile = new File([shopImageBuffer], 'test-image.png', { type: 'image/png' });

        // Upload updated shop image
        const shopImageResponse = await uploadImage(shopImageFile);
        const shopImageId = shopImageResponse[0].id;

        // Prepare updated book bank image
        const bookBankImagePath = path.resolve(__dirname, 'test-image.png'); // Replace with your actual image path
        const bookBankImageBuffer = fs.readFileSync(bookBankImagePath);
        const bookBankImageFile = new File([bookBankImageBuffer], 'test-image.png', { type: 'image/png' });

        // Upload updated book bank image
        const bookBankImageResponse = await uploadImage(bookBankImageFile);
        const bookBankImageId = bookBankImageResponse[0].id;

        const shopData = {
            name: "ร้านผักคุsssณนายsวิมล22" + generateRandomString(),
            location: "Updated Location, Nonthaburi 11120",
            latitude: 13.90661863070067,
            longitude: 100.52568870594502,
            bookBankNumber: "123456789",
            image: shopImageId,
            bookBankImage: bookBankImageId,
            bankName: "UpdatedBank",  // Assume bank ID 2 exists in your database
        };

        const response = await updateShop(TOKEN, shopId, shopData);
        console.log("response");
        console.log(response);

        // Check the response structure
        expect(response).toHaveProperty('data');
        expect(response.data).toHaveProperty('id');
        expect(response.data.attributes).toHaveProperty('name', shopData.name);
        expect(response.data.attributes).toHaveProperty('location', shopData.location);
        expect(response.data.attributes).toHaveProperty('latitude', shopData.latitude);
        expect(response.data.attributes).toHaveProperty('longitude', shopData.longitude);
        expect(response.data.attributes).toHaveProperty('bookBankNumber', shopData.bookBankNumber);
        // expect(response.data.attributes).toHaveProperty('image', shopImageId);
        // expect(response.data.attributes).toHaveProperty('bookBankImage', bookBankImageId);
        expect(response.data.attributes).toHaveProperty('bankName', "UpdatedBank");

        console.log('Shop updated successfully:', response);
    }, 30000);

    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';
        const shopId = 1;  // Replace with the ID of the shop you want to update

        const shopData = {
            name: "ร้านผักคุsssณนายsวิมล22",
            location: "Updated Location, Nonthaburi 11120",
            latitude: 13.90661863070067,
            longitude: 100.52568870594502,
            bookBankNumber: "123456789",
            image: 1,  // Assume this is the ID of a previously uploaded image
            bookBankImage: 2,  // Assume this is the ID of a previously uploaded image
            bankName: "UpdatedBank",  // Bank name
        };

        await expect(updateShop(invalidToken, shopId, shopData)).rejects.toThrow();
    });
});