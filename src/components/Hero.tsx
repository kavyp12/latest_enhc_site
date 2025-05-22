'use client';
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import HeroContent from "./ui/HeroContent";
import LostOrb from "./ui/LostOrb";

export default function Hero() {
    return (
        <section id="hero" className="flex flex-col h-screen w-full relative items-center justify-center bg-black bg-grid-white/[0.1] overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            
            {/* Spotlights */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="orange"
            />
            <Spotlight
                className="-top-40 left-20 md:left-80 md:-top-20"
                fill="blue"
            />
            
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-orange-500/[0.03] rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
            
            <HeroContent />
            
            <div className="w-full h-full absolute bottom-0 pointer-events-none">
                <LostOrb />
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div 
                        className="w-1 h-3 bg-white/60 rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}