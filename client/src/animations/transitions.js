import { motion } from 'framer-motion';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideIn = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

export const scaleUp = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

export const transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};