// src/api/business/productService.test.ts
import { describe, it, expect } from 'vitest';
import { fetchAndFilterApprovedProducts } from './productService';
import { Product } from '../strapi/types';
const TOKEN = import.meta.env.VITE_TOKEN_TEST ;

describe('fetchAndFilterApprovedProducts', () => {
    const shopId = 1;  // Replace with the ID of the shop you want to fetch products for

    it('should fetch and return only approved products', async () => {
        const products: Product[] = await fetchAndFilterApprovedProducts(TOKEN, shopId);

        // Check that all returned products are approved
        expect(products.length).toBeGreaterThan(0);
        products.forEach(product => {
            expect(product.approved).toBe(true);
        });

        console.log('Approved products:', products);
    });

    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';

        await expect(fetchAndFilterApprovedProducts(invalidToken, shopId)).rejects.toThrow();
    });
});
