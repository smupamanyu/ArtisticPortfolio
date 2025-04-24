import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
      <motion.div 
        className="blob bg-primary/30 absolute top-1/4 left-1/4 w-72 h-72"
        animate={{ 
          scale: [1, 1.1, 0.9, 1],
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      <motion.div 
        className="blob bg-secondary/30 absolute top-1/2 right-1/4 w-96 h-96"
        animate={{ 
          scale: [1, 1.1, 0.9, 1],
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2
        }}
      />
      
      <motion.div 
        className="blob bg-accent/30 absolute bottom-1/4 left-1/2 w-80 h-80"
        animate={{ 
          scale: [1, 0.9, 1.1, 1],
          x: [0, 20, -30, 0],
          y: [0, 30, -20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          delay: 4
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
