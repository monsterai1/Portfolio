import { useMemo } from "react";
import { motion } from "framer-motion";

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── PageBackground — soft spring atmosphere behind all non-hero sections ─────
const PageBackground = () => {
  const petals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: sr(i * 7) * 100,
      size: 6 + sr(i * 3) * 10,
      dur: 18 + sr(i * 5) * 20,
      del: sr(i * 11) * 15,
    })), []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Soft gradient — uses theme tokens so dark mode auto-applies */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            hsl(var(--background)) 0%,
            hsl(var(--muted)) 15%,
            hsl(var(--background)) 30%,
            hsl(var(--secondary)) 50%,
            hsl(var(--background)) 70%,
            hsl(var(--muted)) 85%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      {/* Soft atmospheric blurs using primary token */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }} />
      <div className="absolute top-[40%] left-[2%] w-[300px] h-[300px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--sakura) / 0.3), transparent 70%)" }} />
      <div className="absolute top-[70%] right-[10%] w-[350px] h-[350px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 70%)" }} />

      {/* Floating sakura petals — very subtle */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "50% 0 50% 0",
            background: `radial-gradient(ellipse at 30% 30%, hsla(345, 60%, 88%, 0.6), hsla(345, 50%, 80%, 0.3))`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}

      {/* Gentle breathing pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, hsla(345, 50%, 90%, 0.08), transparent 60%)`,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// ─── Kept for API compat ──
type SectionVariant = "shallow" | "reef" | "deep" | "abyss" | "kelp";
const HeroBackground = () => null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SectionBackground = ({ variant: _variant }: { variant?: SectionVariant }) => null;

export { HeroBackground, SectionBackground, PageBackground };
export type { SectionVariant };
