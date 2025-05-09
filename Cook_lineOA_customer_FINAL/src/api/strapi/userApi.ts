const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set
import { User } from './types';
export const updateUser = async (userId: string, userData: Record<string, any>, token: string) => {
    try {
        const url = `${API_URL}/api/users/${userId}`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'PUT',  // Use 'PATCH' if only partial updates are allowed by your API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export const getUser = async (userId: string, token: string): Promise<User> => {
    if (!userId || !token) {
        throw new Error('No userId or token provided. User must be authenticated.');
    }

    try {
        // Use query parameters to filter by lineId if necessary
        const url = `${API_URL}/api/users?populate[photoImage]=true&filters[lineId][$eq]=${userId}`;
        // const url = `${API_URL}/api/users`;


        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching user:', errorData);
            throw new Error(`Request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
        }
        const data = await response.json();
        console.log('data', data); // Log to inspect the structure of the response

        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid response format: Expected an array of user data.');
        }

        // // If data.data is an empty array
        console.log('data.data.length', data.length); // Log the data to check if it's an array
        console.log('data[0].attributes.username', data[0].username); // Log the first item in the array to check the structure
        if (data.length === 0) {
            throw new Error('No user found with the provided lineId.');
        }
        // Map over the data to create an array of User objects
        const user ={
            id: data[0].id,
            username: data[0].username,
            email: data[0].email,
            fullName: data[0].fullName,
            lineId: data[0].lineId,
            gender: data[0].gender,
            address: data[0].address,
            // cardID: data[0].cardID,
            telNumber: data[0].telNumber,
            userType: data[0].userType,
            point: data[0].point,
            photoImage: data[0].photoImage,
            // cardIdImage: data[0].cardIdImage,
        };

        // console.log('JSON.stringify(user): ', JSON.stringify(user)); // Log users to check if the mapping worked correctly
        return user;

    } catch (error: any) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
};

export const createUser = async (userData: Record<string, any>): Promise<User> => {
    try {
        console.log('userData in createUser: ', userData);
        const url = `${API_URL}/api/auth/local/register`;  // Adjust the endpoint as per your API structure

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                // Authorization: `Bearer ${token}`,  // Include the JWT token in the Authorization header
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        console.log('body: ', JSON.stringify(userData));
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: ' + errorData.error.message);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
