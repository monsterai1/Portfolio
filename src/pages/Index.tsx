import { useState } from "react";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import ClientFeedback from "@/components/ClientFeedback";
import GetInTouch from "@/components/GetInTouch";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";
import { PageBackground } from "@/components/AnimatedBackground";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import springHero from "@/assets/spring-hero.jpg";
import springHeroNight from "@/assets/spring-hero-night.jpg";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useState(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div className="relative bg-background">
        <CustomCursor />
        <ThemeToggle />
        <ScrollToTop />
        <Hero />

        <div className="relative">
          <PageBackground />
          <AboutMe />
          <Experience />
          <TechStack />
          <Projects />
          <Education />
          <ClientFeedback />
          <GetInTouch />
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-32 z-10" style={{
            background: "linear-gradient(to bottom, hsl(var(--background)), transparent)"
          }} />
          <img
            src={isDark ? springHeroNight : springHero}
            alt="Cherry blossoms and Mount Fuji"
            className="w-full h-72 object-cover object-top opacity-60"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 z-10" style={{
            background: "linear-gradient(to top, hsl(var(--background)), transparent)"
          }} />
        </div>

        <Chatbot />
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 text-center font-body text-sm text-muted-foreground relative bg-background"
        >
          <p>© 2025 Aoi Mizuno</p>
        </motion.footer>
      </div>
    </>
  );
};

export default Index;
