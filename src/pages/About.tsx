import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Award, Heart, Shield, Users, Target, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "من نحن",
      subtitle: "رحلة الجمال والرفاهية",
      story: "منذ عام 2015، نحن ملتزمون بتقديم منتجات عناية فاخرة بالبشرة تجمع بين العلم والطبيعة. كل منتج مصنوع بعناية فائقة من أجود المكونات الطبيعية.",
      mission: "مهمتنا",
      missionText: "تقديم تجربة عناية بالبشرة فاخرة تجمع بين الفعالية السريرية والملمس الحريري الفاخر.",
      vision: "رؤيتنا",
      visionText: "أن نصبح العلامة التجارية الأولى للعناية الفاخرة بالبشرة في المنطقة، معروفين بجودتنا العالية والتزامنا بالاستدامة.",
      valuesTitle: "قيمنا",
      values: [
        {
          icon: Sparkles,
          title: "التميز",
          description: "نستخدم أفضل المكونات الطبيعية النادرة",
        },
        {
          icon: Award,
          title: "الجودة",
          description: "كل منتج مختبر ومعتمد من أطباء الجلدية",
        },
        {
          icon: Heart,
          title: "الأخلاقيات",
          description: "خالي من التجارب على الحيوانات بنسبة 100%",
        },
        {
          icon: Shield,
          title: "الأمان",
          description: "تركيبات نقية وخالية من المواد الضارة",
        },
      ],
      statsTitle: "إنجازاتنا",
      stats: [
        { icon: Users, number: "50,000+", label: "عميل سعيد" },
        { icon: Award, number: "15+", label: "جائزة دولية" },
        { icon: TrendingUp, number: "98%", label: "رضا العملاء" },
        { icon: Globe, number: "25+", label: "دولة" },
      ],
      teamTitle: "فريقنا",
      teamText: "فريق من الخبراء المتحمسين لجمالك",
      certifications: "شهاداتنا",
      certificationsText: "معتمدون من أفضل المنظمات الدولية للجودة والسلامة",
      sustainability: "الاستدامة",
      sustainabilityText: "نلتزم بممارسات صديقة للبيئة في كل خطوة من عملية الإنتاج. عبواتنا قابلة لإعادة التدوير بالكامل ونحصل على مكوناتنا بطريقة مسؤولة.",
    },
    he: {
      title: "אודות",
      subtitle: "מסע של יופי ויוקרה",
      story: "מאז 2015, אנו מחויבים לספק מוצרי טיפוח יוקרתיים המשלבים מדע וטבע. כל מוצר מיוצר בקפידה רבה מהמרכיבים הטבעיים המשובחים ביותר.",
      mission: "המשימה שלנו",
      missionText: "לספק חווית טיפוח יוקרתית המשלבת יעילות קלינית עם מרקמים משייים מפנקים.",
      vision: "החזון שלנו",
      visionText: "להיות המותג המוביל לטיפוח יוקרתי באזור, ידועים באיכות הגבוהה ובמחויבות שלנו לקיימות.",
      valuesTitle: "הערכים שלנו",
      values: [
        {
          icon: Sparkles,
          title: "מצוינות",
          description: "אנו משתמשים במרכיבים טבעיים נדירים ומשובחים",
        },
        {
          icon: Award,
          title: "איכות",
          description: "כל מוצר נבדק ומאושר על ידי רופאי עור",
        },
        {
          icon: Heart,
          title: "אתיקה",
          description: "ללא ניסויים בבעלי חיים ב-100%",
        },
        {
          icon: Shield,
          title: "בטיחות",
          description: "נוסחאות טהורות וללא חומרים מזיקים",
        },
      ],
      statsTitle: "ההישגים שלנו",
      stats: [
        { icon: Users, number: "50,000+", label: "לקוחות מרוצים" },
        { icon: Award, number: "15+", label: "פרסים בינלאומיים" },
        { icon: TrendingUp, number: "98%", label: "שביעות רצון לקוחות" },
        { icon: Globe, number: "25+", label: "מדינות" },
      ],
      teamTitle: "הצוות שלנו",
      teamText: "צוות מומחים הנלהבים מהיופי שלך",
      certifications: "האישורים שלנו",
      certificationsText: "מאושרים על ידי הארגונים הבינלאומיים הטובים ביותר לאיכות ובטיחות",
      sustainability: "קיימות",
      sustainabilityText: "אנו מחויבים לשיטות ידידותיות לסביבה בכל שלב של תהליך הייצור. האריזות שלנו ניתנות למחזור מלא ואנו משיגים את המרכיבים שלנו באופן אחראי.",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 gold-gradient">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Story */}
        <section className="mb-24 animate-fade-in-up">
          <p className="text-xl text-center leading-relaxed text-foreground max-w-3xl mx-auto">
            {t.story}
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-24">
          <Card className="luxury-card animate-fade-in-up">
            <CardContent className="p-10">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-3xl font-heading font-bold mb-4 gold-text">
                {t.mission}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.missionText}
              </p>
            </CardContent>
          </Card>
          <Card className="luxury-card animate-fade-in-up animate-delay-200">
            <CardContent className="p-10">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-3xl font-heading font-bold mb-4 gold-text">
                {t.vision}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.visionText}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 gold-gradient animate-fade-in">
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, index) => (
              <Card
                key={index}
                className="luxury-card text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="inline-block p-4 rounded-full bg-primary/10 mb-6">
                    <value.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3 gold-text">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-24 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30 -mx-4 px-4 py-20 md:-mx-8 md:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 gold-gradient animate-fade-in">
            {t.statsTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {t.stats.map((stat, index) => (
              <Card
                key={index}
                className="luxury-card text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="text-4xl font-bold gradient-text mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="mb-24">
          <Card className="luxury-card animate-fade-in">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto text-center">
                <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl font-heading font-bold mb-6 gold-gradient">
                  {t.sustainability}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.sustainabilityText}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 gold-gradient animate-fade-in">
            {t.teamTitle}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up">
            {t.teamText}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
