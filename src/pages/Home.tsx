import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Leaf, Heart, Award, Shield, Truck, Clock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import talkingVideo from "@/assets/video.mp4";

import amandaCream from "@/assets/a.jpg";
import amandaxBottle from "@/assets/download.png";
import facialWash from "@/assets/b.png";
import hair from "@/assets/intro-1592229825.jpg"
type LocalProduct = {
  id: string;
  img: string;
  name_ar: string;
  name_he: string;
  price: number;
};

const Home = () => {
  const { language, t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({ features: false, products: false /* collections optional */ });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const featuresSection = document.getElementById("features");
      const productsSection = document.getElementById("products");
      if (featuresSection && window.scrollY + window.innerHeight > featuresSection.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, features: true }));
      }
      if (productsSection && window.scrollY + window.innerHeight > productsSection.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, products: true }));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = {
    ar: [
      { icon: Shield, title: "ضمان الجودة", desc: "منتجات معتمدة ومختبرة من قبل أطباء الجلدية" },
      { icon: Truck, title: "شحن سريع", desc: "شحن سريع خلال أيام" },
      { icon: Clock, title: "دعم 24/7", desc: "فريق خدمة العملاء جاهز للمساعدة على مدار الساعة" },
    ],
    he: [
      { icon: Shield, title: "אחריות איכות", desc: "מוצרים מאושרים ונבדקים על ידי רופאי עור" },
      { icon: Truck, title: "משלוח מהיר", desc: "משלוח מהיר בתוך ימים" },
      { icon: Clock, title: "תמיכה 24/7", desc: "צוות שירות הלקוחות זמין לעזרה 24 שעות ביממה" },
    ],
  } as const;

  const catalog: LocalProduct[] = [
    {
      id: "amanda-cream",
      img: amandaCream,
      name_ar: "AMANDA كريم إزالة التصبغات",
      name_he: "AMANDA קרם אנטי פיגמנטציה",
      price: 199,
    },
    {
      id: "amandax",
      img: amandaxBottle,
      name_ar: "AMANDAX كبسولات للتنحيف الصحي",
      name_he: "AMANDAX קפסולות להרזיה בריאה",
      price: 159,
    },
    {
      id: "facial-wash",
      img: facialWash,
      name_ar: "AMANDA غسول وجه مطهّر",
      name_he: "AMANDA סבון פנים מטהר",
      price: 89,
    },
  ];

  const collections = [
    { img: hair, titleAr: "الشعر", titleHe: "שיער" },
    { img: amandaxBottle, titleAr: "الجسم", titleHe: "גוף" },
    { img: facialWash, titleAr: "البشرة ", titleHe: "עור" },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${heroImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 gradient-text leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-3xl text-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            {t("tagline")}
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="gold-glow hover:scale-110 transition-all duration-300 px-8 py-6 text-lg animate-pulse-glow"
            >
              {t("hero.cta")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Talking Video */}
      <section id="story-video" className="py-24 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-muted-foreground text-center mb-10">
            {language === "ar"
              ? "حديث قصير يعرّفكم على رؤيتنا ومنتجنا المميّز."
              : "מסר קצר על החזון שלנו והמוצר המוביל."}
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-primary/20 bg-black">
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 z-10 grid place-items-center bg-black/40 hover:bg-black/30 transition-colors"
                aria-label="Play video"
              >
                <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/90 text-background text-2xl">
                  ►
                </span>
              </button>
            )}

            <video
              ref={videoRef}
              src={talkingVideo}
              controls
              preload="metadata"
              className="w-full aspect-video object-contain bg-black"
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isVisible.features ? "" : "opacity-0"}`}>
            {[Sparkles, Leaf, Heart, Award].map((Icon, index) => (
              <Card
                key={index}
                className={`luxury-card group ${isVisible.features ? "animate-reveal-up" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <Icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {t(["usp.clean", "usp.tested", "usp.cruelty", "usp.secure"][index])}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products – images zoomed OUT */}
      <section id="products" className="py-32 px-4 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 gradient-text text-center">
            {language === "ar" ? "منتجاتنا المميزة" : "המוצרים המובילים שלנו"}
          </h2>
        </div>

        <div className="container mx-auto">
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto text-center mb-16">
            {language === "ar" ? "اختيارات خاصة لعناية استثنائية بجمالك" : "בחירות מיוחדות לטיפול יוצא דופן ביופי שלך"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {catalog.map((p, index) => (
              <Card
                key={p.id}
                className={`group luxury-card ${isVisible.products ? "animate-reveal-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Centered box with padding to avoid crop */}
                <div className="relative aspect-square flex items-center justify-center bg-background p-4">
                  <img
                    src={p.img}
                    alt={language === "ar" ? p.name_ar : p.name_he}
                    className="w-full h-full object-fill scale-120 transition-transform duration-700 group-hover:scale-125"
                  />
                </div>

                <CardContent className="p-8">
                  <h3 className="font-heading font-semibold text-xl mb-2">
                    {language === "ar" ? p.name_ar : p.name_he}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold gradient-text">{p.price} ₪</span>
                    <Link to={`/product/${p.id}`}>
                      <Button size="sm" className="gold-glow">
                        {t("product.viewDetails")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collections – now styled like Products */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-16 gradient-text text-center animate-fade-in">
            {language === "ar" ? "تسوقي حسب الاهتمامات" : "קנו לפי עניין"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {collections.map((c, index) => (
              <Card
                key={index}
                className={`group luxury-card ${isVisible.products ? "animate-reveal-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Same image container behavior as products */}
                <div className="relative aspect-square flex items-center justify-center bg-background p-4">
                  <img
                    src={c.img}
                    alt={language === "ar" ? c.titleAr : c.titleHe}
                    className="w-full h-full object-cover scale-120 transition-transform duration-700 group-hover:scale-125"
                  />
                </div>

                <CardContent className="p-8">
                  <h3 className="font-heading font-semibold text-xl mb-2 text-center">
                    {language === "ar" ? c.titleAr : c.titleHe}
                  </h3>

                  <div className="flex items-center justify-center">
                    <Link to="/shop">
                      <Button size="sm" className="gold-glow">
                        {language === "ar" ? "تسوّقي الآن" : "קנו עכשיו"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-16 gradient-text">
            {language === "ar" ? "لماذا تختارنا" : "למה לבחור בנו"}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {benefits[language].map((benefit, index) => (
              <Card
                key={index}
                className="luxury-card text-center animate-fade-in-up w-[280px] md:w-[300px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 flex flex-col items-center">
                  <benefit.icon className="h-14 w-14 text-primary mb-6" />
                  <h3 className="font-heading font-semibold text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
