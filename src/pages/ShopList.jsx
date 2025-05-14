import React, { useEffect, useState } from 'react';
import { getAllShops } from '../api/strapi/shopApi' // Adjust the path based on your file structure

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
//   const token = 'your-access-token'; // Replace with your method of obtaining the token
	// const token = import.meta.env.VITE_TOKEN_TEST ;
	const token = localStorage.getItem('token');
//   const decodedToken = jwt_decode(token);
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp < currentTime) {
//             console.error('Token is expired. Please log in again.');
//             // Optionally redirect to login or refresh token
//             return;
//         }
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsData = await getAllShops(token);
        setShops(shopsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchShops();
  }, [token]); // Run effect on component mount or when token changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shop List</h1>
      <ul className="space-y-4">
        {shops.map((shop) => (
          <li key={shop.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{shop.name}</h2>
            <p>Location: {shop.location}</p>
            <p>Latitude: {shop.latitude}</p>
            <p>Longitude: {shop.longitude}</p>
            <p>Book Bank Number: {shop.bookBankNumber}</p>
            <p>Created At: {new Date(shop.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(shop.updatedAt).toLocaleString()}</p>
            <p>Published At: {new Date(shop.publishedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
