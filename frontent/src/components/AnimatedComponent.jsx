import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration, delay }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({ children, direction = 'left', delay = 0 }) => {
  const directions = {
    left: { x: -50 },
    right: { x: 50 },
    up: { y: 50 },
    down: { y: -50 },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ ...directions[direction], opacity: 0 }}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : { ...directions[direction], opacity: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export const HoverCard = ({ children, style = {} }) => {
  return (
    <motion.div
      style={{
        ...style,
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export const LoadingSpinner = ({ size = "medium" }) => {
  const sizeMap = {
    small: { width: '24px', height: '24px', border: '3px' },
    medium: { width: '40px', height: '40px', border: '4px' },
    large: { width: '60px', height: '60px', border: '5px' }
  };

  const { width, height, border } = sizeMap[size];

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width,
        height,
        borderRadius: '50%',
        border: `${border} solid #e5e7eb`,
        borderTopColor: '#3b82f6',
        margin: '0 auto'
      }}
    />
  );
};

// Additional useful components

export const ScaleIn = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, staggerChildren = 0.1, style = {} }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren
          }
        }
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const PulseButton = ({ children, onClick, style = {} }) => {
  return (
    <motion.button
      onClick={onClick}
      style={{
        ...style,
        cursor: 'pointer',
        border: 'none',
        outline: 'none'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0.7)',
          '0 0 0 10px rgba(59, 130, 246, 0)',
          '0 0 0 0 rgba(59, 130, 246, 0)'
        ]
      }}
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }
      }}
    >
      {children}
    </motion.button>
  );
};

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
