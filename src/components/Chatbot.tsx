import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import puppyImg from "@/assets/puppy.png";

interface Message {
  role: "user" | "bot";
  text: string;
}

const portfolio = {
  name: "Aoi Mizuno",
  title: "AI Engineer & Full-Stack Developer",
  location: "Nagoya, Japan",
  email: "monsterai603@gmail.com",
  experience: "8+ years",
  education: "M.S. in Software Engineering from Nagoya University, Diploma from Nagoya College of Design & Technology",
  companies: "SAP Japan, EM Systems, Union Software Management",
  skills: "Python, TypeScript, React, Node.js, Next.js, TensorFlow, PyTorch, LLMs, LangChain, NLP, Computer Vision, Docker, AWS, PostgreSQL, MongoDB, GitHub Actions, CI/CD, MLOps, RAG Systems",
};

function getResponse(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("name") || lower.includes("who")) return `My name is ${portfolio.name}. I'm a ${portfolio.title} based in ${portfolio.location}.`;
  if (lower.includes("experience") || lower.includes("work") || lower.includes("job")) return `I have ${portfolio.experience} of experience. I've worked at ${portfolio.companies}.`;
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) return `My tech stack includes: ${portfolio.skills}.`;
  if (lower.includes("education") || lower.includes("study") || lower.includes("university")) return portfolio.education;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) return `You can reach me at ${portfolio.email} or scroll to the contact section.`;
  if (lower.includes("location") || lower.includes("where") || lower.includes("live")) return `I'm based in ${portfolio.location}.`;
  if (lower.includes("project")) return "I've built AI chatbots, analytics dashboards, art generators, autonomous navigation systems, NLP engines, voice assistants, face recognition APIs, and more. Check the Projects section for details.";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return `Hello! I'm Aoi's portfolio assistant. Ask me about skills, experience, projects, or anything else.`;
  return `I can tell you about skills, experience, projects, education, and contact info. What would you like to know?`;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm Aoi's portfolio assistant. Ask me anything about Aoi's work and experience." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-primary/40 bg-card/80 backdrop-blur-sm"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open
          ? <X className="w-6 h-6 text-foreground absolute inset-0 m-auto" />
          : <img src={puppyImg} alt="Chat with assistant" className="w-full h-full object-cover" />
        }
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "fixed",
                bottom: "96px",
                right: "24px",
                width: "320px",
                height: "384px",
                zIndex: 9999,
                overflow: "hidden",
              }}
              className="spring-card flex flex-col"
            >
              <div className="px-4 py-3 bg-primary text-primary-foreground font-display text-base shrink-0 rounded-t-lg">
                Portfolio Assistant
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs font-body ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-foreground rounded-bl-none"
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border flex gap-2 shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 rounded-full bg-secondary border border-border text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={send} className="p-2 rounded-full bg-primary text-primary-foreground shrink-0">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Chatbot;
