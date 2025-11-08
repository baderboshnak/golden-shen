import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Register = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const content = {
    ar: {
      title: "إنشاء حساب جديد",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      register: "تسجيل",
      haveAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
    },
    he: {
      title: "צור חשבון חדש",
      name: "שם מלא",
      email: "אימייל",
      password: "סיסמה",
      confirmPassword: "אימות סיסמה",
      register: "הרשם",
      haveAccount: "יש לך כבר חשבון?",
      login: "התחבר",
    },
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-card border-primary/20 animate-fade-in">
        <CardContent className="p-8">
          <h1 className="text-3xl font-heading font-bold mb-8 text-center gold-gradient">
            {t.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{t.name}</label>
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
              <label className="block text-sm font-semibold mb-2">{t.email}</label>
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
                {t.password}
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-background border-primary/30 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t.confirmPassword}
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="bg-background border-primary/30 focus:border-primary"
              />
            </div>

            <Button type="submit" className="w-full gold-glow" size="lg">
              {t.register}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t.haveAccount}{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                {t.login}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
