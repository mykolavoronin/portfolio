import { Suspense, lazy } from "react";
import { MotionConfig } from "motion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { VercelInsights } from "@/components/VercelInsights";
import { Layout } from "@/components/Layout";
import { showSkills } from "@/data/skills";
import { showServices } from "@/data/services";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CardPage = lazy(() => import("./pages/CardPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ItAcademyPage = lazy(() => import("./pages/ItAcademyPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
    <MotionConfig reducedMotion="user" transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <VercelInsights />
        <Suspense fallback={<div className="site-shell pt-16 text-sm text-muted-foreground">Loading…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              {showSkills ? <Route path="/skills" element={<SkillsPage />} /> : null}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/card" element={<CardPage />} />
              {showServices ? <Route path="/services" element={<ServicesPage />} /> : null}
              {showServices ? <Route path="/services/:slug" element={<ServicePage />} /> : null}
              <Route path="/education/it-academy" element={<ItAcademyPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
