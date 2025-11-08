import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const content = {
    ar: {
      title: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      login: "دخول",
      noAccount: "ليس لديك حساب؟",
      register: "سجل الآن",
      forgot: "نسيت كلمة المرور؟",
    },
    he: {
      title: "התחברות",
      email: "אימייל",
      password: "סיסמה",
      login: "התחבר",
      noAccount: "אין לך חשבון?",
      register: "הירשם עכשיו",
      forgot: "שכחת סיסמה?",
    },
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", email, password);
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
              <label className="block text-sm font-semibold mb-2">
                {t.email}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background border-primary/30 focus:border-primary"
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t.forgot}
              </Link>
            </div>

            <Button type="submit" className="w-full gold-glow" size="lg">
              {t.login}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t.noAccount}{" "}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                {t.register}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
