import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import Artists from "./pages/Artists";
import Faq from "./pages/Faq";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
