import { motion } from "framer-motion";

const educations = [
  {
    degree: "M.S. in Software Engineering",
    school: "Nagoya University",
    period: "2014 - 2017",
    desc: "Specialized in software architecture, full-stack web development, and scalable system design. Completed research and academic projects related to modern web applications, database systems, and software engineering best practices.",
  },
  {
    degree: "Diploma in Programming",
    school: "Nagoya College of Design & Technology",
    period: "2013 - 2014",
    desc: "Graduated with Honors. Developed a keen interest in full stack development and software architecture.",
  },
];

const Education = () => (
  <section id="education" className="py-20 px-4 relative">
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl section-title text-center mb-12"
      >
        Education
      </motion.h2>
      <div className="space-y-8">
        {educations.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="spring-card p-8 text-center"
          >
            <h3 className="text-2xl font-display text-foreground">{edu.degree}</h3>
            <p className="text-lg font-body text-primary mt-2">{edu.school}</p>
            <p className="text-sm font-body text-muted-foreground mt-1">{edu.period}</p>
            <p className="font-body text-foreground mt-4 max-w-lg mx-auto text-sm">{edu.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
