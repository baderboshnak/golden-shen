// src/lib/api.ts
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
    credentials: "include",
  });
  return j(res);
}

export async function addToCart(productId: string, quantity = 1) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");
  if (!/^[a-fA-F0-9]{24}$/.test(productId)) throw new Error("Invalid productId"); // stricter

  const res = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ productId, quantity }),
    credentials: "include",
    mode: "cors",
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
    credentials: "include",
  });
  return j(res);
}

export async function removeCartItem(productId: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");
  const res = await fetch(`${API_URL}/cart/item/${productId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
    credentials: "include",
  });
  return j(res);
}

// ---- ORDERS (simple checkout) ----
export async function checkoutOrder() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");
  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    credentials: "include",
  });
  return j(res); // expects { orderId }
}
