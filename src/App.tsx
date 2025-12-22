import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactNode, useLayoutEffect, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { createClient } from "@supabase/supabase-js";

type ProfileJson = {
  user_id: string;
  supabase_url?: string;
  supabase_anon_key?: string;
  logos?: string[]; // any other public config you want embedded
};





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
  const [profileJson, setProfileJson] = useState<ProfileJson | null>(null);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    async function bootstrap() {
      const res = await fetch("/profile.json");
      const pj: ProfileJson = await res.json();
      setProfileJson(pj);

      // Create client using values from profile.json (anon key is public)
      const supabase = createClient(
        pj.supabase_url || (import.meta.env.VITE_SUPABASE_URL as string),
        pj.supabase_anon_key || (import.meta.env.VITE_SUPABASE_ANON_KEY as string)
      );

      // fetch user's portfolio data (example, add tables you use)
      const { data } = await supabase
        .from("user_profiles")
        .select("full_name, bio, avatar_link")
        .eq("id", pj.user_id)
        .single();
      setPortfolio(data);
    }
    bootstrap();
  }, []);

    if (!profileJson || !portfolio) return <div>Loading...</div>;


  return (
    <Router>
      <ScrollToTop>
        <div className="min-h-screen bg-black text-white dark">
          <Header />

          <main className="pt-18">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
            <BackToTop/>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
}
