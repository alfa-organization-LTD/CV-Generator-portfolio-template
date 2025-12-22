import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Education, Experience } from "../types/profile";

interface EduExpProps {
  myEdu?: Education[];
  myExp?: Experience[];
}

// This component displays the education and experience sections of a resume
// It allows users to toggle between the two sections using buttons
const EduExp: React.FC<EduExpProps> = ({ myEdu, myExp }) => {
  const [activeTab, setActiveTab] = useState("education");

  const education = myEdu?? [];
  const experiences = myExp ?? [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex justify-center space-x-6 mb-10">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            activeTab === "education"
              ? "bg-[var(--primary)]/80 text-[var(--text)]"
              : "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]"
          }`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            activeTab === "experience"
              ? "bg-[var(--primary)]/80 text-[var(--text)]"
              : "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]"
          }`}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "education" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-10 bg-[var(--primary)]/60"></div>
                  <p className="text-lg md:text-xl me-6 text-[var(--text-muted)]">{education[0]?.startDate} – {education[0]?.endDate}</p>
                </div>
                <div className="md:ml-10 mt-4 md:mt-0">
                  <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary)]/90">
                    {education[0]?.degree}
                  </h2>
                  <p className="text-xl font-light text-[var(--text)]">{education[0]?.institution}</p>
                  <ul className="list-disc ml-5 mt-4 text-md text-[var(--text-muted)] space-y-1">
                    {education[0]?.description}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-10 bg-[var(--primary)]/60"></div>
                    <p className="text-lg md:text-xl min-w-[10rem] text-[var(--text-muted)]">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <div className="md:ml-10 mt-4 md:mt-0">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary)]/90">
                      {exp.position}
                    </h2>
                    {exp.company && (
                      <p className="text-xl font-light text-[var(--text)]">{exp.company}</p>
                    )}
                    <ul className="list-disc ml-5 mt-4 text-md text-[var(--text-muted)] space-y-1">
                      {exp.description}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EduExp;
