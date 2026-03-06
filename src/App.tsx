import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Vale from "./pages/Vale";
import Suicidal from "./pages/Suicidal";
import NotFound from "./pages/NotFound";
import LoadingIntro from "./components/LoadingIntro";

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, filter: "blur(8px)" },
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/vale" element={<Vale />} />
          <Route path="/suicidal" element={<Suicidal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("fondling_intro_seen");

    if (hasSeenIntro) {
      setShowIntro(false);
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("fondling_intro_seen", "true");
      setShowIntro(false);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <LoadingIntro key="loading-intro" />
        ) : (
          <motion.div
            key="app-routes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <AppRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
