import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaDesktop } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiSlideshowLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  const handleLogout = () => {
    // Clear token or user session here
    navigate("/admin-login");
  };

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black text-white p-2 rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#111] text-white font-montserrat z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="px-6 py-4 font-bold text-lg border-b border-white/10">
          Admin Panel
        </div>
        <ul className="mt-4 space-y-2 px-4">
          <li
            onClick={() => handleNavigate("/admin-dashboard")}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-dashboard" ? "text-blue-500" : ""
            }`}
          >
            <FaDesktop />
            <span>Dashboard</span>
          </li>

          <li
            onClick={() => handleNavigate("/admin-add-branding")}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-add-project" ? "text-blue-500" : ""
            }`}
          >
            <MdOutlineBrandingWatermark />
            <span>Branding Project</span>
          </li>

          <li
            onClick={() => handleNavigate("/admin-add-project")}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-add-project" ? "text-blue-500" : ""
            }`}
          >
            <RiAdvertisementLine />
            <span>Advertisment Project</span>
          </li>

          <li
            onClick={() => handleNavigate("/admin-add-project")}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-add-project" ? "text-blue-500" : ""
            }`}
          >
            <IoShareSocialOutline />
            <span>Social Media Project</span>
          </li>

           <li
            onClick={() => handleNavigate("/admin-show-project")}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-show-project" ? "text-blue-500" : ""
            }`}
          >
            <RiSlideshowLine />
            <span>Show Projects</span>
          </li>

          
          <li
            onClick={() => setShowLogoutModal(true)}
            className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-white/10 ${
              location.pathname === "/admin-logoutmodal" ? "text-blue-500" : ""
            }`}
          >
            <TbLogout />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} />
      )}
    </>
  );
};

export default Sidebar;
