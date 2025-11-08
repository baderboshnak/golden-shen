import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Star } from "lucide-react";

type ProductType = typeof products[number];

const Shop = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "hair" | "body" | "face">("all");
  const [sort, setSort] = useState<"featured" | "priceLow" | "priceHigh" | "newest">("featured");

  const content = {
    ar: {
      title: "المتجر",
      subtitle: "استكشفي مجموعتنا الكاملة من منتجات العناية الفاخرة",
      all: "الكل",
      hair: "العناية بالشعر",
      body: "العناية بالجسم",
      face: "العناية بالوجه",
      sortBy: "الترتيب حسب",
      featured: "المنتجات المميزة",
      priceLow: "السعر: من الأقل",
      priceHigh: "السعر: من الأعلى",
      newest: "الأحدث",
      quickView: "عرض سريع",
      addToCart: "إضافة للسلة",
    },
    he: {
      title: "החנות",
      subtitle: "גלו את הקולקציה המלאה שלנו של מוצרי טיפוח יוקרתיים",
      all: "הכל",
      hair: "שיער",
      body: "גוף",
      face: "פנים",
      sortBy: "מיין לפי",
      featured: "מוצרים מומלצים",
      priceLow: "מחיר: מהנמוך",
      priceHigh: "מחיר: מהגבוה",
      newest: "החדשים ביותר",
      quickView: "צפייה מהירה",
      addToCart: "הוסף לעגלה",
    },
  } as const;

  const c = content[language as "ar" | "he"];

  const filteredProducts: ProductType[] =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sort === "priceLow") {
      return list.sort(
        (a, b) => (a.variants?.[0]?.price ?? 0) - (b.variants?.[0]?.price ?? 0)
      );
    }
    if (sort === "priceHigh") {
      return list.sort(
        (a, b) => (b.variants?.[0]?.price ?? 0) - (a.variants?.[0]?.price ?? 0)
      );
    }
    if (sort === "newest") {
      // Sort by createdAt desc if present, else by id as fallback
      return list.sort((a, b) => {
        const aKey = (a as any).createdAt ? Date.parse((a as any).createdAt) : 0;
        const bKey = (b as any).createdAt ? Date.parse((b as any).createdAt) : 0;
        if (aKey !== 0 || bKey !== 0) return bKey - aKey;
        return String(b.id).localeCompare(String(a.id));
      });
    }
    return list; // featured: keep incoming order
  }, [filteredProducts, sort]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 gold-gradient">
            {c.title}
          </h1>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={`transition-all duration-300 ${
                filter === "all" ? "gold-glow" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.all}
            </Button>

            <Button
              variant={filter === "hair" ? "default" : "outline"}
              onClick={() => setFilter("hair")}
              className={`transition-all duration-300 ${
                filter === "hair" ? "gold-glow" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.hair}
            </Button>

            <Button
              variant={filter === "body" ? "default" : "outline"}
              onClick={() => setFilter("body")}
              className={`transition-all duration-300 ${
                filter === "body" ? "gold-glow" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.body}
            </Button>

            <Button
              variant={filter === "face" ? "default" : "outline"}
              onClick={() => setFilter("face")}
              className={`transition-all duration-300 ${
                filter === "face" ? "gold-glow" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.face}
            </Button>
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="w-[220px] border-primary/30">
              <SelectValue placeholder={c.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">{c.featured}</SelectItem>
              <SelectItem value="priceLow">{c.priceLow}</SelectItem>
              <SelectItem value="priceHigh">{c.priceHigh}</SelectItem>
              <SelectItem value="newest">{c.newest}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => {
            const name = language === "ar" ? product.name_ar : product.name_he;
            const short = language === "ar" ? product.short_ar : product.short_he;
            const price = product.variants?.[0]?.price ?? 0;
            const img = product.images?.[0] ?? "/placeholder.svg";
            const rating = Math.floor(product.rating?.avg ?? 0);
            const count = product.rating?.count ?? 0;

            return (
              <Card
                key={product.id}
                className="group luxury-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {product.badges.map((badge, i) => (
                        <Badge key={i} className="bg-primary text-primary-foreground">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/product/${product.id}`}>
                      <Button className="gold-glow">{c.quickView}</Button>
                    </Link>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{short}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "fill-primary text-primary" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({count})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {price} ₪
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {c.addToCart}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
