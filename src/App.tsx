import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Komponen pelindung
import GuestRoute from "./routes/Guest";
import ProtectedRoute from "./routes/Protected";

// Common Components
import { ScrollToTop } from "./common/ScrollToTop";
import Splash from "./common/Splash";
import AppLayout from "./layout/AppLayout";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/UnaUthorized";

// Priotity Imports
import Login from "./pages/LoginPage";

// Lazy-loaded Pages
const Overview = lazy(() => import("./pages/Overview"));
const Event = lazy(() => import("./pages/Event"));
const User = lazy(() => import("./pages/User"));

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
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Overview />} />
              <Route path="/event" element={withSuspense(Event)} />
              <Route path="/user" element={withSuspense(User)} />
            </Route>
          </Route>

          {/* Guest Routes */}
          <Route element={<GuestRoute />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>

          {/* Unauthorized Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
