import React from 'react';
import { Button } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import { FileDown } from "lucide-react";
import type { Hero as HeroType } from '../types/profile';

interface MyInfoProps {
  heroImage?: string;
  myInfo?: HeroType;
}

// MyInfo component that displays personal information
// using the Intersection Observer API to trigger animations
const MyInfo = ({ heroImage, myInfo }: MyInfoProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div
      ref={ref}
      className={`mt-24 m-5 md:max-w-[96rem] mx-auto transition-opacity duration-1000 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col md:max-w-[80rem] 2xl:max-w-full mx-auto md:flex-row bg-[var(--surface)] rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="p-5 md:max-w-1/3 flex justify-center items-center">
          <img
            className="rounded-2xl w-[300px] md:w-[390px] transition-all duration-500"
            src={heroImage}
            width="390"
            height="450"
            alt="Ziad"
          />
        </div>

        {/* Text Section */}
        <div className="p-5 md:py-10 md:max-w-[56.3rem]a mx-auto flex flex-col space-y-8 text-[var(--text)]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--primary)]">I am {myInfo?.firstName}</h1>
          <div className="h-1 w-20 md:w-72 bg-[var(--primary)] rounded-full"></div>
          <h2 className="text-2xl md:text-4xl font-light leading-snug text-[var(--text)]">
            {myInfo?.bio}
          </h2>
          <p className="text-lg md:text-xl font-sans leading-relaxed max-w-4xl text-[var(--text-muted)]">
            {myInfo?.description}
          </p>

          {/* CV Button */}
          <div className="mt-5">
            <a
              href={myInfo?.cvLink}
              download
            >
              <Button
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)]/90 px-4 py-2 text-lg font-semibold text-[var(--text)] hover:scale-105 hover:bg-[var(--primary-soft)] transition-transform duration-300"
              >
                <span>Download CV</span>
                <FileDown size={23} strokeWidth={3} className="text-[var(--text)]" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyInfo;
