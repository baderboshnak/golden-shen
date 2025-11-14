// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

type Category = {
  _id: string;
  name: string;
  imageFile?: string;
};

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Category | string;
  imageFile?: string;
  isTop?: boolean;
};

type User = {
  _id: string;
  username: string;
  email?: string;
  role: "user" | "admin";
};

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageFile?: string;
};

type Order = {
  _id: string;
  user?: { _id: string; username: string; role: "user" | "admin" };
  items: OrderItem[];
  totalPrice: number;
  status: string;
  shippingAddress?: string;
  createdAt: string;
};


const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminDashboard = () => {
  const [tab, setTab] = useState<"products" | "categories" | "orders" | "users">("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // product form
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  // category form
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
const me = JSON.parse(localStorage.getItem("user") || "{}");

  const isAdmin = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return false;
      const u = JSON.parse(raw);
      return u.role === "admin";
    } catch {
      return false;
    }
  })();

  // ---------- FETCH HELPERS ----------
 const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    headers: { ...authHeader() },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json().catch(() => []);
  setProducts(data || []);
};

const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, {
    headers: { ...authHeader() },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json().catch(() => []);
  setCategories(data || []);
};

const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/orders/all`, {
    headers: { ...authHeader() },
    credentials: "include",
  });
  if (res.status === 404) {
    setOrders([]);
    return;
  }
  if (!res.ok) throw new Error("Failed to load orders");
  const data = await res.json().catch(() => []);
  setOrders(data || []);
};


const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { ...authHeader() },
    credentials: "include",
  });

  if (res.status === 404) {
    setUsers([]);
    return;
  }
  if (!res.ok) throw new Error("Failed to load users");

  const data = await res.json().catch(() => []);
  setUsers(data || []);
};


  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchOrders(),
        fetchUsers(),
      ]);
    } catch (e: any) {
      setError(e?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) refreshAll();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <p className="text-xl text-red-500">
          Admin access only.
        </p>
      </div>
    );
  }

  // ---------- SAVE PRODUCT ----------
  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("name", editingProduct.name || "");
      form.append("description", editingProduct.description || "");
      form.append("price", String(editingProduct.price || 0));
      form.append("stock", String(editingProduct.stock || 0));
      form.append(
        "category",
        typeof editingProduct.category === "string"
          ? editingProduct.category
          : editingProduct.category._id
      );
      form.append("isTop", editingProduct.isTop ? "true" : "false");

      if (productImageFile) {
        form.append("image", productImageFile);
      }

      const method = editingProduct._id ? "PUT" : "POST";
      const url = editingProduct._id
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;

      const res = await fetch(url, {
        method,
        headers: { ...authHeader() },
        body: form,
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save product");
      }

      setEditingProduct(null);
      setProductImageFile(null);
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { ...authHeader() },
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete product");
      }
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Failed to delete product");
    } finally {
      setSaving(false);
    }
  };

  // ---------- SAVE CATEGORY ----------
const handleSaveCategory = async () => {
  if (!editingCategory) return;
  setSaving(true);
  setError(null);
  try {
    const form = new FormData();
    form.append("name", editingCategory.name || "");
    if (categoryImageFile) form.append("image", categoryImageFile);

    const method = editingCategory._id ? "PUT" : "POST";
    const url = editingCategory._id
      ? `${API_URL}/categories/${editingCategory._id}`
      : `${API_URL}/categories/addCategory`;

    const res = await fetch(url, {
      method,
      headers: { ...authHeader() }, // no Content-Type here (browser sets it)
      body: form,
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to save category");
    }

    setEditingCategory(null);
    setCategoryImageFile(null);
    await fetchCategories();
  } catch (e: any) {
    setError(e?.message || "Failed to save category");
  } finally {
    setSaving(false);
  }
};


  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: { ...authHeader() },
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete category");
      }
      await fetchCategories();
    } catch (e: any) {
      setError(e?.message || "Failed to delete category");
    } finally {
      setSaving(false);
    }
  };

  // ---------- ORDERS ----------
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update order");
      }
      await fetchOrders();
    } catch (e: any) {
      setError(e?.message || "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  // ---------- USERS ----------
  const handleChangeUserRole = async (userId: string, role: "user" | "admin") => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ role }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to change role");
      }
      await fetchUsers();
    } catch (e: any) {
      setError(e?.message || "Failed to change role");
    } finally {
      setSaving(false);
    }
  };

    const handleToggleUserActive = async (user: User) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/${user._id}/active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ isActive: !user.isActive }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update user status");
      }
      await fetchUsers();
    } catch (e: any) {
      setError(e?.message || "Failed to update user status");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Delete this user?")) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: { ...authHeader() },
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete user");
      }
      await fetchUsers();
    } catch (e: any) {
      setError(e?.message || "Failed to delete user");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeUserPassword = async (user: User) => {
    const adminPassword = window.prompt(
      `Enter ADMIN password to change password for user "${user.username}":`
    );
    if (!adminPassword) return;

    const newPassword = window.prompt(
      `Enter NEW password for user "${user.username}":`
    );
    if (!newPassword) return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/${user._id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ adminPassword, newPassword }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to change password");
      }
      alert("Password changed successfully");
    } catch (e: any) {
      setError(e?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold text-amber-400">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={refreshAll} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-4 py-2">
            {error}
          </div>
        )}

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* PRODUCTS */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-heading font-semibold text-xl">
                      Products
                    </h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingProduct({
                          _id: "",
                          name: "",
                          description: "",
                          price: 0,
                          stock: 0,
                          category: categories[0]?._id || "",
                          imageFile: "",
                          isTop: false,
                        });
                        setProductImageFile(null);
                      }}
                    >
                      + New Product
                    </Button>
                  </div>

                  <div className="border-t border-primary/10 pt-3 space-y-2 max-h-[500px] overflow-y-auto">
                    {products.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center justify-between gap-4 py-2 border-b border-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-md overflow-hidden bg-black/20">
                            {p.imageFile && (
                              <img
                                src={`${API_URL}/assets/products/${p.imageFile}`}
                                alt={p.name}
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ₪{p.price} | stock {p.stock}{" "}
                              {p.isTop && (
                                <span className="ml-2 text-amber-400">
                                  TOP
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                     <Button
  size="lg"
  variant="outline"
  className="h-8 px-3 text-xs md:h-10 md:px-6 md:text-sm"
  onClick={() => {
    setEditingProduct({
      ...p,
      category:
        typeof p.category === "string"
          ? p.category
          : p.category._id,
    });
    setProductImageFile(null);
  }}
>
  Edit
</Button>

<Button
  size="lg"
  variant="destructive"
  className="h-8 px-3 text-xs md:h-10 md:px-6 md:text-sm"
  onClick={() => handleDeleteProduct(p._id)}
>
  Delete
</Button>

                        </div>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No products yet.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* PRODUCT FORM */}
              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <h2 className="font-heading font-semibold text-xl mb-2">
                    {editingProduct?._id ? "Edit Product" : "New Product"}
                  </h2>
                  {!editingProduct && (
                    <p className="text-sm text-muted-foreground">
                      Select a product or click &quot;New Product&quot; to edit.
                    </p>
                  )}
                  {editingProduct && (
                    <div className="space-y-3">
                      <Input
                        placeholder="Name"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-3">
                        <Input
                          type="number"
                          placeholder="Price"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              price: Number(e.target.value),
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Stock"
                          value={editingProduct.stock}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              stock: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-xs mb-1">
                          Category
                        </label>
                        <select
                          className="w-full rounded-md border border-primary/30 bg-background px-2 py-1 text-sm"
                          value={
                            typeof editingProduct.category === "string"
                              ? editingProduct.category
                              : editingProduct.category._id
                          }
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              category: e.target.value,
                            })
                          }
                        >
                          {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          id="isTop"
                          type="checkbox"
                          checked={!!editingProduct.isTop}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              isTop: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor="isTop" className="text-sm">
                          Mark as Top product (home page)
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs mb-1">
                          Image
                        </label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setProductImageFile(
                              e.target.files?.[0] || null
                            )
                          }
                        />
                        {editingProduct.imageFile && (
                          <div className="mt-2 w-24 h-24 rounded-md overflow-hidden bg-black/20">
                            <img
                              src={`${API_URL}/assets/products/${editingProduct.imageFile}`}
                              alt={editingProduct.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveProduct}
                          disabled={saving}
                          className="flex-1"
                        >
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(null);
                            setProductImageFile(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CATEGORIES */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-heading font-semibold text-xl">
                      Categories
                    </h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingCategory({ _id: "", name: "" });
                        setCategoryImageFile(null);
                      }}
                    >
                      + New Category
                    </Button>
                  </div>

                  <div className="border-t border-primary/10 pt-3 space-y-2 max-h-[500px] overflow-y-auto">
                    {categories.map((c) => (
                      <div
                        key={c._id}
                        className="flex items-center justify-between gap-4 py-2 border-b border-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-black/20">
                            {c.imageFile && (
                              <img
                                src={`${API_URL}/assets/categories/${c.imageFile}`}
                                alt={c.name}
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                          <div className="font-semibold text-sm">
                            {c.name}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="lg"
  variant="outline"
  className="h-8 px-3 text-xs md:h-10 md:px-6 md:text-sm"
                            onClick={() => {
                              setEditingCategory(c);
                              setCategoryImageFile(null);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="lg"
  variant="destructive"
  className="h-8 px-3 text-xs md:h-10 md:px-6 md:text-sm"
                            onClick={() => handleDeleteCategory(c._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <h2 className="font-heading font-semibold text-xl mb-2">
                    {editingCategory?._id ? "Edit Category" : "New Category"}
                  </h2>
                  {!editingCategory && (
                    <p className="text-sm text-muted-foreground">
                      Select a category or click &quot;New Category&quot; to
                      edit.
                    </p>
                  )}
                  {editingCategory && (
                    <div className="space-y-3">
                      <Input
                        placeholder="Name"
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                      />
                      <div>
                        <label className="block text-xs mb-1">
                          Image
                        </label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setCategoryImageFile(
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveCategory}
                          disabled={saving}
                          className="flex-1"
                        >
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingCategory(null);
                            setCategoryImageFile(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        {/* ORDERS */}
<TabsContent value="orders">
  <Card className="bg-card border-primary/20">
    <CardContent className="p-4 space-y-3">
      <h2 className="font-heading font-semibold text-xl mb-2">
        Orders
      </h2>
      <div className="border-t border-primary/10 pt-3 space-y-3 max-h-[600px] overflow-y-auto text-sm">
        {orders.map((o) => (
          <div
            key={o._id}
            className="border border-primary/10 rounded-lg p-3 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">
                  Order #{o._id.slice(-6)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {o.user?.username || "Unknown user"} •{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </div>
                {o.shippingAddress && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {o.shippingAddress}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-400">
                  ₪{o.totalPrice.toFixed(2)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {o.status}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              {o.items.map((it, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-xs text-muted-foreground"
                >
                  <span>
                    {it.name} × {it.quantity}
                  </span>
                  <span>₪{it.price * it.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No orders yet.
          </p>
        )}
      </div>
    </CardContent>
  </Card>
</TabsContent>


          {/* USERS */}
                   {/* USERS */}
          <TabsContent value="users">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-heading font-semibold text-xl">
                    Users
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Total: {users.length}
                  </span>
                </div>

                <div className="border-t border-primary/10 pt-3 max-h-[600px] overflow-y-auto text-sm">
                  {users.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No users found.
                    </p>
                  )}

                  <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_2fr] gap-3 px-2 pb-2 text-xs font-semibold text-muted-foreground border-b border-primary/10">
                    <span>Username</span>
                    <span>Status</span>
                    <span>Role</span>
                    <span className="text-right">Actions</span>
                  </div>

                  {users.map((u) => (
                    <div
                      key={u._id}
                      className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-3 items-center px-2 py-3 border-b border-primary/5"
                    >
                      {/* username / basic info */}
                      <div>
                        <div className="font-semibold">{u.username}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {u._id}
                        </div>
                      </div>

                      {/* Active / deactivated */}
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            u.isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/40"
                              : "bg-red-500/10 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {u.isActive ? "Active" : "Deactivated"}
                        </span>
                      </div>

                      {/* Role selector */}
                     <div className="flex items-center gap-2">

  {/* Show my own role but do NOT allow me to edit myself */}
  {me.id === u._id ? (
    <span className="text-xs font-semibold text-amber-400">
      {u.role} (you)
    </span>
  ) : (
    <>
      <span className="text-xs">{u.role}</span>

      <select
        className="rounded-md border border-primary/30 bg-background px-2 py-1 text-xs"
        value={u.role}
        onChange={(e) =>
          handleChangeUserRole(
            u._id,
            e.target.value as "user" | "admin"
          )
        }
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </>
  )}

</div>

                      {/* Actions */}
                      <div className="flex flex-wrap justify-end gap-2">
            {/* Activate / Deactivate */}
{ me.id !== u._id &&  <Button
  size="xs"
  className={`px-3 py-1.5 text-xs rounded-lg border
    ${u.isActive
      ? "text-amber-400 border-amber-400/40 bg-amber-400/5 hover:bg-amber-400/10"
      : "text-green-400 border-green-400/40 bg-green-400/5 hover:bg-green-400/10"
    }
    transition-all
  `}
  onClick={() => handleToggleUserActive(u)}
>
  {u.isActive  ? "Deactivate" : "Activate"}
</Button>}

{/* Change password */}
<Button
  size="xs"
  className="px-3 py-1.5 text-xs rounded-lg
    border border-blue-400/40 bg-blue-400/5
    text-blue-300 hover:bg-blue-400/10
    transition-all
  "
  onClick={() => handleChangeUserPassword(u)}
>
  Change Password
</Button>

{/* Delete user */}
<Button
  size="xs"
  className="px-3 py-1.5 text-xs rounded-lg
    border border-red-500/40 bg-red-500/5
    text-red-400 hover:bg-red-500/10
    transition-all
  "
  onClick={() => handleDeleteUser(u._id)}
>
  Delete
</Button>

                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
