import FooterImage from "../assets/FooterImage.png";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="absolute relative w-full mt-30">
            <div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <img src={FooterImage} alt="Logo" className=" w-full h-full text-center" />

                <div className="absolute font-montserrat bottom-6 left-60 text-lg text-gray-300">
                    admin@albsocial.com
                </div>

                <div className="absolute bottom-6 right-70 flex items-center space-x-4 text-gray-300">
                    <a href="https://instagram.com" target="_blank">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank">
                        <FaLinkedinIn className="w-5 h-6" />
                    </a>
                </div>
            </div>
            </div>
        </div>
    );
}
