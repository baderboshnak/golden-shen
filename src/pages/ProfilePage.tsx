// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import {
  API_URL,
  getProfile,
  getMyOrders,
  changeMyPassword,
} from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

type Profile = {
  id: string;
  username: string;
  role: "user" | "admin";
  isActive?: boolean;
  createdAt?: string;
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
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  shippingAddress?: string;
};

const ProfilePage = () => {
  const { language, t } = useLanguage();

  const [tab, setTab] = useState<"overview" | "orders" | "security">(
    "overview"
  );

  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // change password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);

  const text = {
    ar: {
      title: "الملف الشخصي",
      overview: "نظرة عامة",
      orders: "طلباتي",
      security: "الأمان",
      username: "اسم المستخدم",
      role: "الدور",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      memberSince: "عضو منذ",
      noProfile: "لا يمكن تحميل الملف الشخصي. تأكد من تسجيل الدخول.",
      ordersEmpty: "لا توجد طلبات حتى الآن.",
      orderNumber: "رقم الطلب",
      total: "المجموع",
      statusLabel: "الحالة",
      items: "المنتجات",
      shippingAddress: "عنوان الشحن",
      securityTitle: "تغيير كلمة المرور",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      savePassword: "حفظ كلمة المرور",
      pwdSuccess: "تم تغيير كلمة المرور بنجاح",
      pwdMismatch: "كلمتا المرور غير متطابقتين",
      pwdTooShort: "كلمة المرور الجديدة قصيرة جدًا",
    },
    he: {
      title: "פרופיל משתמש",
      overview: "סקירה",
      orders: "ההזמנות שלי",
      security: "אבטחה",
      username: "שם משתמש",
      role: "תפקיד",
      status: "סטטוס",
      active: "פעיל",
      inactive: "לא פעיל",
      memberSince: "חבר מאז",
      noProfile: "לא ניתן לטעון פרופיל. ודא שאתה מחובר.",
      ordersEmpty: "אין הזמנות עדיין.",
      orderNumber: "הזמנה מספר",
      total: "סה\"כ",
      statusLabel: "סטטוס",
      items: "מוצרים",
      shippingAddress: "כתובת משלוח",
      securityTitle: "שינוי סיסמה",
      currentPassword: "סיסמה נוכחית",
      newPassword: "סיסמה חדשה",
      confirmPassword: "אישור סיסמה חדשה",
      savePassword: "שמירת סיסמה",
      pwdSuccess: "הסיסמה עודכנה בהצלחה",
      pwdMismatch: "הסיסמאות אינן תואמות",
      pwdTooShort: "הסיסמה החדשה קצרה מדי",
    },
  }[language];

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, o] = await Promise.all([getProfile(), getMyOrders()]);
      setProfile(p);
      setOrders(o || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setPwdMsg(text.pwdMismatch);
      return;
    }
    if (newPassword.length < 4) {
      setPwdMsg(text.pwdTooShort);
      return;
    }

    try {
      setPwdSaving(true);
      await changeMyPassword(currentPassword, newPassword);
      setPwdMsg(text.pwdSuccess);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setError(e?.message || "Failed to change password");
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold text-amber-400">
            {text.title}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "..." : "Reload"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-4 py-2">
            {error}
          </div>
        )}

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">{text.overview}</TabsTrigger>
            <TabsTrigger value="orders">{text.orders}</TabsTrigger>
            <TabsTrigger value="security">{text.security}</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 space-y-4">
                {!profile && !loading && (
                  <p className="text-sm text-muted-foreground">
                    {text.noProfile}
                  </p>
                )}

                {profile && (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase text-muted-foreground mb-1">
                          {text.username}
                        </div>
                        <div className="text-xl font-semibold">
                          {profile.username}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <div className="text-xs uppercase text-muted-foreground mb-1">
                            {text.role}
                          </div>
                          <div className="text-sm px-2 py-1 rounded-full border border-primary/40">
                            {profile.role}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-muted-foreground mb-1">
                            {text.status}
                          </div>
                          <div
                            className={`text-sm px-2 py-1 rounded-full ${
                              profile.isActive
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50"
                                : "bg-red-500/10 text-red-400 border border-red-500/50"
                            }`}
                          >
                            {profile.isActive ? text.active : text.inactive}
                          </div>
                        </div>
                      </div>
                    </div>

                    {profile.createdAt && (
                      <div className="border-t border-primary/10 pt-4 text-sm text-muted-foreground">
                        {text.memberSince}:{" "}
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-heading font-semibold text-xl mb-2">
                  {text.orders}
                </h2>

                {orders.length === 0 && !loading && (
                  <p className="text-sm text-muted-foreground">
                    {text.ordersEmpty}
                  </p>
                )}

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {orders.map((o) => (
                    <div
                      key={o._id}
                      className="border border-primary/10 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase mb-1">
                            {text.orderNumber}
                          </div>
                          <div className="font-semibold">
                            #{o._id.slice(-6)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(o.createdAt).toLocaleString()}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground uppercase mb-1">
                            {text.total}
                          </div>
                          <div className="font-bold text-amber-400">
                            ₪{o.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs text-muted-foreground mr-2">
                            {text.statusLabel}:
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs border border-primary/30">
                            {o.status}
                          </span>
                        </div>
                        {o.shippingAddress && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-semibold">
                              {text.shippingAddress}:
                            </span>{" "}
                            {o.shippingAddress}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-primary/10 pt-3 space-y-2">
                        <div className="text-xs text-muted-foreground uppercase">
                          {text.items}
                        </div>
                        {o.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md overflow-hidden bg-black/20">
                                {it.imageFile && (
                                  <img
                                    src={`${API_URL}/assets/products/${it.imageFile}`}
                                    alt={it.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span>
                                {it.name} × {it.quantity}
                              </span>
                            </div>
                            <span className="text-muted-foreground">
                              ₪{(it.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY (CHANGE PASSWORD) */}
          <TabsContent value="security">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-heading font-semibold text-xl mb-2">
                  {text.securityTitle}
                </h2>
                <form className="space-y-4" onSubmit={handleChangePassword}>
                  <div>
                    <label className="block text-xs mb-1">
                      {text.currentPassword}
                    </label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">
                      {text.newPassword}
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">
                      {text.confirmPassword}
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {pwdMsg && (
                    <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/40 rounded-md px-3 py-2">
                      {pwdMsg}
                    </div>
                  )}

                  <Button type="submit" disabled={pwdSaving}>
                    {pwdSaving ? "..." : text.savePassword}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
