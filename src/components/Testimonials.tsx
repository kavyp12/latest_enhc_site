// src/components/Testimonials.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

// --- Testimonial Data ---
const testimonialsData = [
  {
    quote:
      "Working with them was a game-changer. Their expertise in AI integration streamlined our entire workflow, delivering results beyond our expectations.",
    name: 'Ravi Sheladiya',
    title: 'CEO & Founder',
    company: 'Innovate Inc.',
  },
  {
    quote:
      "The custom LLM they developed has revolutionized our customer support. It's intuitive, powerful, and has significantly improved our response times.",
    name: 'Dhrumil Shah',
    title: 'CTO',
    company: 'Tech Solutions Ltd.',
  },
  {
    quote:
      "An absolutely seamless experience from start to finish. The final product was not only visually stunning but also technically robust. Highly recommended!",
    name: 'Emily White',
    title: 'Head of Product',
    company: 'Creative Minds',
  },
];
// --- End of Data ---

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative flex flex-col w-full py-20 bg-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-80 h-80 bg-orange-500/[0.04] rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -40, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/[0.03] rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
            delay: 3,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-left mb-20">
            <h3 className="text-2xl text-white z-50 container pb-5">
              Client Feedback
            </h3>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group h-full"
              >
                <div className="relative p-8 h-full rounded-3xl backdrop-blur-lg bg-white/[0.01] border border-white/[0.02] hover:border-orange-500/20 transition-colors duration-300 shadow-lg flex flex-col">
                  <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3">
                    <FaQuoteLeft className="text-7xl text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-300" />
                  </div>

                  <div className="relative z-10 flex-grow">
                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                    {/* Removed avatar image, kept gradient circle */}
                    {/* <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500/30 to-purple-500/30 flex-shrink-0 border-2 border-white/10" /> */}
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-orange-400/80 text-sm">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-orange-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
