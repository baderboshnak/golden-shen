export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const j = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as any)?.error || (data as any)?.message || res.statusText;
    throw new Error(msg || "Request failed");
  }
  return data;
};

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---- CART ----
export async function getCart() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/cart`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    // REMOVE credentials: "include"
  });
  return j(res);
}

export async function addToCart(productId: string, quantity = 1) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");
  if (!productId || productId.length < 12) throw new Error("Invalid productId");

  const res = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ productId, quantity }),
    // REMOVE credentials: "include"
  });
  return j(res);
}

export async function updateCartItem(productId: string, quantity: number) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/cart/item/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ quantity }),
    // REMOVE credentials: "include"
  });
  return j(res);
}

export async function removeCartItem(productId: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/cart/item/${productId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
    // REMOVE credentials: "include"
  });
  return j(res);
}

// ---- ORDERS ----
export async function checkoutOrder() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    // REMOVE credentials: "include"
  });
  return j(res);
}
// ---- AUTH / PROFILE ----
export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return j(res); // { id, username, role, isActive, ... }
}

export async function changeMyPassword(
  currentPassword: string,
  newPassword: string
) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/auth/me/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return j(res); // { success: true }
}

// current user orders (profile page)
export async function getMyOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include",
  });
  return j(res); // [{ _id, items, totalPrice, status, createdAt, shippingAddress }]
}

// admin: all orders
export async function getAdminOrders() {
  const res = await fetch(`${API_URL}/orders/all`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include",
  });
  return j(res); // [{ _id, user, items, totalPrice, status, createdAt, shippingAddress }]
}
