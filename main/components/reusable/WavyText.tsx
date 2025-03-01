import React from "react";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <span className="inline-flex">{children}</span>;
};

interface Props extends HTMLMotionProps<"h1"> {
  text: string;
}

const AnimatedCharacters = ({ text, ...props }: Props) => {
  const splitWords = text.split(" ");

  const words: string[][] = splitWords.map((word) => [
    ...word.split(""),
    "\u00A0",
  ]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.h1
      {...props}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <Wrapper key={index}>
          {word.map((letter, index) => (
            <span
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
              key={index}
            >
              <motion.span
                variants={letterVariants}
                className="block z-10 relative"
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </motion.h1>
  );
};

export default AnimatedCharacters;
