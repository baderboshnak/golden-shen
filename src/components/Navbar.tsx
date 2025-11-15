import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const nav = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        setLoggedIn(true);
        try {
          setUsername(JSON.parse(user).username || "");
        } catch {
          setUsername("");
        }
      } else {
        setLoggedIn(false);
        setUsername("");
      }
    };

    checkLogin();
    window.addEventListener("auth:changed", checkLogin);
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("auth:changed", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:changed"));
    nav("/login");
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b gold-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo (desktop: with title, mobile: image only) */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={closeMobile}
          >
            <img
              src={logo}
              alt="Company Logo"
              className="w-12 h-12 md:w-20 md:h-20 object-contain"
            />
            {/* hide title on very small screens to avoid crowding */}
            <h1 className="ml-2 text-xl md:text-3xl font-heading font-bold text-amber-400 hidden sm:block">
              DELUXE SKIN
            </h1>
          </Link>

          {/* Desktop navigation – EXACTLY like before */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.home")}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-foreground hover:text-primary transition-all"
              >
                {t("nav.admin")}
              </Link>
            )}
            {loggedIn && (
              <Link
                to="/profile"
                className="text-foreground hover:text-primary transition-all"
              >
                {t("nav.profile")}
              </Link>
            )}
            <Link
              to="/shop"
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.shop")}
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* Right side (desktop + mobile) */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language always visible */}
            <LanguageSwitcher />

            {/* Desktop user + cart (unchanged) */}
            <div className="hidden md:flex items-center gap-3">
              {!loggedIn ? (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold max-w-[140px] truncate">
                    {username}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    {t("nav.logout") || "Logout"}
                  </Button>
                </div>
              )}

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:text-primary transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile: cart + hamburger in the right side */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Cart icon (with count) */}
              <Link to="/cart" onClick={closeMobile}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:text-primary transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Hamburger */}
              <button
                className="inline-flex items-center justify-center rounded-full p-2 border border-border hover:bg-accent transition"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu only */}
      <div
        className={`md:hidden bg-background/95 border-t border-border overflow-hidden transition-all duration-200 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={closeMobile}
            className="text-foreground hover:text-primary transition-all"
          >
            {t("nav.home")}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={closeMobile}
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.admin")}
            </Link>
          )}
          {loggedIn && (
            <Link
              to="/profile"
              onClick={closeMobile}
              className="text-foreground hover:text-primary transition-all"
            >
              {t("nav.profile")}
            </Link>
          )}
          <Link
            to="/shop"
            onClick={closeMobile}
            className="text-foreground hover:text-primary transition-all"
          >
            {t("nav.shop")}
          </Link>
          <Link
            to="/about"
            onClick={closeMobile}
            className="text-foreground hover:text-primary transition-all"
          >
            {t("nav.about")}
          </Link>
          <Link
            to="/contact"
            onClick={closeMobile}
            className="text-foreground hover:text-primary transition-all"
          >
            {t("nav.contact")}
          </Link>

          <div className="mt-2">
            {!loggedIn ? (
              <Link
                to="/login"
                onClick={closeMobile}
                className="text-foreground hover:text-primary flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>{t("nav.login") || "Login"}</span>
              </Link>
            ) : (
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 px-0"
                onClick={handleLogout}
              >
                {t("nav.logout") || "Logout"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
