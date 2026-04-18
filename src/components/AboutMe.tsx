import { motion } from "framer-motion";

const AboutMe = () => (
  <section id="about" className="py-20 px-4 relative">
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl section-title text-center mb-10"
      >
        About Me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="spring-card p-8"
      >
        <motion.p
          className="text-base font-body leading-relaxed text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          AI Engineer and Full-Stack Developer with strong experience in building scalable web
          applications and integrating intelligent features into modern software products. Skilled in
          frontend and backend development, API integration, database design, and AI-powered
          automation solutions.
        </motion.p>
        <motion.p
          className="text-base font-body leading-relaxed text-foreground mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Passionate about developing reliable, user-friendly applications that solve real business
          problems and improve operational efficiency through modern technologies and data-driven
          insights.
        </motion.p>
        <div className="flex flex-wrap gap-3 mt-6">
          {[
            { label: "Nagoya, Japan", color: "bg-secondary" },
            { label: "monsterai603@gmail.com", color: "bg-accent/40" },
            { label: "8+ Years Experience", color: "bg-secondary" },
          ].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`px-4 py-2 rounded-full ${item.color} text-foreground font-body text-sm`}
            >
              {item.label}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutMe;
