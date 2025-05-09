import { updateUser as apiUpdateUser } from '../strapi/userApi';

export const updateUser = async (
    userId: number,
    userData: {
        fullName: string;
        gender: string;
        address: string;
        cardID: string;
        telNumber: string;
        photoImage?: number;  // Optional photoImage
    },
    token: string
) => {
    try {
        // You can add any business logic here before calling the API

        const updatedUser = await apiUpdateUser(userId, userData, token);

        // You can add any business logic here after calling the API

        return updatedUser;
    } catch (error) {
        console.error('Business logic error while updating user:', error.message);
        throw error;
    }
};


// In ../strapi/userApi.ts

// const API_URL = import.meta.env.VITE_API_URL

// import { updateUser as apiUpdateUser } from '../strapi/userApi';

// interface UserData {
//   fullName: string;
//   gender: string;
//   address: string;
//   cardID: string;
//   telNumber: string;
//   photoImage?: number;  // Optional photoImage
// }

// export const updateUser = async (
//   userId: number,
//   userData: UserData,
//   token: string
// ): Promise<any> => {
//   try {
//     // Validate userData before sending to API
//     if (!userData.fullName || !userData.gender || !userData.address || !userData.cardID || !userData.telNumber) {
//       throw new Error("All required fields must be provided");
//     }

//     // Add additional business logic here if needed

//     const updatedUser = await apiUpdateUser(userId, userData, token);

//     // Add post-API call logic (logging, auditing, etc.)
//     console.log("User updated successfully:", updatedUser);

//     return updatedUser;
//   } catch (error) {
//     console.error('Error while updating user:', error.message);
//     throw new Error(`Failed to update user: ${error.message}`);
//   }
// };

// import { getUser as apiGetUser } from '../strapi/userApi';

// export const getUser = async (userId: number, token: string): Promise<any> => {
//   try {
//     if (!userId || !token) {
//       throw new Error("User ID and token are required");
//     }

//     const user = await apiGetUser(userId, token);

//     // Post-process user data if needed (e.g., transforming or cleaning)
//     console.log("User data retrieved successfully:", user);

//     return user;
//   } catch (error) {
//     console.error('Error while fetching user data:', error.message);
//     throw new Error(`Failed to fetch user data: ${error.message}`);
//   }
// };

// export const apiUpdateUser = async (userId: number, userData: UserData, token: string): Promise<any> => {
//     const response = await fetch(`${API_URL}/users/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update user');
//     }

//     return await response.json();
//   };

//   export const apiGetUser = async (userId: number, token: string): Promise<any> => {
//     const response = await fetch(`${API_URL}/users/${userId}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to retrieve user data');
//     }

//     return await response.json();
//   };
