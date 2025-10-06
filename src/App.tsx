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
const Event = lazy(() => import("./pages/Event"));
const User = lazy(() => import("./pages/User"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Splash />}>
          <Routes>
            {/* Guest Route (Hanya untuk yang belum login) */}
            <Route element={<GuestRoute />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>

            {/* --- Protected Routes --- */}
            <Route element={<AppLayout />}>
              {/* Rute yang bisa diakses SEMUA role (selama sudah login) */}
              <Route element={<ProtectedRoute />}>
                <Route index path="/" element={<Overview />} />
              </Route>

              {/* Rute yang hanya bisa diakses oleh 'ADMIN' */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/event" element={<Event />} />
              </Route>

              {/* Rute yang HANYA bisa diakses oleh 'SUPERADMIN' */}
              <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
                <Route path="/user" element={<User />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
