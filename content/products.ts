// Каталог вымышленного бренда косметики Nafis. Картинки товаров рисуются в SVG (components/ProductArt.tsx).
import type { L } from "@/lib/i18n";

export type Category = "face" | "body" | "hair" | "lips" | "sets";
export type Skin = "dry" | "oily" | "normal" | "sensitive";
export type Shape = "dropper" | "pump" | "jar" | "tube" | "bottle" | "stick" | "set";

export interface Product {
  id: string;
  name: L;
  label: string; // надпись на упаковке
  category: Category;
  skin: Skin[];
  shape: Shape;
  colors: { pack: string; accent: string; bg: string };
  volumes: { size: string; price: number; old?: number }[];
  rating: number;
  badge?: "hit" | "new" | "sale";
  description: L;
  howTo: L;
  ingredients: L[];
  addedDaysAgo: number;
  popularity: number;
}

const P = (p: Product) => p;

export const products: Product[] = [
  P({
    id: "vitc", name: { ru: "Сыворотка с витамином C 15%", uz: "15% C vitaminli zardob" }, label: "VIT C", category: "face", skin: ["normal", "dry", "oily"], shape: "dropper",
    colors: { pack: "#f2a65a", accent: "#7a3e12", bg: "#fdebd3" }, volumes: [{ size: "30 ml", price: 189000 }, { size: "50 ml", price: 279000 }], rating: 4.9, badge: "hit",
    description: { ru: "Выравнивает тон и возвращает коже сияние уже через 2 недели. Стабильная форма витамина C не окисляется.", uz: "Teri rangini tekislaydi va 2 haftada yorqinlikni qaytaradi. C vitaminining barqaror shakli oksidlanmaydi." },
    howTo: { ru: "3–4 капли утром на чистую кожу, затем крем с SPF.", uz: "Ertalab toza teriga 3–4 tomchi, keyin SPF krem." },
    ingredients: [{ ru: "Витамин C 15%", uz: "C vitamini 15%" }, { ru: "Феруловая кислота", uz: "Ferul kislotasi" }, { ru: "Витамин E", uz: "E vitamini" }], addedDaysAgo: 60, popularity: 98,
  }),
  P({
    id: "hyal", name: { ru: "Гиалуроновая сыворотка", uz: "Gialuronli zardob" }, label: "HYALU", category: "face", skin: ["dry", "normal", "sensitive"], shape: "dropper",
    colors: { pack: "#e9b8c4", accent: "#7d2e45", bg: "#fbe3e8" }, volumes: [{ size: "30 ml", price: 169000 }, { size: "50 ml", price: 239000 }], rating: 4.8, badge: "new",
    description: { ru: "Три вида гиалуроновой кислоты увлажняют на разной глубине. Кожа мягкая и упругая весь день.", uz: "Uch xil gialuron kislotasi turli chuqurlikda namlaydi. Teri kun boʻyi yumshoq va elastik." },
    howTo: { ru: "Утром и вечером на влажную кожу, перед кремом.", uz: "Ertalab va kechqurun nam teriga, kremdan oldin." },
    ingredients: [{ ru: "Гиалуроновая кислота", uz: "Gialuron kislotasi" }, { ru: "Пантенол", uz: "Pantenol" }, { ru: "Алоэ", uz: "Aloe" }], addedDaysAgo: 5, popularity: 90,
  }),
  P({
    id: "night", name: { ru: "Ночной крем с ретинолом", uz: "Retinolli tungi krem" }, label: "NIGHT", category: "face", skin: ["normal", "oily"], shape: "jar",
    colors: { pack: "#6d3b5c", accent: "#f4d7e6", bg: "#efdce7" }, volumes: [{ size: "50 ml", price: 259000, old: 299000 }], rating: 4.7, badge: "sale",
    description: { ru: "Мягкий ретинол обновляет кожу за ночь без раздражения. Морщинки и следы постакне становятся менее заметны.", uz: "Yumshoq retinol terini tunda tirnashsiz yangilaydi. Ajinlar va akne izlari kamroq seziladi." },
    howTo: { ru: "Вечером 2–3 раза в неделю, днём обязательно SPF.", uz: "Kechqurun haftasiga 2–3 marta, kunduzi albatta SPF." },
    ingredients: [{ ru: "Ретинол 0,3%", uz: "Retinol 0,3%" }, { ru: "Сквалан", uz: "Skvalan" }, { ru: "Церамиды", uz: "Seramidlar" }], addedDaysAgo: 90, popularity: 85,
  }),
  P({
    id: "spf", name: { ru: "Дневной крем SPF 30", uz: "SPF 30 kunduzgi krem" }, label: "SPF 30", category: "face", skin: ["normal", "dry", "oily", "sensitive"], shape: "tube",
    colors: { pack: "#f6d6b0", accent: "#9a5a1c", bg: "#fdf0df" }, volumes: [{ size: "50 ml", price: 149000 }], rating: 4.8, badge: "hit",
    description: { ru: "Лёгкий крем с защитой от солнца — без белых следов, подходит под макияж. Для ташкентского солнца — must have.", uz: "Quyoshdan himoyalovchi yengil krem — oq izsiz, makiyaj ostiga mos. Toshkent quyoshi uchun — must have." },
    howTo: { ru: "Последним шагом утреннего ухода, обновлять каждые 2–3 часа на солнце.", uz: "Ertalabki parvarishning oxirgi bosqichi, quyoshda har 2–3 soatda yangilang." },
    ingredients: [{ ru: "Фильтры UVA/UVB", uz: "UVA/UVB filtrlari" }, { ru: "Ниацинамид", uz: "Niatsinamid" }], addedDaysAgo: 40, popularity: 96,
  }),
  P({
    id: "foam", name: { ru: "Мягкая пенка для умывания", uz: "Yuvinish uchun yumshoq koʻpik" }, label: "CLEAN", category: "face", skin: ["oily", "normal", "sensitive"], shape: "pump",
    colors: { pack: "#cfe0c3", accent: "#3f5c2c", bg: "#eaf2e3" }, volumes: [{ size: "150 ml", price: 99000 }, { size: "300 ml", price: 169000 }], rating: 4.6,
    description: { ru: "Очищает без стянутости, сохраняет защитный барьер кожи. Подходит для ежедневного умывания утром и вечером.", uz: "Tortishishsiz tozalaydi, terining himoya qatlamini saqlaydi. Har kuni ertalab va kechqurun yuvinish uchun." },
    howTo: { ru: "Вспенить в ладонях, помассировать 30 секунд, смыть.", uz: "Kaftda koʻpirtiring, 30 soniya massaj qiling, yuvib tashlang." },
    ingredients: [{ ru: "Зелёный чай", uz: "Yashil choy" }, { ru: "Аминокислоты", uz: "Aminokislotalar" }], addedDaysAgo: 120, popularity: 80,
  }),
  P({
    id: "toner", name: { ru: "Тоник с розовой водой", uz: "Atirgul suvli tonik" }, label: "ROSE", category: "face", skin: ["dry", "normal", "sensitive"], shape: "bottle",
    colors: { pack: "#f3c1c6", accent: "#8c2f3c", bg: "#fde7ea" }, volumes: [{ size: "200 ml", price: 119000 }], rating: 4.7,
    description: { ru: "Освежает и успокаивает кожу после умывания. Настоящая дистиллированная вода дамасской розы.", uz: "Yuvingandan keyin terini tetiklashtiradi va tinchlantiradi. Damashq atirgulining haqiqiy distillangan suvi." },
    howTo: { ru: "Нанести ватным диском или похлопывающими движениями.", uz: "Paxta disk bilan yoki yengil urib surting." },
    ingredients: [{ ru: "Розовая вода", uz: "Atirgul suvi" }, { ru: "Глицерин", uz: "Glitserin" }], addedDaysAgo: 75, popularity: 77,
  }),
  P({
    id: "clay", name: { ru: "Маска с зелёной глиной", uz: "Yashil loyli niqob" }, label: "CLAY", category: "face", skin: ["oily", "normal"], shape: "jar",
    colors: { pack: "#9fb98d", accent: "#2f4523", bg: "#e5eedc" }, volumes: [{ size: "75 ml", price: 129000 }], rating: 4.5, badge: "new",
    description: { ru: "Сужает поры и убирает жирный блеск за 10 минут. Не пересушивает благодаря маслу ши.", uz: "10 daqiqada teshiklarni toraytiradi va yogʻli yaltiroqlikni yoʻqotadi. Shi moyi tufayli quritmaydi." },
    howTo: { ru: "1–2 раза в неделю на 10 минут, смыть тёплой водой.", uz: "Haftasiga 1–2 marta 10 daqiqaga, iliq suv bilan yuving." },
    ingredients: [{ ru: "Зелёная глина", uz: "Yashil loy" }, { ru: "Масло ши", uz: "Shi moyi" }], addedDaysAgo: 3, popularity: 70,
  }),
  P({
    id: "patch", name: { ru: "Гидрогелевые патчи", uz: "Gidrogel patchlar" }, label: "EYES", category: "face", skin: ["normal", "dry", "sensitive"], shape: "jar",
    colors: { pack: "#e6c77a", accent: "#6b4b10", bg: "#f8eccb" }, volumes: [{ size: "60 шт", price: 139000, old: 169000 }], rating: 4.8, badge: "sale",
    description: { ru: "Убирают отёки и следы недосыпа за 15 минут. С кофеином и экстрактом золотого шёлка.", uz: "15 daqiqada shish va uyqusizlik izlarini yoʻqotadi. Kofein va oltin ipak ekstrakti bilan." },
    howTo: { ru: "Наложить под глаза на 15–20 минут утром.", uz: "Ertalab koʻz ostiga 15–20 daqiqaga qoʻying." },
    ingredients: [{ ru: "Кофеин", uz: "Kofein" }, { ru: "Пептиды", uz: "Peptidlar" }], addedDaysAgo: 30, popularity: 88,
  }),
  P({
    id: "lotion", name: { ru: "Молочко для тела «Хлопок»", uz: "«Paxta» tana sutchasi" }, label: "COTTON", category: "body", skin: ["dry", "normal", "sensitive"], shape: "pump",
    colors: { pack: "#efe3d3", accent: "#7b5a3a", bg: "#f7efe4" }, volumes: [{ size: "250 ml", price: 109000 }, { size: "500 ml", price: 179000 }], rating: 4.7, badge: "hit",
    description: { ru: "Быстро впитывается и не оставляет липкости. Нежный аромат хлопка держится весь день.", uz: "Tez singadi va yopishqoqlik qoldirmaydi. Paxtaning nozik hidi kun boʻyi saqlanadi." },
    howTo: { ru: "После душа на слегка влажную кожу.", uz: "Dushdan keyin biroz nam teriga." },
    ingredients: [{ ru: "Масло хлопка", uz: "Paxta moyi" }, { ru: "Мочевина 5%", uz: "Mochevina 5%" }], addedDaysAgo: 50, popularity: 84,
  }),
  P({
    id: "scrub", name: { ru: "Солевой скраб для тела", uz: "Tana uchun tuzli skrab" }, label: "SCRUB", category: "body", skin: ["normal", "oily"], shape: "jar",
    colors: { pack: "#d9825b", accent: "#5a2611", bg: "#f6dccd" }, volumes: [{ size: "300 g", price: 119000 }], rating: 4.6,
    description: { ru: "Морская соль и масло миндаля: кожа гладкая после первого применения.", uz: "Dengiz tuzi va bodom moyi: birinchi qoʻllashdan keyin teri silliq." },
    howTo: { ru: "На влажную кожу массажными движениями, 1–2 раза в неделю.", uz: "Nam teriga massaj harakatlari bilan, haftasiga 1–2 marta." },
    ingredients: [{ ru: "Морская соль", uz: "Dengiz tuzi" }, { ru: "Масло миндаля", uz: "Bodom moyi" }], addedDaysAgo: 100, popularity: 72,
  }),
  P({
    id: "oil", name: { ru: "Сухое масло для тела", uz: "Tana uchun quruq moy" }, label: "OIL", category: "body", skin: ["dry", "normal"], shape: "bottle",
    colors: { pack: "#d8a24a", accent: "#5e3a07", bg: "#f6e6c6" }, volumes: [{ size: "100 ml", price: 159000 }], rating: 4.9, badge: "new",
    description: { ru: "Лёгкое масло с золотистым мерцанием. Впитывается за минуту, не оставляет следов на одежде.", uz: "Oltinrang yaltiroq yengil moy. Bir daqiqada singadi, kiyimda iz qoldirmaydi." },
    howTo: { ru: "Распылить на тело после душа или перед выходом.", uz: "Dushdan keyin yoki chiqishdan oldin tanaga sepiladi." },
    ingredients: [{ ru: "Масло жожоба", uz: "Jojoba moyi" }, { ru: "Масло абрикосовой косточки", uz: "Oʻrik danagi moyi" }], addedDaysAgo: 8, popularity: 82,
  }),
  P({
    id: "shampoo", name: { ru: "Шампунь с маслом арганы", uz: "Argan moyli shampun" }, label: "ARGAN", category: "hair", skin: ["dry", "normal"], shape: "pump",
    colors: { pack: "#b9a46a", accent: "#4a3d12", bg: "#efe8d2" }, volumes: [{ size: "300 ml", price: 129000 }], rating: 4.6,
    description: { ru: "Бережно очищает и питает сухие и окрашенные волосы. Без сульфатов.", uz: "Quruq va boʻyalgan sochlarni ehtiyotkorlik bilan tozalaydi va oziqlantiradi. Sulfatsiz." },
    howTo: { ru: "Вспенить на влажных волосах, смыть, при необходимости повторить.", uz: "Nam sochda koʻpirtiring, yuving, kerak boʻlsa takrorlang." },
    ingredients: [{ ru: "Масло арганы", uz: "Argan moyi" }, { ru: "Кератин", uz: "Keratin" }], addedDaysAgo: 140, popularity: 74,
  }),
  P({
    id: "hairmask", name: { ru: "Маска для волос «Какао»", uz: "«Kakao» soch niqobi" }, label: "COCOA", category: "hair", skin: ["dry", "normal"], shape: "jar",
    colors: { pack: "#8a5a44", accent: "#f6e2d4", bg: "#ecdcd3" }, volumes: [{ size: "250 ml", price: 149000 }], rating: 4.8,
    description: { ru: "Глубокое восстановление за 5 минут. Волосы гладкие и блестящие, легко расчёсываются.", uz: "5 daqiqada chuqur tiklash. Sochlar silliq va yaltiroq, oson taraladi." },
    howTo: { ru: "После шампуня на длину на 5 минут, смыть.", uz: "Shampundan keyin uzunlikka 5 daqiqaga, yuvib tashlang." },
    ingredients: [{ ru: "Масло какао", uz: "Kakao moyi" }, { ru: "Протеины шёлка", uz: "Ipak oqsillari" }], addedDaysAgo: 65, popularity: 76,
  }),
  P({
    id: "balm", name: { ru: "Бальзам для губ «Гранат»", uz: "«Anor» lab balzami" }, label: "LIPS", category: "lips", skin: ["dry", "normal", "sensitive", "oily"], shape: "stick",
    colors: { pack: "#c44b5a", accent: "#fbe1e4", bg: "#f9dde0" }, volumes: [{ size: "4 g", price: 59000 }], rating: 4.9, badge: "hit",
    description: { ru: "Питает и защищает губы, даёт лёгкий гранатовый оттенок.", uz: "Lablarni oziqlantiradi va himoya qiladi, yengil anor tusini beradi." },
    howTo: { ru: "Наносить в течение дня по необходимости.", uz: "Kun davomida kerak boʻlganda surting." },
    ingredients: [{ ru: "Масло граната", uz: "Anor moyi" }, { ru: "Пчелиный воск", uz: "Asalari mumi" }], addedDaysAgo: 20, popularity: 92,
  }),
  P({
    id: "morning", name: { ru: "Набор «Утренний ритуал»", uz: "«Ertalabki marosim» toʻplami" }, label: "SET", category: "sets", skin: ["normal", "dry", "oily"], shape: "set",
    colors: { pack: "#f2a65a", accent: "#7a3e12", bg: "#fbe7cf" }, volumes: [{ size: "3 шт", price: 359000, old: 437000 }], rating: 4.9, badge: "sale",
    description: { ru: "Пенка, сыворотка с витамином C и крем SPF 30 — полный утренний уход со скидкой 18%.", uz: "Koʻpik, C vitaminli zardob va SPF 30 krem — 18% chegirmali toʻliq ertalabki parvarish." },
    howTo: { ru: "Пенка → сыворотка → крем SPF.", uz: "Koʻpik → zardob → SPF krem." },
    ingredients: [{ ru: "3 средства в подарочной коробке", uz: "Sovgʻa qutisida 3 ta vosita" }], addedDaysAgo: 15, popularity: 89,
  }),
  P({
    id: "gift", name: { ru: "Набор «Подарок маме»", uz: "«Onamga sovgʻa» toʻplami" }, label: "GIFT", category: "sets", skin: ["dry", "normal", "sensitive"], shape: "set",
    colors: { pack: "#c44b5a", accent: "#fbe1e4", bg: "#f8dadf" }, volumes: [{ size: "4 шт", price: 399000, old: 487000 }], rating: 5.0, badge: "new",
    description: { ru: "Тоник с розой, гиалуроновая сыворотка, молочко для тела и бальзам для губ в праздничной упаковке.", uz: "Atirgulli tonik, gialuronli zardob, tana sutchasi va lab balzami bayramona qadoqda." },
    howTo: { ru: "Готовый подарок — открытка внутри.", uz: "Tayyor sovgʻa — ichida otkritka." },
    ingredients: [{ ru: "4 средства и открытка", uz: "4 ta vosita va otkritka" }], addedDaysAgo: 2, popularity: 86,
  }),
];

export const categories: Category[] = ["face", "body", "hair", "lips", "sets"];
export const skins: Skin[] = ["dry", "oily", "normal", "sensitive"];

export const FREE_DELIVERY_FROM = 500000;
export const PROMO = { code: "DEMO20", percent: 20 };
export const delivery = {
  courier: 25000,
  region: 45000,
  pickup: 0,
};
