import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { InView } from 'react-intersection-observer';
import clsx from "clsx";

// Types
// Define the types for the service items and services
interface ServiceItem {
  text: string;
}

interface Service {
  icon?: React.ReactNode; // Optional icon
  title: string;
  description: string;
  items?: ServiceItem[];
  link: string;
}

interface ServicesProps {
  services?: Service[];
}

// Service component
// This component displays a list of services offered by Zeiad
// Each service has an icon, title, description, and a button to contact the developer
const Services: React.FC<ServicesProps> = ({ services }) => {
  // Services data
  // Each service has a reference, inView state, delay for animation, icon, title, items (description), and a link to contact
  const servicesData = services ?? [];

  return (
    <section className="text-[var(--text)] py-16 md:mt-10">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex items-center mt-10 mb-16">
          <div className="w-1 h-10 bg-[var(--primary)] mr-5"></div>
          <h1 className="text-4xl font-bold md:text-5xl text-[var(--text)]">Services I Provide for My Clients</h1>
        </div>

        {/* Service Cards */}
        <div className="flex flex-wrap justify-center gap-6">
            {servicesData.map((service, index) => (
              <InView key={index} triggerOnce threshold={0.2}>
                {({ inView, ref }) => (
                  <motion.div
                    ref={ref}
                    className="
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      rounded-2xl
                      p-6
                      shadow-lg
                      hover:shadow-xl
                      transition
                      duration-300
                      w-full
                      sm:w-[calc(50%-0.75rem)]
                      lg:w-[calc(50%-0.75rem)]
                      max-w-[100rem]
                    "
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      {service.title}
                    </h2>

                    <hr className="mb-4 w-24 mx-auto border-t-2 border-[var(--primary)]" />

                    <p className="text-sm md:text-base text-[var(--text-muted)] text-center">
                      {service.description}
                    </p>

                    <div className="flex justify-center mt-6">
                      <motion.a
                        href={service.link}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={clsx(
                          "group inline-flex items-center gap-2",
                          "px-6 py-3 rounded-xl",
                          "bg-[var(--primary)] text-[var(--text)]",
                          "shadow-md shadow-[var(--primary)]/20",
                          "hover:shadow-lg hover:shadow-[var(--primary)]/30",
                          "transition-colors duration-300"
                        )}
                      >
                        <span className="font-medium tracking-wide">
                          Contact Me
                        </span>

                        <ChevronRight
                          className="
                            w-5 h-5
                            transition-transform duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </InView>
            ))}
          </div>
      </div>
    </section>
  );
}
export default Services;
