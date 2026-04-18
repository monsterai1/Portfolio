import { useState, memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

import p1  from "@/assets/project-1.jpg";
import p2  from "@/assets/project-2.jpg";
import p3  from "@/assets/project-3.jpg";
import p4  from "@/assets/project-4.jpg";
import p5  from "@/assets/project-5.jpg";
import p6  from "@/assets/project-6.jpg";
import p7  from "@/assets/project-7.jpg";
import p8  from "@/assets/project-8.jpg";
import p9  from "@/assets/project-9.jpg";
import p10 from "@/assets/project-10.jpg";
import p11 from "@/assets/project-11.jpg";
import p12 from "@/assets/project-12.jpg";
import p13 from "@/assets/project-13.jpg";
import p14 from "@/assets/project-14.jpg";
import p15 from "@/assets/project-15.jpg";
import p16 from "@/assets/project-16.jpg";
import p17 from "@/assets/project-17.jpg";
import p18 from "@/assets/project-18.jpg";
import p19 from "@/assets/project-19.jpg";
import p20 from "@/assets/project-20.jpg";
import p21 from "@/assets/project-21.jpg";
import p22 from "@/assets/project-22.jpg";
import p23 from "@/assets/project-23.jpg";
import p24 from "@/assets/project-24.jpg";
import p25 from "@/assets/project-25.jpg";
import p26 from "@/assets/project-26.jpg";
import p27 from "@/assets/project-27.jpg";
import p28 from "@/assets/project-28.jpg";
import p29 from "@/assets/project-29.jpg";
import p30 from "@/assets/project-30.jpg";

type Category = "AI" | "Fullstack";
type Project = { name: string; desc: string; images: string[]; github?: string; live?: string; category: Category };

const projects: Project[] = [
  { name: "AI Chatbot Platform",      category: "AI",        desc: "Conversational AI platform with multi-model support and real-time streaming responses.", images: [p1, p13, p25],  github: "https://github.com/monsterai1/ChatPlatform_AI" },
  { name: "AI Art Generator",         category: "AI",        desc: "Generative AI tool for creating artwork using diffusion models and style transfer.",     images: [p3, p15, p27],  github: "https://github.com/easydiffusion/easydiffusion", live: "https://easydiffusion.github.io/" },
  { name: "Autonomous Navigation",    category: "AI",        desc: "Computer vision system for autonomous vehicle path planning and obstacle detection.",    images: [p4, p16, p28],  github: "https://github.com/microsoft/AirSim", live: "https://microsoft.github.io/AirSim/" },
  { name: "NLP Translation Engine",   category: "AI",        desc: "Multi-language translation system powered by transformer models with context awareness.",images: [p5, p17, p29],  github: "https://github.com/LibreTranslate/LibreTranslate", live: "https://libretranslate.com/" },
  { name: "Voice Assistant",          category: "AI",        desc: "AI-powered voice recognition and synthesis system with natural language understanding.", images: [p6, p18, p30],  },
  { name: "Face Recognition API",     category: "AI",        desc: "Real-time facial detection and recognition API with privacy-preserving techniques.",     images: [p7, p19, p25],  },
  { name: "Medical AI Assistant",     category: "AI",        desc: "Healthcare AI that assists in diagnostics with medical image analysis capabilities.",    images: [p9, p21, p27],  },
  { name: "Deep Learning Framework",  category: "AI",        desc: "Custom deep learning framework with auto-differentiation and GPU acceleration.",        images: [p10, p22, p28],  },
  { name: "Recommendation Engine",    category: "AI",        desc: "Collaborative and content-based filtering recommendation system for e-commerce.",       images: [p11, p23, p29],  },
  { name: "Data Analytics Dashboard", category: "Fullstack", desc: "Real-time analytics dashboard with ML-powered insights and predictive modeling.",        images: [p2, p14],  github: "https://github.com/monsterai1/Data-Analytics" },
  { name: "E-shop with AI",        category: "Fullstack", desc: "E-commerce site with Javascript and Python. Implemented AI for user experience",        images: [p8, p20, p26],  github: "https://github.com/monsterai1/E-commerce", live: "https://fuwamarket.com/" },
  { name: "AI Web Builder",           category: "Fullstack", desc: "Intelligent website builder using LLMs to generate responsive web applications.",       images: [p12, p24, p30], },
];

const ProjectModal = memo(({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1);  setSlide((s) => (s + 1) % project.images.length); };
  const goPrev = () => { setDirection(-1); setSlide((s) => (s + project.images.length - 1) % project.images.length); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="modal-panel spring-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-display text-foreground">{project.name}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary" aria-label="Close">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="relative rounded-lg overflow-hidden mb-4 bg-secondary" style={{ height: 256 }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={slide}
              src={project.images[slide]}
              alt={`${project.name} screenshot ${slide + 1}`}
              className="w-full h-64 object-cover absolute inset-0"
              width={640}
              height={256}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <button onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition z-10" aria-label="Previous image">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition z-10" aria-label="Next image">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {project.images.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > slide ? 1 : -1); setSlide(i); }} aria-label={`Image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-primary scale-125" : "bg-white/60"}`} />
            ))}
          </div>
        </div>

        <p className="font-body text-foreground text-sm mb-4">{project.desc}</p>
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground font-body text-sm hover:bg-secondary/80 transition">
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
});
ProjectModal.displayName = "ProjectModal";

const ProjectCard = memo(({ project, onClick }: { project: Project; onClick: () => void }) => (
  <div
    className="proj-card spring-card overflow-hidden"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    aria-label={`Open ${project.name}`}
  >
    <div className="overflow-hidden">
      <img src={project.images[0]} alt={project.name}
        className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy" width={640} height={176} draggable={false} />
    </div>
    <div className="p-4">
      <span className={`text-[10px] font-body px-2 py-0.5 rounded-full mb-2 inline-block ${
        project.category === "AI"
          ? "bg-primary/15 text-primary"
          : "bg-accent/40 text-accent-foreground"
      }`}>
        {project.category}
      </span>
      <h3 className="font-display text-foreground text-base mt-1">{project.name}</h3>
    </div>
  </div>
));
ProjectCard.displayName = "ProjectCard";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", "AI", "Fullstack"];

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl section-title text-center mb-8"
        >
          Projects
        </motion.h2>

        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-body text-sm transition-all duration-200 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {f === "All" ? "View All" : f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.28 }}
              >
                <ProjectCard project={project} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
