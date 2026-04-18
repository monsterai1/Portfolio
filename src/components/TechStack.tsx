import { motion } from "framer-motion";
import { Code2, Layout, Database, Brain, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    category: "Languages & Core",
    icon: Code2,
    skills: [
      { name: "Python", stars: 5 },
      { name: "TypeScript", stars: 5 },
      { name: "JavaScript", stars: 4 },
    ],
  },
  {
    category: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", stars: 5 },
      { name: "Next.js", stars: 4 },
      { name: "Tailwind CSS", stars: 5 },
    ],
  },
  {
    category: "Backend & Database",
    icon: Database,
    skills: [
      { name: "Node.js", stars: 4 },
      { name: "PostgreSQL", stars: 4 },
      { name: "MongoDB", stars: 4 },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "TensorFlow", stars: 5 },
      { name: "PyTorch", stars: 5 },
      { name: "OpenAI / LLMs", stars: 5 },
      { name: "LangChain", stars: 4 },
      { name: "RAG Systems", stars: 4 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Docker", stars: 4 },
      { name: "AWS", stars: 4 },
      { name: "GitHub Actions", stars: 4 },
      { name: "CI/CD", stars: 4 },
    ],
  },
  {
    category: "Tools & Testing",
    icon: Wrench,
    skills: [
      { name: "API Integration", stars: 5 },
      { name: "Testing & Validation", stars: 4 },
      { name: "MLOps", stars: 4 },
    ],
  },
];

const StarRating = ({ stars }: { stars: number }) => (
  <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
        <polygon
          points="7,1 8.8,5.2 13.5,5.6 10,8.8 11.1,13.5 7,11 2.9,13.5 4,8.8 0.5,5.6 5.2,5.2"
          fill={i < stars ? "hsl(38, 92%, 55%)" : "hsla(0,0%,50%,0.2)"}
          stroke={i < stars ? "hsl(38, 80%, 45%)" : "transparent"}
          strokeWidth="0.5"
        />
      </svg>
    ))}
  </div>
);

const TechStack = () => (
  <section id="techstack" className="py-20 px-4 relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl section-title text-center mb-12"
      >
        Tech Stack
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08, type: "spring", stiffness: 100 }}
              className="spring-card p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display text-foreground">{cat.category}</h3>
              </div>
              <ul className="space-y-3">
                {cat.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-body font-medium text-foreground">{skill.name}</span>
                      <StarRating stars={skill.stars} />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TechStack;
