import {OilMachine } from './types'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set


export const getAllOilMachines = async (): Promise<OilMachine[]> => {
    try {
        const url = `${API_URL}/api/oil-machines`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching oil machines:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Map the response data to an array of OilMachine objects
        const oilMachines: OilMachine[] = data.data  .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
        .map((item: any) => ({
            id: item.id,
            location: item.attributes.location,
            latitude: item.attributes.latitude,
            longitude: item.attributes.longitude,
            status: item.attributes.status,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
        }));

        return oilMachines;
    } catch (error) {
        console.error('Error fetching oil machines:', error.message);
        throw error;
    }
};