'use client';

import { motion, useInView } from 'framer-motion';
import { Shield, Award, Globe, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Shield,
      title: 'Certified Quality',
      description:
        'Every diamond is certified by leading gemological institutes, ensuring authenticity and quality you can trust.',
    },
    {
      icon: Award,
      title: 'Premium Selection',
      description:
        'Handpicked collection of the finest natural diamonds, each meeting our rigorous standards of excellence.',
    },
    {
      icon: Globe,
      title: 'Global Supply',
      description:
        'Worldwide distribution network ensuring timely delivery and consistent supply for your business needs.',
    },
    {
      icon: Sparkles,
      title: 'Ethical Sourcing',
      description:
        'Committed to responsible mining practices and ethical sourcing, supporting sustainable luxury.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-navy-800 to-navy-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Why Choose Dalila?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine tradition with innovation to deliver diamonds that exceed
            expectations in every aspect.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-lg bg-navy-700/50 backdrop-blur-sm border border-white/10 hover:border-gold-500/50 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center"
                >
                  <feature.icon className="w-8 h-8 text-navy-900" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gold-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">
            Ready to elevate your business with premium diamonds?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 transition-colors rounded-lg"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}