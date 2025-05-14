import { HistoryMachine } from './types'; // Adjust the import path as necessary

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

export const getAllHistoryMachines = async (id: string, token: string): Promise<HistoryMachine[]> => {
    try {
        // URL now includes id filter
        const url = `${API_URL}/api/history-machine?filters[user][id][$eq]=${id}&populate[user]=true`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Use token for authentication
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching history machines:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Map the response data to an array of HistoryMachine objects
        const recycleMachines: HistoryMachine[] = data.data
            // .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
            .map((item: any) => ({
                id: item.id,
                type: item.attributes.type,
                date: item.attributes.date,
                time: item.attributes.time,
                serialNumber: item.attributes.serialNumber,
                point: item.attributes.point,
                quantity: item.attributes.quantity,
                user: {
                    id: item.attributes.user?.data?.id || '',
                    username: item.attributes.user?.data?.attributes?.username || '',
                    email: item.attributes.user?.data?.attributes?.email || '',
                    fullName: item.attributes.user?.data?.attributes?.fullName || '',
                    lineId: item.attributes.user?.data?.attributes?.lineId || '',
                    userType: item.attributes.user?.data?.attributes?.userType || '',
                },
            }));
        console.log('recycleMachines in getooo: ', recycleMachines); // Log to inspect the structure of the response
        return recycleMachines;
    } catch (error) {
        console.error('Error fetching recycle machines:', error.message);
        throw error;
    }
};
