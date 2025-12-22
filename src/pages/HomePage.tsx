import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Loader from '../components/loader';
import { Profile } from '../types/profile';

// Dynamically import components
// in order to reduce the initial bundle size and improve performance
const Services = lazy(() => import('../components/Services'));
const MyInfo = lazy(() => import('../components/MyInfo'));
const Skills = lazy(() => import('../components/Skills'));
const EduExp = lazy(() => import('../components/EduExp'));
const Served = lazy(() => import('../components/Served'));
const Dots = lazy(() => import('../components/Dots'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

const HomePage: React.FC<{ portfolio: Profile }> = ({ portfolio }) => {

  return (
    <main>
      <div className="main min-h-[1200px]">
        <Hero hero={portfolio?.Hero} />

        <div className="min-h-[1200px] md:max-w-[80rem] 2xl:max-w-[101rem] mx-auto p-4 xl:p-0">
          <Suspense fallback={<Loader />}>
            <Services services={portfolio?.services} />
            <Dots />
            <MyInfo heroImage={portfolio?.Hero.hero_image_url} myInfo={portfolio?.Hero} />
            <Dots />
            <Skills skills={portfolio?.skills} />
            <Dots />
            <EduExp myEdu={portfolio?.education} myExp={portfolio?.experience} />
            <Dots />
            <Served milestone={portfolio?.milestone} />
            <Dots />
            <Projects projects={portfolio?.projects} />
          </Suspense>
        </div>

        <Suspense fallback={<Loader />}>
          <Dots />
          <Contact myContact={portfolio?.Hero} />
        </Suspense>
      </div>
    </main>
  );
}

export default HomePage;
