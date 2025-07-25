"use client";

import { workItems } from "../data/index";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface WorkItem {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    img: string;
    category: string;
    tag: string;
    technologies: string[];
    duration: string;
    team: string;
    impact: string;
    color: string;
    accentColor: string;
    year: string;
}

export default function Works() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = parseInt(entry.target.getAttribute('data-id') || '0');
                    setIsVisible(prev => ({
                        ...prev,
                        [id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('[data-id]');
        elements.forEach(el => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, []);

    const toggleProject = (id: number) => {
        setActiveProject(activeProject === id ? null : id);
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section id="works" className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-transparent via-purple-500/5 to-transparent rounded-full animate-spin [animation-duration:20s]"></div>
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-block">
                        <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 relative">
                            Our Works
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                        </h2>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Discover our portfolio of innovative projects that push the boundaries of technology and design
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-32">
                    {workItems.map((item: WorkItem, index) => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            className={`relative group transition-all duration-1000 ${
                                isVisible[item.id]
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-20'
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Project Container */}
                            <div className={`
                                grid lg:grid-cols-2 gap-12 items-center
                                ${index % 2 === 0 ? 'lg:grid-flow-row' : 'lg:grid-flow-row-dense'}
                            `}>
                                {/* Content Section */}
                                <div className={`
                                    space-y-8 z-20 relative
                                    ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
                                `}>
                                    {/* Project Badge */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`
                                            px-4 py-2 rounded-full text-sm font-semibold text-white
                                            bg-gradient-to-r ${item.color}
                                            shadow-lg shadow-purple-500/25
                                        `}>
                                            {item.year}
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                                    </div>

                                    {/* Title & Subtitle */}
                                    <div>
                                        <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-xl text-purple-300 font-medium mb-6">
                                            {item.subtitle}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="relative">
                                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                            {activeProject === item.id ? item.longDescription : item.description}
                                        </p>
                                        <button
                                            onClick={() => toggleProject(item.id)}
                                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center gap-2"
                                        >
                                            {activeProject === item.id ? 'Show Less' : 'Read More'}
                                            <svg
                                                className={`w-4 h-4 transition-transform ${activeProject === item.id ? 'rotate-180' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Project Details */}
                                    <div className={`
                                        grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 overflow-hidden
                                        ${activeProject === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                    `}>
                                        <div className="space-y-4">
                                            <div className="border-l-4 border-purple-500 pl-4">
                                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Category</p>
                                                <p className="text-white font-semibold">{item.category}</p>
                                            </div>
                                            <div className="border-l-4 border-blue-500 pl-4">
                                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Duration</p>
                                                <p className="text-white font-semibold">{item.duration}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="border-l-4 border-green-500 pl-4">
                                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Team Size</p>
                                                <p className="text-white font-semibold">{item.team}</p>
                                            </div>
                                            <div className="border-l-4 border-yellow-500 pl-4">
                                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Impact</p>
                                                <p className="text-white font-semibold">{item.impact}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div className="space-y-4">
                                        <p className="text-gray-400 text-sm uppercase tracking-wider">Technologies Used</p>
                                        <div className="flex flex-wrap gap-3">
                                            {item.technologies.map((tech, techIndex) => (
                                                <div
                                                    key={techIndex}
                                                    onMouseEnter={() => setHoveredTech(tech)}
                                                    onMouseLeave={() => setHoveredTech(null)}
                                                    className={`
                                                        px-4 py-2 rounded-full border border-gray-700 text-sm font-medium
                                                        transition-all duration-300 cursor-pointer
                                                        ${hoveredTech === tech
                                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent transform scale-110 shadow-lg shadow-purple-500/25'
                                                            : 'text-gray-300 hover:border-purple-500 hover:text-purple-300'
                                                        }
                                                    `}
                                                >
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className={`
                                    relative group/image
                                    ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}
                                `}>
                                    <div className="relative">
                                        {/* Decorative Elements */}
                                        <div className={`
                                            absolute -inset-4 bg-gradient-to-r ${item.color} rounded-3xl blur-xl opacity-20
                                            group-hover/image:opacity-40 transition-opacity duration-500
                                        `}></div>
                                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-60 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-60 group-hover/image:opacity-100 transition-opacity duration-500"></div>

                                        {/* Main Image Container */}
                                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover/image:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                                quality={90}
                                            />

                                            {/* Overlay Elements */}
                                            <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                                                <div className="flex items-center justify-between">
                                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30`}>
                                                        {item.tag}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Card */}
                                        <div className={`
                                            absolute -bottom-8 -right-8 p-4 rounded-2xl backdrop-blur-sm border border-white/10
                                            bg-gradient-to-br from-white/10 to-white/5 shadow-2xl
                                            transform translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100
                                            transition-all duration-500 delay-200
                                        `}>
                                            <div className="text-center">
                                                <div className={`text-2xl font-bold text-white`}>
                                                    #{String(item.id).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-gray-300">Project</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Separator */}
                            {index < workItems.length - 1 && (
                                <div className="mt-20 flex items-center justify-center">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-32">
                    <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                            Let&apos;s collaborate and bring your vision to life with cutting-edge technology and innovative design.
                        </p>
                        <button
                            onClick={scrollToContact}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                        >
                            Let&apos;s Work Together
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
