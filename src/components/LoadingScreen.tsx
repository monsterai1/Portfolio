import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 500);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const pct = Math.round(progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Single large petal — outline always visible, fill grows with progress */}
          <div className="relative mb-8" style={{ width: 120, height: 160 }}>
            <svg
              viewBox="0 0 120 160"
              width="120"
              height="160"
              aria-hidden="true"
              style={{ overflow: "visible" }}
            >
              {/* Clip path that reveals fill from bottom to top */}
              <defs>
                <clipPath id="petal-fill-clip">
                  <rect
                    x="0"
                    y={160 - (progress / 100) * 160}
                    width="120"
                    height="160"
                  />
                </clipPath>
              </defs>

              {/* Petal outline (always shown, faint) */}
              <path
                d="M60 155 C20 120 5 80 10 40 C15 10 45 2 60 2 C75 2 105 10 110 40 C115 80 100 120 60 155 Z"
                fill="none"
                stroke="hsla(345, 50%, 75%, 0.25)"
                strokeWidth="2"
              />

              {/* Petal fill — clipped to grow upward */}
              <path
                d="M60 155 C20 120 5 80 10 40 C15 10 45 2 60 2 C75 2 105 10 110 40 C115 80 100 120 60 155 Z"
                fill="hsla(345, 65%, 78%, 0.9)"
                clipPath="url(#petal-fill-clip)"
              />

              {/* Subtle inner highlight on filled portion */}
              <path
                d="M60 140 C35 110 22 75 26 45 C30 22 48 12 60 12 C72 12 90 22 94 45 C98 75 85 110 60 140 Z"
                fill="hsla(345, 70%, 90%, 0.35)"
                clipPath="url(#petal-fill-clip)"
              />
            </svg>

            {/* % text centered over petal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl" style={{ color: "hsl(345, 40%, 35%)" }}>
                {pct}%
              </span>
            </div>
          </div>

          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Blossoming…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
