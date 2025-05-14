import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      const existingProductIndex = updatedCart.findIndex(item => item.name === product.name);
      if (existingProductIndex >= 0) {
        console.log('existingProductIndex:', existingProductIndex);
        console.log('updatedCart:', updatedCart[existingProductIndex].quantity);
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      return updatedCart;
    });
  };

  // Function to remove product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map(item => {
        if (item.id === productId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with quantity 0
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
