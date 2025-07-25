import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProjects from "./components/AddProjects";
import ShowProjects from "./components/ShowProjects";
import LogoutModal from "./components/LogoutModal";

function App() {
    
    return (
        <BrowserRouter basename="/albatross">

            <div className="bg-[#131313] text-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </div>
            <Routes>
                <Route path="/admin-dashboard" element={<Dashboard/>}/>
                <Route path="/admin-add-project" element={<AddProjects/>}/>
                <Route path="admin-show-project" element={<ShowProjects/>} />
            </Routes>

        </BrowserRouter>
    )
}

export default App
