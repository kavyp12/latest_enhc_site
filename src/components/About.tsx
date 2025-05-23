'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaCogs, FaChartLine } from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const stats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "50+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Success Rate" }
  ];

  const expertiseItems = [
    {
      title: "Custom LLMs",
      desc: "Tailored language models for your specific needs",
      icon: FaBrain,
      color: "orange",
      iconColor: "text-orange-400",
      titleHoverColor: "group-hover:text-orange-400",
      gradientFrom: "from-orange-500/[0.025]",
      particleColor: "bg-orange-500/70",
      borderHoverColor: "hover:border-orange-500/30"
    },
    {
      title: "AI Chatbots",
      desc: "Intelligent conversational interfaces",
      icon: FaRobot,
      color: "blue",
      iconColor: "text-blue-400",
      titleHoverColor: "group-hover:text-blue-400",
      gradientFrom: "from-blue-500/[0.025]",
      particleColor: "bg-blue-500/70",
      borderHoverColor: "hover:border-blue-500/30"
    },
    {
      title: "AI Integration",
      desc: "Seamless AI implementations into existing systems",
      icon: FaCogs,
      color: "purple",
      iconColor: "text-purple-400",
      titleHoverColor: "group-hover:text-purple-400",
      gradientFrom: "from-purple-500/[0.025]",
      particleColor: "bg-purple-500/70",
      borderHoverColor: "hover:border-purple-500/30"
    },
    {
      title: "ML Solutions",
      desc: "Advanced machine learning algorithms",
      icon: FaChartLine,
      color: "green",
      iconColor: "text-green-400",
      titleHoverColor: "group-hover:text-green-400",
      gradientFrom: "from-green-500/[0.025]",
      particleColor: "bg-green-500/70",
      borderHoverColor: "hover:border-green-500/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingParticlesVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundElementVariants = {
    animate: (i: number) => ({
      x: [`${Math.random() * 15 - 7.5}px`, `${Math.random() * 20 - 10}px`, `${Math.random() * 15 - 7.5}px`],
      y: [`${Math.random() * 15 - 7.5}px`, `${Math.random() * 20 - 10}px`, `${Math.random() * 15 - 7.5}px`],
      scale: [1, 1.03 + Math.random() * 0.03, 1],
      opacity: [
        parseFloat(i === 0 ? '0.03' : i === 1 ? '0.02' : '0.01'),
        parseFloat(i === 0 ? '0.035' : i === 1 ? '0.025' : '0.015') + Math.random() * 0.01,
        parseFloat(i === 0 ? '0.03' : i === 1 ? '0.02' : '0.01')
      ],
      transition: {
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror" as const,
        delay: i * 1.5,
      }
    })
  };

  return (
    <section id="about" className="relative flex flex-col w-full py-20 bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/[0.03] rounded-full blur-3xl"
          variants={backgroundElementVariants}
          custom={0}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl"
          variants={backgroundElementVariants}
          custom={1}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/[0.01] rounded-full blur-3xl"
          variants={backgroundElementVariants}
          custom={2}
          animate="animate"
        />
      </div>

      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={floatingParticlesVariants}
        animate="animate"
      >
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 7}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-24">
            <h3 className="text-xl text-white/60 pb-8 uppercase tracking-widest font-light">About Us</h3>
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.h2
                  className="text-6xl md:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.01, x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  We Build The
                  <br />
                  Future of AI
                </motion.h2>
                <p className="text-xl text-gray-400 leading-relaxed font-light">
                  Transforming businesses through intelligent automation and cutting-edge AI solutions.
                </p>
              </div>
              <motion.div
                className="relative group"
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative p-10 rounded-3xl backdrop-blur-md bg-white/[0.01] border border-white/[0.03] shadow-2xl"
                  style={{
                    transform: `perspective(1200px) rotateX(${mousePosition.y * 4}deg) rotateY(${mousePosition.x * 4}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
                    At enhancemodel.ai, we don't just build AI—we craft intelligent solutions that revolutionize how businesses operate, engage, and grow in the digital age.
                  </p>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <motion.div
                    className="absolute -top-7 -right-7 w-14 h-14 bg-black/25 rounded-full backdrop-blur-lg border border-white/10 flex items-center justify-center shadow-xl"
                    style={{
                      transform: `translateX(${mousePosition.x * -4}px) translateY(${mousePosition.y * -4}px)`,
                    }}
                    animate={{
                      rotateY: [0, 360],
                      translateY: ["0%", "-15%", "0%"],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                      translateY: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                      scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                    }}
                    whileHover={{
                      scale: 1.25,
                      boxShadow: "0 0 30px rgba(249, 115, 22, 0.6), 0 0 15px rgba(249, 115, 22, 0.4)",
                    }}
                  >
                    <FaBrain
                      className="w-7 h-7 text-orange-400"
                      style={{
                        filter: `drop-shadow(0 0 8px rgba(249,115,22,0.7)) drop-shadow(0 0 3px rgba(255,165,0,0.5))`,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8 mb-24">
            {[
              { title: "Empowering Innovation", subtitle: "Our Mission", color: "orange", desc: "We specialize in developing custom Large Language Models, intelligent chatbots, and seamless AI integrations tailored to your unique business needs." },
              { title: "Leading Tomorrow", subtitle: "Our Vision", color: "blue", desc: "To be the driving force behind AI transformation, helping businesses achieve unparalleled efficiency and customer engagement through innovation." },
              { title: "Excellence First", subtitle: "Our Values", color: "purple", desc: "With passion for innovation and commitment to excellence, we deliver cutting-edge solutions that exceed expectations and drive real results." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative p-8 h-full rounded-3xl backdrop-blur-lg bg-white/[0.008] border border-white/[0.02] hover:border-white/[0.04] transition-all duration-700 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 1.5}deg) rotateY(${mousePosition.x * 1.5}deg)`,
                    transition: 'transform 0.2s ease-out, border-color 0.7s ease'
                  }}
                >
                  <div className="relative z-10">
                    <div className="mb-6">
                      <span className={`text-${item.color}-500 text-sm font-medium uppercase tracking-widest`}>
                        {item.subtitle}
                      </span>
                    </div>
                    <h4 className={`text-2xl font-semibold mb-6 group-hover:text-${item.color}-400 transition-colors duration-500`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${item.color}-500/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                  <motion.div
                    className={`absolute top-4 right-4 w-2.5 h-2.5 bg-${item.color}-500/50 rounded-full`}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 0.9, 0.5],
                      x: [0, Math.random() * 8 - 4, Math.random() * -8 + 4, 0],
                      y: [0, Math.random() * 8 - 4, Math.random() * -8 + 4, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Expertise Areas - FIXED VERSION */}
          <motion.div variants={itemVariants} className="mb-24">
            <div className="text-center mb-16">
              <motion.h4
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.03, textShadow: "0 0 10px rgba(255,255,255,0.1)" }}
              >
                Our Expertise
              </motion.h4>
              <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                Cutting-edge technologies and methodologies that power the future of artificial intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertiseItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    whileHover={{ y: -12, rotateY: 3, scale: 1.03 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div
                      className={`relative p-8 h-full rounded-3xl backdrop-blur-lg bg-white/[0.005] border border-white/[0.015] ${item.borderHoverColor} transition-all duration-700 overflow-hidden`}
                      onMouseMove={handleMouseMove}
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 2.5}deg)`,
                        transition: 'transform 0.2s ease-out, border-color 0.7s ease'
                      }}
                    >
                      <div className="relative z-10 text-center">
                        <motion.div
                          className="w-20 h-20 rounded-2xl backdrop-blur-sm bg-white/[0.03] flex items-center justify-center mx-auto mb-6 border border-white/[0.06]"
                          whileHover={{
                            rotateY: 180,
                            scale: 1.12,
                            boxShadow: `0 0 15px rgba(${item.color === 'orange' ? '249, 115, 22' : item.color === 'blue' ? '59, 130, 246' : item.color === 'purple' ? '168, 85, 247' : '34, 197, 94'}, 0.2)`
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className={`w-10 h-10 ${item.iconColor}`} />
                        </motion.div>

                        <h5 className={`font-semibold text-white mb-4 text-lg ${item.titleHoverColor} transition-colors duration-500`}>
                          {item.title}
                        </h5>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>

                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                      <motion.div
                        className={`absolute top-2 right-2 w-1.5 h-1.5 ${item.particleColor} rounded-full`}
                        animate={{
                          y: [-6, 6, -6],
                          opacity: [0.4, 0.9, 0.4],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.25
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="relative p-12 rounded-3xl backdrop-blur-lg bg-white/[0.008] border border-white/[0.025] overflow-hidden"
              whileHover={{ scale: 1.015, boxShadow: "0 0 20px rgba(255,255,255,0.03)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-5xl md:text-6xl font-bold text-orange-500 mb-4"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(249, 115, 22, 0.4)',
                          '0 0 16px rgba(249, 115, 22, 0.6)',
                          '0 0 8px rgba(249, 115, 22, 0.4)'
                        ]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm uppercase tracking-widest font-light">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/[0.01] via-transparent to-blue-500/[0.01]"></div>

              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  background: [
                    'linear-gradient(45deg, rgba(249, 115, 22, 0.005) 0%, transparent 30%, rgba(59, 130, 246, 0.005) 70%, transparent 100%)',
                    'linear-gradient(45deg, transparent 0%, rgba(249, 115, 22, 0.005) 30%, transparent 70%, rgba(59, 130, 246, 0.005) 100%)',
                    'linear-gradient(45deg, rgba(249, 115, 22, 0.005) 0%, transparent 30%, rgba(59, 130, 246, 0.005) 70%, transparent 100%)',
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;