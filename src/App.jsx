import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        </BrowserRouter>
    )
}

export default App
