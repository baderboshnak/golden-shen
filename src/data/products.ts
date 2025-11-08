import amandaCream from "@/assets/a.jpg";
import amandaxBottle from "@/assets/download.png";
import facialWash from "@/assets/b.png";

export interface Product {
  id: number;
  slug: string;
  name_ar: string;
  name_he: string;
  short_ar: string;
  short_he: string;
  description_ar: string;
  description_he: string;
  how_to_use_ar: string;
  how_to_use_he: string;
  ingredients_ar: string[];
  ingredients_he: string[];
  category: "face" | "body" | "hair";
  skin_type: string[];
  concerns: string[];
  variants: {
    sku: string;
    name: string;
    size: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
  }[];
  images: string[];
  video?: string;
  badges?: string[];
  rating: {
    avg: number;
    count: number;
  };
}

export const products: Product[] = [
  {
    id: 1,
    slug: "amanda-cream",
    name_ar: "AMANDA كريم إزالة التصبغات",
    name_he: "AMANDA קרם אנטי-פיגמנטציה",
    short_ar: "يقلّل البقع ويمنح إشراقة متوازنة",
    short_he: "מפחית כתמים ומחזיר זוהר מאוזן",
    description_ar:
      "تركيبة مركّزة لتفتيح التصبغات وتوحيد لون البشرة مع ترطيب يحافظ على نعومتها. مناسب للاستخدام اليومي.",
    description_he:
      "נוסחה מרוכזת להפחתת פיגמנטציה ואחידות גוון העור, עם לחות מתמשכת. מתאים לשימוש יומיומי.",
    how_to_use_ar:
      "يوضع على بشرة نظيفة صباحاً ومساءً على المناطق المطلوبة أو كامل الوجه. استخدمي واقي شمس صباحاً.",
    how_to_use_he:
      "למרוח על עור נקי בוקר וערב על האזורים הדרושים או על כל הפנים. להשתמש במסנן קרינה בבוקר.",
    ingredients_ar: ["نياسيناميد", "فيتامين C", "حمض الهيالورونيك", "مستخلص العرقسوس"],
    ingredients_he: ["ניאצינאמיד", "ויטמין C", "חומצה היאלורונית", "תמצית ליקוריץ"],
    category: "face",
    skin_type: ["جميع أنواع البشرة", "כל סוגי העור"],
    concerns: ["تصبغات", "بهتان", "جفاف"],
    variants: [
      { sku: "AMC-50", name: "50ml", size: "50ml", price: 199, stock: 120 },
      { sku: "AMC-100", name: "100ml", size: "100ml", price: 319, compareAtPrice: 349, stock: 80 },
    ],
    images: [amandaCream, amandaCream, amandaCream],
    badges: ["الأكثر مبيعاً"],
    rating: { avg: 4.8, count: 312 },
  },
  {
    id: 2,
    slug: "amandax",
    name_ar: "AMANDAX كبسولات للتنحيف الصحي",
    name_he: "AMANDAX קפסולות להרזיה בריאה",
    short_ar: "دعم إدارة الوزن وطاقة متوازنة",
    short_he: "תמיכה בניהול משקל ואנרגיה מאוזנת",
    description_ar:
      "صيغة نباتية لدعم الحرق وتقليل الشهية مع فيتامينات أساسية. تُستخدم ضمن نظام غذائي متوازن ونشاط بدني.",
    description_he:
      "פורמולה צמחית לתמיכה במטבוליזם ובהפחתת תיאבון, עם ויטמינים חיוניים. לשימוש לצד תזונה ופעילות.",
    how_to_use_ar:
      "كبسولة واحدة مرتين يومياً بعد الطعام. اشربي ماء كافٍ. غير مناسب للحوامل والمرضعات.",
    how_to_use_he:
      "קפסולה אחת פעמיים ביום לאחר אוכל. לשתות מים בכמות מספקת. לא מתאים לנשים בהריון/מניקות.",
    ingredients_ar: ["مستخلص الشاي الأخضر", "L-كارنيتين", "فيتامين B6", "كروم"],
    ingredients_he: ["תמצית תה ירוק", "L-קרניטין", "ויטמין B6", "כרום"],
    category: "body",
    skin_type: [],
    concerns: ["إدارة الوزن"],
    variants: [
      { sku: "AMX-60", name: "60 كبسولة", size: "60 caps", price: 159, stock: 150 },
      { sku: "AMX-120", name: "120 كبسولة", size: "120 caps", price: 279, compareAtPrice: 299, stock: 90 },
    ],
    images: [amandaxBottle, amandaxBottle, amandaxBottle],
    badges: ["جديد"],
    rating: { avg: 4.6, count: 174 },
  },
  {
    id: 3,
    slug: "facial-wash",
    name_ar: "AMANDA غسول وجه مطهّر",
    name_he: "AMANDA סבון פנים מטהר",
    short_ar: "تنظيف لطيف بدون جفاف",
    short_he: "ניקוי עדין בלי לייבש",
    description_ar:
      "غسول جل خفيف يزيل الشوائب والزيوت الزائدة مع المحافظة على توازن الترطيب. مناسب للاستخدام اليومي.",
    description_he:
      "ג'ל ניקוי עדין המסיר לכלוך ושומן עודף תוך שמירה על לחות מאוזנת. מתאים לשימוש יומיומי.",
    how_to_use_ar:
      "بللي الوجه ودلّكي كمية مناسبة برفق ثم اشطفي جيداً. استخدمي صباحاً ومساءً.",
    how_to_use_he:
      "להרטיב את הפנים, לעסות כמות מתאימה ולשטוף היטב. לשימוש בוקר וערב.",
    ingredients_ar: ["الألوفيرا", "حمض السالسيليك 0.5%", "البابونج"],
    ingredients_he: ["אלוורה", "חומצה סליצילית 0.5%", "קמומיל"],
    category: "face",
    skin_type: ["مختلطة", "دهنية", "רגישה"],
    concerns: ["شوائب", "دهون زائدة"],
    variants: [
      { sku: "FW-200", name: "200ml", size: "200ml", price: 89, stock: 200 },
      { sku: "FW-400", name: "400ml", size: "400ml", price: 149, compareAtPrice: 169, stock: 120 },
    ],
    images: [facialWash, facialWash, facialWash],
    rating: { avg: 4.7, count: 256 },
  },
];
