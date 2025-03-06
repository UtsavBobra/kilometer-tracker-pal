
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

export const slideUp: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

export const slideDown: Variants = {
  hidden: { y: -10, opacity: 0 },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};
