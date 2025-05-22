'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function HeroContent() {
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo('.hero-text-1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' })
            .fromTo('.hero-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power1.out' })
            .fromTo('.hero-button', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.15, ease: 'power1.out' });
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="absolute h-full pointer-events-none inset-0 flex items-center justify-center bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <p className="hero-text-1 text-4xl lg:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-white max-w-4xl text-center mix-blend-difference">
                Empowering Your Future with AI Innovation
            </p>
            <p className="hero-text-2 text-sm lg:text-lg relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-white py-8 max-w-sm md:max-w-4xl text-center">
                Unleash the power of custom Large Language Models, intelligent chatbots, and seamless AI integration tailored to your business needs.
            </p>
            <button
                type="button"
                className="hero-button text-sm relative z-20 px-4 py-2 bg-white text-black rounded-full text-center creativeBtn"
                onClick={() => scrollToSection('contact')}
            >
                <span>Get Started</span>
            </button>
        </div>
    );
}