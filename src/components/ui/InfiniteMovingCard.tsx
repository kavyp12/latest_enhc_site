'use client';
import { cn } from '@/utils/cn';
import React, { useEffect, useState, useCallback, useRef } from 'react'; // Added useRef
import Image from 'next/image';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    title?: string;
    img?: string;
  }[];
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Changed React.useRef to useRef
  const scrollerRef = useRef<HTMLUListElement>(null); // Changed React.useRef to useRef
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => { // Wrapped in useCallback
    if (containerRef.current) {
      switch (direction) {
        case 'left':
          containerRef.current.style.setProperty('--animation-direction', 'forwards');
          containerRef.current.style.setProperty('--animation-axis', 'horizontal');
          break;
        case 'right':
          containerRef.current.style.setProperty('--animation-direction', 'reverse');
          containerRef.current.style.setProperty('--animation-axis', 'horizontal');
          break;
        case 'up':
          containerRef.current.style.setProperty('--animation-direction', 'forwards');
          containerRef.current.style.setProperty('--animation-axis', 'vertical');
          break;
        case 'down':
          containerRef.current.style.setProperty('--animation-direction', 'reverse');
          containerRef.current.style.setProperty('--animation-axis', 'vertical');
          break;
      }
    }
  }, [direction]); // Added direction to dependencies

  const getSpeed = useCallback(() => { // Wrapped in useCallback
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  }, [speed]); // Added speed to dependencies

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]); // Added getDirection and getSpeed as dependencies

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);


  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden',
        direction === 'left' || direction === 'right'
          ? '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]'
          : '[mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex',
          direction === 'left' || direction === 'right' ? 'flex-row' : 'flex-col',
          'min-w-full shrink-0 gap-4 py-4 w-max',
          start && 'animate-scroll', // This assumes 'animate-scroll' is defined in your CSS
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item) => ( // Removed idx as it was not used for the key
          <li
            className="h-full relative overflow-hidden rounded-2xl border border-b-0 flex-shrink-0 border-slate-700"
            style={{
              // Consider defining these CSS variables (--slate-800, --slate-900) globally or in a parent component
              background: 'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
            }}
            key={item.name} // item.name should be unique
          >
            {item.img && (
              <Image
                alt={item.title || item.name || 'Image'} // Improved alt text
                src={item.img}
                width={500} // Consider making these dynamic or more appropriate for your layout
                height={300}
                style={{ width: 'auto', height: 'auto' }} // This might conflict with fixed width/height, review usage
                priority // Use priority judiciously, only for LCP images
              />
            )}
            {item.title && (
              <p className="relative w-max px-6 py-2">{item.title}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};