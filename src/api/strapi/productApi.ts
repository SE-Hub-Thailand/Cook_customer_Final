// src/api/strapi/productApi.ts
import { Product } from './types';
import { logInfo, logError } from '../../utils/logger';

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

export interface ProductStock {
  id: number;
  name: string;
  points: number;
  available: number;
  total: number;
  image?: string;
}

// Fetch products with stock information for a specific shop
export const getProductsWithStock = async (shopId: string, token: string): Promise<ProductStock[]> => {
  try {
    logInfo('Fetching products with stock for shop', { shopId });
    
    const url = `${API_URL}/api/products?filters[shop][id][$eq]=${shopId}&populate=*`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      logError('Failed to fetch product stock', { 
        status: response.status, 
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Process the response to extract product with stock information
    const products = data.data.map(product => ({
      id: product.id,
      name: product.attributes.name,
      points: product.attributes.points,
      available: product.attributes.stock_available || 0,
      total: product.attributes.stock_total || 0,
      image: product.attributes.image?.data?.attributes?.url || null
    }));

    logInfo('Successfully fetched products with stock', { 
      shopId, 
      productCount: products.length 
    });
    
    return products;
  } catch (error) {
    logError('Error fetching products with stock', {
      message: error.message,
      shopId
    });
    throw error;
  }
};

// Fetch a single product's stock information
export const getProductStock = async (productId: string, token: string): Promise<ProductStock> => {
  try {
    logInfo('Fetching stock for single product', { productId });
    
    const url = `${API_URL}/api/products/${productId}?populate=*`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      logError('Failed to fetch single product stock', { 
        status: response.status, 
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Process the response to extract product with stock information
    const product = {
      id: data.data.id,
      name: data.data.attributes.name,
      points: data.data.attributes.points,
      available: data.data.attributes.stock_available || 0,
      total: data.data.attributes.stock_total || 0,
      image: data.data.attributes.image?.data?.attributes?.url || null
    };

    logInfo('Successfully fetched single product stock', { productId });
    
    return product;
  } catch (error) {
    logError('Error fetching single product stock', {
      message: error.message,
      productId
    });
    throw error;
  }
};
