'use client';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import useAnimationSequence from '../hooks/useAnimationSequence'; // Import custom hook to manage animation sequence

// Custom hook to manage animation sequence
// This hook will control the visibility of each step in the animation sequence
const Hero: React.FC = () => {
  const show = useAnimationSequence(4); // Adjust the number of steps

  return (
    <section className="bg-[#121212]/60 py-20 min-h-[48rem] flex items-center justify-center mx-auto">
      <div className="container mx-auto px-6 xl:px-0 md:flex md:items-center">
        {/* Left Column */}
        <div className="md:w-1/2 min-h-[16rem] text-center md:text-left space-y-6">
          {show.step1 && (
            <motion.h1
              className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#EAEAEA]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Hello, I’m Ziad
            </motion.h1>
          )}

          {show.step2 && (
            <motion.p
              className="text-xl md:text-3xl font-medium text-[#B6B6B6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <Typewriter
                words={[
                  'I am a Front-end Developer',
                  'I Enrich, Develop, and Maintain Websites',
                ]}
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
                href="https://api.whatsapp.com/send?phone=201067564254&text=I want web service - أريد خدمة البرمجة"
                className="inline-flex items-center gap-2 bg-[#FF2E63]/70 hover:bg-[#e12a59]/90 text-white px-6 py-3 rounded-lg shadow-md transition"
              >
                <span>Hire Me</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1_oJ0njaALK5R6caYnyrgUuzZy2QLhHCw/view?usp=sharing"
                className="inline-flex items-center gap-2 bg-[#08D9D6]/90 hover:bg-[#07c7c4]/80 text-[#121212] px-6 py-3 rounded-lg shadow-md transition"
                download
              >
                <span>Download CV</span>
                <FileDown size={23} strokeWidth={3} className="text-[#121212]" />
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
              <div className="rounded-xl overflow-hidden shadow-lg transform rotate-12 bg-[#1A1A1D] p- m-6">
                <img
                  src="/photo.avif"
                  fetchPriority="high"
                  width={390}
                  height={450}
                  alt="Ziad"
                  className="h-auto object-cover transform -rotate-12 -translate-x-5"
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
