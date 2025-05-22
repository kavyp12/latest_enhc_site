'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineArrowOutward } from "react-icons/md";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative flex flex-col w-full py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <h3 className="text-xl text-white pb-5">Get In Touch</h3>
          
          <div className="grid lg:grid-cols-2 gap-16 mt-10">
            {/* Left side - Simple & Clean */}
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Let's Build
                <br />
                <span className="text-orange-500">Together</span>
              </h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-md">
                Ready to transform your business with AI? Let's discuss your project.
              </p>
              
              {/* Contact Info - Minimal */}
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="text-white text-lg group-hover:text-orange-500 transition-colors duration-300">
                    infoenhc@gmail.com
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="text-white text-lg group-hover:text-orange-500 transition-colors duration-300">
                    +91 9879985607
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Clean Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Name *"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:border-orange-500 outline-none transition-colors duration-300 text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email *"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:border-orange-500 outline-none transition-colors duration-300 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:border-orange-500 outline-none transition-colors duration-300 text-white placeholder-gray-500"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project *"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-700 focus:border-orange-500 outline-none transition-colors duration-300 text-white placeholder-gray-500 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group/button flex items-center gap-3 mt-8 text-white hover:text-orange-500 transition-colors duration-300"
                >
                  <span className="text-lg">Send Message</span>
                  <MdOutlineArrowOutward className="text-xl group-hover/button:rotate-45 group-hover/button:translate-x-1 duration-300" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;