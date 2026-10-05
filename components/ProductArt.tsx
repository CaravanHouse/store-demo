import { useId } from "react";
import type { Product } from "@/content/products";

// Светлый ли цвет — чтобы надпись на белой этикетке всегда читалась
const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 170;
};

// Иллюстрация упаковки: рисуем форму флакона по типу товара, цвета — из каталога.
// В настоящем магазине здесь были бы фото товаров.
export default function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  const id = useId().replace(/:/g, "");
  const { pack, accent } = product.colors;
  const gloss = `gloss-${id}`;
  const shade = `shade-${id}`;
  const ink = isLight(accent) ? pack : accent;

  const label = (y: number, w = 46) => (
    <g>
      <rect x={100 - w / 2} y={y} width={w} height={34} rx={5} fill="#fffaf5" opacity={0.92} />
      <text x={100} y={y + 13} textAnchor="middle" fontSize={7} letterSpacing={2} fill={ink} opacity={0.7} fontFamily="Georgia, serif">
        NAFIS
      </text>
      <text x={100} y={y + 26} textAnchor="middle" fontSize={product.label.length > 5 ? 9 : 11} fontWeight={700} letterSpacing={1} fill={ink} fontFamily="ui-sans-serif, system-ui">
        {product.label}
      </text>
    </g>
  );

  const body = (() => {
    switch (product.shape) {
      case "dropper":
        return (
          <>
            <rect x={70} y={98} width={60} height={104} rx={14} fill={pack} />
            <rect x={70} y={98} width={60} height={104} rx={14} fill={`url(#${shade})`} />
            <rect x={86} y={84} width={28} height={18} rx={3} fill={accent} opacity={0.85} />
            <rect x={89} y={52} width={22} height={34} rx={10} fill={accent} />
            {label(132)}
            <rect x={76} y={104} width={9} height={90} rx={4.5} fill={`url(#${gloss})`} />
          </>
        );
      case "pump":
        return (
          <>
            <rect x={66} y={84} width={68} height={120} rx={16} fill={pack} />
            <rect x={66} y={84} width={68} height={120} rx={16} fill={`url(#${shade})`} />
            <rect x={90} y={64} width={20} height={22} rx={3} fill={accent} />
            <rect x={84} y={56} width={32} height={10} rx={4} fill={accent} />
            <path d="M116 58h22a6 6 0 0 1 6 6v4h-8v-2h-20z" fill={accent} />
            {label(128, 50)}
            <rect x={72} y={92} width={9} height={104} rx={4.5} fill={`url(#${gloss})`} />
          </>
        );
      case "jar":
        return (
          <>
            <rect x={54} y={138} width={92} height={64} rx={14} fill={pack} />
            <rect x={54} y={138} width={92} height={64} rx={14} fill={`url(#${shade})`} />
            <rect x={50} y={112} width={100} height={30} rx={9} fill={accent} />
            <rect x={56} y={116} width={88} height={5} rx={2.5} fill="#fff" opacity={0.18} />
            {label(152, 56)}
            <rect x={60} y={144} width={8} height={52} rx={4} fill={`url(#${gloss})`} />
          </>
        );
      case "tube":
        return (
          <>
            <path d="M64 62h72l-8 120H72z" fill={pack} />
            <path d="M64 62h72l-8 120H72z" fill={`url(#${shade})`} />
            <rect x={62} y={56} width={76} height={10} rx={2} fill={pack} />
            <path d="M62 58h76" stroke={accent} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="3 3" />
            <rect x={76} y={180} width={48} height={24} rx={6} fill={accent} />
            {label(104, 48)}
            <path d="M70 68h9l-6 108h-5z" fill={`url(#${gloss})`} />
          </>
        );
      case "bottle":
        return (
          <>
            <rect x={68} y={100} width={64} height={104} rx={20} fill={pack} />
            <rect x={68} y={100} width={64} height={104} rx={20} fill={`url(#${shade})`} />
            <rect x={89} y={80} width={22} height={24} rx={4} fill={pack} />
            <rect x={84} y={58} width={32} height={26} rx={6} fill={accent} />
            {label(136, 48)}
            <rect x={74} y={110} width={9} height={84} rx={4.5} fill={`url(#${gloss})`} />
          </>
        );
      case "stick":
        return (
          <>
            <path d="M86 92c0-14 6-26 14-30 8 4 14 16 14 30v12H86z" fill={pack} />
            <rect x={82} y={102} width={36} height={22} rx={4} fill="#d9b48a" />
            <rect x={80} y={122} width={40} height={82} rx={8} fill={accent} />
            <rect x={80} y={122} width={40} height={82} rx={8} fill={`url(#${shade})`} />
            <text x={100} y={168} textAnchor="middle" fontSize={7} letterSpacing={2} fill={pack} fontFamily="Georgia, serif" transform="rotate(-90 100 165)">
              NAFIS
            </text>
            <rect x={85} y={128} width={7} height={70} rx={3.5} fill={`url(#${gloss})`} />
          </>
        );
      case "set":
        return (
          <>
            <rect x={70} y={70} width={26} height={60} rx={8} fill={pack} opacity={0.8} />
            <rect x={104} y={60} width={28} height={70} rx={10} fill={accent} opacity={0.55} />
            <rect x={42} y={120} width={116} height={82} rx={10} fill={pack} />
            <rect x={42} y={120} width={116} height={82} rx={10} fill={`url(#${shade})`} />
            <rect x={36} y={106} width={128} height={24} rx={7} fill={accent} />
            <rect x={94} y={106} width={12} height={96} fill="#fffaf5" opacity={0.85} />
            <path d="M100 106c-10-16-30-14-24-2 4 6 16 4 24 2zm0 0c10-16 30-14 24-2-4 6-16 4-24 2z" fill="#fffaf5" opacity={0.95} />
            <rect x={110} y={150} width={40} height={30} rx={5} fill="#fffaf5" opacity={0.92} />
            <text x={130} y={169} textAnchor="middle" fontSize={8} fontWeight={700} letterSpacing={1.5} fill={ink} fontFamily="ui-sans-serif, system-ui">
              {product.label}
            </text>
          </>
        );
    }
  })();

  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={product.name.ru}>
      <defs>
        <linearGradient id={gloss} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.55} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={shade} x1="0" x2="1">
          <stop offset="0.55" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.16} />
        </linearGradient>
      </defs>
      <ellipse cx={100} cy={210} rx={product.shape === "set" ? 70 : 48} ry={7} fill="#000" opacity={0.1} />
      {body}
    </svg>
  );
}
