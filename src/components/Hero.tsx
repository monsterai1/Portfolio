import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import springHero from "@/assets/spring-hero.jpg";
import springHeroNight from "@/assets/spring-hero-night.jpg";
import { useTheme } from "./ThemeProvider";

// ─── Pink smoke spreading behind "Mizuno" ─────────────────────────────────────
// Each puff is a blurred ellipse that spawns at the word center,
// drifts outward in a random direction, expands, and fades out.
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface Puff { id: number; dx: number; dy: number; dur: number; delay: number; scale: number; hue: number }

const PUFFS: Puff[] = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  dx: (sr(i * 7) - 0.5) * 260,
  dy: (sr(i * 3) - 0.5) * 120,
  dur: 3.5 + sr(i * 11) * 2.5,
  delay: sr(i * 5) * 2.2,
  scale: 1.6 + sr(i * 13) * 1.8,
  hue: 335 + sr(i * 17) * 25,
}));

const MizunoSmoke = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute"
    style={{ inset: "-60% -40%", zIndex: 0 }}
  >
    {PUFFS.map((p) => (
      <motion.span
        key={p.id}
        className="absolute rounded-full"
        style={{
          top: "50%",
          left: "50%",
          width: 80,
          height: 50,
          marginLeft: -40,
          marginTop: -25,
          background: `radial-gradient(ellipse at center,
            hsla(${p.hue}, 70%, 82%, 0.55) 0%,
            hsla(${p.hue}, 60%, 78%, 0.25) 45%,
            transparent 75%)`,
          filter: "blur(18px)",
        }}
        animate={{
          x: [0, p.dx * 0.4, p.dx],
          y: [0, p.dy * 0.4, p.dy],
          scale: [0.3, p.scale * 0.7, p.scale],
          opacity: [0, 0.75, 0],
        }}
        transition={{
          duration: p.dur,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    ))}
  </span>
);

const navItems = [
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects", focused: true },
  { label: "Tech Stack",  href: "#techstack" },
  { label: "Education",   href: "#education" },
  { label: "Feedback",    href: "#feedback" },
  { label: "Contact",     href: "#contact" },
];

const row1 = navItems.slice(0, 3);
const row2 = navItems.slice(3);

const PHRASES = ["AI Engineer", "Full-Stack Developer"];
const TYPE_SPEED = 75;
const DELETE_SPEED = 40;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

const TypingRole = () => {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const target = PHRASES[phraseIdx];
    if (!deleting && text === target) {
      timer.current = setTimeout(() => setDeleting(true), PAUSE_FULL);
    } else if (deleting && text === "") {
      timer.current = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setDeleting(false);
      }, PAUSE_EMPTY);
    } else {
      timer.current = setTimeout(
        () => setText(deleting ? text.slice(0, -1) : target.slice(0, text.length + 1)),
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, deleting, phraseIdx]);

  return (
    <span className="hero-typing-text">
      {text}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
};

/* Sakura petals floating */

const SakuraPetals = () => {
  const petals = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: sr(i * 7) * 100,
      size: 8 + sr(i * 3) * 12,
      dur: 12 + sr(i * 5) * 16,
      del: sr(i * 11) * 12,
      drift: (sr(i * 13) - 0.5) * 120,
    })), []);

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "50% 0 50% 0",
            background: `radial-gradient(ellipse at 30% 30%, hsla(345, 60%, 88%, 0.9), hsla(345, 50%, 80%, 0.5))`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}
    </>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
  <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    {/* Spring background image — swaps in dark mode */}
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={isDark ? springHeroNight : springHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0" style={{
        background: isDark
          ? "linear-gradient(180deg, hsla(230,25%,8%,0.3) 0%, hsla(230,25%,8%,0.5) 40%, hsla(230,25%,8%,0.85) 100%)"
          : "linear-gradient(180deg, hsla(0,0%,100%,0.3) 0%, hsla(0,0%,100%,0.5) 40%, hsla(0,0%,100%,0.7) 100%)"
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: `linear-gradient(to bottom, transparent, hsl(var(--background)))` }} />
    </div>

    {/* Floating sakura petals */}
    <SakuraPetals />

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-10 text-center px-4"
    >
      {/* Name */}
      <motion.div
        className="text-[10px] font-body font-medium tracking-[0.4em] uppercase text-muted-foreground mb-6 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="w-8 h-px bg-muted-foreground/30" />
        Nagoya, Japan
        <span className="w-8 h-px bg-muted-foreground/30" />
      </motion.div>

      <motion.h1
        className="text-6xl md:text-8xl lg:text-[120px] font-display font-light leading-[0.85] tracking-tight text-foreground"
        initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      >
        Aoi <br />
        <span className="relative inline-block">
          <MizunoSmoke />
          <span className="relative italic text-primary" style={{ zIndex: 1 }}>Mizuno</span>
        </span>
      </motion.h1>

      <motion.div
        className="text-xl md:text-2xl font-body font-light mb-10 min-h-[2.4rem] flex items-center justify-center mt-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <TypingRole />
      </motion.div>

      {/* Row 1 */}
      <div className="flex flex-wrap justify-center gap-3 mb-3">
        {row1.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-7 py-3 rounded-full font-body font-medium text-sm transition-all ${
              item.focused
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-base px-9 py-3.5"
                : "bg-white/80 backdrop-blur-sm text-foreground border border-border hover:bg-white hover:shadow-md"
            }`}
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap justify-center gap-3">
        {row2.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + (row1.length + i) * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-7 py-3 rounded-full font-body font-medium text-sm transition-all ${
              item.focused
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-base px-9 py-3.5"
                : "bg-white/80 backdrop-blur-sm text-foreground border border-border hover:bg-white hover:shadow-md"
            }`}
          >
            {item.label}
          </motion.a>
        ))}
      </div>
    </motion.div>

    {/* Scroll indicator */}
    <motion.a
      href="#about"
      className="absolute bottom-8 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity } }}
      aria-label="Scroll to About Me"
    >
      <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary/70"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.a>
  </section>
  );
};

export default Hero;
