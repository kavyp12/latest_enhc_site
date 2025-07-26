'use client';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import animationData from '@/data/confetti.json';
import WebsiteMockup from './WebsiteMockup';
import Soda from '../SodaAnimation/Soda';
import ProgLangList from './ProgLangList';
import Image from 'next/image';

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
  img,
  imgClassName,
  titleClassName,
  descriptionClassName,
  spareImg,
  children,
}: {
  className?: string;
  id: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  spareImg?: string;
  children?: React.ReactNode;
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
          
          {/* SERVICE SPECIFIC ELEMENTS */}
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
          
          {/* CONTACT BUTTON */}
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