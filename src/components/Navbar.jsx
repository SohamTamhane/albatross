import Logo from '../assets/Logo.png';

export default function Navbar() {
    return (
        <div className="w-full">
            <div className="flex flex-col items-center py-6 sm:py-8 md:py-10">
                <img
                    src={Logo}
                    alt="Company Logo Loading..."
                    className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
                />
                <div className="font-montserrat font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                    ALBATROSS
                </div>
                <div className="font-montserrat font-extralight text-xs sm:text-sm md:text-base text-center">
                    SOCIAL
                </div>
            </div>
        </div>
    );
}
