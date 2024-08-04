import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";

const Hero = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 bg-custom-green">
      <HeroHighlight>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Say goodbye to hours of headbanging, and hello to devDucky! <br />
          <span className="text-4xl">
            An integrated IDE that{" "}
            <Highlight className="text-black dark:text-white">
              does more than hold your code.
            </Highlight>
          </span>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
};

export default Hero;
