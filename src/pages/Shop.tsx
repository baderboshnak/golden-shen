import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type ApiCategory = { _id: string; name: string; icon?: string };
type ApiProduct = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageFile: string;              // e.g. "moisturizing-shampoo.jpg"
  category?: ApiCategory;         // populated by backend
  createdAt?: string;
  badges?: string[];
  rating?: { avg?: number; count?: number };
};

const Shop = () => {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "hair" | "body" | "face">("all");
  const [sort, setSort] = useState<"featured" | "priceLow" | "priceHigh" | "newest">("featured");
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
       const res = await fetch(`${API_URL}/products`);
        const data: ApiProduct[] = await res.json();
        setItems(data);

        if (!res.ok) throw new Error((data as any)?.error || "Failed to load products");
        setItems(data);
      } catch (e: any) {
        setErr(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return items;
    // Backend names: "Hair Care", "Body Care", "Face Care" → filter by substring
    const needle = filter.toLowerCase(); // "hair" | "body" | "face"
    return items.filter((p) => (p.category?.name || "").toLowerCase().includes(needle));
  }, [items, filter]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sort === "priceLow") return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "priceHigh") return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === "newest") {
      return list.sort((a, b) => {
        const aKey = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bKey = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bKey - aKey;
      });
    }
    return list; // featured
  }, [filteredProducts, sort]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-amber-400">
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
                filter === "hair" ? "bg-amber-400" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.hair}
            </Button>

            <Button
              variant={filter === "body" ? "default" : "outline"}
              onClick={() => setFilter("body")}
              className={`transition-all duration-300 ${
                filter === "body" ? "bg-amber-400" : "border-primary/30 hover:border-primary"
              }`}
            >
              {c.body}
            </Button>

            <Button
              variant={filter === "face" ? "default" : "outline"}
              onClick={() => setFilter("face")}
              className={`transition-all duration-300 ${
                filter === "face" ? "bg-amber-400" : "border-primary/30 hover:border-primary"
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

        {/* Loading / Error */}
        {loading && <p className="text-center text-muted-foreground">...</p>}
        {err && !loading && <p className="text-center text-red-500">{err}</p>}

        {/* Products Grid */}
        {!loading && !err && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => {
              const name = product.name;
              const short = product.description || "";
              const price = product.price ?? 0;
              const img = `${API_URL}/assets/products/${product.imageFile}`;
              const rating = Math.floor(product.rating?.avg ?? 0);
              const count = product.rating?.count ?? 0;

              return (
                <Card
                  key={product._id}
                  className="group luxury-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={img}
                      alt={name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                      }}
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
                      <Link to={`/product/${product._id}`}>
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
                              i < rating ? "fill-primary text-amber-400" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({count})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-400">{price} ₪</span>
                      <Link to={`/product/${product._id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-amber-400 hover:text-primary-foreground transition-all duration-300"
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
        )}
      </div>
    </div>
  );
};

export default Shop;
