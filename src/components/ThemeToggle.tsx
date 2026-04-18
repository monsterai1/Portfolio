import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "night" : "day"} mode`}
      className="fixed top-5 right-24 z-[60] w-11 h-11 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground hover:scale-110 transition-transform"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
