// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Shield } from "lucide-react";
import { API_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type ApiProduct = {
  _id: string;
  name: string;
  description?: string;
  howToUse?: string;
  ingredients?: string[];
  price: number;
  imageFile: string;
};

export default function ProductDetail() {
  const { id } = useParams();               // this should be the Mongo _id from /shop links
  const { language } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${API_URL}/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load product");
        setProduct(data);
      } catch (e: any) {
        setErr(e?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">...</div>;
  }
  if (err || !product) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">
          {language === "ar" ? "المنتج غير موجود" : "המוצר לא נמצא"}
        </p>
      </div>
    );
  }

  const img = `${API_URL}/assets/products/${product.imageFile}`;

  const handleAddToCart = async () => {
    await addItem(product._id, quantity);   // send real Mongo _id
    toast({ title: language === "ar" ? "تمت الإضافة إلى السلة!" : "נוסף לעגלה!", duration: 2000 });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* breadcrumb omitted for brevity */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-lg border border-amber-400">
              <img src={img} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-heading font-bold mb-2 text-amber-400">{product.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{product.description || ""}</p>

            <div className="mb-8">
              <span className="text-4xl font-bold text-amber-400">{product.price} ₪</span>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                {language === "ar" ? "الكمية" : "כמות"}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary/30 rounded-md">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-primary/10">-</button>
                  <span className="px-6 py-2 border-x border-primary/30">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 hover:bg-primary/10">+</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1 bg-amber-400" onClick={handleAddToCart}>
                <ShoppingCart className="ml-2 h-5 w-5" />
                {language === "ar" ? "إضافة إلى السلة" : "הוסף לעגלה"}
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-amber-400 hover:text-primary-foreground">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs – optional */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 bg-card border border-primary/20 rounded-lg">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">{language === "ar" ? "دفع آمن ومضمون" : "תשלום מאובטח ובטוח"}</p>
              </div>
            </div>

            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3 bg-secondary">
                <TabsTrigger value="description">{language === "ar" ? "الوصف" : "תיאור"}</TabsTrigger>
                <TabsTrigger value="howToUse">{language === "ar" ? "طريقة الاستخدام" : "אופן השימוש"}</TabsTrigger>
                <TabsTrigger value="ingredients">{language === "ar" ? "المكونات" : "מרכיבים"}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{product.description || ""}</p>
              </TabsContent>
              <TabsContent value="howToUse" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{product.howToUse || ""}</p>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <ul className="space-y-2">
                  {(product.ingredients || []).map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
