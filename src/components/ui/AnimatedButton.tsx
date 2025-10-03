// components/ui/AnimatedButton.tsx
'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
}

export default function AnimatedButton({
  children,
  className = '',
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-2.5 border-2 border-yellow-600 bg-transparent text-white hover:bg-yellow-600 hover:border-yellow-600 transition-all text-base font-medium ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
