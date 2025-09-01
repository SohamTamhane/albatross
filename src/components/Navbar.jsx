import Logo from '../assets/Logo.png';
import { motion } from "framer-motion";

export default function Navbar() {
     // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true}}
            variants={fadeIn} 
            className="w-full">
            <div className="flex flex-col items-center py-6 sm:py-8 md:py-10">
                <img
                    src={Logo}
                    alt="Company Logo Loading..."
                    className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
                />
                <div className="font-aktiv font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                    ALBATROSS
                </div>
                <div className="font-aktiv font-extralight text-xs sm:text-sm md:text-base text-center">
                    SOCIAL
                </div>
            </div>
        </motion.div>
    );
}
