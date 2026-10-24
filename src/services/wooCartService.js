import { getJson, postJson } from './apiClient';

/**
 * Fetch live cart data from WooCommerce Store API
 */
export async function fetchLiveWcCart() {
  try {
    const data = await getJson('/cart');
    console.log("Data from backend - WooCommerce Cart:", data);
    return data;
  } catch (error) {
    console.warn("Backend unavailable / empty - WooCommerce Cart:", error.message);
    return null;
  }
}

/**
 * Add an item to WooCommerce Store API cart
 */
export async function addLiveWcCartItem(productId, quantity = 1) {
  try {
    const data = await postJson('/cart/add-item', {
      id: Number(productId),
      quantity: Number(quantity)
    });
    console.log("Data from backend - Added to WooCommerce Cart:", data);
    return data;
  } catch (error) {
    console.warn("Backend add-item unavailable / offline:", error.message);
    return null;
  }
}

/**
 * Remove an item from WooCommerce Store API cart
 */
export async function removeLiveWcCartItem(itemKey) {
  try {
    const data = await postJson('/cart/remove-item', {
      key: itemKey
    });
    console.log("Data from backend - Removed from WooCommerce Cart:", data);
    return data;
  } catch (error) {
    console.warn("Backend remove-item unavailable / offline:", error.message);
    return null;
  }
}

/**
 * Submit Checkout to WooCommerce Store API
 */
export async function submitLiveWcCheckout(checkoutPayload) {
  try {
    const data = await postJson('/checkout', checkoutPayload);
    console.log("Data from backend - WooCommerce Checkout Success:", data);
    return {
      success: true,
      orderId: data.order_number || data.order_id || data.id,
      data
    };
  } catch (error) {
    console.warn("Backend checkout unavailable / offline:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}
