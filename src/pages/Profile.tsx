import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { products } from "@/data/products";

const Profile = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  const content = {
    ar: {
      title: "حسابي",
      profile: "الملف الشخصي",
      orders: "طلباتي",
      wishlist: "المفضلة",
      addresses: "العناوين",
      payments: "طرق الدفع",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      save: "حفظ التغييرات",
      orderNumber: "رقم الطلب",
      date: "التاريخ",
      status: "الحالة",
      total: "المجموع",
      viewDetails: "عرض التفاصيل",
      noOrders: "لا توجد طلبات بعد",
      noWishlist: "قائمة المفضلة فارغة",
      addToCart: "إضافة للسلة",
      addAddress: "إضافة عنوان جديد",
      defaultAddress: "العنوان الافتراضي",
      addCard: "إضافة بطاقة جديدة",
      delivered: "تم التوصيل",
      processing: "قيد المعالجة",
      shipped: "تم الشحن",
    },
    he: {
      title: "החשבון שלי",
      profile: "פרופיל",
      orders: "הזמנות שלי",
      wishlist: "מועדפים",
      addresses: "כתובות",
      payments: "אמצעי תשלום",
      settings: "הגדרות",
      logout: "התנתק",
      fullName: "שם מלא",
      email: "אימייל",
      phone: "טלפון",
      save: "שמור שינויים",
      orderNumber: "מספר הזמנה",
      date: "תאריך",
      status: "סטטוס",
      total: "סה״כ",
      viewDetails: "צפה בפרטים",
      noOrders: "אין הזמנות עדיין",
      noWishlist: "רשימת המועדפים ריקה",
      addToCart: "הוסף לעגלה",
      addAddress: "הוסף כתובת חדשה",
      defaultAddress: "כתובת ברירת מחדל",
      addCard: "הוסף כרטיס חדש",
      delivered: "נמסר",
      processing: "בעיבוד",
      shipped: "נשלח",
    },
  };

  const c = content[language];

  const mockOrders = [
    {
      id: "#12345",
      date: "2024-01-15",
      status: "delivered",
      total: 598,
      items: 2,
    },
    {
      id: "#12344",
      date: "2024-01-10",
      status: "shipped",
      total: 399,
      items: 1,
    },
    {
      id: "#12343",
      date: "2024-01-05",
      status: "processing",
      total: 847,
      items: 3,
    },
  ];

  const mockAddresses = [
    {
      id: 1,
      name: language === "ar" ? "المنزل" : "בית",
      street: language === "ar" ? "شارع الملك فهد، الرياض" : "רחוב המלך פהד, ריאד",
      isDefault: true,
    },
    {
      id: 2,
      name: language === "ar" ? "العمل" : "עבודה",
      street: language === "ar" ? "شارع العليا، الرياض" : "רחוב עוליה, ריאד",
      isDefault: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      delivered: "default",
      shipped: "secondary",
      processing: "outline",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {c[status as keyof typeof c]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-heading font-bold mb-8 gold-gradient animate-fade-in">
          {c.title}
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-secondary">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">{c.profile}</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden md:inline">{c.orders}</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">{c.wishlist}</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">{c.addresses}</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">{c.payments}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">{c.settings}</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="gold-text">{c.profile}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">{c.fullName}</label>
                  <Input defaultValue={language === "ar" ? "أحمد محمد" : "אחמד מוחמד"} className="bg-background border-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">{c.email}</label>
                  <Input type="email" defaultValue="ahmad@example.com" className="bg-background border-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">{c.phone}</label>
                  <Input type="tel" defaultValue="+966 50 123 4567" className="bg-background border-primary/30" dir="ltr" />
                </div>
                <Button className="gold-glow">{c.save}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="animate-fade-in">
            <div className="space-y-4">
              {mockOrders.map((order, index) => (
                <Card key={order.id} className="bg-card border-primary/20 hover:border-primary/50 transition-all animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="font-bold">{c.orderNumber}: {order.id}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {c.date}: {order.date}
                        </p>
                        <p className="text-primary font-bold">
                          {c.total}: {order.total} {language === "ar" ? "ر.س" : "₪"}
                        </p>
                      </div>
                      <Button variant="outline" className="border-primary text-primary">
                        {c.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product, index) => (
                <Card key={product.id} className="luxury-card animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-square overflow-hidden">
                    <img src={product.images[0]} alt={language === "ar" ? product.name_ar : product.name_he} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{language === "ar" ? product.name_ar : product.name_he}</h3>
                    <p className="text-primary font-bold mb-4">{product.variants[0].price} {language === "ar" ? "ر.س" : "₪"}</p>
                    <Button className="w-full gold-glow">{c.addToCart}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="animate-fade-in">
            <div className="space-y-4">
              {mockAddresses.map((address, index) => (
                <Card key={address.id} className="bg-card border-primary/20 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{address.name}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary">{c.defaultAddress}</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{address.street}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-primary/30">
                        {language === "ar" ? "تعديل" : "ערוך"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full border-primary text-primary">
                + {c.addAddress}
              </Button>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="animate-fade-in">
            <div className="space-y-4">
              <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">•••• •••• •••• 4567</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{c.defaultAddress}</Badge>
                  </div>
                </CardContent>
              </Card>
              <Button variant="outline" className="w-full border-primary text-primary">
                + {c.addCard}
              </Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 space-y-4">
                <Button variant="destructive" className="w-full">
                  <LogOut className="ml-2 h-5 w-5" />
                  {c.logout}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
