import { Suspense, lazy } from "react";
import { MotionConfig } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FinePointerCursor } from "@/components/FinePointerCursor";
import { Layout } from "@/components/Layout";
import HomePage from "./pages/HomePage";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <MotionConfig reducedMotion="user" transition={{ type: "spring", duration: 0.4, bounce: 0 }}>
        <TooltipProvider>
          <FinePointerCursor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
