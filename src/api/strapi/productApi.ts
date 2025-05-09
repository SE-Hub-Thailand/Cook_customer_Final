// src/api/strapi/productApi.ts
import { Product } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

export const getAllProductsByShopId = async (token: string, shopId: number): Promise<Product[]> => {
    try {
        const url = `${API_URL}/api/products?populate[image]=true&populate[shop]=true&filters[shop][$eq]=${shopId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching products:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Map the response data to an array of Product objects
        const products: Product[] = data.data.map((item: any) => ({
            id: item.id,
            name: item.attributes.name,
            description: item.attributes.description,
            price: item.attributes.price,
            point: item.attributes.point,
            approved: item.attributes.approved,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            numStock: item.attributes.numStock,
            image: item.attributes.image,
            status: item.attributes.status,
            shop: {
                id: item.attributes.shop.data.id,
                name: item.attributes.shop.data.attributes.name,
                location: item.attributes.shop.data.attributes.location,
                latitude: item.attributes.shop.data.attributes.latitude,
                longitude: item.attributes.shop.data.attributes.longitude,
                createdAt: item.attributes.shop.data.attributes.createdAt,
                updatedAt: item.attributes.shop.data.attributes.updatedAt,
                publishedAt: item.attributes.shop.data.attributes.publishedAt,
            },
        }));

        return products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};
