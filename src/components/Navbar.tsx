import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { t } = useLanguage();
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b gold-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-amber-400">
              LUXURY SKIN
            </h1>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-all duration-300">
              {t("nav.home")}
            </Link>
            <Link to="/shop" className="text-foreground hover:text-primary transition-all duration-300">
              {t("nav.shop")}
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-all duration-300">
              {t("nav.about")}
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-all duration-300">
              {t("nav.contact")}
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
