import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { addLiveWcCartItem, removeLiveWcCartItem } from '../services/wooCartService';

const CartContext = createContext(null);

const STORAGE_KEY = 'binnemat_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      // Ignore storage errors
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const qtyToAdd = Math.max(1, Number(quantity) || 1);

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + qtyToAdd;
        updated[existingIdx] = { ...updated[existingIdx], quantity: newQty };
        return updated;
      } else {
        const rawPrice = typeof product.price === 'number'
          ? product.price
          : Number(String(product.formatted_price || '').replace(/[^0-9]/g, '')) || 24800;

        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: rawPrice,
            formatted_price: product.formatted_price || `Rs. ${rawPrice.toLocaleString()}`,
            image: product.images?.[0]?.src || product.image || null,
            badge: product.badge || 'ORIGINAL',
            quantity: qtyToAdd
          }
        ];
      }
    });

    message.success(`${product.name} added to cart`);
    openCart();

    // Background sync with live WooCommerce Store API
    addLiveWcCartItem(product.id, qtyToAdd).catch(() => {});
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    message.info('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: qty } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * (item.quantity || 1)), 0);
  const formattedSubtotal = `Rs. ${subtotal.toLocaleString()}`;

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      subtotal,
      formattedSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
