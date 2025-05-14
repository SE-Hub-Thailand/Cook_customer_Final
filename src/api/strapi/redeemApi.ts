import { Token } from './../../../node_modules/acorn/dist/acorn.d';
import { Redeem } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set
const token = localStorage.getItem('token');
// export const createRedeem  = async (redeemData: Record<string, any>): Promise<Redeem> => {
export const createRedeem = async (redeemData: Redeem, token: string): Promise<Redeem> => {
    try {
        console.log('redeemData in createRedeem: ', redeemData);
        const url = `${API_URL}/api/redeems`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,  // Include the JWT token in the Authorization header
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(redeemData),
        });

        console.log('body: ', JSON.stringify(redeemData));
		console.log('response in redeemApi: ', response);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            // alert('Error: ' + errorData.error.message);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export const getAllRedeems = async (id: string, token: string): Promise<Redeem[]> => {
    try {
        // URL now includes id filter
        const url = `${API_URL}/api/redeems?filters[customer][id][$eq]=${id}&populate=user&populate=shop&populate=shop.image`;
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
        const redeems: Redeem[] = data.data
            // .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
            .map((item: any) => ({
                id: item.id,
                customer: {
                    id: item.attributes.customer?.data?.id || '',
                    username: item.attributes.customer?.data?.attributes?.username || '',
                    email: item.attributes.customer?.data?.attributes?.email || '',
                    fullName: item.attributes.customer?.data?.attributes?.fullName || '',
                    lineId: item.attributes.customer?.data?.attributes?.lineId || '',
                    userType: item.attributes.customer?.data?.attributes?.userType || '',
					point: item.attributes.customer?.data?.attributes?.point || 0,
                },
                totalPoints: item.attributes.totalPoints,
				status: item.attributes.status,
				qrCode: item.attributes.qrCode,
				productJsonArray: item.attributes.productJsonArray,
				shop: {
					id: item.attributes.shop?.data?.id || '',
                    name: item.attributes.shop?.data?.attributes?.name || '',
                    image: item.attributes.shop?.data?.attributes?.image || '',
				},
				date: item.attributes.date,
				time: item.attributes.time,
            }));
            console.log("heloooo"); // Log to inspect the structure of the response
            console.log('length: ', redeems.length); // Log to inspect the structure of the response
            console.log('redeem in gettt: ', redeems[0]); // Log to inspect the structure of the response
            console.log('redeem in gettt[0]: ', redeems);
            return redeems;
    } catch (error) {
        console.error('Error fetching recycle machines:', error.message);
        throw error;
    }
};

export const getRedeemsByQrCode = async (qrCode: string): Promise<Redeem[]> => {
    try {
        // URL now includes id filter
        console.log("heloooo");
        const url = `${API_URL}/api/redeems?filters[qrCode][$eq]=${qrCode}&populate[customer]=true&populate[shop]=true`;
        console.log("heloooo2");

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,  // Use token for authentication
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching history point:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }
        // console.log("response.json(): ", response.json());
        // console.log("response.json(): ", JSON.parse(response.json()));

        const data = await response.json();
        // console.log("data: ", data);
        // console.log("data: ", data[0]);
        // Map the response data to an array of HistoryMachine objects
        const redeems: Redeem[] = data.data
            // .filter((item: any) => item.attributes.status === 'active') // Filter by status "active"
            .map((item: any) => ({
                id: item.id,
                customer: {
                    id: item.attributes.customer?.data?.id || '',
                    username: item.attributes.customer?.data?.attributes?.username || '',
                    email: item.attributes.customer?.data?.attributes?.email || '',
                    fullName: item.attributes.customer?.data?.attributes?.fullName || '',
                    lineId: item.attributes.customer?.data?.attributes?.lineId || '',
                    userType: item.attributes.customer?.data?.attributes?.userType || '',
					point: item.attributes.customer?.data?.attributes?.point || 0,
                },
                totalPoints: item.attributes.totalPoints,
				status: item.attributes.status,
				qrCode: item.attributes.qrCode,
				productJsonArray: item.attributes.productJsonArray,
				shop: {
					id: item.attributes.shop?.data?.id || '',
                    name: item.attributes.shop?.data?.attributes?.name || '',
                    image: item.attributes.shop?.data?.attributes?.image || '',
				},
				date: item.attributes.date,
				time: item.attributes.time,
            }));
            console.log("heloooo"); // Log to inspect the structure of the response
            console.log('length: ', redeems.length); // Log to inspect the structure of the response
            console.log('redeem in gettt: ', redeems[0]); // Log to inspect the structure of the response
            console.log('redeem in gettt[0]: ', redeems);
            return redeems;
    } catch (error) {
        console.error('Error fetching redeem:', error.message);
        throw error;
    }
};

