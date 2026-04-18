import { useEffect, useState, useRef, useCallback } from "react";

interface Petal {
  x: number;
  y: number;
  id: number;
  sz: number;
  vx: number;
  vy: number;
  rot: number;
}

const CustomCursor = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);

  const move = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current > 100) {
      lastSpawn.current = now;
      setPetals((prev) => [
        ...prev.slice(-8),
        {
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY,
          id: idRef.current++,
          sz: 4 + Math.random() * 6,
          vx: (Math.random() - 0.5) * 1,
          vy: -0.5 - Math.random() * 1,
          rot: Math.random() * 360,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [move]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.02,
            vx: p.vx + (Math.random() - 0.5) * 0.1,
            rot: p.rot + 2,
            sz: p.sz * 0.99,
          }))
          .filter((p) => p.sz > 1 && p.y < window.innerHeight + 50)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Floating sakura petals trail only — no dot cursor */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x - p.sz / 2,
            top: p.y - p.sz / 2,
            width: p.sz,
            height: p.sz * 0.7,
            borderRadius: "50% 0 50% 0",
            background: `radial-gradient(ellipse at 30% 30%, hsla(345, 60%, 88%, 0.8), hsla(345, 50%, 80%, 0.3))`,
            transform: `rotate(${p.rot}deg)`,
            opacity: Math.min(1, p.sz / 4),
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
