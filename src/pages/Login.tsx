import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const { language } = useLanguage();
  const nav = useNavigate();

  const [username, setUsername] = useState(""); // CHANGED
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const content = {
    ar: {
      title: "تسجيل الدخول",
      email: "اسم المستخدم",
      password: "كلمة المرور",
      login: "دخول",
      noAccount: "ليس لديك حساب؟",
      register: "سجل الآن",
      forgot: "نسيت كلمة المرور؟",
      error: "فشل تسجيل الدخول, تحقق من التفاصيل",
    },
    he: {
      title: "התחברות",
      email: "שם משתמש",
      password: "סיסמה",
      login: "התחבר",
      noAccount: "אין לך חשבון?",
      register: "הירשם עכשיו",
      forgot: "שכחת סיסמה?",
      error: "ההתחברות נכשלה, בדוק את הפרטים",
    },
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // backend expects: username, password
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || t.error);
        return;
      }

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      nav("/");
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
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
                {t.email} {/* now means "username" */}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full gold-glow"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "..." : t.login}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t.noAccount}{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-semibold"
              >
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
