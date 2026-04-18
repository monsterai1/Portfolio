import { motion } from "framer-motion";

const experiences = [
  {
    period: "Mar 2022 - Oct 2025",
    title: "AI Engineer & Full Stack Developer",
    company: "SAP Japan Co., Ltd.",
    location: "Nagoya, Japan",
    bullets: [
      "Developed scalable full-stack web applications with integrated AI-driven features and automation tools.",
      "Supported CI/CD pipelines, deployment workflows, and release automation for web and AI services.",
      "Worked closely with cross-functional teams to deliver reliable and user-focused software solutions.",
    ],
  },
  {
    period: "Feb 2018 - Nov 2021",
    title: "Full Stack Developer",
    company: "EM Systems",
    location: "Nagoya, Japan",
    bullets: [
      "Built responsive web applications using React, Node.js, and database technologies.",
      "Developed backend services and APIs for data processing and business logic integration.",
      "Worked with PostgreSQL and MongoDB to improve data storage and retrieval performance.",
    ],
  },
  {
    period: "Aug 2017 - Dec 2017",
    title: "Backend Developer",
    company: "Union Software Management Inc.",
    location: "Nagoya, Japan",
    bullets: [
      "Built backend endpoints and supported server-side business logic.",
      "Worked on database operations, data validation, and API testing.",
    ],
  },
  {
    period: "May 2017 - Jul 2017",
    title: "Frontend Developer Intern",
    company: "Union Software Management Inc.",
    location: "Nagoya, Japan",
    bullets: [
      "Assisted in frontend development and UI implementation for internal web systems.",
      "Supported debugging, testing, and feature updates during development cycles.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="py-20 px-4 relative">
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl section-title text-center mb-12"
      >
        Experience
      </motion.h2>
      <div className="relative">
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          style={{ transformOrigin: "top" }}
        />
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className={`relative mb-10 pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
          >
            <motion.div
              className="absolute left-2 md:left-auto top-2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
              style={i % 2 === 0 ? { right: "-8px" } : { left: "-8px" }}
            />
            <div className="spring-card p-6">
              <span className="text-sm font-body text-muted-foreground">{exp.period}</span>
              <h3 className="text-xl font-display text-foreground mt-1">{exp.title}</h3>
              <p className="text-sm font-body text-primary">{exp.company} · {exp.location}</p>
              <ul className="mt-3 space-y-2">
                {exp.bullets.map((b, j) => (
                  <motion.li
                    key={j}
                    className="text-sm font-body text-foreground flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.1 }}
                  >
                    <span className="text-primary mt-1">—</span><span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
