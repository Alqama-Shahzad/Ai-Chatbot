
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedContainer({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedFadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
