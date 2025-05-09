// src/api/business/productService.ts
import { getAllProductsByShopId } from '../strapi/productApi';
import { Product } from '../strapi/types';

export const fetchAndFilterApprovedProducts = async (token: string, shopId: number): Promise<Product[]> => {
    try {
        // Fetch all products for the given shop
        const products = await getAllProductsByShopId(token, shopId);

        // Filter out only the approved products
        const approvedProducts = products.filter(product => product.approved);

        return approvedProducts;
    } catch (error) {
        console.error('Failed to fetch and filter products:', error);
        throw error;
    }
};
