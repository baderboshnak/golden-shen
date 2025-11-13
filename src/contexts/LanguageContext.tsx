import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Language = "ar" | "he";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.blog": "المدونة",
    
    // Home Hero
    "hero.title": "ارفعي مستوى روتين العناية ببشرتك",
    "hero.cta": "تسوقي الأكثر مبيعاً",
    
    // USPs
    "usp.clean": "تركيبات نقية",
    "usp.tested": "مختبر من قبل أطباء الجلدية",
    "usp.cruelty": "خالي من التجارب على الحيوانات",
    "usp.secure": "دفع آمن",
    
    // Collections
    "collection.hydration": "الترطيب",
    "collection.glow": "الإشراق",
    "collection.body": "العناية بالجسم",
    "collection.sensitive": "البشرة الحساسة",
    
    // Product
    "product.addToCart": "أضف إلى السلة",
    "product.buyNow": "اشتري الآن",
    "product.viewDetails": "عرض التفاصيل",
    "product.inStock": "متوفر",
    "product.outOfStock": "نفد من المخزون",
    
    // Common
    "common.apply": "تطبيق",
    "common.clear": "مسح",
    "common.price": "السعر",
    "common.currency": "₪",
    
    // Newsletter
    "newsletter.title": "احصل على 10٪ خصم على طلبك الأول",
    "newsletter.placeholder": "بريدك الإلكتروني",
    "newsletter.subscribe": "اشترك",
    "newsletter.newsletterText": "احصلي على آخر العروض والنصائح الحصرية للعناية بالبشرة",
    
    // Tagline
    "tagline": "عناية طبية لطيفة. فعّالة بشكل واضح.",
    
    // Policies
    "policy.returns": "إرجاع خلال 30 يوماً على المنتجات غير المفتوحة",
    "policy.shipping": "شحن مجاني للطلبات فوق 199 ر.س",
  },
  he: {
    // Navigation
    "nav.home": "בית",
    "nav.shop": "חנות",
    "nav.about": "אודות",
    "nav.contact": "צור קשר",
    "nav.blog": "בלוג",
    
    // Home Hero
    "hero.title": "העלו את שגרת הטיפוח שלכם",
    "hero.cta": "רכשו רבי מכר",
    
    // USPs
    "usp.clean": "נוסחאות נקיות",
    "usp.tested": "נבדק דרמטולוגית",
    "usp.cruelty": "ללא ניסויים בבעלי חיים",
    "usp.secure": "תשלום מאובטח",
    
    // Collections
    "collection.hydration": "לחות",
    "collection.glow": "זוהר",
    "collection.body": "טיפוח גוף",
    "collection.sensitive": "עור רגיש",
    
    // Product
    "product.addToCart": "הוסף לעגלה",
    "product.buyNow": "קנה עכשיו",
    "product.viewDetails": "לפרטים",
    "product.inStock": "במלאי",
    "product.outOfStock": "אזל מהמלאי",
    
    // Common
    "common.apply": "החל",
    "common.clear": "נקה",
    "common.price": "מחיר",
    "common.currency": "₪",
    
    // Newsletter
    "newsletter.title": "קבלו 10% הנחה על ההזמנה הראשונה",
    "newsletter.placeholder": "האימייל שלך",
    "newsletter.subscribe": "הירשם",
    "newsletter.newsletterText": "קבלו את ההצעות האחרונות והטיפים הבלעדיים לטיפוח העור",
    
    // Tagline
    "tagline": "עדין רפואית. יעיל בעליל.",
    
    // Policies
    "policy.returns": "החזרה תוך 30 יום למוצרים שלא נפתחו",
    "policy.shipping": "משלוח חינם בקנייה מעל ₪199",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("he");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = "rtl"; // Both Arabic and Hebrew are RTL
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Initialize RTL on mount
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
