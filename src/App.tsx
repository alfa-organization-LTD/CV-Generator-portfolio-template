import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactNode, useLayoutEffect, useEffect, useState } from "react";
import type { Profile } from "./types/profile";
import { applyTheme } from "./utils/ThemeProvider";
import { ProfileSchema } from "./schemas/profile.schema";
import Loader from "./components/loader";
import SEO from "./components/SEO";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// Scroll to top on route change
// automatically scrolls to the top of the page when the route changes
const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return <>{children}</>;
};

export default function App() {
  const [profileJson, setProfileJson] = useState<Profile | null>(null);

  useEffect(() => {
    async function bootstrap() {
      const res = await fetch("/profile.json");
      const pj: Profile = await res.json();
      const parsed = ProfileSchema.safeParse(pj);
      if (!parsed.success) {
          console.error("Invalid profile.json", parsed.error.format());
          // return;
      }
      setProfileJson(pj);   
    }
    bootstrap();
  }, []);

  useEffect(() => {
    if (profileJson?.theme) {
      applyTheme(profileJson?.theme, profileJson?.theme.colors);      
    }
  }, [profileJson]);


    if (!profileJson) return <Loader />;


  return (
    <Router>
      <ScrollToTop>
        <SEO portfolio={profileJson} />
        <div className="min-h-screen bg-[var(--bg)] adark">
          <Header 
              logo={profileJson?.logo_url} 
              logoInverted={profileJson?.logo_inverted}
              contactInfo={profileJson?.Hero} />

          <main className="pt-18">
            <Routes>
              <Route path="/" element={<HomePage portfolio={profileJson} />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </main>
            <BackToTop/>
          <Footer contactUs={profileJson?.socialLinks} />
        </div>
      </ScrollToTop>
    </Router>
  );
}
