import { motion } from "framer-motion";

function Footer() {
  const socials = [
    {
      name: "facebook",
      url: "https://www.facebook.com/",
      icon: "bxl-facebook",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/",
      icon: "bxl-instagram",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/martin-germ%C3%A1n-795698238/",
      icon: "bxl-linkedin",
    },
    { name: "github", url: "https://github.com/Ricorito", icon: "bxl-github" },
  ];

  return (
    <footer className="bg-gradient-to-r from-green-200 via-brown to-green-200 px-6 py-5 relative overflow-hidden text-black text-sm">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-sand opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-indigo-500 opacity-20 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-3 text-center">
        <p className="max-w-md text-black/85 leading-relaxed text-sm">
          Created as part of a thesis project focused on mental health
          awareness. This platform offers learning techniques like Pomodoro and
          guided breathing meditations, with space for reflection, discussion,
          and growth through shared knowledge and experience.
        </p>

        {/* Animated Jump to Top */}
        <motion.a
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 text-xl text-teal-800 hover:text-green-600 font-medium transition cursor-pointer"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          ↑ Back to top
        </motion.a>

        <div className="flex space-x-4 mt-1">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-9 h-9 rounded-full bg-white/40 hover:bg-green-300 shadow-md flex items-center justify-center transition-all duration-300"
            >
              <i className={`bx ${social.icon} text-black text-lg`}></i>
            </a>
          ))}
        </div>

        <p className="text-xs text-black/60 mt-1">
          © {new Date().getFullYear()} All rights reserved · Martin Germán ·
          Thesis Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;