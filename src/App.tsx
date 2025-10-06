import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Komponen pelindung
import GuestRoute from "./components/routes/Guest";
import ProtectedRoute from "./components/routes/Protected";

// Layout
import NotFound from "./pages/NotFound";

//Loading Screen
import { ScrollToTop } from "./common/ScrollToTop";
import Splash from "./components/shared/Splash";
import AppLayout from "./layout/AppLayout";

// Lazy load semua halaman/views
const Login = lazy(() => import("./pages/LoginPage"));
const Overview = lazy(() => import("./pages/Overview"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Splash />}>
          <Routes>
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Overview />} />
              </Route>
            </Route>

            {/* Guest Route */}
            <Route element={<GuestRoute />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
