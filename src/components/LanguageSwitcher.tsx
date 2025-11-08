import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "ar" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("ar")}
        className="font-body transition-all duration-300 hover:gold-glow"
      >
        عربي
      </Button>
      <Button
        variant={language === "he" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("he")}
        className="font-body transition-all duration-300 hover:gold-glow"
      >
        עברית
      </Button>
    </div>
  );
};
