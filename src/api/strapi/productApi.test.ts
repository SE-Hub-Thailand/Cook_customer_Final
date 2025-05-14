// src/api/strapi/productApi.test.ts
import { describe, it, expect } from 'vitest';
import { getAllProductsByShopId } from './productApi';
import { Product } from './types';
const TOKEN = import.meta.env.VITE_TOKEN_TEST ;

describe('getAllProductsByShopId', () => {
    const shopId = 1;  // Replace with the ID of the shop you want to fetch products for

    it('should successfully fetch products for the given shop ID', async () => {
        const products: Product[] = await getAllProductsByShopId(TOKEN, shopId);

        // Basic structure checks
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);

        // Check if the first product has the expected structure
        const product = products[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('approved');
        expect(product).toHaveProperty('createdAt');
        expect(product).toHaveProperty('updatedAt');
        expect(product).toHaveProperty('publishedAt');
        expect(product).toHaveProperty('shop');
        expect(product.shop).toHaveProperty('id');
        expect(product.shop).toHaveProperty('name');
        expect(product.shop).toHaveProperty('location');
        expect(product.shop).toHaveProperty('latitude');
        expect(product.shop).toHaveProperty('longitude');

        console.log('Products fetched successfully:', products);
    });

    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';

        await expect(getAllProductsByShopId(invalidToken, shopId)).rejects.toThrow();
    });
});
