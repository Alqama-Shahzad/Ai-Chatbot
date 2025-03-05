
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedFadeIn({ 
  children, 
  className = "", 
  delay = 0,
  ...props 
}: AnimatedWrapperProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContainer({
  children,
  className = "",
  delay = 0,
  ...props
}: AnimatedWrapperProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
