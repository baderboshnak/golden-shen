// src/contexts/CartContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL, getCart, addToCart, updateCartItem, removeCartItem, checkoutOrder } from "@/lib/api";

type CartItemUI = {
  id: string;           // product _id
  name: string;
  price: number;
  image: string;        // `${API_URL}/assets/products/${imageFile}`
  quantity: number;
};

type CartContextType = {
  items: CartItemUI[];
  itemCount: number;
  total: number;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  checkout: () => Promise<{ orderId: string }>;
};

const CartContext = createContext<CartContextType>({} as any);
const getToken = () => localStorage.getItem("token") || "";
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemUI[]>([]);
  const [loading, setLoading] = useState(false);
const [token, setToken] = useState<string>(getToken());

  const mapFromApi = (data: any): CartItemUI[] => {
    // Expected backend cart shape: { items: [{ product: {_id, name, price, imageFile}, quantity }] }
    const arr = Array.isArray(data?.items) ? data.items : [];
    return arr
      .filter((it: any) => it?.product)
      .map((it: any) => ({
        id: it.product._id,
        name: it.product.name,
        price: Number(it.product.price || 0),
        image: `${API_URL}/assets/products/${it.product.imageFile || "placeholder.jpg"}`,
        quantity: Number(it.quantity || 0),
      }));
  };
const onAuthChanged = () => {
  const t = getToken();
  setToken(t);
  if (t) refresh(); else setItems([]);
};

useEffect(() => {
  const onAuth = () => refresh();
  window.addEventListener("auth:login", onAuth);
  window.addEventListener("auth:logout", onAuth);
  return () => {
    window.removeEventListener("auth:login", onAuth);
    window.removeEventListener("auth:logout", onAuth);
  };
}, []);

useEffect(() => {
  if (token) refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);
  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setItems(mapFromApi(data));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addItem = async (productId: string, quantity = 1) => {
    setLoading(true);
    try {
      const data = await addToCart(productId, quantity);
      setItems(mapFromApi(data));
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    setLoading(true);
    try {
      const data = await removeCartItem(productId);
      setItems(mapFromApi(data));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setLoading(true);
    try {
      const data = await updateCartItem(productId, quantity);
      setItems(mapFromApi(data));
    } finally {
      setLoading(false);
    }
  };

  const itemCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => Number(items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2)),
    [items]
  );

  const checkout = async () => {
    const data = await checkoutOrder();
    // Optionally clear the cart after successful checkout:
    await refresh();
    return { orderId: data?.orderId };
  };

  const value: CartContextType = {
    items,
    itemCount,
    total,
    loading,
    refresh,
    addItem,
    removeItem,
    updateQuantity,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
