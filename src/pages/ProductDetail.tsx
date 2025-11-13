import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Shield } from "lucide-react";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product =
    products.find((p) => p.id === Number(id)) ||
    products.find((p) => p.slug === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">
          {language === "ar" ? "المنتج غير موجود" : "המוצר לא נמצא"}
        </p>
      </div>
    );
  }

  const content = {
    ar: {
      home: "الرئيسية",
      shop: "المتجر",
      quantity: "الكمية",
      addToCart: "إضافة إلى السلة",
      description: "الوصف",
      howToUse: "طريقة الاستخدام",
      ingredients: "المكونات",
      relatedProducts: "منتجات ذات صلة",
      securePayment: "دفع آمن ومضمون",
      addedToCart: "تمت الإضافة إلى السلة!",
    },
    he: {
      home: "בית",
      shop: "חנות",
      quantity: "כמות",
      addToCart: "הוסף לעגלה",
      description: "תיאור",
      howToUse: "אופן השימוש",
      ingredients: "מרכיבים",
      relatedProducts: "מוצרים קשורים",
      securePayment: "תשלום מאובטח ובטוח",
      addedToCart: "נוסף לעגלה!",
    },
  } as const;

  const c = content[language as "ar" | "he"];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: language === "ar" ? product.name_ar : product.name_he,
      price: product.variants[0].price,
      image: product.images[0],
      qty: quantity,
    });
    toast({ title: c.addedToCart, duration: 2000 });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground animate-fade-in">
          <Link to="/" className="hover:text-primary transition-colors">{c.home}</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">{c.shop}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {language === "ar" ? product.name_ar : product.name_he}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-lg border border-amber-400">
              <img
                src={product.images[0]}
                alt={language === "ar" ? product.name_ar : product.name_he}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg border border-primary/30">
                  <img
                    src={img}
                    alt={`${language === "ar" ? product.name_ar : product.name_he} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-heading font-bold mb-2 text-amber-400">
              {language === "ar" ? product.name_ar : product.name_he}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {language === "ar" ? product.short_ar : product.short_he}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-amber-400">
                {product.variants[0].price} ₪
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">{c.quantity}</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary/30 rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-primary/30">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1 bg-amber-400" onClick={handleAddToCart}>
                <ShoppingCart className="ml-2 h-5 w-5" />
                {c.addToCart}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-amber-400 hover:text-primary-foreground"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Secure Payment */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 bg-card border border-primary/20 rounded-lg">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">{c.securePayment}</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3 bg-secondary">
                <TabsTrigger value="description">{c.description}</TabsTrigger>
                <TabsTrigger value="howToUse">{c.howToUse}</TabsTrigger>
                <TabsTrigger value="ingredients">{c.ingredients}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {language === "ar" ? product.description_ar : product.description_he}
                </p>
              </TabsContent>
              <TabsContent value="howToUse" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {language === "ar" ? product.how_to_use_ar : product.how_to_use_he}
                </p>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <ul className="space-y-2">
                  {(language === "ar" ? product.ingredients_ar : product.ingredients_he).map(
                    (ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {ingredient}
                      </li>
                    )
                  )}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-3xl font-heading font-bold mb-8 text-amber-400 text-center">
            {c.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <Card className="luxury-card">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={language === "ar" ? p.name_ar : p.name_he}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">
                      {language === "ar" ? p.name_ar : p.name_he}
                    </h3>
                    <p className="text-amber-400 font-bold">{p.variants[0].price} ₪</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
