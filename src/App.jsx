import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { router } from './router';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AdminAuthProvider>
          <RouterProvider router={router} />
        </AdminAuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
