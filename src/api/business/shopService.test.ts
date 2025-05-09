// src/api/business/shopService.test.ts
import { describe, it, expect } from 'vitest';
import { fetchAndProcessShops, createNewShop } from './shopService';
import { Shop } from '../strapi/types';
import { uploadImage } from '../strapi/uploadApi';
import { generateRandomString } from '../utils/random';
import fs from 'fs';
import path from 'path';

const TOKEN = import.meta.env.VITE_TOKEN_TEST ;



describe('fetchAndProcessShops', () => {

    it('should fetch and process shops successfully', async () => {
        const processedShops = await fetchAndProcessShops(TOKEN);

        // Check that the result is an array
        expect(Array.isArray(processedShops)).toBe(true);
        expect(processedShops.length).toBeGreaterThan(0);

        // Check if the first shop has the expected structure
        const shop = processedShops[0];
        expect(shop).toHaveProperty('id');
        expect(shop).toHaveProperty('name');
        expect(shop).toHaveProperty('location');
        expect(shop).toHaveProperty('latitude');
        expect(shop).toHaveProperty('longitude');
        expect(shop).toHaveProperty('createdAt');
        expect(shop).toHaveProperty('updatedAt');
        expect(shop).toHaveProperty('publishedAt');
        expect(shop).toHaveProperty('bookBankNumber');

        console.log('Processed Shops:', processedShops);
    });

    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';

        await expect(fetchAndProcessShops(invalidToken)).rejects.toThrow();
    });
    it('should successfully create a new shop with images and bank name', async () => {
        // Prepare shop image
        const shopImagePath = path.resolve(__dirname, 'test-image.png'); // Replace with your actual image path
        const shopImageBuffer = fs.readFileSync(shopImagePath);
        const shopImageFile = new File([shopImageBuffer], 'shop-image.png', { type: 'image/png' });

        // Upload shop image
        const shopImageResponse = await uploadImage(shopImageFile);
        const shopImageId = shopImageResponse[0].id;

        // Prepare book bank image
        const bookBankImagePath = path.resolve(__dirname, 'test-image.png'); // Replace with your actual image path
        const bookBankImageBuffer = fs.readFileSync(bookBankImagePath);
        const bookBankImageFile = new File([bookBankImageBuffer], 'book-bank-image.png', { type: 'image/png' });

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
            bankName: "Kbank",  // Bank name
        };

        const createdShop = await createNewShop(TOKEN, shopData);

        // Check the response structure
        expect(createdShop).toHaveProperty('id');
        expect(createdShop).toHaveProperty('name', shopData.name);
        expect(createdShop).toHaveProperty('location', shopData.location);
        expect(createdShop).toHaveProperty('latitude', shopData.latitude);
        expect(createdShop).toHaveProperty('longitude', shopData.longitude);
        expect(createdShop).toHaveProperty('bookBankNumber', shopData.bookBankNumber);
        // expect(createdShop).toHaveProperty('image', shopImageId);
        // expect(createdShop).toHaveProperty('bookBankImage', bookBankImageId);
        expect(createdShop).toHaveProperty('bankName', "Kbank");

        console.log('Shop created successfully:', createdShop);
    }, 30000);

    it('should throw an error if the token is invalid when creating a shop', async () => {
        const invalidToken = 'invalid-token';
        const shop: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'> = {
            name: "ร้านผักคุsssณนายsวิมล22",
            location: "Chaeng Watthana Rd, Tambon Pak Kret, Amphoe Pak Kret, Nonthaburi 11120",
            latitude: 13.90661863070067,
            longitude: 100.52568870594502,
            bookBankNumber: "121121221",
        };

        await expect(createNewShop(invalidToken, shop)).rejects.toThrow();
    });
});
