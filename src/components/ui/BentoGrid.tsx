'use client';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import animationData from '@/data/confetti.json';
import WebsiteMockup from './WebsiteMockup';
import Soda from '../SodaAnimation/Soda';
import ProgLangList from './ProgLangList';
import Image from 'next/image';
import * as THREE from 'three';

// FIXED AI BRAIN 3D COMPONENT
const AIBrain3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const mountElement = mountRef.current; // Capture ref value
    if (!mountElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Create brain-like structure
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });
    const brain = new THREE.Mesh(geometry, material);
    scene.add(brain);

    // Add neural network nodes
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    
    for (let i = 0; i < 20; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      brain.add(node);
    }

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    camera.position.z = 3;

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      brain.rotation.x += 0.005;
      brain.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-4 right-4 z-10" />;
};

// FIXED LLM NEURAL NETWORK 3D COMPONENT
const LLMNetwork3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const mountElement = mountRef.current; // Capture ref value
    if (!mountElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(180, 180);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Create neural network layers
    const layers = [];
    const layerCount = 4;
    
    for (let layer = 0; layer < layerCount; layer++) {
      const layerGroup = new THREE.Group();
      const nodeCount = layer === 0 || layer === layerCount - 1 ? 3 : 5;
      
      for (let node = 0; node < nodeCount; node++) {
        const geometry = new THREE.SphereGeometry(0.08, 12, 12);
        const material = new THREE.MeshBasicMaterial({
          color: layer === 0 ? 0x3b82f6 : layer === layerCount - 1 ? 0x10b981 : 0x8b5cf6
        });
        const sphere = new THREE.Mesh(geometry, material);
        
        sphere.position.y = (node - (nodeCount - 1) / 2) * 0.5;
        layerGroup.add(sphere);
      }
      
      layerGroup.position.x = (layer - (layerCount - 1) / 2) * 1.2;
      scene.add(layerGroup);
      layers.push(layerGroup);
    }

    // Add connections between layers
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];
      
      currentLayer.children.forEach((currentNode: any) => {
        nextLayer.children.forEach((nextNode: any) => {
          const points = [
            new THREE.Vector3().copy(currentNode.position).add(currentLayer.position),
            new THREE.Vector3().copy(nextNode.position).add(nextLayer.position)
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        });
      });
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    camera.position.z = 4;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-4 right-4 z-10" />;
};

// CHATBOT ANIMATION COMPONENT (unchanged)
const ChatbotAnimation = () => {
  const [messages] = useState([
    { id: 1, text: "Hello! How can I help?", sender: "bot" },
    { id: 2, text: "I need support", sender: "user" },
    { id: 3, text: "I'm here 24/7 to assist!", sender: "bot" }
  ]);

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="absolute bottom-4 left-4 w-64 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
      <div className="space-y-2 h-20 overflow-hidden">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`transform transition-all duration-500 ${
              index === currentMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-40'
            }`}
          >
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-3 py-1 rounded-lg text-xs ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2 space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400">AI Assistant Online</span>
      </div>
    </div>
  );
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto group',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  descriptionClassName,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ['ReactJS', 'Express', 'Typescript'];
  const rightLists = ['VueJS', 'NuxtJS', 'GraphQL'];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleCopy = () => {
    const text = 'idea@example.com';
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 brandContainer',
        className
      )}
      style={{
        background: 'rgba(0,0,0, 0.8)',
        // Note: The linear-gradient below might be overridden by the solid rgba background above it in some browsers.
        // Consider if you meant to use one or the other, or combine them differently.
        backgroundColor:
          'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      <div className={`${id === 7 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={typeof title === 'string' ? title : 'Background image'}
              className={cn(imgClassName, 'object-cover object-center')}
              width={500}
              height={500}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={typeof title === 'string' ? `Spare image for ${title}`: 'Spare image'}
              className="object-cover object-center w-full h-full"
              width={500}
              height={500}
            />
          )}
        </div>

        <div
          className={cn(
            titleClassName,
            'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10'
          )}
        >
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>
          <div
            className={cn(
              descriptionClassName,
              'font-sans font-extralight md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10 mt-3'
            )}
          >
            {description}
          </div>
          
          {/* EXISTING ELEMENTS - UNCHANGED */}
          {id === 1 && (
            <div className="absolute top-52 md:top-12 z-0">
              <WebsiteMockup />
            </div>
          )}
          {id === 5 && <Soda />}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <ProgLangList />
            </div>
          )}
          
          {/* AI CHATBOT ELEMENTS (ID: 8) */}
          {id === 8 && (
            <>
              <AIBrain3D />
              <ChatbotAnimation />
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-blue-400 font-medium">24/7 Support</span>
                </div>
              </div>
            </>
          )}
          
          {/* LLM ELEMENTS (ID: 9) */}
          {id === 9 && (
            <>
              <LLMNetwork3D />
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Model Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-xs text-blue-400">Data Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-xs text-purple-400">AI Inference</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                <div className="text-6xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  LLM
                </div>
              </div>
            </>
          )}
          
          {/* CONTACT BUTTON - UNCHANGED */}
          {id === 7 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${copied ? 'block' : 'block'}`}
              ></div>
              <button
                type="button"
                className="text-sm relative z-20 px-4 py-2 bg-white text-black rounded-full text-center creativeBtn"
                onClick={() => scrollToSection('contact')}
              >
                <span>Let&apos;s Talk</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};