import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const GetInTouch = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl section-title text-center mb-12"
        >
          Get In Touch
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="spring-card p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-display text-sm text-foreground">Location</h4>
                  <p className="font-body text-sm text-muted-foreground">Nagoya, Japan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-display text-sm text-foreground">Email</h4>
                  <p className="font-body text-sm text-muted-foreground">romandoroshenko456@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="spring-card p-6 text-center">
              <h4 className="font-display text-lg text-foreground">Nagoya, Japan</h4>
              <p className="font-body text-sm text-muted-foreground mt-1">Aichi Prefecture · Central Japan</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-body text-xs text-primary">35.1815° N, 136.9066° E</span>
              </div>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="spring-card p-6 space-y-4"
            onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
