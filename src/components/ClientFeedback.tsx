import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

const feedbacks = [
  {
    name: "Emma Lindström",
    role: "Product Manager, TechCorp",
    avatar: avatar1,
    rating: 5,
    text: "Aoi's AI solutions transformed our customer service. The chatbot he built reduced response time by 70%. Absolutely brilliant work!",
  },
  {
    name: "Marcus Chen",
    role: "CTO, DataFlow Inc.",
    avatar: avatar2,
    rating: 5,
    text: "Working with Aoi was a dream. His deep learning expertise and clean code practices set a new standard for our entire engineering team.",
  },
  {
    name: "Sophie Müller",
    role: "Lead Designer, CreativeAI",
    avatar: avatar3,
    rating: 5,
    text: "Aoi bridges the gap between AI and user experience perfectly. The computer vision features he implemented were both powerful and intuitive.",
  },
  {
    name: "Luca Rossi",
    role: "VP Engineering, SmartFactory",
    avatar: avatar4,
    rating: 5,
    text: "The IoT automation system Aoi developed for our factory floor exceeded all expectations. Predictive maintenance saves us millions annually.",
  },
  {
    name: "Elena Petrova",
    role: "Founder, HealthTech Startup",
    avatar: avatar5,
    rating: 5,
    text: "Aoi's medical AI assistant is saving lives. His attention to accuracy and ethical AI practices gives us complete confidence in the system.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
        className={`text-lg ${i < rating ? "text-amber-400" : "text-muted-foreground/20"}`}
      >
        ★
      </motion.span>
    ))}
  </div>
);

const ClientFeedback = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const fb = feedbacks[current];

  return (
    <section id="feedback" className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl section-title text-center mb-12"
        >
          Client Feedback
        </motion.h2>

        <div
          className="relative min-h-[260px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="spring-card p-8 w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  loading="lazy"
                  width={512}
                  height={512}
                  whileHover={{ scale: 1.08 }}
                />
                <div>
                  <h4 className="font-display text-lg text-foreground">{fb.name}</h4>
                  <p className="text-xs font-body text-muted-foreground">{fb.role}</p>
                </div>
              </div>
              <StarRating rating={fb.rating} />
              <p className="font-body text-sm text-muted-foreground italic leading-relaxed">"{fb.text}"</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to feedback ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {!paused && (
          <div className="mt-4 h-0.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              key={current}
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientFeedback;
