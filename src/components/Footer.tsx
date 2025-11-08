import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Youtube } from "lucide-react";

export const Footer = () => {
  const { language, t } = useLanguage();

  const footerContent = {
    ar: {
      brand: "LUXURY SKIN",
      tagline: "منتجات عناية فاخرة بالبشرة والجسم مصنوعة من مكونات طبيعية نقية",
      quickLinks: "روابط سريعة",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة",
    },
    he: {
      brand: "LUXURY SKIN",
      tagline: "מוצרי טיפוח יוקרתיים לעור ולגוף העשויים ממרכיבים טבעיים טהורים",
      quickLinks: "קישורים מהירים",
      follow: "עקבו אחרינו",
      rights: "כל הזכויות שמורות",
    },
  };

  const content = footerContent[language];

  return (
    <footer className="bg-card border-t gold-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-heading font-bold gold-gradient mb-4">
              {content.brand}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {content.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">
              {content.quickLinks}
            </h4>
            <div className="space-y-2">
              <Link
                to="/shop"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.shop")}
              </Link>
              <Link
                to="/about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                to="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">
              {content.follow}
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
             
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t gold-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2024 {content.brand}. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
