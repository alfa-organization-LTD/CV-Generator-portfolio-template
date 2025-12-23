'use client';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import useAnimationSequence from '../hooks/useAnimationSequence'; // Import custom hook to manage animation sequence
import type { Hero as HeroType } from '../types/profile';

interface HeroProps {
  hero?: HeroType;
}

// Custom hook to manage animation sequence
// This hook will control the visibility of each step in the animation sequence
const Hero = ({ hero }: HeroProps) => {
  
  const show = useAnimationSequence(4); // Adjust the number of steps

  return (
    <section className="bg-[var(--surface)]/40 py-20 min-h-[48rem] flex items-center justify-center mx-auto">
      <div className="container mx-auto px-6 xl:px-0 md:flex md:items-center">
        {/* Left Column */}
        <div className="md:w-1/2 min-h-[16rem] text-center md:text-left space-y-6">
          {show.step1 && (
            <motion.h1
              className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[var(--text)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Hello, I’m {hero?.firstName}
            </motion.h1>
          )}

          {show.step2 && (
            <motion.p
              className="text-xl md:text-3xl font-medium text-[var(--text-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <Typewriter
                words={[hero?.bio || '']}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1000}
              />
            </motion.p>
          )}

          {show.step3 && (
            <motion.div
              className="flex justify-center md:justify-start gap-6 pt-6 mx-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <a
                href={`https://api.whatsapp.com/send?phone=${hero?.phone_number}&text=I want web service - أريد خدمة البرمجة`}
                className="inline-flex items-center gap-2 bg-[var(--primary)]/70 hover:bg-[var(--primary-soft)]/90 text-[var(--text)] px-6 py-3 rounded-lg shadow-md transition"
              >
                <span>Hire Me</span>
              </a>
              <a
                href={hero?.cv_link}
                className="inline-flex items-center gap-2 bg-[var(--accent)]/80 hover:bg-[var(--accent)]/80 text-[var(--text)] px-6 py-3 rounded-lg shadow-md transition"
                download
              >
                <span>Download CV</span>
                <FileDown size={23} strokeWidth={3} className="text-[var(--text)]" />
              </a>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 min-h-[26rem]">
          {show.step4 && (
            <motion.div
              className="mt-10 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`rounded-xl overflow-hidden shadow-lg transform ${hero?.hero_image_cover ? 'rotate-12 bg-[var(--primary-soft)]' : 'rotate-0'} p- m-6`}>
                <img
                  src={hero?.hero_image_url}
                  fetchPriority="high"
                  width={390}
                  height={450}
                  alt="Ziad"
                  className={`h-auto object-cover transform ${hero?.hero_image_cover ? '-rotate-12 -translate-x-5' : 'h-80 w-96'}`}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
