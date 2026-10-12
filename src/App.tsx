import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import { ErrorBoundary, Loading } from "./components/UI";
const Home = lazy(() => import("./pages/Home"));
const Experiences = lazy(() => import("./pages/Experiences"));
const Detail = lazy(() => import("./pages/ServiceDetail"));
const Events = lazy(() => import("./pages/Events"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="experiencias" element={<Experiences />} />
            <Route path="experiencias/:slug" element={<Detail />} />
            <Route path="eventos-sociales" element={<Events />} />
            <Route path="eventos-corporativos" element={<Events />} />
            <Route path="nosotros" element={<About />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
