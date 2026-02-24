// External Modules
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Loader({ isLoaderIncluded = false }) {
  const BrandName = [
    { text: "G.", color: "text-orange-500" },
    { text: "S.", color: "text-orange-500" },
    { text: "S.", color: "text-orange-500" },
    { text: "S.", color: "text-orange-500" },
    { text: " ", color: "" },
    { text: "M", color: "text-green-700" },
    { text: "i", color: "text-green-700" },
    { text: "r", color: "text-green-700" },
    { text: "z", color: "text-green-700" },
    { text: "e", color: "text-green-700" },
    { text: "w", color: "text-green-700" },
    { text: "a", color: "text-green-700" },
    { text: "l", color: "text-green-700" },
    { text: "a", color: "text-green-700" },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoaderIncluded) return;
    const duration = 30000; // 30 seconds in ms
    const intervalTime = 100; // update every 100ms
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isLoaderIncluded]);

  return (
    <div
      className={`py-4 flex flex-col items-center ${isLoaderIncluded ? "justify-between" : "justify-center"} h-screen bg-white`}
    >
      {isLoaderIncluded && <div></div>}
      <h1 className="flex text-3xl font-semibold tracking-widest">
        {BrandName.map((letter, i) => (
          <motion.span
            key={i}
            className={letter.color}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: (BrandName.length - 1) * 0.3,
              delay: i * 0.3, // bounce one-by-one
            }}
          >
            {letter.text}
          </motion.span>
        ))}
      </h1>
      {isLoaderIncluded && (
        <div className="max-w-60 min-w-60 p-1 border-2 border-[#B3D89C] rounded-full">
          <div
            className={`p-1.25 bg-[#D0EFB1] rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Loader;
