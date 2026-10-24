import React from 'react';
import { 
  createRootRoute, 
  createRoute, 
  createRouter 
} from '@tanstack/react-router';
import RootLayout from './RootLayout';
import { 
  HomeRoute, 
  CategoriesRoute, 
  CategorySlugRoute, 
  ProductSlugRoute, 
  AboutRoute,
  ContactRoute,
  FaqsRoute,
  PolicyRoute,
  WarrantyRoute,
  ShippingRoute,
  ReturnRoute,
  PrivacyRoute,
  TermsRoute,
  AdminRoute,
  DecoyAdminRoute
} from './RouteWrappers';
import { APP_CONFIG } from '../config/env';

// 1. ROOT ROUTE
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. CHILD ROUTES
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRoute,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: CategoriesRoute,
});

const categorySlugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$slug',
  component: CategorySlugRoute,
});

const productSlugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$slug',
  component: ProductSlugRoute,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutRoute,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactRoute,
});

const faqsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faqs',
  component: FaqsRoute,
});

const policyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/policy',
  component: PolicyRoute,
});

const warrantyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/warranty-policy',
  component: WarrantyRoute,
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipping-policy',
  component: ShippingRoute,
});

const returnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/return-policy',
  component: ReturnRoute,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyRoute,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-conditions',
  component: TermsRoute,
});

// STEALTH SECURITY: Decoy route for /admin showing 404
const decoyAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: DecoyAdminRoute,
});

// OBFUSCATED SECRET ADMIN ROUTE (Default: /bn-portal-2026)
const secretAdminPath = APP_CONFIG.ADMIN_PATH || '/bn-portal-2026';
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: secretAdminPath,
  component: AdminRoute,
});

// 3. ROUTE TREE & ROUTER INSTANCE
const routeTree = rootRoute.addChildren([
  indexRoute,
  categoriesRoute,
  categorySlugRoute,
  productSlugRoute,
  aboutRoute,
  contactRoute,
  faqsRoute,
  policyRoute,
  warrantyRoute,
  shippingRoute,
  returnRoute,
  privacyRoute,
  termsRoute,
  decoyAdminRoute,
  adminRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});
