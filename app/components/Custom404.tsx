'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Home, RefreshCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Custom404 = () => {
  const [randomFact, setRandomFact] = useState('');
  const controls = useAnimation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const facts = [
    "The first computer bug was an actual bug - a moth trapped in a Harvard Mark II computer in 1947.",
    "The word 'robot' comes from the Czech word 'robota' which means forced labor or drudgery.",
    "The first computer mouse was made of wood.",
    "The first banner ad on the internet was put up in 1994.",
    "About 90% of the world's currency is digital.",
  ];

  useEffect(() => {
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2 }
    });
  }, [facts, controls]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full text-center"
      >
        {/* Stars background */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
        
        <motion.h1
          variants={itemVariants}
          className="text-8xl font-bold text-red-500 mb-4"
          animate={controls}
        >
          404
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-white mb-4">
          Houston, We Have a Problem!
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-300 mb-6">
          The page youre looking for has drifted off into deep space.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-6">
          <Link href="/">
            <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Home className="mr-2 h-4 w-4" /> Return to Earth
            </Button>
          </Link>
          <Button onClick={() => window.location.reload()} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry Mission
          </Button>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 p-4 rounded-md"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Space Fact:</h3>
          <p className="text-gray-300 italic">{randomFact}</p>
        </motion.div>
        
        {/* Floating astronaut */}
        <motion.div
          className="absolute -top-20 -right-20 text-8xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          👨‍🚀
        </motion.div>
        
        {/* UFO */}
        <motion.div
          className="absolute -bottom-10 -left-10 text-6xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          🛸
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Custom404;