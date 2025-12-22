import React from 'react';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Define the types
interface Skill {
  name: string;
  icon?: string;   
  progress?: string; 
}

interface SkillsProps {
  skills?: Skill[];
}

// skills component
// This component displays a list of skills.
// It uses the Intersection Observer API to trigger animations when the component comes into view.
// The skills are displayed in a grid layout, and each skill card has a hover effect.
const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { ref: skillsRef, inView: sightInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const skillList = skills ?? [];
  
  return (
    <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: sightInView ? 1 : 0, y: sightInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
    <div
      id="skills"
      className="text-[var(--text)] mt-20 w-full md:max-w-[80rem] 2xl:max-w-[96rem] mx-auto px-4a md:px-0 transition-opacity duration-1000"
    >
      <div className="text-center space-y-8">
        <h1 className="text-5xl lg:text-7xl font-bold text-[var(--primary)]">My Skills</h1>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${skillList.length} lg:grid-cols-${skillList.length} xl:grid-cols-${skillList.length} gap-8 md:gap-10 mt-12`}>
        {skillList.map((skill, index) => (
          <div
            key={index}
            className="bg-[var(--surface)] rounded-xl p-5 text-center my-auto min-h-[10.8rem]a shadow-lg hover:scale-105 transform transition duration-300"
          >
            {/* <img
              src={skill.icon}
              className={`mx-auto mb-4 
                ${skill.name === 'Restful API' || skill.name === 'GitHub' ? 'invert' : ''}
                ${skill.name === 'Nuxt.js' ? 'mt-10 mb-5.5' : undefined} 
                ${skill.name === 'Axios' ? 'mt-12.5 mb-6' : undefined}` // Custom classes needed for specific icons
              }
              width={skill.name === 'Tailwind' || skill.name === 'Nuxt.js' || skill.name === 'Axios' ? 130 : 80}
              height="80"
              alt={skill.name}
            /> */}
            <h3 className="text-xl font-semibold text-[var(--text)] mb-2">{skill.name}</h3>

            {/* Optional Progress bar - uncomment if you want visual skill level */}
            {/* 
            <div className="w-full h-2 bg-[#121212] rounded-full">
              <div className={`h-full bg-[#08D9D6] rounded-full ${skill.progress}`}></div>
            </div> 
            */}
          </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
}
export default Skills;
