import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import { authenticateUser } from '../api/strapi/authApi'; // Adjust the path as necessary

function Test() {
    useEffect(() => {
        const login = async () => {
            const identifier = 'hideoaki@gmail.com';  // Replace with your test email
            const password = 'ooaakk';  // Replace with your test password

            try {
                const data = await authenticateUser(identifier, password);
                console.log('Authentication successful:', data);
            } catch (error) {
                console.error('Authentication failed:', error.message);
            }
        };

        login();
    }, []);

    return (
        <>
            <Header />
            <div>x Point</div>
        </>
    );
}

export default Test;
