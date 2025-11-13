import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
import { checkoutOrder } from "@/lib/api";

const Cart = () => {
  const { language, t } = useLanguage();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const content = {
    ar: {
      title: "سلة التسوق",
      empty: "سلة التسوق فارغة",
      continueShopping: "متابعة التسوق",
      orderSummary: "ملخص الطلب",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      total: "المجموع الكلي",
      checkout: "إتمام الطلب",
      items: "عنصر",
    },
    he: {
      title: "עגלת קניות",
      empty: "עגלת הקניות ריקה",
      continueShopping: "המשך קנייה",
      orderSummary: "סיכום הזמנה",
      subtotal: "סכום ביניים",
      shipping: "משלוח",
      total: "סה״כ",
      checkout: "המשך לתשלום",
      items: "פריטים",
    },
  };

  const c = content[language];
  const shipping = total > 199 ? 0 : 50;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-heading font-bold mb-4 text-muted-foreground">
          {c.empty}
        </h1>
        <Link to="/shop">
          <Button className="gold-glow">{c.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-heading font-bold mb-8 gold-gradient animate-fade-in">
          {c.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card
                key={item.id}
                className="bg-card border-primary/20 hover:border-primary/50 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-md overflow-hidden border gold-border flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-heading font-semibold text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-primary font-bold">{item.price} {t("common.currency")}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-primary/30 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-primary/10 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-primary/30">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-primary/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-muted-foreground">
                          {language === "ar" ? "المجموع" : "סה״כ"}: {item.price * item.quantity} {t("common.currency")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-primary/20 sticky top-28 animate-fade-in">
              <CardContent className="p-6">
                <h2 className="font-heading font-semibold text-xl mb-6 gold-gradient">
                  {c.orderSummary}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.subtotal} ({itemCount} {c.items})</span>
                    <span>{total} {t("common.currency")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.shipping}</span>
                    <span>{shipping === 0 ? (language === "ar" ? "مجاني" : "חינם") : `${shipping} ${t("common.currency")}`}</span>
                  </div>
                  <div className="border-t gold-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{c.total}</span>
                      <span className="text-primary">{finalTotal} {t("common.currency")}</span>
                    </div>
                  </div>
                </div>

              {/* // in Cart page, near the Button "checkout" */}
            <Button
              className="w-full gold-glow mb-4"
              onClick={async () => {
                try {
                  // You could show a loader/toast here
                  const { orderId } = await checkoutOrder(); // from useCart()
                  // redirect to thank-you page or orders page:
                  // nav(`/order/${orderId}`)  // if you have such route
                  alert(`Order placed: ${orderId}`);
                } catch (e: any) {
                  alert(e?.message || "Checkout failed");
                }
              }}
            >
              {c.checkout}
            </Button>


                <Link to="/shop">
                  <Button variant="outline" className="w-full border-primary/30 hover:border-primary">
                    {c.continueShopping}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
