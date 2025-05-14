import { HistoryPoint } from './types'; // Adjust the import path as necessary
import { AlertNoData } from '../../components/AlertNoData';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

export const getAllHistoryPoints = async (id: string, token: string): Promise<HistoryMachine[]> => {
    try {
        // URL now includes id filter
        const url = `${API_URL}/api/history-point?filters[user][id][$eq]=${id}&populate=user&populate=shop&populate=shop.image`;
        console.log("heloooo");
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Use token for authentication
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching history point:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Map the response data to an array of HistoryMachine objects
        const points: HistoryPoint[] = data.data
            // .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
            .map((item: any) => ({
                id: item.id,
                date: item.attributes.date,
                time: item.attributes.time,
                totalPoint: item.attributes.totalPoint,
                user: {
                    id: item.attributes.user?.data?.id || '',
                    username: item.attributes.user?.data?.attributes?.username || '',
                    email: item.attributes.user?.data?.attributes?.email || '',
                    fullName: item.attributes.user?.data?.attributes?.fullName || '',
                    lineId: item.attributes.user?.data?.attributes?.lineId || '',
                    userType: item.attributes.user?.data?.attributes?.userType || '',
					point: item.attributes.user?.data?.attributes?.point || 0,
                },
				shop: {
					id: item.attributes.shop?.data?.id || '',
                    name: item.attributes.shop?.data?.attributes?.name || '',
                    image: item.attributes.shop?.data?.attributes?.image || '',
				},
            }));
        console.log("heloooo"); // Log to inspect the structure of the response
        console.log('length: ', points.length); // Log to inspect the structure of the response
        console.log('recycleMachines in gettt: ', points[0]); // Log to inspect the structure of the response
        return points;
    } catch (error) {
        console.error('Error fetching recycle machines:', error.message);
        throw error;
    }
};
