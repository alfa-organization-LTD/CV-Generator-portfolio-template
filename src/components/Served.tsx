import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
interface Milestone {
  customers_served: number;
  projects_completed: number;
  experience_years: number;
}

interface ServedProps {
  milestone?: Milestone[];
}
// This component uses the Intersection Observer API to trigger animations when the component comes into view. 
// It displays statistics about customers served, projects completed, and years of experience.
// It uses the CountUp library to animate the counting of numbers.
const Served: React.FC<ServedProps> = ({ milestone }) => {
  const { ref: servsRef, inView: servsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Lowered threshold for mobile reliability
  });

  return (
    <motion.div
      ref={servsRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: servsInView ? 1 : 0, y: servsInView ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      <div
        id="counter"
        className="bg-[var(--surface)] text-[var(--text)] flex justify-center w-auto text-center 2xl:m-[2.5rem] md:py-5 py-10 rounded-2xl"
      >
        <div className="nums md:flex mx-auto p-4 m-4 justify-center lg:space-x-40 md:space-y-0 space-y-10 text-2xl">
          {/* Customers Served */}
          <section
            aria-label="Customers Served"
            className="one flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <i className="fa-solid fa-store fa-3x text-[var(--primary)]"></i>
            <p className="p-4 font-semibold text-[var(--text)]">Customers Served</p>
            <div className="flex justify-center text-[var(--primary-soft)]">
              <p className="text-4xl">+</p>
              {servsInView && (
                <CountUp
                  className="text-4xl p-1 font-bold"
                  start={0}
                  end={milestone?.[0]?.customers_served ?? 0}
                  duration={10}
                  separator=","
                />
              )}
            </div>
          </section>

          {/* Project Complete */}
          <section
            aria-label="Project Completed"
            className="two flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <i className="fa-brands fa-twitch fa-3x text-[var(--primary)]"></i>
            <p className="p-4 font-semibold text-[var(--text)]">Project Complete</p>
            <div className="flex justify-center text-[var(--primary-soft)]">
              <p className="text-4xl">+</p>
              {servsInView && (
                <CountUp
                  className="text-4xl p-1 font-bold"
                  start={0}
                  end={milestone?.[0]?.projects_completed ?? 0}
                  duration={1}
                  separator=","
                />
              )}
            </div>
          </section>

          {/* Experience Years */}
          <section
            aria-label="Experience Years"
            className="four flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <i className="fa-brands fa-youtube fa-3x text-[var(--primary)]"></i>
            <p className="p-4 font-semibold text-[var(--text)]">Experience Years</p>
            <div className="flex justify-center text-[var(--primary-soft)]">
              <p className="text-4xl">+</p>
              {servsInView && (
                <CountUp
                  className="text-4xl p-1 font-bold"
                  start={0}
                  end={milestone?.[0]?.experience_years ?? 0}
                  duration={1}
                  separator=","
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Served;
