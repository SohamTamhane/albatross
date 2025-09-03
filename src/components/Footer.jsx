import FooterImage from "../assets/FooterImage.png";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="relative w-full mt-30">
            <div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <img src={FooterImage} alt="Logo" className="w-full h-full text-center" />

                {/* Mobile: stack email and icons; Desktop: hide */}
                <div className="flex flex-row items-center justify-center gap-10 text-gray-300 lg:hidden md:hidden bg-[#282828] w-full py-4">
                    <div className="font-aktiv text-base text-center">
                        admin@albsocial.com
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="w-5 h-6" />
                        </a>
                    </div>
                </div>

                {/* Desktop: keep previous absolute positions, hide on mobile */}
                <div className="absolute font-aktiv bottom-6 lg:left-60 lg:text-lg md:left-10 md:text-base text-gray-300 hidden lg:block md:block">
                    admin@albsocial.com
                </div>
                <div className="absolute bottom-6 lg:right-70 md:right-10 items-center space-x-4 text-gray-300 hidden lg:flex md:flex">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="w-5 h-6" />
                    </a>
                </div>
            </div>
            </div>
        </div>
    );
}
