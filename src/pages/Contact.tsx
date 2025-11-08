import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const content = {
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا للمساعدة",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      subject: "الموضوع",
      message: "رسالتك",
      send: "إرسال الرسالة",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      locationLabel: "الموقع",
      hoursLabel: "ساعات العمل",
      hours: "الأحد - الخميس: 9:00 - 18:00",
      location: "الرياض، المملكة العربية السعودية",
      success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          question: "كيف يمكنني تتبع طلبي؟",
          answer: "يمكنك تتبع طلبك من خلال صفحة حسابي > طلباتي. ستصلك أيضاً رسالة بريد إلكتروني تحتوي على رابط التتبع فور شحن طلبك.",
        },
        {
          question: "ما هي سياسة الإرجاع؟",
          answer: "نوفر إرجاع مجاني خلال 30 يوم من تاريخ الاستلام للمنتجات غير المفتوحة. يرجى التواصل معنا لبدء عملية الإرجاع.",
        },
        {
          question: "هل المنتجات مناسبة للبشرة الحساسة؟",
          answer: "نعم، جميع منتجاتنا مختبرة من قبل أطباء الجلدية ومناسبة للبشرة الحساسة. ننصح دائماً بإجراء اختبار على منطقة صغيرة أولاً.",
        },
        {
          question: "كم تستغرق عملية التوصيل؟",
          answer: "نوصل خلال 2-3 أيام عمل للطلبات داخل الرياض، و3-5 أيام عمل للمدن الأخرى. الشحن مجاني للطلبات فوق 199 ر.س",
        },
        {
          question: "هل تقدمون عينات مجانية؟",
          answer: "نعم! نضيف عينات مجانية مع كل طلب حتى تتمكني من تجربة منتجات جديدة.",
        },
      ],
    },
    he: {
      title: "צור קשר",
      subtitle: "אנחנו כאן לעזור",
      name: "שם",
      email: "אימייל",
      phone: "טלפון",
      subject: "נושא",
      message: "ההודעה שלך",
      send: "שלח הודעה",
      emailLabel: "אימייל",
      phoneLabel: "טלפון",
      whatsappLabel: "וואטסאפ",
      locationLabel: "מיקום",
      hoursLabel: "שעות פתיחה",
      hours: "ראשון - חמישי: 9:00 - 18:00",
      location: "ריאד, ערב הסעודית",
      success: "ההודעה נשלחה בהצלחה! ניצור איתך קשר בקרוב.",
      faqTitle: "שאלות נפוצות",
      faqs: [
        {
          question: "איך אני יכול לעקוב אחרי ההזמנה שלי?",
          answer: "אתה יכול לעקוב אחרי ההזמנה דרך החשבון שלי > ההזמנות שלי. תקבל גם אימייל עם קישור למעקב ברגע שההזמנה תישלח.",
        },
        {
          question: "מה מדיניות ההחזרות?",
          answer: "אנו מציעים החזרה חינם תוך 30 יום מתאריך הקבלה למוצרים שלא נפתחו. אנא צור קשר איתנו כדי להתחיל את תהליך ההחזרה.",
        },
        {
          question: "האם המוצרים מתאימים לעור רגיש?",
          answer: "כן, כל המוצרים שלנו נבדקו על ידי רופאי עור ומתאימים לעור רגיש. אנו תמיד ממליצים לבצע בדיקה באזור קטן תחילה.",
        },
        {
          question: "כמה זמן לוקח המשלוח?",
          answer: "אנו מספקים תוך 2-3 ימי עסקים להזמנות בריאד, ו-3-5 ימי עסקים לערים אחרות. משלוח חינם להזמנות מעל ₪199",
        },
        {
          question: "האם אתם מציעים דגימות חינם?",
          answer: "כן! אנו מוסיפים דגימות חינם עם כל הזמנה כדי שתוכל לנסות מוצרים חדשים.",
        },
      ],
    },
  };

  const c = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: c.success,
      duration: 3000,
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 gold-gradient">
            {c.title}
          </h1>
          <p className="text-xl text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-up">
            <Card className="luxury-card">
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {c.emailLabel}
                  </h3>
                  <p className="text-muted-foreground">info@luxuryskin.com</p>
                  <p className="text-muted-foreground">support@luxuryskin.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6 flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {c.phoneLabel}
                  </h3>
                  <p className="text-muted-foreground" dir="ltr">+966 50 123 4567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6 flex items-start gap-4">
                <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {c.whatsappLabel}
                  </h3>
                  <p className="text-muted-foreground" dir="ltr">+966 50 123 4567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {c.locationLabel}
                  </h3>
                  <p className="text-muted-foreground">{c.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6 flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {c.hoursLabel}
                  </h3>
                  <p className="text-muted-foreground">{c.hours}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="luxury-card animate-fade-in-up animate-delay-200">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {c.name}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-background border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {c.email}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {c.phone}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-background border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {c.subject}
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="bg-background border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {c.message}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-background border-primary/30 focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" className="w-full gold-glow" size="lg">
                  <Send className="ml-2 h-5 w-5" />
                  {c.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <section className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 gold-gradient text-center">
            {c.faqTitle}
          </h2>
          <Card className="luxury-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {c.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
