'use client';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import Image from 'next/image';
import { perspective, slideIn } from './anim';
import clsx from 'clsx';

export default function Nav({ toggleMenu }) {
  const handleNavClick = (href) => {
    // Close the menu first
    if (toggleMenu) {
      toggleMenu();
    }

    // Smooth scroll to section
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <div className={styles.mainNav}>
      <div className={styles.nav}>
        <div className={clsx(styles.body)}>
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <div key={`b_${i}`} className={styles.linkContainer}>
                <motion.div
                  custom={i}
                  variants={slideIn}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                  >
                    {title}
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
        <motion.div className={styles.footer}>
          {footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                key={`f_${i}`}
                href={href}
              >
                {title}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
      <div className="relative block w-[100vw] h-[50vh] pt-[100px]">
        <Image alt="" src="/b5.jpg" objectFit="cover" width={1280} height={1080} />
      </div>
    </div>
  );
}