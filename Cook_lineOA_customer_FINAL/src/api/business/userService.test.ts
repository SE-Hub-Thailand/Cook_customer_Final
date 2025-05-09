import { describe, it, expect } from 'vitest';
import { updateUser } from './userService';
const TOKEN = import.meta.env.VITE_TOKEN_TEST ;

describe('updateUser (Business Logic)', () => {
    const userId = 1;  // Replace with the ID of the user you want to update

    it('should successfully update the user in business logic', async () => {
        const userData = {
            fullName: "John Doe",
            gender: "Male",
            address: "123 Main St, Anytown, USA",
            cardID: "123456789",
            telNumber: "555-555-5555",
            // photoImage: 1,  // Optional field, replace with the ID of the uploaded image
        };

        const updatedUser = await updateUser(userId, userData, TOKEN);

        // Check if the returned data matches the updated data
        expect(updatedUser).toHaveProperty('id', userId);
        expect(updatedUser).toHaveProperty('fullName', userData.fullName);
        expect(updatedUser).toHaveProperty('gender', userData.gender);
        expect(updatedUser).toHaveProperty('address', userData.address);
        expect(updatedUser).toHaveProperty('cardID', userData.cardID);
        expect(updatedUser).toHaveProperty('telNumber', userData.telNumber);
        // expect(updatedUser).toHaveProperty('photoImage', userData.photoImage);

        console.log('User updated successfully in business logic:', updatedUser);
    });

    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalid-token';
        const userData = {
            fullName: "Jane Doe",
            gender: "Female",
            address: "456 Elm St, Anytown, USA",
            cardID: "987654321",
            telNumber: "555-555-5556",
            photoImage: 2,
        };

        await expect(updateUser(userId, userData, invalidToken)).rejects.toThrow();
    });
});
