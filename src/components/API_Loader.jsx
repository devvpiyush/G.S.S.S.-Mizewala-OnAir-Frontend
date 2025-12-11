// Framer Motion
import { motion } from "framer-motion";

function API_Loader() {
  return (
    <div
      className="
        fixed inset-0 
        bg-white/60
        backdrop-blur-[2px]
        flex items-center justify-center
        z-[9999]
      "
    >
      <h1 className="flex text-3xl font-semibold tracking-widest text-green-700">
        {["•", "•", "•", "•", "•"].map((dot, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            {dot}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

export default API_Loader;
