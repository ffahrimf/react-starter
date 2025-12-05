import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Common Components
import { ScrollToTop } from "./common/ScrollToTop";
import Splash from "./common/Splash";
import AppLayout from "./layout/AppLayout";
import NotFound from "./pages/NotFound";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Items = lazy(() => import("./pages/Items"));

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Splash />}>
    <Component />
  </Suspense>
);

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/items" element={withSuspense(Items)} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
