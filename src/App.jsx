import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import ShowProjects from "./components/ShowProjects";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import AddBrandingProject from "./components/adminDashboard/AddBrandingProject";
import AddAdvertismentProject from "./components/adminDashboard/AddAdvertismentProject";
import AddSocialMediaProject from "./components/adminDashboard/AddSocialMediaProject";

function AppRoutes({ user }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <div className="bg-[#131313] text-white">
        {!isAdminRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin-login"
            element={user ? <Navigate to="/admin-dashboard" /> : <Login />}
          />
          <Route
            path="/admin-register"
            element={user ? <Navigate to="/admin-dashboard" /> : <Register />}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={user ? <Dashboard /> : <Navigate to="/admin-login" />}
          />
          <Route
            path="/admin-add-branding"
            element={user ? <AddBrandingProject /> : <Navigate to="/admin-login" />}
          />

           <Route
            path="/admin-add-advertisment"
            element={user ? <AddAdvertismentProject /> : <Navigate to="/admin-login" />}
          />

          <Route
            path="/admin-add-socialmedia"
            element={user ? <AddSocialMediaProject /> : <Navigate to="/admin-login" />}
          />

          <Route
            path="/admin-show-project"
            element={user ? <ShowProjects /> : <Navigate to="/admin-login" />}
          />
        </Routes>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter basename="/albatross/">
      <AppRoutes user={user} />
    </BrowserRouter>
  );
}

export default App;
