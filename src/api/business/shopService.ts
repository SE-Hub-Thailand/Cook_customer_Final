// src/api/business/shopService.ts
import { getAllShops, createShop } from '../strapi/shopApi';
import { Shop } from '../strapi/types';

export const fetchAndProcessShops = async (token: string): Promise<Shop[]> => {
    try {
        // Call the getAllShops API
        const shops = await getAllShops(token);

        // Add any additional business logic here
        // For example, filter out shops without a location or process the shop data in some way
        // const processedShops = shops.filter(shop => shop.location !== '');

        // Return the processed list of shops
        return shops;
    } catch (error) {
        console.error('Failed to fetch and process shops:', error);
        throw error;
    }
};
export const createNewShop = async (
    token: string,
    shop: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>
): Promise<Shop> => {
    try {
        const shopData = {
            name: shop.name,
            location: shop.location,
            latitude: shop.latitude,
            longitude: shop.longitude,
            bookBankNumber: shop.bookBankNumber,
            image: shop.image,  // Image ID for the shop
            bookBankImage: shop.bookBankImage,  // Image ID for the book bank
            bankName: shop.bankName,  // Bank ID
        };

        const response = await createShop(token, shopData);

        // Process the shop data before returning
        const createdShop: Shop = {
            id: response.data.id,
            name: response.data.attributes.name,
            location: response.data.attributes.location,
            latitude: response.data.attributes.latitude,
            longitude: response.data.attributes.longitude,
            createdAt: response.data.attributes.createdAt,
            updatedAt: response.data.attributes.updatedAt,
            publishedAt: response.data.attributes.publishedAt,
            bookBankNumber: response.data.attributes.bookBankNumber,
            image: response.data.attributes.image,  // Image ID
            bookBankImage: response.data.attributes.bookBankImage,  // Image ID
            bankName: response.data.attributes.bankName,
        };

        return createdShop;
    } catch (error) {
        console.error('Failed to create new shop:', error);
        throw error;
    }
};
