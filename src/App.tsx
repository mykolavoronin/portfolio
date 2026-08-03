import { Suspense, lazy } from "react";
import { MotionConfig } from "motion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FinePointerCursor } from "@/components/FinePointerCursor";
import { VercelInsights } from "@/components/VercelInsights";
import { Layout } from "@/components/Layout";
import HomePage from "./pages/HomePage";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ItAcademyPage = lazy(() => import("./pages/ItAcademyPage"));
const CardPage = lazy(() => import("./pages/CardPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
    <MotionConfig reducedMotion="user" transition={{ type: "spring", duration: 0.4, bounce: 0 }}>
      <FinePointerCursor />
      <BrowserRouter>
        <VercelInsights />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="/education/it-academy" element={<ItAcademyPage />} />
              <Route path="/card" element={<CardPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
