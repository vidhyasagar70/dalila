'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const diamondShapes = [
    { name: 'Round', position: 'top-0 left-8' },
    { name: 'Cushion', position: 'top-0 left-28' },
    { name: 'Princess', position: 'top-0 left-48' },
    { name: 'Asscher', position: 'top-0 left-68' },
    { name: 'Heart', position: 'top-0 left-88' },
    { name: 'Oval', position: 'top-24 left-8' },
    { name: 'Radiant', position: 'top-24 left-28' },
    { name: 'Emerald', position: 'top-24 left-48' },
    { name: 'Marquise', position: 'top-24 left-68' },
    { name: 'Pear', position: 'top-24 left-88' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white text-navy-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#0a1628_49%,#0a1628_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Diamond Shapes Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] bg-black rounded-lg overflow-hidden"
          >
            {/* Grid of Diamond Shapes */}
            <div className="absolute inset-0 p-8">
              {diamondShapes.map((shape, index) => (
                <motion.div
                  key={shape.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          transition: { delay: index * 0.1, duration: 0.5 },
                        }
                      : {}
                  }
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`absolute w-20 h-20 ${shape.position}`}
                >
                  {/* Diamond Shape */}
                  <div className="relative w-full h-full">
                    {/* Different shapes based on index */}
                    {index % 5 === 0 && (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg" />
                    )}
                    {index % 5 === 1 && (
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg" />
                    )}
                    {index % 5 === 2 && (
                      <div className="w-full h-full bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg transform rotate-45" />
                    )}
                    {index % 5 === 3 && (
                      <div className="w-full h-full bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg clip-path-octagon" />
                    )}
                    {index % 5 === 4 && (
                      <div className="w-full h-full bg-gradient-to-br from-white via-blue-100 to-blue-200 shadow-lg clip-path-heart" />
                    )}
                  </div>

                  {/* Sparkle Effect */}
                  <motion.div
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute inset-0 bg-white/30 blur-md rounded-full"
                  />
                </motion.div>
              ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 right-6 text-white text-xl font-light">
              1 / 2
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-serif font-bold leading-tight"
            >
              We Shape Brilliance into Timeless Value.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-lg leading-relaxed"
            >
              DALILA, we believe diamonds are more than gems — they are a symbol
              of trust, innovation, and enduring luxury. As a leading name in
              the Natural diamonds diamond industry, we partner with businesses
              and connoisseurs to deliver excellence at every facet.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Our diamonds are ethically sourced, expertly graded, and crafted
              to meet the highest standards of quality. From raw brilliance to
              refined elegance, we ensure that every stone tells a story of
              precision and passion.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Whether you're a jeweler, manufacturer, or luxury brand, Dalila is
              your trusted partner in creating pieces that inspire and endure.
              With us, you don't just get diamonds — you get a legacy.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
              >
                DISCOVER OUR COLLECTION
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-500">15+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-500">50K+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-500">100%</div>
                <div className="text-sm text-gray-600 mt-1">Certified</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}