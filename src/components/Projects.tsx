import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import type { Project as ProjectType } from '../types/profile';

// Define the type for project dataimport type

interface ProjectsProps {
  projects?: ProjectType[];
}

// Projects component
// This component displays a list of projects with filtering options and a horizontal scroll feature.
// It allows users to view projects based on their type and provides a smooth scrolling experience.
// The component also includes navigation arrows to scroll through the projects when they overflow the container.
const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // projects data
  const allProjects = projects?? [];
  const filterTypes = ["All", ...projects?.map(p => p.type) ?? []];
  const [activeType, setActiveType] = useState<string>("All");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
  
    const handleScroll = () => {
      if (!container) return;
  
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeft(scrollLeft > 40);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
    };
  
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
  
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);  

  const filteredProjects =
    activeType === "All"
      ? allProjects
      : allProjects.filter((p) => p.type === activeType);


  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
  
    const cards = Array.from(container.children);
    const scrollLeft = container.scrollLeft;
  
    const currentIndex = cards.findIndex(
      (card) => (card as HTMLElement).offsetLeft >= scrollLeft - 10
    );
  
    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(cards.length - 1, currentIndex + 1);
  
    container.scrollTo({
      left: (cards[newIndex] as HTMLElement).offsetLeft,
      behavior: "smooth",
    });
  };      
      

  return (
    <div className="bg-[var(--surface)] text-[var(--text)] px-4 py-10 md:max-w-[96rem] mx-auto rounded-2xl">
      <div className="flex items-center justify-center mb-6 space-x-4">
        <img src="/projects.svg" width={60} height='100%' alt="Projects" />
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">My Projects</h1>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {filterTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeType === type
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] text-[var(--text-muted)]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Scroll Arrows */}
        {showLeft && (
            <button
              aria-label='Scroll Left'
              onClick={() => scroll("left")}
              className="absolute left-2 z-20 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--primary)] hover:scale-110 transition-all duration-300 text-[var(--text)] p-2.5 rounded-full shadow-xl border border-[var(--primary)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {showRight && (
            <button
              aria-label='Scroll Right'
              onClick={() => scroll("right")}
              className="absolute right-2 z-20 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--primary)] hover:scale-110 transition-all duration-300 text-[var(--text)] p-2.5 rounded-full shadow-xl border border-[var(--primary)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

        {/* Projects Scroll Area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth md:px-10 py-3"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="md:min-w-[280px] md:max-w-sm max-w-[20rem] bg-[var(--primary)]/20 border border-[var(--border)] rounded-xl p-4 flex-shrink-0 hover:scale-105 transition-transform"
            >
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-bold mb-1 text-[var(--primary-soft)]">{project.title}</h4>
              <p className="text-sm text-[var(--text-muted)] mb-4">{project.description}</p>

              <div className="Buttons flex gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--primary)] text-[var(--text)] rounded hover:bg-[var(--primary)] hover:text-[var(--text)] hover:outline-[var(--primary)] outline-1 transition-all duration-300"
              >
                View Project
              </a>
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[var(--accent)]/70 text-[var(--text)] rounded hover:bg-[var(--accent)]/40 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github hover:opacity-50 transform transition duration-300 inline-block"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span className='ms-1'>Source Code</span>
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
