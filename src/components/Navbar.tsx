import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const nav = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
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
  // Check login state on mount and whenever route or storage changes
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        setLoggedIn(true);
        try {
          const parsed = JSON.parse(user);
          setUsername(parsed.username || "");
        } catch {
          setUsername("");
        }
      } else {
        setLoggedIn(false);
        setUsername("");
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, [location]);

 const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth:changed"));  // notify
  nav("/login");
};

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
            <Link to="/" className="text-foreground hover:text-primary transition-all">{t("nav.home")}</Link>
              {isAdmin && <Link to="/admin" className="text-foreground hover:text-primary transition-all">{t("nav.admin")}</Link>} 
             {loggedIn && <Link to="/profile" className="text-foreground hover:text-primary transition-all">{t("nav.profile")}</Link> }    
            <Link to="/shop" className="text-foreground hover:text-primary transition-all">{t("nav.shop")}</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-all">{t("nav.about")}</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-all">{t("nav.contact")}</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {!loggedIn ? (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{username}</span>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  {t("nav.logout") || "Logout"}
                </Button>
              </div>
            )}

            {/* Cart */}
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
